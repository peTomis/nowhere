import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { isValidElement, type ReactNode } from 'react'
import { kitKindOf, kitNameOf } from '@/components/guide/content'
import { BUILT_IN_TRACES } from '@/content/subjects'
import {
  CHAPTERS,
  type Credit,
  type GuideContent,
  type SectionDef,
  type Visibility,
  type Year,
} from '@/content/types'

/*
 * Content validation (docs/data-model.md §8). It walks a guide's element tree without rendering
 * it: kit components are recognised through kitKindOf(), helper components of the content file
 * (e.g. BoyarsContext) are called with their props, so they must be pure functions (no hooks).
 *
 * Errors fail the build: <Guide> calls assertValidGuide() and every guide is prerendered.
 * `yarn validate` runs the same checks from the command line. Fix the content, never the checks.
 */

export type Issue = { level: 'error' | 'warning'; where: string; message: string }

type Range = [number, number]

/** Earliest and latest year a structured Year covers. */
function rangeOfYear(y: Year): Range {
  if (typeof y === 'number') return [y, y]
  if ('century' in y) {
    const c = y.century
    return c > 0 ? [(c - 1) * 100 + 1, c * 100] : [c * 100, (c + 1) * 100 - 1]
  }
  return [y.year, y.year]
}

const romanValue = (r: string) => {
  const v: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100 }
  let n = 0
  for (let i = 0; i < r.length; i++) {
    const cur = v[r[i]]
    const next = v[r[i + 1]] ?? 0
    n += cur < next ? -cur : cur
  }
  return n
}

/** Years covered by an event date. `fuzzy`: given as a century, so only roughly placed. */
export type EventYears = { from: number; to: number; fuzzy: boolean }

/**
 * Years covered by an Italian event date ("1608–1613", "1003 ca.", "XIV sec.", "I sec. a.C.",
 * "1711 e 1716", "Dopo il 1711"). Undefined when nothing can be read.
 */
export function parseItalianDate(s: string): EventYears | undefined {
  const years: number[] = []
  let fuzzy = false
  const centuries = /\b([IVXLC]+)\s+sec(?:\.|olo)(\s+a\.C\.)?/g
  for (const m of s.matchAll(centuries)) {
    const c = romanValue(m[1]) * (m[2] ? -1 : 1)
    fuzzy = true
    years.push(...rangeOfYear({ century: c }))
  }
  const rest = s.replace(centuries, ' ')
  for (const m of rest.matchAll(/\b(\d{1,4})(\s+a\.C\.)?/g)) {
    years.push(Number(m[1]) * (m[2] ? -1 : 1))
  }
  return years.length ? { from: Math.min(...years), to: Math.max(...years), fuzzy } : undefined
}

const fmt = (on: Visibility) => (on === 'always' ? "'always'" : `[${on.join(', ')}]`)

export function validateGuide(slug: string, content: GuideContent): Issue[] {
  const { structure, names } = content
  const cc = structure.country
  const issues: Issue[] = []
  const error = (where: string, message: string) => issues.push({ level: 'error', where, message })
  const warn = (where: string, message: string) => issues.push({ level: 'warning', where, message })

  // --- structure and names ---------------------------------------------------------------------
  const regionOf = new Map<string, string>()
  const placeIds = new Set<string>()
  const addId = (id: string, what: string, seen: Set<string>) => {
    if (seen.has(id)) error(what, `duplicate id ${id}`)
    seen.add(id)
    if (!id.startsWith(`${cc}.`)) error(what, `id ${id} must start with "${cc}."`)
    if (!/^[a-z]{2}(\.[a-z0-9]+(-[a-z0-9]+)*)+$/.test(id))
      error(what, `id ${id} is not lowercase ASCII kebab-case segments`)
  }
  for (const r of structure.regions) {
    addId(r.id, 'regions', placeIds)
    for (const c of r.cities) {
      addId(c, `regions › ${r.id}`, placeIds)
      regionOf.set(c, r.id)
    }
  }
  for (const id of placeIds)
    if (!names.places[id as keyof typeof names.places]?.trim())
      error('names', `no name for place ${id}`)

  const sectionIds = new Set<string>()
  const sectionById = new Map<string, SectionDef>()
  for (const s of structure.sections) {
    addId(s.id, 'sections', sectionIds)
    if (!s.id.startsWith(`${cc}.section.`))
      error('sections', `${s.id} must start with "${cc}.section."`)
    sectionById.set(s.id, s)
    if (!names.sections[s.id as keyof typeof names.sections]?.trim())
      error('names', `no title for section ${s.id}`)
    if (s.on !== 'always')
      for (const p of s.on) if (!placeIds.has(p)) error(`sections › ${s.id}`, `unknown place ${p}`)
    if (s.period?.to !== undefined && rangeOfYear(s.period.from)[0] > rangeOfYear(s.period.to)[1])
      error(`sections › ${s.id}`, 'period ends before it starts')
    if (s.level === 1 && !s.chapter)
      error(`sections › ${s.id}`, `a chapter must say which one it is (${CHAPTERS.join(', ')})`)
    if (s.level !== 1 && s.chapter) error(`sections › ${s.id}`, 'only a chapter has `chapter`')
  }
  // The six chapters: each at most once, in their fixed order (their numbers come from it).
  const chapters = structure.sections.flatMap((s) => (s.chapter ? [s.chapter] : []))
  for (const c of new Set(chapters))
    if (chapters.indexOf(c) !== chapters.lastIndexOf(c))
      error('sections', `chapter "${c}" used twice`)
  if (chapters.some((c, i) => i > 0 && CHAPTERS.indexOf(c) < CHAPTERS.indexOf(chapters[i - 1])))
    error('sections', `chapters must follow the order ${CHAPTERS.join(', ')}`)

  const traceIds = new Set<string>()
  for (const tr of structure.traces ?? []) {
    addId(tr.id, 'traces', traceIds)
    if (!tr.id.startsWith(`${cc}.place.`))
      error('traces', `${tr.id} must start with "${cc}.place."`)
    if (regionOf.has(tr.region) || !placeIds.has(tr.region))
      error(`traces › ${tr.id}`, `${tr.region} is not a region`)
    if (tr.city !== undefined && regionOf.get(tr.city) !== tr.region)
      error(`traces › ${tr.id}`, `${tr.city} is not a city of ${tr.region}`)
    if (tr.where === 'city' && tr.city === undefined)
      error(`traces › ${tr.id}`, `where: 'city' needs a city`)
    if (BUILT_IN_TRACES.some((b) => tr.id === `${cc}.place.${b}`))
      error(`traces › ${tr.id}`, 'reserved: the kit adds this trace to every album')
    const text = names.traces?.[tr.id]
    if (!text) error('names', `no texts for trace ${tr.id}`)
    else
      for (const key of ['name', 'place', 'find'] as const)
        if (!text[key]?.trim()) error('names', `trace ${tr.id} has no ${key}`)
  }

  const cardIds = new Set<string>()
  for (const c of structure.cards ?? []) {
    addId(c.id, 'cards', cardIds)
    if (c.kind === 'person' && !c.id.startsWith(`${cc}.person.`))
      error('cards', `${c.id} must start with "${cc}.person."`)
    if (c.kind === 'city' && regionOf.get(c.id) !== c.region)
      error(`cards › ${c.id}`, `a city card's id must be a city of ${c.region}`)
    if (regionOf.has(c.region) || !placeIds.has(c.region))
      error(`cards › ${c.id}`, `${c.region} is not a region`)
    if (c.traces.length === 0) error(`cards › ${c.id}`, 'no traces')
    for (const id of c.traces)
      if (!traceIds.has(id)) error(`cards › ${c.id}`, `unknown trace ${id}`)
    if (!names.cards?.[c.id]?.name.trim()) error('names', `no name for card ${c.id}`)
  }

  // --- body walk -------------------------------------------------------------------------------
  /** Whether every place of `child` is shown only when `parent` is (a city counts as its region). */
  const within = (child: Visibility, parent: Visibility) => {
    if (parent === 'always') return true
    if (child === 'always') return true // no further restriction: shown exactly when the parent is
    return child.every((p) => parent.includes(p) || parent.includes(regionOf.get(p) ?? ''))
  }
  const checkOn = (on: unknown, where: string): Visibility | undefined => {
    if (on === 'always') return on
    if (!Array.isArray(on) || on.length === 0) {
      error(where, `missing or empty \`on\``)
      return undefined
    }
    for (const p of on) if (!placeIds.has(p)) error(where, `unknown place ${String(p)}`)
    return on as string[]
  }
  const publicFile = (src: string) => existsSync(join(process.cwd(), 'public', src))
  const checkImage = (src: unknown, credit: Credit | undefined, where: string) => {
    if (typeof src !== 'string' || !publicFile(src)) return
    if (!credit) error(where, `image ${src} has no credit (author and licence)`)
    else if ('unverified' in credit)
      warn(where, `image ${src}: credit to verify (${credit.unverified})`)
    else if (!credit.author.trim() || !credit.license.trim())
      error(where, `image ${src}: credit needs both author and licence`)
  }

  const order: string[] = []
  const anchors = new Set<string>()
  const cardsUsed = new Set<string>()
  /** Events' years, per section with a period. */
  const eventYears = new Map<string, EventYears[]>()

  type Ctx = { on: Visibility; path: string; sections: string[] }

  const walk = (node: ReactNode, ctx: Ctx): void => {
    if (
      node == null ||
      typeof node === 'boolean' ||
      typeof node === 'string' ||
      typeof node === 'number'
    )
      return
    if (Array.isArray(node)) return node.forEach((n) => walk(n, ctx))
    if (!isValidElement(node)) return
    const props = node.props as Record<string, unknown> & { children?: ReactNode }
    const type = node.type
    const k = kitKindOf(type)
    const name =
      kitNameOf(type) ??
      (typeof type === 'string' ? type : (type as { name?: string }).name || 'helper')
    const here = `${ctx.path} › ${name}`

    const inner = (on: Visibility, extra: Partial<Ctx> = {}) => {
      const next = { ...ctx, on: on === 'always' ? ctx.on : on, path: here, ...extra }
      walk(props.children, next)
      for (const key of ['title', 'intro', 'remember'] as const) walk(props[key] as ReactNode, next)
    }
    const gate = (where = here) => {
      const on = checkOn(props.on, where)
      if (!on) return undefined
      if (!within(on, ctx.on))
        error(where, `on ${fmt(on)} is not within its parent's ${fmt(ctx.on)}`)
      return on
    }

    if (k === 'container' || (k === undefined && typeof type !== 'function')) {
      walk(props.children, { ...ctx, path: typeof type === 'string' ? ctx.path : here })
      return
    }
    if (k === undefined) {
      // A helper component of the content file: expand it.
      walk((type as (p: unknown) => ReactNode)(props), { ...ctx, path: here })
      return
    }
    if (k === 'unless') {
      checkOn(props.on, here)
      walk(props.children, { ...ctx, path: here })
      return
    }
    if (k === 'section' || (k === 'timeline' && 'section' in props)) {
      const id = String(props.section)
      const def = sectionById.get(id)
      const where = `${ctx.path} › ${name} ${id}`
      if (!def) {
        error(where, `unknown section ${id}`)
        return
      }
      order.push(id)
      if (anchors.has(id)) error(where, `section used twice`)
      anchors.add(id)
      if (!within(def.on, ctx.on))
        error(where, `on ${fmt(def.on)} is not within its parent's ${fmt(ctx.on)}`)
      if (props.photo && typeof props.photo === 'object') {
        const photo = props.photo as { src?: string; credit?: Credit }
        checkImage(photo.src, photo.credit, where)
      }
      const sections = def.period ? [...ctx.sections, id] : ctx.sections
      const next = { ...ctx, on: def.on === 'always' ? ctx.on : def.on, path: where, sections }
      walk(props.children, next)
      walk(props.intro as ReactNode, next)
      return
    }
    if (k === 'today') {
      const list = Array.isArray(props.traces) ? (props.traces as unknown[]) : []
      if (list.length === 0 || list.length > 2) error(here, 'traces: one or two trace ids')
      for (const id of list)
        if (!traceIds.has(String(id))) error(here, `unknown trace ${String(id)}`)
      return
    }
    const on = gate()
    if (!on) return
    if (k === 'card') {
      const id = String(props.card)
      if (!cardIds.has(id)) error(here, `unknown card ${id}`)
      else if (cardsUsed.has(id)) error(here, `card ${id} used twice`)
      cardsUsed.add(id)
    }
    if (k === 'event' && props.date != null) {
      if (typeof props.date !== 'string') warn(here, 'date is not plain text: not checked')
      else {
        const r = parseItalianDate(props.date)
        if (!r) error(here, `date "${props.date}" cannot be read`)
        else for (const s of ctx.sections) eventYears.set(s, [...(eventYears.get(s) ?? []), r])
      }
    }
    if (k === 'figure') checkImage(props.src, props.credit as Credit | undefined, here)
    if (k === 'city' && props.photo && typeof props.photo === 'object') {
      const photo = props.photo as { src?: string; credit?: Credit }
      checkImage(photo.src, photo.credit, here)
    }
    inner(on)
  }

  walk(content.body, { on: 'always', path: slug, sections: [] })
  for (const id of cardIds) if (!cardsUsed.has(id)) error('body', `card ${id} is not in the body`)

  // --- sections: all used, in order, dates matching their events --------------------------------
  const expected = structure.sections.map((s) => s.id)
  for (const id of expected)
    if (!order.includes(id)) error('body', `section ${id} is not in the body`)
  const used = expected.filter((id) => order.includes(id))
  if (used.join() !== order.filter((id) => expected.includes(id)).join())
    error(
      'body',
      'sections appear in a different order than in structure.ts (numbers come from it)',
    )

  for (const s of structure.sections) {
    if (!s.period) continue
    const where = `sections › ${s.id}`
    // A known mismatch being checked (like a `TODO verificare`): reported, not failing.
    const report = (message: string) =>
      s.verify ? warn(where, `${message} — to verify: ${s.verify}`) : error(where, message)
    const years = eventYears.get(s.id) ?? []
    if (years.length === 0) {
      report('has a period but contains no dated events')
      continue
    }
    const [f0, f1] = rangeOfYear(s.period.from)
    const [t0, t1] = rangeOfYear(s.period.to ?? s.period.from)
    const overlaps = (e: EventYears, a: number, b: number) => e.from <= b && e.to >= a
    const exact = years.filter((e) => !e.fuzzy)
    const first = years.reduce((a, b) => (b.from < a.from ? b : a))
    const last = years.reduce((a, b) => (b.to > a.to ? b : a))
    // The first and last events give the period (D3); exact years may not fall outside it, and
    // century dates only need to touch it.
    if (!overlaps(first, f0, f1) || exact.some((e) => e.from < f0))
      report(`period starts at ${fmtYear(s.period.from)}, its first event at ${first.from}`)
    if (!overlaps(last, t0, t1) || exact.some((e) => e.to > t1))
      report(
        `period ends at ${fmtYear(s.period.to ?? s.period.from)}, its last event at ${Math.max(...exact.map((e) => e.to), last.fuzzy ? -Infinity : last.to)}`,
      )
    for (const e of years.filter((e) => e.fuzzy && !overlaps(e, f0, t1)))
      report(`an event (${e.from}–${e.to}) falls outside the period`)
  }

  // Contiguous chapters, and contiguous parts of a chapter, must not overlap.
  for (const level of [1, 2] as const) {
    let prev: SectionDef | undefined
    for (const s of structure.sections) {
      if (s.level < level) prev = undefined
      if (s.level !== level) continue
      if (prev?.period && s.period) {
        const prevEnd = rangeOfYear(prev.period.to ?? prev.period.from)[1]
        const start = rangeOfYear(s.period.from)[0]
        if (prevEnd > start) error(`sections › ${s.id}`, `overlaps ${prev.id}`)
      }
      prev = s
    }
  }

  // --- images outside the body ----------------------------------------------------------------
  if (content.cover) checkImage(content.cover.src, content.cover.credit, 'cover')
  for (const e of content.emblems ?? []) checkImage(e.src, e.credit, `emblems › ${e.kind}`)

  return issues
}

const fmtYear = (y: Year) => (typeof y === 'number' ? String(y) : JSON.stringify(y))

const results = new WeakMap<object, Issue[]>()

export function formatIssues(issues: Issue[]): string {
  return issues
    .map((i) => `  ${i.level === 'error' ? '✗' : '!'} ${i.where}: ${i.message}`)
    .join('\n')
}

/** Throws on errors (failing the build or showing the dev overlay); logs warnings once. */
/**
 * Throws on errors (failing the build or showing the dev overlay); logs warnings once. The result
 * is cached per content object, and errors are thrown on every call: Next may render a page more
 * than once, and every render must fail.
 */
export function assertValidGuide(slug: string, content: GuideContent) {
  let issues = results.get(content)
  if (!issues) {
    issues = validateGuide(slug, content)
    results.set(content, issues)
    const warnings = issues.filter((i) => i.level === 'warning')
    if (warnings.length)
      console.warn(`Guide "${slug}": ${warnings.length} warning(s)\n${formatIssues(warnings)}`)
  }
  const errors = issues.filter((i) => i.level === 'error')
  if (errors.length)
    throw new Error(
      `Guide "${slug}" has ${errors.length} content error(s) (docs/data-model.md §8):\n${formatIssues(errors)}`,
    )
}
