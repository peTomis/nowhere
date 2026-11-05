import { Logo } from './Logo'
import { t } from '@/i18n'

/**
 * Site footer, from "Nowhere - Home.dc.html": wordmark + tagline (from 640px), credit on the right.
 * The same footer closes the home and every guide.
 */
export function SiteFooter({ className = '' }: { className?: string }) {
  return (
    <footer
      className={`flex flex-none flex-wrap items-center justify-between gap-x-6 bg-bg px-(--edge) py-1 text-sm text-neutral-800 ${className}`}
    >
      <div className="flex min-h-[44px] items-center gap-3">
        <div className="aspect-[166/33] w-[76px]">
          <Logo variant="wordmark" className="size-full" />
        </div>
        <span className="hidden text-neutral-700 italic sm:inline">{t.common.tagline}</span>
      </div>
      <p className="m-0 flex min-h-[44px] items-center">
        {t.common.madeBy}&nbsp;
        <a
          href="https://www.petomis.com"
          className="text-accent-700 no-underline hover:text-accent-800 hover:underline"
        >
          petomis
        </a>
      </p>
    </footer>
  )
}
