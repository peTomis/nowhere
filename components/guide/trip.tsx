'use client'

import { createContext, use, useMemo, useSyncExternalStore, type ReactNode } from 'react'
import type { Place, Visibility } from '@/content/types'
import { setTripOff, subscribePrefs, tripOff } from '@/lib/reader/prefs'

/*
 * Trip filter: the reader can switch regions off; the guide then hides the content tied to them.
 * The excluded ids are a device preference (lib/reader/prefs.ts).
 */

const EMPTY: string[] = []

type Trip = {
  places: Place[]
  /** Whether a region or city id is in the trip. */
  on: (id: string) => boolean
  filtered: boolean
  counts: { regions: number; regionsTotal: number; cities: number }
  toggleRegion: (id: string) => void
  showAll: () => void
}

const TripContext = createContext<Trip | null>(null)

export function TripProvider({
  country,
  places,
  children,
}: {
  /** ISO 3166-1 alpha-2 of the guide: the key of its filter in the prefs. */
  country: string
  places: Place[]
  children: ReactNode
}) {
  const off = useSyncExternalStore(
    subscribePrefs,
    () => tripOff(country),
    () => EMPTY,
  )

  const trip = useMemo<Trip>(() => {
    const offSet = new Set(off)
    const onMap = new Map<string, boolean>()
    let regions = 0
    let cities = 0
    for (const p of places) {
      const ron = !offSet.has(p.id)
      onMap.set(p.id, ron)
      if (ron) regions++
      if (ron) cities += p.cities.length
      for (const c of p.cities) {
        onMap.set(c.id, ron)
      }
    }
    const set = (next: Set<string>) => setTripOff(country, [...next])
    return {
      places,
      on: (id) => onMap.get(id) ?? true,
      filtered: regions < places.length,
      counts: { regions, regionsTotal: places.length, cities },
      toggleRegion: (id) => {
        const s = new Set(off)
        if (s.has(id)) s.delete(id)
        else s.add(id)
        set(s)
      },
      showAll: () => set(new Set()),
    }
  }, [off, places, country])

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

/** Renders its children when `on` is 'always' or one of its places is in the trip. */
export function Only<P extends string>({ on, children }: GateProps<P>) {
  return shown(on, useTrip()) ? children : null
}

/** The opposite of <Only>. */
export function Unless<P extends string>({ on, children }: GateProps<P>) {
  return shown(on, useTrip()) ? null : children
}
