import type { Period, Year } from '@/content/types'
import type { Locale } from './config'

/*
 * Date formatting for structured periods (content/types.ts), one formatter per language,
 * following each language's guide typography. Italian: `1310 ca.`, `XIV sec.`, `I sec. a.C.`;
 * English: `c. 1310`, `14th c.`, `1st c. BC`. Ranges take a spaced en dash (`290 – 895`).
 * Structure never stores a formatted date.
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

const ordinal = (n: number) => {
  const tens = n % 100
  if (tens >= 11 && tens <= 13) return `${n}th`
  return `${n}${['th', 'st', 'nd', 'rd'][n % 10] ?? 'th'}`
}

const years: Record<Locale, (y: Year) => string> = {
  it: function it(y): string {
    if (typeof y === 'number') return y < 0 ? `${-y} a.C.` : String(y)
    if ('century' in y) {
      const c = `${roman(Math.abs(y.century))} sec.${y.century < 0 ? ' a.C.' : ''}`
      return y.circa ? `${c} ca.` : c
    }
    return `${it(y.year)} ca.`
  },
  en: function en(y): string {
    if (typeof y === 'number') return y < 0 ? `${-y} BC` : String(y)
    if ('century' in y) {
      const c = `${ordinal(Math.abs(y.century))} c.${y.century < 0 ? ' BC' : ''}`
      return y.circa ? `c. ${c}` : c
    }
    return `c. ${en(y.year)}`
  },
}

export const formatYear = (y: Year, lang: Locale): string => years[lang](y)

export function formatPeriod(p: Period, lang: Locale): string {
  return p.to === undefined
    ? formatYear(p.from, lang)
    : `${formatYear(p.from, lang)} – ${formatYear(p.to, lang)}`
}
