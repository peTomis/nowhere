import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Guide } from '@/components/guide/Guide'
import { guideContent } from '@/content/guides'
import { getGuide, guides } from '@/data/guides'

export function generateStaticParams() {
  return guides.filter((g) => guideContent[g.slug]).map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: PageProps<'/guide/[slug]'>): Promise<Metadata> {
  const guide = getGuide((await params).slug)
  return guide ? { title: guide.name, description: guide.summary } : {}
}

/**
 * Everything depends on `params`, so the whole guide renders inside <Suspense>: the App Shell
 * shared by every guide link stays URL-independent. Guides are prerendered, so the fallback
 * only shows for an instant on client navigation.
 */
export default function GuidePage({ params }: PageProps<'/guide/[slug]'>) {
  return (
    <Suspense fallback={<div className="h-svh bg-neutral-300" />}>
      <GuideFromParams params={params} />
    </Suspense>
  )
}

async function GuideFromParams({ params }: Pick<PageProps<'/guide/[slug]'>, 'params'>) {
  const { slug } = await params
  const guide = getGuide(slug)
  const content = guideContent[slug]
  if (!guide || !content) notFound()

  return <Guide slug={slug} name={guide.name} content={content} />
}
