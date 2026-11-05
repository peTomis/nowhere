import Link from 'next/link'
import { Logo } from './Logo'

/**
 * The logo badge, from "Nowhere - Home.dc.html". Used at the same spot (top-left, var(--edge))
 * on the home map, framed on paper so it reads over the map, and on guide covers, where it is
 * unframed and links back home. Box geometry is identical either way, so the logo lines up.
 */
export function LogoBadge({
  href,
  framed = true,
  ink,
}: {
  href?: string
  framed?: boolean
  /** Logo color, see <Logo ink>. */
  ink?: string
}) {
  const className = `flex h-[48px] flex-none items-center px-[14px] text-text no-underline ${framed ? 'rounded-md bg-bg shadow-sm' : ''}`
  const logo = (
    <div className="aspect-[226/48] w-[113px]">
      <Logo variant="horizontal" tone="ink" ink={ink} className="size-full" />
    </div>
  )
  return href ? (
    <Link href={href} aria-label="Nowhere, torna alla mappa" className={className}>
      {logo}
    </Link>
  ) : (
    <div className={className}>{logo}</div>
  )
}
