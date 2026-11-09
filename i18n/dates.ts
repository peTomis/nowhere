import type { Period, Year } from '@/content/types'

/*
 * Italian date formatting for structured periods (content/types.ts), following the guide
 * typography: `1310 ca.`, `XIV sec.`, `I sec. a.C.`, ranges with a spaced en dash (`290 – 895`).
 * Another locale gets its own formatter here; structure never stores a formatted date.
 */

const romans: [number, string][] = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
]

export function roman(n: number): string {
  let out = ''
  for (const [value, symbol] of romans) {
    while (n >= value) {
      out += symbol
      n -= value
    }
  }
  return out
}

export function formatYear(y: Year): string {
  if (typeof y === 'number') return y < 0 ? `${-y} a.C.` : String(y)
  if ('century' in y) {
    const c = `${roman(Math.abs(y.century))} sec.${y.century < 0 ? ' a.C.' : ''}`
    return y.circa ? `${c} ca.` : c
  }
  return `${formatYear(y.year)} ca.`
}

export function formatPeriod(p: Period): string {
  return p.to === undefined ? formatYear(p.from) : `${formatYear(p.from)} – ${formatYear(p.to)}`
}
