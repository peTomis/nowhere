import { notFound } from 'next/navigation'
import { lang } from 'next/root-params'
import { DEFAULT_LOCALE, isLocale, messages, type Locale, type Messages } from '.'

/*
 * The language of the current page, for Server Components at any depth: `lang` is the root
 * parameter of app/[lang]/layout.tsx, so it is read without passing props down. Not available in
 * Route Handlers or Server Actions (pass the language explicitly there), nor in
 * app/global-not-found.tsx, which gets the default language.
 */

export async function getLang(): Promise<Locale> {
  const value = await lang()
  return isLocale(value) ? value : DEFAULT_LOCALE
}

/**
 * The page's language, or a 404 when the first segment of the URL is not one (`/xx`). Pages call
 * it, not the root layout: a 404 thrown by the layout would have no layout to render in.
 */
export async function requireLang(): Promise<Locale> {
  const value = await lang()
  if (!isLocale(value)) notFound()
  return value
}

/** The UI dictionary of the current page. */
export async function getT(): Promise<Messages> {
  return messages(await getLang())
}
