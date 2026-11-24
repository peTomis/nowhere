import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Guide } from '@/components/guide/Guide'
import { templateContent } from '@/content/guides'
import { requireLang } from '@/i18n/server'

export const metadata: Metadata = {
  title: 'Template',
  robots: { index: false, follow: false },
}

/**
 * Every element of the guide kit on one page, as a reference for new guides (see
 * content/xx/). Not on the map and not indexed.
 */
export default async function TemplatePage() {
  const content = templateContent[await requireLang()]
  if (!content) notFound()
  return <Guide slug="template" content={content} />
}
