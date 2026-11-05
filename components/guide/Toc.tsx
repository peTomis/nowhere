'use client'

import type { TocEntry } from '@/lib/guide'
import { useTrip } from './trip'

/** Guide index. The active section gets the cyan dot. */
export function Toc({
  entries,
  active,
  size,
  onNavigate,
}: {
  entries: TocEntry[]
  active: string
  size: 'sidebar' | 'menu'
  onNavigate?: () => void
}) {
  const trip = useTrip()
  const visible = entries.filter((e) => !e.when || e.when.some(trip.on))
  const big = size === 'menu'

  return (
    <div className={`flex flex-col ${big ? '' : 'gap-3'}`}>
      {visible.map((e, i) => {
        const level =
          e.level === 1
            ? big
              ? 'text-2xl leading-[1.2] font-semibold py-3'
              : 'text-base leading-[1.3] font-semibold'
            : e.level === 2
              ? big
                ? 'text-[19px] leading-[1.3] py-3 pl-4'
                : 'text-[15px] leading-[1.35] pl-3'
              : big
                ? 'text-[17px] leading-[1.3] italic text-neutral-800 py-3 pl-8'
                : 'text-sm leading-[1.35] italic text-neutral-800 pl-6'
        const gapBefore = e.level === 1 && i > 0 ? (big ? 'mt-2' : 'mt-3') : ''
        return (
          <a
            key={e.id}
            href={`#${e.id}`}
            onClick={onNavigate}
            aria-current={active === e.id ? 'location' : undefined}
            className={`grid items-baseline text-text no-underline hover:text-accent-700 ${big ? 'grid-cols-[20px_minmax(0,1fr)]' : 'grid-cols-[16px_minmax(0,1fr)]'} ${level} ${gapBefore}`}
          >
            <span
              className={`rounded-full bg-accent transition-opacity ${big ? 'size-[8px] -translate-y-[3px]' : 'size-[7px] -translate-y-[2px]'} ${active === e.id ? 'opacity-100' : 'opacity-0'}`}
            />
            <span>
              {e.label}
              {e.dates &&
                (big ? (
                  <span className="text-[15px] text-neutral-700 italic"> {e.dates}</span>
                ) : (
                  <>
                    <br />
                    <span className="text-[13px] text-neutral-700 italic">{e.dates}</span>
                  </>
                ))}
            </span>
          </a>
        )
      })}
    </div>
  )
}
