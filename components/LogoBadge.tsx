import Link from 'next/link'
import { Logo } from './Logo'
import { t } from '@/i18n'

/**
 * The logo badge, from "Nowhere - Home.dc.html". Used at the same spot (top-left, var(--edge))
 * on the home map and on guide covers (where it links back home). Both use it unframed: the design
 * frames it on paper on the home, but the map now sits on paper too. Box geometry is identical
 * either way, so the logo lines up.
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
    <div className="aspect-[216/48] w-[108px]">
      <Logo variant="horizontal" ink={ink} className="size-full" />
    </div>
  )
  return href ? (
    <Link href={href} aria-label={t.common.homeLabel} className={className}>
      {logo}
    </Link>
  ) : (
    <div className={className}>{logo}</div>
  )
}
