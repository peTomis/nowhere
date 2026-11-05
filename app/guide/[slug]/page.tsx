import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PlateText } from '@/components/PlateText'
import { getGuide, guides } from '@/data/guides'

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: PageProps<'/guide/[slug]'>): Promise<Metadata> {
  const guide = getGuide((await params).slug)
  return guide ? { title: guide.name, description: guide.summary } : {}
}

export default async function GuidePage({ params }: PageProps<'/guide/[slug]'>) {
  const guide = getGuide((await params).slug)
  if (!guide) notFound()

  return (
    <article className="flex max-w-3xl flex-col gap-4 pt-6">
      <span className="tag tag-accent w-fit">
        {guide.status === 'ready' ? 'Guida pronta' : 'Guida da scrivere'}
      </span>
      <PlateText as="h1" className="text-[64px]">
        {guide.name}
      </PlateText>
      {guide.summary && <p className="text-lg">{guide.summary}</p>}
      <p className="text-muted italic">Contenuto della guida in arrivo.</p>
    </article>
  )
}
