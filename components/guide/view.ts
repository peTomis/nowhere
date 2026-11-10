'use client'

import { useSyncExternalStore } from 'react'
import { flushSync } from 'react-dom'

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
/** Height of the sticky bar. */
export const GUIDE_BAR_HEIGHT = 64

/** Where the reader was in each view, to come back to it. */
const saved: Partial<Record<GuideView, number>> = {}

/** Switches to the album. */
export const openAlbum = () => openView('album')

/**
 * Switches to a view. From the opening (bar not stuck) the page doesn't move. Below it, the views
 * have different heights, so keeping the scroll position would land at a random point (or be
 * clamped): the reader goes back to where they were in that view, or to its top, with the bar
 * stuck. The jump is instant, not smooth.
 */
export function openView(next: GuideView) {
  if (next === view) return
  const shell = document.getElementById(GUIDE_BAR_ID)?.parentElement
  // Scroll position at which the bar sticks: the views start right under it.
  const top = shell
    ? shell.getBoundingClientRect().top + window.scrollY - GUIDE_BAR_HEIGHT
    : Infinity
  const stuck = window.scrollY >= top - 1
  if (stuck) saved[view] = window.scrollY
  flushSync(() => setGuideView(next))
  if (stuck) window.scrollTo({ top: Math.max(top, saved[next] ?? top), behavior: 'instant' })
}
