import type { Metadata } from 'next'
import { PrintPlates } from '@/components/PrintPlates'
import { NotFoundView } from '@/components/NotFoundView'
import { sourceSerif } from '@/app/fonts'
import '@/app/globals.css'
import { DEFAULT_LOCALE } from '@/i18n'
import { LangProvider } from '@/i18n/client'

export const metadata: Metadata = { title: '404 — Nowhere' }

/**
 * The 404 of URLs outside app/[lang]/ (an unknown language, a mistyped path): a whole document,
 * since it renders without the root layout, in the default language (no `lang` param here).
 */
export default function GlobalNotFound() {
  return (
    <html lang={DEFAULT_LOCALE} className={sourceSerif.variable}>
      <body className="flex min-h-svh flex-col">
        <LangProvider lang={DEFAULT_LOCALE}>
          <PrintPlates />
          <NotFoundView />
        </LangProvider>
      </body>
    </html>
  )
}
