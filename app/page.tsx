import { SiteFooter } from '@/components/SiteFooter'
import { WorldMap, type MapGuide } from '@/components/WorldMap'
import { guides } from '@/content/countries'

/** Home: the world map with the footer below it, together filling the viewport. */
export default function HomePage() {
  const ready: MapGuide[] = guides
    .filter((g) => g.status === 'ready')
    .map(({ slug, numeric, name }) => ({ slug, countryId: numeric, name }))
  return (
    <div className="flex h-svh flex-col">
      <WorldMap guides={ready} />
      <SiteFooter />
    </div>
  )
}
