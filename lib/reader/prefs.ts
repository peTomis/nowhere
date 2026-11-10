/*
 * Device preferences of the reader (docs/data-model.md §3.3): the trip filter (the region/city
 * ids each guide's reader switched off) and the cards pinned to "In evidenza". They stay in this browser's localStorage
 * (they must work signed out and render synchronously after hydration) under one versioned key.
 * Account data (visits, photos, notes) is on the server, never here.
 */

export const PREFS_KEY = 'nowhere.prefs'
export const PREFS_SCHEMA = 1

export type Prefs = {
  schema: typeof PREFS_SCHEMA
  /** Excluded region and city ids, by country (ISO 3166-1 alpha-2). */
  trip: Record<string, { off: string[] }>
  /**
   * Cards pinned to "In evidenza", by country, newest first. Optional: added within schema 1
   * (older prefs simply have none).
   */
  pins?: Record<string, { used: boolean; list: Pin[] }>
}

/** A person or city card pinned to the top of its guide. */
export type Pin = { card: string; collapsed: boolean; createdAt: number }

const empty = (): Prefs => ({ schema: PREFS_SCHEMA, trip: {} })

/** Keys of the trip filter before schema 1: `guida-<slug>-off`, an array of old ids. */
const LEGACY_KEY = /^guida-.+-off$/

/**
 * Brings stored prefs to PREFS_SCHEMA. Steps run in order; each takes the previous shape.
 * 0 → 1: the per-guide keys are dropped without conversion. Their ids were renamed
 * (`transilvania` → `ro.transylvania`) before the guide was published, so no reader can have
 * saved a meaningful filter with them (docs/data-model.md §4.4).
 */
function migrate(raw: unknown, storage: Storage): Prefs {
  const prefs = raw as Partial<Prefs> | null
  if (prefs?.schema === PREFS_SCHEMA && prefs.trip && typeof prefs.trip === 'object') {
    return prefs as Prefs
  }
  // schema 0 (no key yet): remove the legacy keys
  for (let i = storage.length - 1; i >= 0; i--) {
    const key = storage.key(i)
    if (key && LEGACY_KEY.test(key)) storage.removeItem(key)
  }
  return empty()
}

let cache: Prefs | undefined
const listeners = new Set<() => void>()

function storage(): Storage | undefined {
  try {
    return window.localStorage
  } catch {
    return undefined // blocked storage: keep prefs in memory
  }
}

function load(): Prefs {
  if (cache) return cache
  const s = storage()
  if (!s) return (cache = empty())
  let raw: unknown = null
  try {
    raw = JSON.parse(s.getItem(PREFS_KEY) ?? 'null')
  } catch {
    raw = null
  }
  cache = migrate(raw, s)
  if (raw === null || (raw as Prefs).schema !== PREFS_SCHEMA) save(cache)
  return cache
}

function save(prefs: Prefs) {
  try {
    storage()?.setItem(PREFS_KEY, JSON.stringify(prefs))
  } catch {
    // full or unavailable: the in-memory value still applies for this visit
  }
}

const NONE: string[] = []

/** The ids switched off for a country. Same array until it changes (useSyncExternalStore). */
export function tripOff(country: string): string[] {
  return load().trip[country]?.off ?? NONE
}

export function setTripOff(country: string, off: string[]) {
  const prefs = load()
  cache = { ...prefs, trip: { ...prefs.trip, [country]: { off } } }
  save(cache)
  listeners.forEach((l) => l())
}

const NO_PINS: Pin[] = []

/** The cards pinned for a country, newest first. Same array until it changes. */
export function pinsOf(country: string): Pin[] {
  return load().pins?.[country]?.list ?? NO_PINS
}

/** Whether the reader ever pinned something in this guide (the empty box explains pinning until then). */
export function pinsUsed(country: string): boolean {
  return !!load().pins?.[country]?.used
}

export function setPins(country: string, list: Pin[]) {
  const prefs = load()
  cache = { ...prefs, pins: { ...prefs.pins, [country]: { used: true, list } } }
  save(cache)
  listeners.forEach((l) => l())
}

export function subscribePrefs(cb: () => void) {
  listeners.add(cb)
  const onStorage = (e: StorageEvent) => {
    if (e.key !== PREFS_KEY && e.key !== null) return
    cache = undefined // another tab changed it
    cb()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(cb)
    window.removeEventListener('storage', onStorage)
  }
}
