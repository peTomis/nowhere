import type { Metadata, Viewport } from 'next'
import { Source_Serif_4 } from 'next/font/google'
import { PrintPlates } from '@/components/PrintPlates'
import './globals.css'
import { locale, t } from '@/i18n'

const sourceSerif = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: { default: 'Nowhere', template: '%s — Nowhere' },
  description: t.meta.description,
}

export const viewport: Viewport = {
  themeColor: '#f3f2f2',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang={locale} className={sourceSerif.variable} data-scroll-behavior="smooth">
      <body className="flex min-h-svh flex-col">
        <PrintPlates />
        {children}
      </body>
    </html>
  )
}
