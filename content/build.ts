import { formatPeriod } from '@/i18n/dates'
import {
  RARITY_POINTS,
  type GuideNames,
  type GuideStructure,
  type Place,
  type Rarity,
  type TocEntry,
  type TraceWhere,
} from './types'

/** Trip filter entries (regions with their cities) from the structure and a locale's names. */
export function placesOf<P extends string, S extends string>(
  structure: GuideStructure<P, S>,
  names: GuideNames<P, S>,
): Place<P>[] {
  return structure.regions.map((r) => ({
    id: r.id,
    name: names.places[r.id],
    cities: r.cities.map((c) => ({ id: c, name: names.places[c] })),
  }))
}

/** The index, from the sections. Chapters show their period in the body only, not in the index. */
export function tocOf<P extends string, S extends string>(
  structure: GuideStructure<P, S>,
  names: GuideNames<P, S>,
): TocEntry<P>[] {
  return structure.sections.map((s) => ({
    id: s.id,
    label: names.sections[s.id],
    level: s.level,
    dates: s.level > 1 && s.period ? formatPeriod(s.period) : undefined,
    on: s.on,
  }))
}

/** A trace as the album shows it: plain data, passed to client components. */
export type AlbumTrace = {
  id: string
  /** Position in the album, from 1. */
  num: number
  name: string
  region: string
  /** City name when the trace is in a city. */
  city?: string
  where: TraceWhere
  rarity: Rarity
  points: number
  isNew: boolean
}

/** The album's traces, from the structure and a locale's names. */
export function tracesOf<P extends string, S extends string>(
  structure: GuideStructure<P, S>,
  names: GuideNames<P, S>,
): AlbumTrace[] {
  return (structure.traces ?? []).map((tr, i) => ({
    id: tr.id,
    num: i + 1,
    name: names.traces?.[tr.id] ?? tr.id,
    region: tr.region,
    city: tr.city && names.places[tr.city],
    where: tr.where,
    rarity: tr.rarity,
    points: RARITY_POINTS[tr.rarity],
    isNew: !!tr.isNew,
  }))
}
