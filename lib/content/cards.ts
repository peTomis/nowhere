import 'server-only'
import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
import { kitKindOf } from '@/components/guide/content'

/*
 * The copies of a guide's cards for "In evidenza": each <Card> of the body, found the way the
 * validator walks it (helper components of the content file are expanded), cloned with prefixed
 * ids, no heading (the box has its own) and no trip gate (a pinned card stays, marked
 * "Fuori dal viaggio").
 */
export function cardCopies(body: ReactNode, prefix = 'ev-'): Record<string, ReactNode> {
  const out: Record<string, ReactNode> = {}
  const walk = (node: ReactNode): void => {
    if (Array.isArray(node)) return node.forEach(walk)
    if (!isValidElement(node)) return
    const el = node as ReactElement<Record<string, unknown> & { children?: ReactNode }>
    const k = kitKindOf(el.type)
    if (k === 'card') {
      const id = String(el.props.card)
      out[id] = cloneElement(el, { key: id, idPrefix: prefix, heading: false, on: 'always' })
      return
    }
    if (k === undefined && typeof el.type === 'function') {
      walk((el.type as (p: unknown) => ReactNode)(el.props))
      return
    }
    walk(el.props.children)
    if (k === 'section' || k === 'city') walk(el.props.intro as ReactNode)
  }
  walk(body)
  return out
}
