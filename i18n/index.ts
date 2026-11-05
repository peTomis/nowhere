import it from './it.json'

/*
 * UI strings. Italian only for now: `t` is the Italian dictionary, typed from it.json, so a
 * missing or mistyped key fails the typecheck. Works in Server and Client Components alike
 * (the JSON is bundled). Guide text is content, not UI: it stays in content/guides/.
 *
 * Adding a language later: add <locale>.json with the same shape (typed as Messages) and pick
 * the dictionary per request (or move to next-intl if routing per locale is needed).
 */

export type Messages = typeof it

export const locale = 'it'
export const t: Messages = it

/** Fills `{name}` placeholders: format(t.guide.trip.citiesOf, { name: 'Moldavia' }). */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  )
}
