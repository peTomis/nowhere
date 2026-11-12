import { ChapterSummary } from '@/components/guide/ChapterSummary'
import { GuideAlbumIntro } from '@/components/guide/GuideAlbumIntro'
import { GuideCover } from '@/components/guide/GuideCover'
import { GuideOutro } from '@/components/guide/GuideOutro'
import { GuideShell } from '@/components/guide/GuideShell'
import { SOURCES_ID, Sources } from '@/components/guide/Sources'
import { SiteFooter } from '@/components/SiteFooter'
import { cardsOf, chaptersOf, placesOf, sourcesOf, tocOf, tracesOf } from '@/content/build'
import { guides } from '@/content/countries'
import type { GuideContent } from '@/content/types'
import { cardCopies } from '@/lib/content/cards'
import { t } from '@/i18n'
import { assertValidGuide } from '@/lib/content/validate'

type GuideProps = {
  /** Names the guide in content errors. */
  slug: string
  name: string
  content: GuideContent
}

/**
 * A whole guide page: cover, album opening, index + content (with the account button), ending
 * with the sources, or the album (with its map), closing section, footer.
 */
export function Guide({ slug, name, content }: GuideProps) {
  // Content errors fail the build (every guide is prerendered) and show in the dev overlay.
  assertValidGuide(slug, content)
  const places = placesOf(content.structure, content.names)
  const sources = sourcesOf(content.structure, content.names, content.sources)
  // "Fonti" closes the text and the index.
  const toc = [
    ...tocOf(content.structure, content.names),
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
  const traces = tracesOf(content, name)
  const cards = cardsOf(content.structure, content.names)
  // What the completions outside the shell need (keeps the page's payload small).
  const scored = traces.map(({ key, points }) => ({ key, points }))
  return (
    <>
      <GuideCover
        name={name}
        cover={content.cover}
        emblems={content.emblems}
        ink={content.coverInk}
        traces={scored}
      />
      <GuideAlbumIntro name={name} traces={traces} scored={scored} />
      <GuideShell
        countryId={content.structure.country}
        numeric={guides.find((g) => g.id === content.structure.country)?.numeric}
        country={name}
        places={places}
        toc={toc}
        traces={traces}
        cards={cards}
        copies={cardCopies(content.body)}
        summary={<ChapterSummary chapters={chaptersOf(content.structure, content.names)} />}
        sources={<Sources name={name} chapters={sources} />}
      >
        {content.body}
      </GuideShell>
      <GuideOutro name={name} emblems={content.emblems} />
      <SiteFooter />
    </>
  )
}
