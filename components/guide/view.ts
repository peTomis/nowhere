'use client'

import { useSyncExternalStore } from 'react'

/**
 * Which view of a guide is shown under the sticky bar: the text or the album. Shared by the bar's
 * switch and the opening's "Apri l’album" button. Not persisted: the page always opens on the
 * text, which is what the server renders.
 */
export type GuideView = 'guide' | 'album'

let view: GuideView = 'guide'
const listeners = new Set<() => void>()

export function setGuideView(next: GuideView) {
  if (next === view) return
  view = next
  listeners.forEach((l) => l())
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

export function useGuideView(): GuideView {
  return useSyncExternalStore(
    subscribe,
    () => view,
    () => 'guide',
  )
}

/** Id of the sticky bar. */
export const GUIDE_BAR_ID = 'guide-bar'

/** Switches to the album (the page doesn't scroll). */
export const openAlbum = () => openView('album')

/** Switches to a view, where the reader is: no scrolling. */
export function openView(next: GuideView) {
  setGuideView(next)
}
