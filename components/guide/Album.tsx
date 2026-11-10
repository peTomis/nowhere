'use client'

import { useState } from 'react'
import { Completion } from '@/components/Completion'
import type { AlbumTrace } from '@/content/build'
import type { Place } from '@/content/types'
import { format, t } from '@/i18n'

/**
 * The album view of a guide, port of "Album.dc.html": title, full completion, region filter, and
 * one page per region with a box per trace. Boxes show traces still to find (nothing is seen until
 * the collection exists); opening a box ("Traccia.dc.html") and the "In evidenza" pages are not
 * ported yet.
 */
type Props = {
  /** ISO 3166-1 alpha-2. */
  countryId: string
  name: string
  places: Place[]
  traces: AlbumTrace[]
}

export function Album({ countryId, name, places, traces }: Props) {
  const [region, setRegion] = useState<string | null>(null)
  const total = traces.reduce((sum, tr) => sum + tr.points, 0)
  // Nothing is seen yet: counts and points of seen traces are 0 until visits exist.
  const seen = 0
  const filters = [{ id: null, name: t.guide.album.all }, ...places].map((p) => ({
    ...p,
    count: traces.filter((tr) => p.id === null || tr.region === p.id).length,
  }))
  const pages = places
    .filter((p) => region === null || p.id === region)
    .map((p) => ({ ...p, traces: traces.filter((tr) => tr.region === p.id) }))

  return (
    <div className="mx-auto max-w-[1100px] px-[clamp(20px,5vw,48px)] pt-[clamp(48px,8vw,96px)]">
      <div className="flex flex-col gap-[60px] font-body [text-wrap:pretty] text-text">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs tracking-[.16em] text-accent-700 uppercase">
              {format(t.guide.album.kicker, { name, n: traces.length })}
            </span>
            <h2 className="m-0 text-[clamp(40px,8vw,64px)] leading-none font-semibold tracking-[-.02em]">
              {t.guide.album.heading}
            </h2>
          </div>
          <Completion
            country={countryId}
            name={name}
            total={total}
            variant="full"
            className="max-w-[560px]"
          />
          {traces.length > 0 && (
            <div
              role="group"
              aria-label={t.guide.album.regionFilter}
              className="flex flex-wrap gap-2"
            >
              {filters.map((f) => {
                const on = region === f.id
                return (
                  <button
                    key={f.id ?? 'all'}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setRegion(f.id)}
                    className={`flex min-h-[44px] cursor-pointer items-center gap-[8px] rounded-md border-0 px-4 font-body text-[15px] hover:bg-accent-100 ${on ? 'bg-accent-100 text-accent-800 shadow-[inset_0_0_0_1.5px_var(--color-accent)]' : 'bg-transparent text-text shadow-[inset_0_0_0_1px_var(--color-neutral-300)]'}`}
                  >
                    <span>{f.name}</span>
                    <span className="text-[13px] text-neutral-700 tabular-nums">
                      {seen}/{f.count}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {traces.length === 0 ? (
          <p className="m-0 text-[17px] text-neutral-700 italic">{t.guide.album.empty}</p>
        ) : (
          pages.map((p) => (
            <section key={p.id} aria-labelledby={`album-${p.id}`} className="flex flex-col gap-4">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 id={`album-${p.id}`} className="m-0 text-[clamp(26px,5vw,34px)] leading-[1.1]">
                  {p.name}
                </h3>
                <span className="text-[15px] text-neutral-700 tabular-nums">
                  {format(t.guide.album.regionLine, {
                    seen,
                    n: p.traces.length,
                    points: 0,
                    total: p.traces.reduce((sum, tr) => sum + tr.points, 0),
                  })}
                </span>
              </div>
              <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-3 gap-y-4 p-0">
                {p.traces.map((tr) => (
                  <li key={tr.id} className="min-w-0">
                    <TraceBox trace={tr} />
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </div>
  )
}

/** A trace still to find: dashed box with its number, name, rarity marks and where it is. */
function TraceBox({ trace }: { trace: AlbumTrace }) {
  const num = String(trace.num).padStart(2, '0')
  const where = t.guide.album.where[trace.where]
  return (
    <div
      role="group"
      aria-label={format(t.guide.album.traceAria, {
        num,
        name: trace.name,
        rarity: t.guide.album.rarity[trace.rarity],
        where: where.toLowerCase(),
      })}
      className="flex flex-col gap-2"
    >
      <span className="relative block aspect-[4/3] overflow-hidden rounded-md border-[1.5px] border-dashed border-neutral-500 bg-bg">
        <span
          aria-hidden="true"
          className="absolute top-[6px] left-[12px] text-[44px] leading-none font-semibold tracking-[-.03em] text-neutral-600 tabular-nums"
        >
          {num}
        </span>
        {trace.isNew && (
          <span className="tag tag-accent-2 absolute top-[6px] right-[6px]">
            {t.guide.album.isNew}
          </span>
        )}
      </span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="text-[15px] leading-[1.3] font-semibold">{trace.name}</span>
        <span aria-hidden="true" className="flex items-center gap-[8px] text-xs text-neutral-700">
          <span className="flex items-center gap-[2px]">
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-[10px] w-[3px] rounded-[1px] ${i <= trace.points ? 'bg-text' : 'bg-neutral-300'}`}
              />
            ))}
          </span>
          {trace.where === 'city' && trace.city ? trace.city : where}
        </span>
      </span>
    </div>
  )
}
