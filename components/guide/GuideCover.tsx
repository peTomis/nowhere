import Image from 'next/image'
import { Completion } from '@/components/Completion'
import { LogoBadge } from '@/components/LogoBadge'
import { publicAsset } from '@/lib/assets'
import type { GuideContent } from '@/content/types'

/**
 * Full-height cover, from "Guida Romania - Sito v4": photo fading into the paper, logo, and at the
 * bottom the country name over a row with the emblems and the album completion.
 */
export function GuideCover({
  countryId,
  name,
  cover,
  emblems = [],
  ink = 'var(--color-text)',
}: {
  /** ISO 3166-1 alpha-2. */
  countryId: string
  name: string
  ink?: string
} & Pick<GuideContent, 'cover' | 'emblems'>) {
  const src = publicAsset(cover?.src)
  const shown = emblems.filter((e) => publicAsset(e.src))
  return (
    <div
      id="top"
      className="relative h-svh max-h-[1200px] min-h-[560px] overflow-hidden bg-neutral-300"
    >
      {src && (
        <Image
          src={src}
          alt={cover?.alt ?? ''}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--color-bg)_0%,color-mix(in_srgb,var(--color-bg)_70%,transparent)_14%,transparent_38%)]"
        aria-hidden="true"
      />
      <div className="absolute top-(--edge) left-(--edge) z-2">
        <LogoBadge href="/" framed={false} ink={ink} />
      </div>
      <div className="absolute bottom-[clamp(20px,4vw,48px)] left-[clamp(16px,4.5vw,64px)] z-2 flex flex-col gap-[clamp(12px,2vw,20px)]">
        <h1
          className="m-0 text-[clamp(76px,17vw,210px)] leading-[.88] font-semibold tracking-[-.04em]"
          style={{ color: ink }}
        >
          {name}
        </h1>
        <div className="flex items-center gap-[clamp(12px,2vw,20px)]">
          {shown.map((e) => (
            <Image
              key={e.src}
              src={e.src}
              alt={e.alt}
              width={e.width}
              height={e.height}
              priority
              className={
                e.kind === 'flag'
                  ? 'block aspect-[3/2] h-auto w-[clamp(36px,5vw,48px)]'
                  : 'block h-[clamp(40px,6vw,56px)] w-auto'
              }
            />
          ))}
          <Completion country={countryId} name={name} className="w-[clamp(120px,18vw,180px)]" />
        </div>
      </div>
    </div>
  )
}
