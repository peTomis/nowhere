import Image from 'next/image'
import { LogoBadge } from '@/components/LogoBadge'
import { publicAsset } from '@/lib/assets'
import type { GuideContent } from '@/content/types'

/** Full-height cover: photo fading into the paper, logo, emblems and the country name. */
export function GuideCover({
  name,
  cover,
  emblems = [],
  ink = 'var(--color-text)',
}: { name: string; ink?: string } & Pick<GuideContent, 'cover' | 'emblems'>) {
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
      {shown.length > 0 && (
        <div className="pointer-events-none absolute top-(--edge) right-(--edge) flex items-center gap-[clamp(12px,2vw,20px)]">
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
                  ? 'block aspect-[3/2] h-auto w-[clamp(48px,7vw,72px)]'
                  : 'block h-[clamp(64px,9vw,96px)] w-auto'
              }
            />
          ))}
        </div>
      )}
      <h1
        className="absolute bottom-[clamp(20px,4vw,48px)] left-[clamp(16px,4.5vw,64px)] m-0 text-[clamp(76px,17vw,210px)] leading-[.88] font-semibold tracking-[-.04em]"
        style={{ color: ink }}
      >
        {name}
      </h1>
    </div>
  )
}
