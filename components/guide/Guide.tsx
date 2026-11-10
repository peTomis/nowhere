import { GuideAlbumIntro } from '@/components/guide/GuideAlbumIntro'
import { GuideCover } from '@/components/guide/GuideCover'
import { GuideOutro } from '@/components/guide/GuideOutro'
import { GuideShell } from '@/components/guide/GuideShell'
import { SiteFooter } from '@/components/SiteFooter'
import { placesOf, tocOf, tracesOf } from '@/content/build'
import type { GuideContent } from '@/content/types'
import { assertValidGuide } from '@/lib/content/validate'

type GuideProps = {
  /** Names the guide in content errors. */
  slug: string
  name: string
  content: GuideContent
}

/**
 * A whole guide page: cover, album opening, index + content (with the account button), closing
 * section, footer.
 */
export function Guide({ slug, name, content }: GuideProps) {
  // Content errors fail the build (every guide is prerendered) and show in the dev overlay.
  assertValidGuide(slug, content)
  const places = placesOf(content.structure, content.names)
  const toc = tocOf(content.structure, content.names)
  const traces = tracesOf(content.structure, content.names)
  return (
    <>
      <GuideCover
        countryId={content.structure.country}
        name={name}
        cover={content.cover}
        emblems={content.emblems}
        ink={content.coverInk}
      />
      <GuideAlbumIntro countryId={content.structure.country} name={name} traces={traces} />
      <GuideShell
        countryId={content.structure.country}
        country={name}
        places={places}
        toc={toc}
        traces={traces}
      >
        {content.body}
      </GuideShell>
      <GuideOutro name={name} emblems={content.emblems} toc={toc} />
      <SiteFooter />
    </>
  )
}
