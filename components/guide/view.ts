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

/** Id of the sticky bar, scrolled to when the album is opened from the top of the page. */
export const GUIDE_BAR_ID = 'guide-bar'

/** Switches to the album and brings the bar to the top, so the album starts right below it. */
export function openAlbum() {
  setGuideView('album')
  const bar = document.getElementById(GUIDE_BAR_ID)
  if (!bar) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // The bar is sticky: measure where it sits in the flow, through its wrapper.
  const top = (bar.parentElement ?? bar).getBoundingClientRect().top + window.scrollY
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
}
