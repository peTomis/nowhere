import { Logo } from './Logo'

/** Home footer, from "Nowhere - Home.dc.html": wordmark + tagline, credit on the right. */
export function SiteFooter() {
  return (
    <footer
      data-screen-label="Home · footer"
      className="flex flex-none flex-wrap items-center justify-between gap-x-6 bg-bg px-(--edge) py-1 text-sm text-neutral-800"
    >
      <div className="flex min-h-[44px] items-center gap-3">
        <div className="aspect-[166/33] w-[76px]">
          <Logo variant="wordmark" tone="ink" className="size-full" />
        </div>
        <span className="text-neutral-700 italic">Le mie guide di viaggio</span>
      </div>
      <p className="m-0 flex min-h-[44px] items-center">
        Fatto da&nbsp;
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
