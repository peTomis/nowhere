import { t } from '@/i18n'

/**
 * The medals of the album completion, by level (0: none yet, 1–4 at THRESHOLDS): a dashed shield,
 * bronze, silver and gold rosettes, and the platinum shield at 100%.
 */
export const MEDALS = ['none', 'bronze', 'silver', 'gold', 'platinum'] as const

export type MedalKind = (typeof MEDALS)[number]

/** The medal for a completion level (0–4). */
export const medalOf = (level: number): MedalKind => MEDALS[Math.max(0, Math.min(4, level))]

type Props = {
  level: number
  /** Width and height in px. */
  size?: number
  className?: string
}

/** The shield: dashed before the first level, solid platinum at 100%. */
const SHIELD = 'M12 2.5 19.5 5.5V11c0 4.6-3.2 8.1-7.5 10.5C7.7 19.1 4.5 15.6 4.5 11V5.5Z'
const SHIELD_INNER = 'M12 5.2 17 7.2V11c0 3.3-2.1 5.9-5 7.7-2.9-1.8-5-4.4-5-7.7V7.2Z'

/** Center and radii of the rosette's scalloped edge, in the 24×24 viewBox. */
const CX = 12
const CY = 9
const ROSETTE = Array.from({ length: 24 }, (_, i) => {
  const a = (i / 24) * 2 * Math.PI - Math.PI / 2
  const r = i % 2 ? 6.6 : 8
  return `${(CX + r * Math.cos(a)).toFixed(2)},${(CY + r * Math.sin(a)).toFixed(2)}`
}).join(' ')

/**
 * The completion level as a medal: a dashed shield before the first level, then a rosette in
 * bronze, silver or gold, and a platinum shield when every trace is in the album. Decorative: the
 * label is in the surrounding text or aria-label, and in the tooltip.
 */
export function Medal({ level, size = 28, className = '' }: Props) {
  const kind = medalOf(level)
  const label = t.completion.medalLabel[kind]
  return (
    <span title={label} className={`inline-flex flex-none ${className}`}>
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {kind === 'none' ? (
          <path
            d={SHIELD}
            fill="none"
            stroke="var(--color-neutral-600)"
            strokeWidth="1.4"
            strokeDasharray="2.2 1.8"
            strokeLinejoin="round"
          />
        ) : kind === 'platinum' ? (
          <g
            fill="var(--color-medal-platinum)"
            stroke="var(--color-text)"
            strokeWidth="1"
            strokeLinejoin="round"
          >
            <path d={SHIELD} />
            <path d={SHIELD_INNER} fill="none" />
          </g>
        ) : (
          <g
            fill={`var(--color-medal-${kind})`}
            stroke="var(--color-text)"
            strokeWidth="1"
            strokeLinejoin="round"
          >
            <path d="M9.2 13.5 6.6 22.6l2.5-1.4 1.6 2.3 2-7.6Z" />
            <path d="M14.8 13.5l2.6 9.1-2.5-1.4-1.6 2.3-2-7.6Z" />
            <polygon points={ROSETTE} />
            <circle cx={CX} cy={CY} r="4.4" />
          </g>
        )}
      </svg>
    </span>
  )
}
