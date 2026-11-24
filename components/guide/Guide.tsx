import { ChapterSummary } from '@/components/guide/ChapterSummary'
import { GuideAlbumIntro } from '@/components/guide/GuideAlbumIntro'
import { GuideCover } from '@/components/guide/GuideCover'
import { GuideOutro } from '@/components/guide/GuideOutro'
import { GuideShell } from '@/components/guide/GuideShell'
import { SOURCES_ID, Sources } from '@/components/guide/Sources'
import { SiteFooter } from '@/components/SiteFooter'
import {
  cardsOf,
  chaptersOf,
  imagesOf,
  placesOf,
  sourcesOf,
  tocOf,
  tracesOf,
} from '@/content/build'
import { guides } from '@/content/countries'
import type { GuideContent } from '@/content/types'
import { cardCopies } from '@/lib/content/cards'
import { messages } from '@/i18n'
import { assertValidGuide } from '@/lib/content/validate'

type GuideProps = {
  /** Names the guide in content errors. */
  slug: string
  /** The guide in the page's language. */
  content: GuideContent
  /** The guide in the default language: a translation's skeleton must match it. */
  base?: GuideContent
}

/**
 * A whole guide page: cover, album opening, index + content (with the account button), ending
 * with the sources, or the album (with its map), closing section, footer. Every text comes from
 * `content` (its `lang`) and the UI dictionary of the same language.
 */
export function Guide({ slug, content, base }: GuideProps) {
  // Content errors fail the build (every guide is prerendered) and show in the dev overlay.
  assertValidGuide(slug, content, base)
  const { lang, structure, names } = content
  const t = messages(lang)
  const name = names.country
  const { cover, emblems } = imagesOf(content)
  const places = placesOf(structure, names)
  const sources = sourcesOf(structure, names, content.sources, lang)
  // "Fonti" closes the text and the index.
  const toc = [
    ...tocOf(structure, names, lang),
    ...(sources.length > 0
      ? [
          {
            id: SOURCES_ID,
            label: t.guide.sources.heading,
            level: 1 as const,
            on: 'always' as const,
          },
        ]
      : []),
  ]
  const traces = tracesOf(content)
  const cards = cardsOf(structure, names)
  // What the completions outside the shell need (keeps the page's payload small).
  const scored = traces.map(({ key, points }) => ({ key, points }))
  return (
    <>
      <GuideCover
        country={structure.country}
        name={name}
        cover={cover}
        emblems={emblems}
        ink={structure.coverInk}
        traces={scored}
      />
      <GuideAlbumIntro name={name} traces={traces} scored={scored} />
      <GuideShell
        countryId={structure.country}
        numeric={guides.find((g) => g.id === structure.country)?.numeric}
        country={name}
        places={places}
        toc={toc}
        traces={traces}
        cards={cards}
        copies={cardCopies(content.body)}
        summary={<ChapterSummary chapters={chaptersOf(structure, names, lang)} />}
        sources={<Sources name={name} chapters={sources} />}
      >
        {content.body}
      </GuideShell>
      <GuideOutro name={name} emblems={emblems} />
      <SiteFooter />
    </>
  )
}
