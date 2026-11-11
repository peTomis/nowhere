'use client'

import { useEffect, useState } from 'react'
import { format, t } from '@/i18n'
import { isSeen, useCollection } from '@/lib/reader/collection'
import { Medal, medalOf } from './Medal'

/**
 * Album completion of a country, port of "Completamento.dc.html". `compact`: a thin bar with the
 * level thresholds cut into it, and the percentage (cover, guide bar). `full`: title, percentage
 * and medal, a thicker bar with the thresholds labelled below, and the points to the next medal
 * (the album opening of a guide). Deviation from the design: the level is a medal (Medal.tsx: a
 * dashed shield, then bronze, silver and gold, a platinum shield at 100%) instead of "Livello n" / "Nessun livello". `card`: the full one cut down for the home map's hover, where the
 * country name is right above it: no title; under the bar, in place of the threshold labels, the
 * number of traces with a photo (at the end of the fill) and the total (at the right end); only the
 * points to the next level.
 */

/**
 * Percentages at which the reader reaches level 1–4: the bronze, silver and gold medal, and at
 * 100% the platinum shield. The bar marks only the first three (100% is its end).
 */
export const THRESHOLDS = [25, 50, 80, 100]

/** The thresholds marked on the bar. */
const MARKS = THRESHOLDS.filter((s) => s < 100)

/** A trace as the completion counts it: its collection key and its points. */
export type Scored = { key: string; points: number }

export type CompletionState = {
  pct: number
  points: number
  total: number
  level: number
  /** Traces with a photo, out of `count`. */
  seen: number
  count: number
}

/** Points of the traces with a photo, out of the points of all the country's traces. */
export function completionOf(traces: Scored[], seen: (key: string) => boolean): CompletionState {
  let points = 0
  let total = 0
  let n = 0
  for (const tr of traces) {
    total += tr.points
    if (seen(tr.key)) {
      points += tr.points
      n++
    }
  }
  const pct = total ? Math.floor((points / total) * 100) : 0
  return {
    pct,
    points,
    total,
    level: THRESHOLDS.filter((s) => pct >= s).length,
    seen: n,
    count: traces.length,
  }
}

export function useCompletion(traces: Scored[]): CompletionState {
  const { entries } = useCollection()
  return completionOf(traces, (key) => isSeen(entries[key]))
}

type Props = {
  /** Country name, for the title and the accessible label. */
  name: string
  /** The country's traces (see RARITY_POINTS). */
  traces: Scored[]
  variant?: 'compact' | 'full' | 'card'
  /** Percentage the bar starts from, to show it growing (after a photo is added). */
  from?: number
  className?: string
}

export function Completion({ name, traces, variant = 'compact', from, className = '' }: Props) {
  const { pct, points, total, level, seen, count } = useCompletion(traces)
  // Starts at `from`, then grows to the real value on the next frame (the bar's transition).
  const [grown, setGrown] = useState(from === undefined)
  useEffect(() => {
    if (grown) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setGrown(true)))
    return () => cancelAnimationFrame(id)
  }, [grown])
  const shown = grown ? pct : (from ?? pct)
  const width = `${Math.max(0, Math.min(100, shown))}%`
  const fill =
    'absolute inset-y-0 left-0 bg-text motion-safe:transition-[width] motion-safe:duration-[1.2s] motion-safe:ease-[cubic-bezier(.2,.7,.2,1)]'

  // "12 punti su 40. Ancora 4 punti per la medaglia d’argento."
  const next = THRESHOLDS.findIndex((s) => pct < s)
  let toNext = ''
  if (total > 0) {
    const need = next < 0 ? 0 : Math.ceil((total * THRESHOLDS[next]) / 100) - points
    toNext =
      next < 0
        ? t.completion.all
        : format(need === 1 ? t.completion.toNextOne : t.completion.toNext, {
            n: need,
            medal: t.completion.medalGoal[medalOf(next + 1)],
          })
  }
  const line = total > 0 ? `${format(t.completion.points, { points, total })} ${toNext}` : ''
  const aria = `${format(t.completion.aria, {
    name,
    pct,
    level: t.completion.medalLabel[medalOf(level)],
  })} ${line}`.trim()

  if (variant === 'compact')
    return (
      <div
        role="group"
        aria-label={aria}
        className={`flex min-h-[28px] min-w-0 items-center gap-[10px] font-body text-text ${className}`}
      >
        <span
          aria-hidden="true"
          className="relative h-[6px] min-w-[48px] flex-1 rounded-[3px] bg-neutral-200"
        >
          <span className={`${fill} rounded-[3px]`} style={{ width }} />
          {MARKS.map((s) => (
            <span
              key={s}
              className="absolute -inset-y-px w-[2px] bg-bg"
              style={{ left: `${s}%` }}
            />
          ))}
        </span>
        <span aria-hidden="true" className="flex-none text-sm font-semibold tabular-nums">
          {pct}%
        </span>
      </div>
    )

  if (variant === 'card')
    return (
      <div
        role="group"
        aria-label={aria}
        className={`flex min-w-0 flex-col gap-2 font-body [text-wrap:pretty] text-text ${className}`}
      >
        <span className="flex items-center gap-[8px]">
          <span className="text-[28px] leading-none font-semibold tabular-nums">{pct}%</span>
          <Medal level={level} size={26} />
        </span>
        <div aria-hidden="true" className="relative">
          <div className="relative h-[10px] overflow-hidden rounded-[5px] bg-neutral-200">
            <div className={`${fill} rounded-[5px]`} style={{ width }} />
          </div>
          {MARKS.map((s) => (
            <span
              key={s}
              className="absolute -inset-y-[2px] w-[2px] -translate-x-1/2 bg-bg"
              style={{ left: `${s}%` }}
            />
          ))}
        </div>
        <div aria-hidden="true" className="relative h-[18px] text-xs tabular-nums">
          {seen < count && pct < 90 && (
            <span
              className={`absolute top-0 font-semibold ${shown < 4 ? 'left-0' : '-translate-x-1/2'}`}
              style={shown < 4 ? undefined : { left: width }}
            >
              {seen}
            </span>
          )}
          <span
            className={`absolute top-0 right-0 ${seen === count ? 'font-semibold' : 'text-neutral-700'}`}
          >
            {count}
          </span>
        </div>
        {toNext && <span className="text-sm leading-[1.45] text-neutral-800">{toNext}</span>}
      </div>
    )

  return (
    <div
      role="group"
      aria-label={aria}
      className={`flex min-w-0 flex-col gap-2 font-body [text-wrap:pretty] text-text ${className}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <span className="text-[11px] tracking-[.14em] text-neutral-700 uppercase">
          {format(t.completion.title, { name })}
        </span>
        <span className="flex items-center gap-[8px]">
          <span className="text-[clamp(28px,6vw,36px)] leading-none font-semibold tabular-nums">
            {pct}%
          </span>
          <Medal level={level} size={30} />
        </span>
      </div>
      <div aria-hidden="true" className="relative">
        <div className="relative h-[10px] overflow-hidden rounded-[5px] bg-neutral-200">
          <div className={`${fill} rounded-[5px]`} style={{ width }} />
        </div>
        {MARKS.map((s) => (
          <span
            key={s}
            className="absolute -inset-y-[2px] w-[2px] -translate-x-1/2 bg-bg"
            style={{ left: `${s}%` }}
          />
        ))}
      </div>
      <div aria-hidden="true" className="relative h-[18px] text-xs text-neutral-700">
        {MARKS.map((s) => (
          <span
            key={s}
            className={`absolute top-0 -translate-x-1/2 whitespace-nowrap ${pct >= s ? 'font-semibold text-text' : ''}`}
            style={{ left: `${s}%` }}
          >
            {s}%
          </span>
        ))}
      </div>
      {line && <span className="text-sm leading-[1.45] text-neutral-800">{line}</span>}
    </div>
  )
}
