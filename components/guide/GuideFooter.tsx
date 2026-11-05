import { ArrowUpIcon, GlobeHemisphereEastIcon } from '@phosphor-icons/react/ssr'
import Image from 'next/image'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { publicAsset } from '@/lib/assets'
import type { GuideContent } from '@/lib/guide'

const heading = 'mb-1 text-[11px] tracking-[.16em] text-neutral-700 uppercase'
const link =
  'flex min-h-[44px] items-center gap-[8px] text-base text-text no-underline hover:text-accent-700'

export function GuideFooter({
  name,
  emblems = [],
  toc,
}: { name: string } & Pick<GuideContent, 'emblems' | 'toc'>) {
  const shown = emblems.filter((e) => publicAsset(e.src))
  return (
    <footer className="mt-[120px] px-[clamp(20px,5vw,48px)] pt-8 pb-[60px]">
      <div className="mx-auto grid max-w-[1100px] grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] items-start gap-x-6 gap-y-8">
        <div className="flex flex-col gap-3">
          {shown.length > 0 && (
            <div className="flex items-center gap-[12px]">
              {shown.map((e) => (
                <Image
                  key={e.src}
                  src={e.src}
                  alt={e.alt}
                  width={e.width}
                  height={e.height}
                  className={
                    e.kind === 'flag'
                      ? 'block aspect-[3/2] h-auto w-[33px]'
                      : 'block h-[44px] w-auto'
                  }
                />
              ))}
            </div>
          )}
          <span className="text-[40px] leading-none font-semibold tracking-[-.025em]">{name}</span>
          <span className="text-[15px] text-neutral-700 italic">La mia guida di viaggio</span>
        </div>
        <nav aria-label="Capitoli" className="flex flex-col">
          <span className={heading}>Capitoli</span>
          {toc
            .filter((e) => e.level === 1)
            .map((e) => (
              <a key={e.id} href={`#${e.id}`} className={link}>
                {e.label}
              </a>
            ))}
        </nav>
        <nav aria-label="Altro" className="flex flex-col">
          <span className={heading}>Altro</span>
          <Link href="/" className={link}>
            <GlobeHemisphereEastIcon weight="duotone" size={18} className="text-accent-700" />
            Torna alla mappa
          </Link>
          <a href="#top" className={link}>
            <ArrowUpIcon weight="duotone" size={18} className="text-accent-700" />
            Torna su
          </a>
        </nav>
      </div>
      <div className="mx-auto mt-[60px] flex max-w-[1100px] flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <Link
          href="/"
          aria-label="Nowhere, torna alla mappa"
          className="flex min-h-[44px] items-center"
        >
          <div className="aspect-[226/48] w-[113px]">
            <Logo variant="horizontal" tone="ink" className="size-full" />
          </div>
        </Link>
        <span className="text-[13px] text-neutral-700">
          Fatto da{' '}
          <a
            href="https://www.petomis.com"
            className="text-accent-700 no-underline hover:text-accent-800 hover:underline"
          >
            petomis
          </a>
        </span>
      </div>
    </footer>
  )
}
