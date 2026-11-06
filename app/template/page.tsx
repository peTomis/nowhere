import type { Metadata } from 'next'
import { Guide } from '@/components/guide/Guide'
import { name, template } from '@/content/guides/template'

export const metadata: Metadata = {
  title: 'Template',
  robots: { index: false, follow: false },
}

/**
 * Every element of the guide kit on one page, as a reference for new guides (see
 * content/guides/template.tsx). Not on the map and not indexed.
 */
export default function TemplatePage() {
  return <Guide slug="template" name={name} content={template} />
}
