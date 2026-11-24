import { SiteFooter } from '@/components/SiteFooter'
import { WorldMap, type MapGuide } from '@/components/WorldMap'
import { tracesOf } from '@/content/build'
import { readyGuides } from '@/content/guides'
import { requireLang } from '@/i18n/server'

/** Home: the world map with the footer below it, together filling the viewport. */
export default async function HomePage() {
  const ready: MapGuide[] = readyGuides(await requireLang()).map(({ slug, numeric, content }) => ({
    slug,
    countryId: numeric,
    name: content.names.country,
    traces: tracesOf(content).map(({ key, points }) => ({ key, points })),
  }))
  return (
    <div className="flex h-svh flex-col">
      <WorldMap guides={ready} />
      <SiteFooter />
    </div>
  )
}
