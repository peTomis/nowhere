import type { Metadata, Viewport } from 'next'
import { PrintPlates } from '@/components/PrintPlates'
import { sourceSerif } from '@/app/fonts'
import '@/app/globals.css'
import { LOCALES } from '@/i18n'
import { LangProvider } from '@/i18n/client'
import { getLang, getT } from '@/i18n/server'

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT()
  return {
    title: { default: 'Nowhere', template: '%s — Nowhere' },
    description: t.meta.description,
  }
}

export const viewport: Viewport = {
  themeColor: '#f3f2f2',
}

/**
 * An unknown language (`/xx`) renders in the default one: its pages answer 404 (requireLang), so the
 * 404 page still has this layout around it.
 */
export default async function RootLayout({ children }: LayoutProps<'/[lang]'>) {
  const lang = await getLang()
  return (
    <html lang={lang} className={sourceSerif.variable} data-scroll-behavior="smooth">
      <body className="flex min-h-svh flex-col">
        <LangProvider lang={lang}>
          <PrintPlates />
          {children}
        </LangProvider>
      </body>
    </html>
  )
}
