'use client'

import { format, t } from '@/i18n'

/**
 * Album completion of a country, port of "Completamento.dc.html". `compact`: a thin bar with the
 * level thresholds cut into it, and the percentage (cover, guide bar). `full`: title, percentage
 * and level, a thicker bar with the thresholds labelled below, and the points to the next level
 * (the album opening of a guide).
 */

/** Percentages at which the reader reaches level 1, 2 and 3. */
const THRESHOLDS = [25, 50, 80]

type Completion = { pct: number; points: number; total: number }

/**
 * The reader's completion of a country: points of the traces seen, out of the points of all its
 * traces. Nothing is seen until the collection exists (visits, docs/data-model.md §6).
 */
function useCompletion(_country: string, total: number): Completion {
  const points = 0
  return { pct: total ? Math.floor((points / total) * 100) : 0, points, total }
}

type Props = {
  /** ISO 3166-1 alpha-2. */
  country: string
  /** Country name, for the title and the accessible label. */
  name: string
  /** Points of all the country's traces (see RARITY_POINTS). */
  total?: number
  variant?: 'compact' | 'full'
  className?: string
}

export function Completion({
  country,
  name,
  total: totalPoints = 0,
  variant = 'compact',
  className = '',
}: Props) {
  const { pct, points, total } = useCompletion(country, totalPoints)
  const level = THRESHOLDS.filter((s) => pct >= s).length
  const width = `${Math.max(0, Math.min(100, pct))}%`
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
