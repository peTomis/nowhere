import { ArrowUpIcon } from '@phosphor-icons/react/ssr'
import Image from 'next/image'
import { publicAsset } from '@/lib/assets'
import type { GuideContent } from '@/lib/guide'
import { format, t } from '@/i18n'

const heading = 'mb-1 text-[11px] tracking-[.16em] text-neutral-700 uppercase'
const link =
  'flex min-h-[44px] items-center gap-[8px] text-base text-text no-underline hover:text-accent-700'

/**
 * Closing section of a guide (the upper part of the design's guide footer): recap with emblems
 * and name, the chapters, "Torna su". The site footer follows it.
 */
export function GuideOutro({
  name,
  emblems = [],
  toc,
}: { name: string } & Pick<GuideContent, 'emblems' | 'toc'>) {
  const shown = emblems.filter((e) => publicAsset(e.src))
  return (
    <section
      aria-label={format(t.guide.outro.label, { name })}
      className="mt-[120px] px-[clamp(20px,5vw,48px)] pt-8 pb-[60px]"
    >
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
          <span className="text-[15px] text-neutral-700 italic">{t.guide.tagline}</span>
        </div>
        <nav aria-label={t.guide.outro.chapters} className="flex flex-col">
          <span className={heading}>{t.guide.outro.chapters}</span>
          {toc
            .filter((e) => e.level === 1)
            .map((e) => (
              <a key={e.id} href={`#${e.id}`} className={link}>
                {e.label}
              </a>
            ))}
        </nav>
        <nav aria-label={t.guide.outro.more} className="flex flex-col">
          <span className={heading}>{t.guide.outro.more}</span>
          <a href="#top" className={link}>
            <ArrowUpIcon weight="duotone" size={18} className="text-accent-700" />
            {t.guide.outro.backToTop}
          </a>
        </nav>
      </div>
    </section>
  )
}
