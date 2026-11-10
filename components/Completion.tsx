'use client'

import { useEffect, useState } from 'react'
import { format, t } from '@/i18n'
import { isSeen, useCollection } from '@/lib/reader/collection'

/**
 * Album completion of a country, port of "Completamento.dc.html". `compact`: a thin bar with the
 * level thresholds cut into it, and the percentage (cover, guide bar). `full`: title, percentage
 * and level, a thicker bar with the thresholds labelled below, and the points to the next level
 * (the album opening of a guide).
 */

/** Percentages at which the reader reaches level 1, 2 and 3. */
export const THRESHOLDS = [25, 50, 80]

/** A trace as the completion counts it: its collection key and its points. */
export type Scored = { key: string; points: number }

export type CompletionState = { pct: number; points: number; total: number; level: number }

/** Points of the traces with a photo, out of the points of all the country's traces. */
export function completionOf(traces: Scored[], seen: (key: string) => boolean): CompletionState {
  let points = 0
  let total = 0
  for (const tr of traces) {
    total += tr.points
    if (seen(tr.key)) points += tr.points
  }
  const pct = total ? Math.floor((points / total) * 100) : 0
  return { pct, points, total, level: THRESHOLDS.filter((s) => pct >= s).length }
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
  variant?: 'compact' | 'full'
  /** Percentage the bar starts from, to show it growing (after a photo is added). */
  from?: number
  className?: string
}

export function Completion({ name, traces, variant = 'compact', from, className = '' }: Props) {
  const { pct, points, total, level } = useCompletion(traces)
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

  // "12 punti su 40. Ancora 4 punti per il livello 2."
  const next = THRESHOLDS.findIndex((s) => pct < s)
  let line = ''
  if (total > 0) {
    const need = next < 0 ? 0 : Math.ceil((total * THRESHOLDS[next]) / 100) - points
    line = `${format(t.completion.points, { points, total })} ${
      pct >= 100
        ? t.completion.all
        : next < 0
          ? t.completion.top
          : format(need === 1 ? t.completion.toNextOne : t.completion.toNext, {
              n: need,
              level: next + 1,
            })
    }`
  }
  const aria = `${format(t.completion.aria, {
    name,
    pct,
    level: level ? format(t.completion.level, { n: level }) : t.completion.noLevel,
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
          {THRESHOLDS.map((s) => (
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
        <span className="flex items-baseline gap-[8px]">
          <span className="text-[clamp(28px,6vw,36px)] leading-none font-semibold tabular-nums">
            {pct}%
          </span>
          <span className="text-[15px] text-neutral-800">
            {level ? format(t.completion.levelLabel, { n: level }) : t.completion.noLevelLabel}
          </span>
        </span>
      </div>
      <div aria-hidden="true" className="relative">
        <div className="relative h-[10px] overflow-hidden rounded-[5px] bg-neutral-200">
          <div className={`${fill} rounded-[5px]`} style={{ width }} />
        </div>
        {THRESHOLDS.map((s) => (
          <span
            key={s}
            className="absolute -inset-y-[2px] w-[2px] -translate-x-1/2 bg-bg"
            style={{ left: `${s}%` }}
          />
        ))}
      </div>
      <div aria-hidden="true" className="relative h-[18px] text-xs text-neutral-700">
        {THRESHOLDS.map((s) => (
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
