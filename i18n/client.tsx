'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { DEFAULT_LOCALE, messages, type Locale, type Messages } from '.'

/*
 * The page's language for Client Components, set once by the root layout. Hooks only: code
 * outside a component (event handlers excepted) takes the language or the dictionary as an
 * argument.
 */

const LangContext = createContext<Locale>(DEFAULT_LOCALE)

export function LangProvider({ lang, children }: { lang: Locale; children: ReactNode }) {
  return <LangContext value={lang}>{children}</LangContext>
}

export const useLang = (): Locale => useContext(LangContext)

export const useT = (): Messages => messages(useLang())
