'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { subjectKey, type Subject } from '@/content/subjects'
import type { ProcessedPhoto } from './photos'

/*
 * The reader's collection in the browser (docs/data-model.md §6.1): photos and notes of the
 * signed-in reader, read once per page from /api/photos and /api/notes and kept in memory, so the
 * same trace shows the same state in every card, in the album and in the completion. Signed out,
 * it stays empty and the controls invite to sign in. A photo being uploaded lives here too (with
 * a local preview) until the server confirms it; it is lost if the page is left before that:
 * there is no offline queue (§6.5), but an upload interrupted by the network restarts when the
 * connection comes back.
 */

export type Session = 'unknown' | 'signed-out' | 'signed-in'

/** A photo saved in the account. */
export type SavedPhoto = { id: string; thumb: string; full: string; createdAt: string }

/** A photo not confirmed yet: uploading, waiting for the network, or failed. */
export type LocalPhoto = {
  id: string
  preview: string
  state: 'pending' | 'offline' | 'error' | 'session'
  createdAt: string
  subject: Subject
  photo: ProcessedPhoto
}

export type Entry = { photo?: SavedPhoto; local?: LocalPhoto; note?: string }

type State = { session: Session; entries: Record<string, Entry> }

let state: State = { session: 'unknown', entries: {} }
const listeners = new Set<() => void>()
let loading: Promise<void> | undefined

function set(next: Partial<State>) {
  state = { ...state, ...next }
  listeners.forEach((l) => l())
}

function patch(key: string, change: (e: Entry) => Entry | undefined) {
  const entries = { ...state.entries }
  const next = change(entries[key] ?? {})
  if (next && (next.photo || next.local || next.note)) entries[key] = next
  else delete entries[key]
  set({ entries })
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

const SERVER: State = { session: 'unknown', entries: {} }

class RequestError extends Error {
  constructor(readonly status: number) {
    super(`HTTP ${status}`)
  }
}

async function api<T>(path: string, init?: RequestInit & { json?: unknown }): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: init?.json === undefined ? undefined : { 'content-type': 'application/json' },
    body: init?.json === undefined ? init?.body : JSON.stringify(init.json),
  })
  if (!res.ok) throw new RequestError(res.status)
  return res.json() as Promise<T>
}

type PhotoView = SavedPhoto & { subject: Subject }
type NoteView = { subject: Subject; text: string }

/** Reads the session and the collection, once per page. */
export function loadCollection() {
  loading ??= (async () => {
    try {
      await api('/api/me')
    } catch {
      set({ session: 'signed-out' })
      return
    }
    try {
      const [photos, notes] = await Promise.all([
        api<PhotoView[]>('/api/photos'),
        api<NoteView[]>('/api/notes'),
      ])
      const entries: Record<string, Entry> = {}
      for (const p of photos) {
        const { subject, ...photo } = p
        entries[subjectKey(subject)] = { ...entries[subjectKey(subject)], photo }
      }
      for (const n of notes)
        entries[subjectKey(n.subject)] = { ...entries[subjectKey(n.subject)], note: n.text }
      // Keep uploads started while the list was loading.
      for (const [k, e] of Object.entries(state.entries))
        if (e.local) entries[k] = { ...entries[k], local: e.local }
      set({ session: 'signed-in', entries })
    } catch {
      // Signed in but the collection can't be read: show what we have, try again next page.
      set({ session: 'signed-in' })
    }
  })()
  return loading
}

/** The whole collection; loads it after hydration. The server snapshot is empty. */
export function useCollection(): State {
  useEffect(() => {
    loadCollection()
  }, [])
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => SERVER,
  )
}

export function useEntry(key: string): Entry | undefined {
  return useCollection().entries[key]
}

/** A trace is in the album when it has a photo, saved or on its way. */
export const isSeen = (e: Entry | undefined) => !!(e?.photo || e?.local)

// --- photos ------------------------------------------------------------------------------------

async function upload(key: string) {
  const local = state.entries[key]?.local
  if (!local) return
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    patch(key, (e) => ({ ...e, local: { ...local, state: 'offline' } }))
    return
  }
  patch(key, (e) => ({ ...e, local: { ...local, state: 'pending' } }))
  const { photo, subject, id } = local
  try {
    const { put } = await api<{ put: { full: string; thumb: string } }>('/api/photos', {
      method: 'POST',
      json: {
        id,
        subject,
        mime: photo.mime,
        width: photo.width,
        height: photo.height,
        bytes: { full: photo.full.size, thumb: photo.thumb.size },
      },
    })
    await Promise.all(
      (['full', 'thumb'] as const).map(async (size) => {
        const res = await fetch(put[size], {
          method: 'PUT',
          headers: { 'content-type': photo.mime },
          body: photo[size],
        })
        if (!res.ok) throw new RequestError(res.status)
      }),
    )
    const saved = await api<PhotoView>(`/api/photos/${id}/commit`, { method: 'POST' })
    if (state.entries[key]?.local?.id !== id) return // replaced or removed meanwhile
    URL.revokeObjectURL(local.preview)
    const { subject: _, ...rest } = saved
    patch(key, (e) => ({ ...e, photo: rest, local: undefined }))
  } catch (e) {
    if (state.entries[key]?.local?.id !== id) return
    const offline = typeof navigator !== 'undefined' && navigator.onLine === false
    const next: LocalPhoto['state'] =
      e instanceof RequestError && e.status === 401 ? 'session' : offline ? 'offline' : 'error'
    patch(key, (en) => (en.local ? { ...en, local: { ...en.local, state: next } } : en))
  }
}

if (typeof window !== 'undefined')
  window.addEventListener('online', () => {
    for (const [k, e] of Object.entries(state.entries)) if (e.local?.state === 'offline') upload(k)
  })

/** Adds (or replaces) a subject's photo: shown at once, saved in the background. */
export function addPhoto(subject: Subject, photo: ProcessedPhoto) {
  const key = subjectKey(subject)
  const old = state.entries[key]?.local
  if (old) URL.revokeObjectURL(old.preview)
  const local: LocalPhoto = {
    id: crypto.randomUUID(),
    preview: URL.createObjectURL(photo.full),
    state: 'pending',
    createdAt: new Date().toISOString(),
    subject,
    photo,
  }
  patch(key, (e) => ({ ...e, local }))
  void upload(key)
}

export function retryPhoto(key: string) {
  void upload(key)
}

/** Removes the photo and the note of a subject: the trace leaves the album. */
export async function removeFromAlbum(subject: Subject) {
  const key = subjectKey(subject)
  const entry = state.entries[key]
  if (entry?.photo) await api(`/api/photos/${entry.photo.id}`, { method: 'DELETE' })
  if (entry?.note) await api('/api/notes', { method: 'PUT', json: { subject, text: '' } })
  if (entry?.local) URL.revokeObjectURL(entry.local.preview)
  patch(key, () => undefined)
}

/** Saves the note of a subject (empty: deleted). Optimistic; restored if the server refuses. */
export async function saveNote(subject: Subject, text: string) {
  const key = subjectKey(subject)
  const before = state.entries[key]?.note
  const next = text.trim()
  if ((before ?? '') === next) return
  patch(key, (e) => ({ ...e, note: next || undefined }))
  try {
    await api('/api/notes', { method: 'PUT', json: { subject, text: next, lang: 'it' } })
  } catch (e) {
    patch(key, (en) => ({ ...en, note: before }))
    throw e
  }
}
