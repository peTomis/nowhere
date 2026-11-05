import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { GuideCover } from '@/components/guide/GuideCover'
import { GuideFooter } from '@/components/guide/GuideFooter'
import { GuideShell } from '@/components/guide/GuideShell'
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
      <Guide params={params} />
    </Suspense>
  )
}

async function Guide({ params }: Pick<PageProps<'/guide/[slug]'>, 'params'>) {
  const { slug } = await params
  const guide = getGuide(slug)
  const content = guideContent[slug]
  if (!guide || !content) notFound()

  return (
    <>
      <GuideCover
        name={guide.name}
        cover={content.cover}
        emblems={content.emblems}
        ink={content.coverInk}
      />
      <GuideShell slug={slug} country={guide.name} places={content.places} toc={content.toc}>
        {content.body}
      </GuideShell>
      <GuideFooter name={guide.name} emblems={content.emblems} toc={content.toc} />
    </>
  )
}
