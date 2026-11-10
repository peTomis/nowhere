import { SiteFooter } from '@/components/SiteFooter'
import { WorldMap, type MapGuide } from '@/components/WorldMap'
import { tracesOf } from '@/content/build'
import { guides } from '@/content/countries'
import { guideContent } from '@/content/guides'

/** Home: the world map with the footer below it, together filling the viewport. */
export default function HomePage() {
  const ready: MapGuide[] = guides
    .filter((g) => g.status === 'ready' && guideContent[g.slug])
    .map(({ slug, numeric, name }) => ({
      slug,
      countryId: numeric,
      name,
      traces: tracesOf(guideContent[slug], name).map(({ key, points }) => ({ key, points })),
    }))
  return (
    <div className="flex h-svh flex-col">
      <WorldMap guides={ready} />
      <SiteFooter />
    </div>
  )
}
