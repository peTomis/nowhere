import type { CSSProperties } from 'react'
import { SiteFooter } from '@/components/SiteFooter'
import { WorldMap, type MapGuide } from '@/components/WorldMap'
import { guides } from '@/data/guides'

/** Home: the world map with the footer below it, together filling the viewport. */
export default function HomePage() {
  const ready: MapGuide[] = guides
    .filter((g) => g.status === 'ready')
    .map(({ slug, countryId, name, at }) => ({ slug, countryId, name, at }))
  return (
    <div
      className="flex h-svh flex-col"
      style={{ '--edge': 'clamp(12px, 3vw, 24px)' } as CSSProperties}
    >
      <WorldMap guides={ready} />
      <SiteFooter />
    </div>
  )
}
