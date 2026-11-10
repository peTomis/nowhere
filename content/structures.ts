import { structure as ro } from './ro/structure'
import { BUILT_IN_TRACES, builtInTrace, subjectKey, type Subject } from './subjects'
import type { GuideStructure } from './types'
import { structure as xx } from './xx/structure'

/*
 * Every guide's structure by country (ISO 3166-1 alpha-2), without texts or React: what the
 * server needs to check a reader's subject. "xx" is the template guide (/template), so its
 * traces can be tried out too.
 */
export const structures: Record<string, GuideStructure> = { ro, xx }

const known = new Set<string>()
for (const [cc, s] of Object.entries(structures)) {
  for (const kind of BUILT_IN_TRACES) known.add(subjectKey(builtInTrace(cc, kind).subject))
  for (const tr of s.traces ?? []) known.add(subjectKey({ kind: 'place', id: tr.id }))
}

/** Whether a subject is a trace of a guide (the three built-in ones included). */
export const isKnownSubject = (s: Subject) => known.has(subjectKey(s))
