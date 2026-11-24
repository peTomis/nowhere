import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { lang as langParam } from 'next/root-params'
import { Suspense } from 'react'
import { Guide } from '@/components/guide/Guide'
import { guideContent } from '@/content/guides'
import { getGuide, guides } from '@/content/countries'
import { isLocale } from '@/i18n'

/**
 * Every guide in every language it is written in. Cache Components needs at least one param per
 * language: a language with no guide yet prerenders the first slug, which is a 404 there.
 */
export async function generateStaticParams() {
  const lang = await langParam()
  const slugs = Object.entries(guideContent)
    .filter(([slug, byLang]) => getGuide(slug) && isLocale(lang) && byLang[lang])
    .map(([slug]) => ({ slug }))
  return slugs.length > 0 ? slugs : [{ slug: guides[0].slug }]
}

async function contentOf(params: PageProps<'/[lang]/guide/[slug]'>['params']) {
  const { lang, slug } = await params
  return isLocale(lang) && getGuide(slug) ? guideContent[slug]?.[lang] : undefined
}

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/guide/[slug]'>): Promise<Metadata> {
  const content = await contentOf(params)
  return content ? { title: content.names.country, description: content.names.summary } : {}
}

/**
 * Everything depends on `params`, so the whole guide renders inside <Suspense>: the App Shell
 * shared by every guide link stays URL-independent. Guides are prerendered, so the fallback
 * only shows for an instant on client navigation.
 */
export default function GuidePage({ params }: PageProps<'/[lang]/guide/[slug]'>) {
  return (
    <Suspense fallback={<div className="h-svh bg-neutral-300" />}>
      <GuideFromParams params={params} />
    </Suspense>
  )
}

async function GuideFromParams({ params }: Pick<PageProps<'/[lang]/guide/[slug]'>, 'params'>) {
  const { slug } = await params
  const content = await contentOf(params)
  if (!content) notFound()

  return <Guide slug={slug} content={content} />
}
