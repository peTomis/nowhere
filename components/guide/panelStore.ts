'use client'

import { useSyncExternalStore } from 'react'

/** Which trace the photo panel is open for ("PannelloFoto"), shared by every trace. */
export type PanelRequest = { trace: string; mode: 'new' | 'edit' } | null

let request: PanelRequest = null
const listeners = new Set<() => void>()

export function openPhotoPanel(trace: string, mode: 'new' | 'edit') {
  request = { trace, mode }
  listeners.forEach((l) => l())
}

export function closePhotoPanel() {
  request = null
  listeners.forEach((l) => l())
}

export function usePhotoPanel(): PanelRequest {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => request,
    () => null,
  )
}
