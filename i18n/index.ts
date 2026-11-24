import { DEFAULT_LOCALE, type Locale } from './config'
import en from './en.json'
import it from './it.json'

/*
 * UI strings, one dictionary per language, typed from it.json: a key missing in another language
 * or mistyped fails the typecheck. Guide text is content, not UI: it stays in content/<cc>/<lang>/.
 *
 * Where to get the dictionary:
 * - Server Components: `const t = await getT()` (i18n/server.ts, the language of the URL).
 * - Client Components: `const t = useT()` (i18n/client.tsx, from the root layout's provider).
 * - Route Handlers and code outside a page: `messages(lang)` with an explicit language.
 */

export * from './config'

export type Messages = typeof it

const dictionaries: Record<Locale, Messages> = { it, en }

export const messages = (lang: Locale): Messages =>
  dictionaries[lang] ?? dictionaries[DEFAULT_LOCALE]

/** Fills `{name}` placeholders: format(t.guide.trip.citiesOf, { name: 'Moldavia' }). */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  )
}

/** Internal paths, always with the language first. */
export const paths = {
  home: (lang: Locale) => `/${lang}`,
  guide: (lang: Locale, slug: string) => `/${lang}/guide/${slug}`,
  account: (lang: Locale) => `/${lang}/account`,
}
