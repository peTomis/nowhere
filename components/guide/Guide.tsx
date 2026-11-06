import { GuideCover } from '@/components/guide/GuideCover'
import { GuideOutro } from '@/components/guide/GuideOutro'
import { GuideShell } from '@/components/guide/GuideShell'
import { SiteFooter } from '@/components/SiteFooter'
import type { GuideContent } from '@/lib/guide'

type GuideProps = {
  /** Also the trip filter's localStorage namespace (`guida-<slug>-off`). */
  slug: string
  name: string
  content: GuideContent
}

/** A whole guide page: cover, index + content, closing section, site footer. */
export function Guide({ slug, name, content }: GuideProps) {
  return (
    <>
      <GuideCover
        name={name}
        cover={content.cover}
        emblems={content.emblems}
        ink={content.coverInk}
      />
      <GuideShell slug={slug} country={name} places={content.places} toc={content.toc}>
        {content.body}
      </GuideShell>
      <GuideOutro name={name} emblems={content.emblems} toc={content.toc} />
      <SiteFooter />
    </>
  )
}
