import { ArrowLeftIcon } from '@phosphor-icons/react/ssr'
import Link from 'next/link'
import { LogoBadge } from './LogoBadge'
import { t } from '@/i18n'

/**
 * Header of the pages without a map or a cover (account, 404), from "Nowhere - I tuoi dati.dc.html":
 * the logo badge at the same spot as on the home and the guide covers (top-left, var(--edge)),
 * and "Torna alla mappa" on the right. Page text starts at var(--inset), under the logo glyph.
 */
export function SiteHeader({ back = true }: { back?: boolean }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-(--edge) pt-(--edge)">
      <LogoBadge href="/" framed={false} />
      {back && (
        <Link
          href="/"
          className="flex min-h-[48px] items-center gap-[8px] px-[14px] text-base text-accent-700 no-underline hover:text-accent-800"
        >
          <ArrowLeftIcon weight="duotone" size={18} aria-hidden="true" />
          {t.common.backToMap}
        </Link>
      )}
    </header>
  )
}
