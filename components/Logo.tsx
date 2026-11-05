import type { CSSProperties } from 'react'

/**
 * Nowhere logo — from NowhereLogo.dc.html (claude.ai/design).
 * Symbol: a dot printed as three misregistered C/M/Y plates ("Quadricromia"; the design's
 * "Inchiostro" tone is deliberately not ported). Wordmark: italic "now" + semibold "here".
 */
export type LogoVariant = 'horizontal' | 'vertical' | 'symbol' | 'wordmark'

type LogoProps = {
  variant?: LogoVariant
  className?: string
  style?: CSSProperties
  title?: string
  /** Color of the wordmark (any CSS color; prefer a token). */
  ink?: string
}

/** Symbol geometry per variant: dot center/radius and C/M/Y plate offsets. */
type Dot = { cx: number; cy: number; r: number; offsets: [number, number][] }

const SMALL: Dot = {
  cx: 20,
  cy: 25,
  r: 11,
  offsets: [
    [-2.2, 1.4],
    [2.2, 1.2],
    [0, -2.4],
  ],
}
const LARGE: Dot = {
  cx: 24,
  cy: 24,
  r: 14,
  offsets: [
    [-2.6, 1.6],
    [2.6, 1.4],
    [0, -2.8],
  ],
}

const PLATE_COLORS = ['var(--color-accent)', 'var(--color-accent-2)', 'var(--color-process-yellow)']

/** Three misregistered C/M/Y plates, multiplied: no black plate. */
function Symbol({ dot }: { dot: Dot }) {
  return (
    <>
      {dot.offsets.map(([dx, dy], i) => (
        <circle
          key={PLATE_COLORS[i]}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          transform={`translate(${dx} ${dy})`}
          style={{ fill: PLATE_COLORS[i], mixBlendMode: 'multiply' }}
        />
      ))}
    </>
  )
}

function Word(props: { x: number; y: number; anchor?: 'start' | 'middle'; ink: string }) {
  return (
    <text
      x={props.x}
      y={props.y}
      textAnchor={props.anchor}
      style={{ fontFamily: 'var(--font-body)', fontSize: 40, fill: props.ink }}
    >
      <tspan style={{ fontStyle: 'italic', fontWeight: 400 }}>now</tspan>
      <tspan dx="1.5" style={{ fontWeight: 600 }}>
        here
      </tspan>
    </text>
  )
}

const VIEWBOX: Record<LogoVariant, string> = {
  horizontal: '0 0 216 48',
  vertical: '0 0 166 101',
  symbol: '0 0 48 48',
  wordmark: '0 0 166 33',
}

export function Logo({
  variant = 'horizontal',
  className,
  style,
  title = 'Nowhere',
  ink = 'var(--color-text)',
}: LogoProps) {
  const leftAligned = variant === 'horizontal' || variant === 'wordmark'
  return (
    <svg
      viewBox={VIEWBOX[variant]}
      preserveAspectRatio={leftAligned ? 'xMinYMid meet' : undefined}
      role="img"
      aria-label={title}
      className={className}
      style={{ display: 'block', overflow: 'visible', isolation: 'isolate', ...style }}
    >
      {variant === 'horizontal' && (
        <>
          <Symbol dot={SMALL} />
          <Word x={48} y={34} ink={ink} />
        </>
      )}
      {variant === 'vertical' && (
        <>
          <g transform="translate(55 0) scale(1.1667)">
            <Symbol dot={LARGE} />
          </g>
          <Word x={83} y={99} anchor="middle" ink={ink} />
        </>
      )}
      {variant === 'symbol' && <Symbol dot={LARGE} />}
      {variant === 'wordmark' && <Word x={0.5} y={31} ink={ink} />}
    </svg>
  )
}
