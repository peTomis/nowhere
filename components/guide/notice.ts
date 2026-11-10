'use client'

import { useSyncExternalStore } from 'react'

/** A short notice at the bottom of the page with one action ("Avviso.dc.html"). */
export type Notice = { text: string; action: string; icon: 'pin' | 'unpin'; run: () => void }

let notice: (Notice & { at: number }) | null = null
let timer: ReturnType<typeof setTimeout> | undefined
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

export function showNotice(n: Notice) {
  clearTimeout(timer)
  notice = { ...n, at: Date.now() }
  emit()
  timer = setTimeout(dismissNotice, 6000)
}

export function dismissNotice() {
  clearTimeout(timer)
  notice = null
  emit()
}

export function useNotice() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => notice,
    () => null,
  )
}
