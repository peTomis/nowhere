import { isValidElement, type ReactNode } from 'react'
import { kitKindOf, kitNameOf } from '@/components/guide/content'
import type { GuideContent, Visibility } from '@/content/types'
import type { Issue } from './validate'

/*
 * Translations against the default language (docs/data-model.md §5.5). Each language writes its
 * own body, text and skeleton alike: the text may be restructured freely, the skeleton may not.
 * Per scope (the body before the first section, each section, each card) this compares:
 * - the landmarks, in order: sections, cards, <Today> traces, emblems, images (Figure, MapFigure,
 *   City and Region photos), <Unless> gates. A difference is an error.
 * - the `on` lists used by its blocks, as a set: one missing means a place loses text in that
 *   language. An error.
 * - the number of events: a translation may merge two, so a difference is a warning.
 * Like the validator, it walks the element tree without rendering, expanding the content file's
 * helper components.
 */

type Scope = { landmarks: string[]; on: Set<string>; events: number }

const fmtOn = (on: Visibility) => (on === 'always' ? 'always' : [...on].sort().join(', '))

function skeletonOf(body: ReactNode): Map<string, Scope> {
  const scopes = new Map<string, Scope>()
  const scope = (key: string) => {
    let s = scopes.get(key)
    if (!s) scopes.set(key, (s = { landmarks: [], on: new Set(), events: 0 }))
    return s
  }
  const walk = (node: ReactNode, key: string): void => {
    if (Array.isArray(node)) return node.forEach((n) => walk(n, key))
    if (!isValidElement(node)) return
    const props = node.props as Record<string, unknown> & { children?: ReactNode }
    const type = node.type
    const k = kitKindOf(type)
    const here = scope(key)
    const photo = (p: unknown) =>
      p && typeof p === 'object' && 'src' in p ? `photo ${String(p.src)}` : 'photo none'

    if (k === undefined && typeof type === 'function') {
      // A helper component of the content file: expand it.
      walk((type as (p: unknown) => ReactNode)(props), key)
      return
    }
    if (k === undefined || k === 'container') {
      walk(props.children, key)
      return
    }
    if (k === 'section' || (k === 'timeline' && 'section' in props)) {
      const id = String(props.section)
      here.landmarks.push(`section ${id}`)
      if (props.photo) scope(id).landmarks.push(photo(props.photo))
      walk(props.intro as ReactNode, id)
      walk(props.children, id)
      return
    }
    if (k === 'card') {
      const id = String(props.card)
      here.landmarks.push(`card ${id}`)
      for (const part of ['intro', 'children', 'remember'] as const)
        walk(props[part] as ReactNode, `card ${id}`)
      return
    }
    if (k === 'today') {
      here.landmarks.push(`today ${(props.traces as unknown[]).join(', ')}`)
      return
    }
    if (k === 'unless') here.landmarks.push(`unless ${fmtOn(props.on as Visibility)}`)
    else if (props.on !== undefined) here.on.add(fmtOn(props.on as Visibility))
    if (kitNameOf(type) === 'Emblem') here.landmarks.push(`emblem ${String(props.kind)}`)
    if (k === 'figure') here.landmarks.push(`image ${String(props.src)}`)
    if (k === 'city') here.landmarks.push(`city ${photo(props.photo)}`)
    if (k === 'event') here.events++
    walk(props.children, key)
    for (const part of ['title', 'intro', 'remember'] as const) walk(props[part] as ReactNode, key)
  }
  walk(body, 'body')
  return scopes
}

/** Where `other`'s skeleton differs from `base`'s (the default language). */
export function compareSkeletons(slug: string, base: GuideContent, other: GuideContent): Issue[] {
  const issues: Issue[] = []
  const error = (where: string, message: string) => issues.push({ level: 'error', where, message })
  const warn = (where: string, message: string) => issues.push({ level: 'warning', where, message })
  const a = skeletonOf(base.body)
  const b = skeletonOf(other.body)
  const vs = `${other.lang} vs ${base.lang}`

  for (const key of new Set([...a.keys(), ...b.keys()])) {
    const where = `${slug} (${vs}) › ${key}`
    const x = a.get(key)
    const y = b.get(key)
    if (!x || !y) {
      error(where, `only in ${x ? base.lang : other.lang}`)
      continue
    }
    const n = Math.max(x.landmarks.length, y.landmarks.length)
    for (let i = 0; i < n; i++)
      if (x.landmarks[i] !== y.landmarks[i]) {
        error(
          where,
          `landmark ${i + 1} is "${y.landmarks[i] ?? 'missing'}" in ${other.lang}, "${x.landmarks[i] ?? 'missing'}" in ${base.lang}`,
        )
        break
      }
    const missing = [...x.on].filter((on) => !y.on.has(on))
    const extra = [...y.on].filter((on) => !x.on.has(on))
    if (missing.length) error(where, `no block for on [${missing.join('] [')}] in ${other.lang}`)
    if (extra.length) error(where, `on [${extra.join('] [')}] only in ${other.lang}`)
    if (x.events !== y.events)
      warn(where, `${y.events} events in ${other.lang}, ${x.events} in ${base.lang}`)
  }
  return issues
}
