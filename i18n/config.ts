/*
 * Languages of the site (docs/data-model.md §5). Every page lives under `/<lang>/…` (the root
 * layout is `app/[lang]/layout.tsx`); the UI has a dictionary per language (i18n/<lang>.json) and
 * a guide is listed in a language only when it has content in it (content/guides.ts).
 *
 * Adding a language: add it here, add i18n/<lang>.json with the same keys as it.json, a date
 * formatter in i18n/dates.ts and, for the home map's search, public/data/country-names/<lang>.json
 * (`yarn country-names`).
 */

export const LOCALES = ['it', 'en'] as const

export type Locale = (typeof LOCALES)[number]

/** The language every guide is written in first, and of URLs without a language (redirects). */
export const DEFAULT_LOCALE: Locale = 'it'

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
