import { formatPeriod } from '@/i18n/dates'
import type { GuideNames, GuideStructure, Place, TocEntry } from './types'

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
