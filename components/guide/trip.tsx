'use client'

import { createContext, use, useMemo, useSyncExternalStore, type ReactNode } from 'react'
import type { Place, Visibility } from '@/lib/guide'

/*
 * Trip filter: the reader can switch regions and cities off; the guide then hides the
 * content tied to them. The excluded ids live in localStorage, one key per guide.
 */

const EMPTY: string[] = []
const cache = new Map<string, string[]>()
const listeners = new Set<() => void>()

function read(key: string): string[] {
  let v = cache.get(key)
  if (!v) {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(key) ?? '[]')
      v = Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : []
    } catch {
      v = []
    }
    cache.set(key, v)
  }
  return v
}

function write(key: string, off: string[]) {
  cache.set(key, off)
  try {
    localStorage.setItem(key, JSON.stringify(off))
  } catch {
    // storage unavailable (private mode): keep the in-memory value
  }
  listeners.forEach((l) => l())
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  const onStorage = (e: StorageEvent) => {
    if (e.key) cache.delete(e.key)
    cb()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(cb)
    window.removeEventListener('storage', onStorage)
  }
}

type Trip = {
  places: Place[]
  /** Whether a region or city id is in the trip (a city also needs its region). */
  on: (id: string) => boolean
  /** Whether the id itself was switched off, regardless of its region. */
  excluded: (id: string) => boolean
  filtered: boolean
  counts: { regions: number; regionsTotal: number; cities: number; citiesTotal: number }
  toggleRegion: (id: string) => void
  toggleCity: (regionId: string, cityId: string) => void
  showAll: () => void
}

const TripContext = createContext<Trip | null>(null)

export function TripProvider({
  storageKey,
  places,
  children,
}: {
  storageKey: string
  places: Place[]
  children: ReactNode
}) {
  const off = useSyncExternalStore(
    subscribe,
    () => read(storageKey),
    () => EMPTY,
  )

  const trip = useMemo<Trip>(() => {
    const offSet = new Set(off)
    const onMap = new Map<string, boolean>()
    let regions = 0
    let cities = 0
    let citiesTotal = 0
    for (const p of places) {
      const ron = !offSet.has(p.id)
      onMap.set(p.id, ron)
      if (ron) regions++
      for (const c of p.cities) {
        const con = ron && !offSet.has(c.id)
        onMap.set(c.id, con)
        citiesTotal++
        if (con) cities++
      }
    }
    const set = (next: Set<string>) => write(storageKey, [...next])
    return {
      places,
      on: (id) => onMap.get(id) ?? true,
      excluded: (id) => offSet.has(id),
      filtered: regions < places.length || cities < citiesTotal,
      counts: { regions, regionsTotal: places.length, cities, citiesTotal },
      toggleRegion: (id) => {
        const s = new Set(off)
        if (s.has(id)) s.delete(id)
        else s.add(id)
        set(s)
      },
      toggleCity: (rid, cid) => {
        const s = new Set(off)
        if (s.has(rid)) {
          s.delete(rid)
          s.delete(cid)
        } else if (s.has(cid)) s.delete(cid)
        else s.add(cid)
        set(s)
      },
      showAll: () => set(new Set()),
    }
  }, [off, places, storageKey])

  return <TripContext value={trip}>{children}</TripContext>
}

export function useTrip() {
  const t = use(TripContext)
  if (!t) throw new Error('useTrip must be used inside <TripProvider>')
  return t
}

export type GateProps<P extends string = string> = { on: Visibility<P>; children: ReactNode }

function shown(on: Visibility, trip: Trip) {
  return on === 'always' || on.some(trip.on)
}

/** Renders its children when `on` is 'always' or one of its regions/cities is in the trip. */
export function Only<P extends string>({ on, children }: GateProps<P>) {
  return shown(on, useTrip()) ? children : null
}

/** The opposite of <Only>. */
export function Unless<P extends string>({ on, children }: GateProps<P>) {
  return shown(on, useTrip()) ? null : children
}
