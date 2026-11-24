/*
 * What a reader's photo or note is about (docs/data-model.md §3.1): a country (its cover), a
 * place (a trace) or one of the reader's personal traces of a country. Shared by the server, which checks every subject against the content, and the
 * browser, which keys the reader's collection by `subjectKey`. No React here.
 */

export type Subject =
  { kind: 'country'; id: string } | { kind: 'place'; id: string } | { kind: 'personal'; id: string }

/** One string per subject: 'country:ro', 'place:ro.place.flag'. */
export const subjectKey = (s: Subject) => `${s.kind}:${s.id}`

/**
 * The three traces every album opens with (numbers 01–03), whatever the guide: the cover (01),
 * the flag (02) and the coat of arms (03). The order is fixed: never change it. The cover is the country's cover photo (subject `country`, the one
 * that lights the country on the map); the others are places with reserved slugs.
 */
export const BUILT_IN_TRACES = ['cover', 'flag', 'coat-of-arms'] as const
export type BuiltInTrace = (typeof BUILT_IN_TRACES)[number]

/** Trace id and subject of a built-in trace of country `cc` (ISO 3166-1 alpha-2). */
export function builtInTrace(cc: string, kind: BuiltInTrace): { id: string; subject: Subject } {
  if (kind === 'cover') return { id: `${cc}.cover`, subject: { kind: 'country', id: cc } }
  const id = `${cc}.place.${kind}`
  return { id, subject: { kind: 'place', id } }
}

/**
 * How many personal traces a reader can write per country: traces the guide doesn't know, chosen
 * and written by the reader (title, place, text, photo), at the end of the album. They are not
 * scored: the completion counts only the guide's traces.
 */
export const PERSONAL_SLOTS = 3

/** Subject of the personal trace `n` (1–PERSONAL_SLOTS) of country `cc`: `eg.personal.1`. */
export const personalTrace = (cc: string, n: number): Subject => ({
  kind: 'personal',
  id: `${cc}.personal.${n}`,
})

/** Country of a subject: the prefix of a place id, or the country itself. */
export const countryOf = (s: Subject) => (s.kind === 'country' ? s.id : s.id.split('.')[0])
