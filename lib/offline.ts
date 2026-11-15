'use client'

import { useSyncExternalStore } from 'react'
import type { OfflineManifest } from '@/lib/server/offline'
import { t } from '@/i18n'

/*
 * Offline guides, adapted from collection-manager's offline mode: one download saves the home,
 * every ready guide, their scripts, fonts and images in Cache Storage, and the service worker
 * (public/offline-sw.js) serves them when the network doesn't answer. Guides are public, so no
 * account is needed and nothing personal is saved: photos and notes stay online. A download goes
 * to its own cache and replaces the previous one only once complete; the active one is named in
 * the `META` cache (read by the worker) and in localStorage (read by the page).
 */

const PREFIX = 'nowhere-offline-'
const META = 'nowhere-offline-meta'
const KEY = 'nowhere-offline'
const SW = '/offline-sw.js'

export type OfflineSnapshot = { id: string; savedAt: number }

const listeners = new Set<() => void>()
let cachedRaw: string | null = null
let cached: OfflineSnapshot | null = null

function read(): OfflineSnapshot | null {
  let raw: string | null = null
  try {
    raw = localStorage.getItem(KEY)
  } catch {}
  if (raw !== cachedRaw) {
    cachedRaw = raw
    try {
      const value = JSON.parse(raw ?? 'null')
      cached = value?.id && typeof value.savedAt === 'number' ? value : null
    } catch {
      cached = null
    }
  }
  return cached
}

function write(value: OfflineSnapshot | null) {
  try {
    if (value) localStorage.setItem(KEY, JSON.stringify(value))
    else localStorage.removeItem(KEY)
  } catch {}
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener('storage', listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', listener)
  }
}

/** The saved snapshot on this device, if any (none on the server). */
export const useOfflineSnapshot = () => useSyncExternalStore(subscribe, read, () => null)

/** Whether the snapshot is still there: browsers may evict Cache Storage on their own. */
export async function snapshotAvailable(id: string) {
  return 'caches' in window && (await caches.has(PREFIX + id))
}

async function prepareWorker() {
  // next dev rebuilds its chunks on every edit: a saved page would point at missing scripts.
  if (process.env.NODE_ENV === 'development') throw new Error(t.offline.devMode)
  if (!('serviceWorker' in navigator) || !('caches' in window) || !window.isSecureContext)
    throw new Error(t.offline.unsupported)
  await navigator.serviceWorker.register(SW, { scope: '/' })
  await navigator.serviceWorker.ready
}

async function checkedFetch(url: string, signal: AbortSignal) {
  signal.throwIfAborted()
  const controller = new AbortController()
  const abort = () => controller.abort(signal.reason)
  signal.addEventListener('abort', abort, { once: true })
  const timer = setTimeout(() => controller.abort(new Error(t.offline.failed)), 30000)
  try {
    const response = await fetch(url, { signal: controller.signal, cache: 'no-store' })
    if (!response.ok) throw new Error(t.offline.failed)
    // Read the whole body before the timeout is cleared, also on a slow connection.
    return new Response(await response.arrayBuffer(), {
      status: response.status,
      headers: response.headers,
    })
  } catch (error) {
    if (signal.aborted) throw signal.reason
    throw error instanceof Error && error.message === t.offline.failed
      ? error
      : new Error(t.offline.failed)
  } finally {
    clearTimeout(timer)
    signal.removeEventListener('abort', abort)
  }
}

// Build files named in pages, styles and scripts (client components, fonts, lazy chunks).
const STATIC = /(?:\/_next\/)?static\/(?:chunks|media|css)\/[\w\-.~/]+\.\w+/g

function staticRefs(text: string) {
  return [...text.matchAll(STATIC)].map(([m]) => (m.startsWith('/_next/') ? m : `/_next/${m}`))
}

/** Downloads the snapshot; `progress` gets the files saved and the total so far. */
export async function downloadOffline(
  progress: (done: number, total: number) => void,
  signal: AbortSignal,
) {
  const id = crypto.randomUUID()
  const previous = read()
  try {
    await prepareWorker()
    await navigator.storage?.persist?.()
    const cache = await caches.open(PREFIX + id)
    const manifest = (await (await checkedFetch('/api/offline', signal)).json()) as OfflineManifest

    // Pages and public files must all be there; build files found by scanning are best-effort
    // (a match in a script may not be a real file), as long as the pages' own ones are saved.
    const required = new Set<string>([...manifest.routes, ...manifest.files])
    const found = new Set<string>()
    let done = 0
    const total = () => required.size + found.size

    for (const route of manifest.routes) {
      const response = await checkedFetch(route, signal)
      const html = await response.clone().text()
      const doc = new DOMParser().parseFromString(html, 'text/html')
      doc.querySelectorAll<HTMLElement>('script[src], link[href]').forEach((el) => {
        const value = el.getAttribute('src') ?? el.getAttribute('href')!
        const url = new URL(value, location.origin)
        if (url.origin === location.origin && !url.pathname.startsWith('/api/'))
          required.add(url.pathname + url.search)
      })
      staticRefs(html).forEach((ref) => required.has(ref) || found.add(ref))
      await cache.put(route, response)
      progress(++done, total())
    }

    const save = async (path: string, strict: boolean) => {
      let response: Response
      try {
        response = await checkedFetch(path, signal)
      } catch (error) {
        if (strict || signal.aborted) throw error
        return
      }
      const type = response.headers.get('content-type') ?? ''
      if (/javascript|css/.test(type)) {
        const text = await response.clone().text()
        const refs = staticRefs(text)
        if (type.includes('css'))
          for (const [, ref] of text.matchAll(/url\(["']?([^\s)'"]+)["']?\)/g)) {
            const url = new URL(ref, location.origin + path)
            if (url.origin === location.origin) refs.push(url.pathname)
          }
        for (const ref of refs)
          if (!required.has(ref) && !found.has(ref)) {
            found.add(ref)
            queue.push([ref, false])
          }
      }
      await cache.put(path, response)
    }

    const queue: [string, boolean][] = [
      ...[...required]
        .filter((p) => !manifest.routes.includes(p))
        .map((p): [string, boolean] => [p, true]),
      ...[...found].map((p): [string, boolean] => [p, false]),
    ]
    while (queue.length) {
      const [path, strict] = queue.shift()!
      await save(path, strict)
      progress(++done, total())
    }

    signal.throwIfAborted()
    const snapshot: OfflineSnapshot = { id, savedAt: Date.now() }
    await (await caches.open(META)).put('/__offline', Response.json({ id }))
    write(snapshot)
    if (previous) await caches.delete(PREFIX + previous.id)
    return snapshot
  } catch (error) {
    await caches.delete(PREFIX + id).catch(() => {})
    if (error instanceof DOMException && error.name === 'QuotaExceededError')
      throw new Error(t.offline.quota)
    throw error
  }
}

/** Deletes every snapshot and the worker: the site is back to online only. */
export async function removeOffline() {
  write(null)
  if ('caches' in window)
    for (const name of await caches.keys())
      if (name === META || name.startsWith(PREFIX)) await caches.delete(name)
  const registration = await navigator.serviceWorker?.getRegistration(SW)
  await registration?.unregister()
}
