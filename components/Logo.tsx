import type { CSSProperties } from 'react'

/**
 * Nowhere logo — from NowhereLogo.dc.html (claude.ai/design).
 * Symbol: crosshair/compass rose; in the "process" tone it is printed as three
 * misregistered C/M/Y plates under the black plate. Wordmark: italic "now" + semibold "here".
 */
export type LogoVariant = 'horizontal' | 'vertical' | 'symbol' | 'wordmark'
export type LogoTone = 'process' | 'ink'

type LogoProps = {
  variant?: LogoVariant
  tone?: LogoTone
  className?: string
  style?: CSSProperties
  title?: string
}

const PLATES = [
  { dx: -0.9, dy: 0.7, color: 'var(--color-accent)' },
  { dx: 1, dy: 0.6, color: 'var(--color-accent-2)' },
  { dx: 0.2, dy: -1, color: 'var(--color-process-yellow)' },
]

function Mark() {
  return (
    <>
      <circle cx="24" cy="24" r="12.5" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <path d="M24 2.5V45.5M2.5 24H45.5" stroke="currentColor" strokeWidth="2.6" />
      <circle cx="24" cy="24" r="3.4" fill="currentColor" />
    </>
  )
}

function Symbol({ tone }: { tone: LogoTone }) {
  return (
    <>
      {tone === 'process' &&
        PLATES.map((p) => (
          <g
            key={p.color}
            transform={`translate(${p.dx} ${p.dy})`}
            style={{ color: p.color, mixBlendMode: 'multiply' }}
          >
            <Mark />
          </g>
        ))}
      <g style={{ color: 'var(--color-text)' }}>
        <Mark />
      </g>
    </>
  )
}

function Word(props: { x: number; y: number; anchor?: 'start' | 'middle' }) {
  return (
    <text
      x={props.x}
      y={props.y}
      textAnchor={props.anchor}
      style={{ fontFamily: 'var(--font-body)', fontSize: 40, fill: 'var(--color-text)' }}
    >
      <tspan style={{ fontStyle: 'italic', fontWeight: 400 }}>now</tspan>
      <tspan dx="1.5" style={{ fontWeight: 600 }}>
        here
      </tspan>
    </text>
  )
}

const VIEWBOX: Record<LogoVariant, string> = {
  horizontal: '0 0 226 48',
  vertical: '0 0 166 101',
  symbol: '0 0 48 48',
  wordmark: '0 0 166 33',
}

export function Logo({
  variant = 'horizontal',
  tone = 'process',
  className,
  style,
  title = 'Nowhere',
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
          <Symbol tone={tone} />
          <Word x={60} y={34} />
        </>
      )}
      {variant === 'vertical' && (
        <>
          <g transform="translate(55 0) scale(1.1667)">
            <Symbol tone={tone} />
          </g>
          <Word x={83} y={99} anchor="middle" />
        </>
      )}
      {variant === 'symbol' && <Symbol tone={tone} />}
      {variant === 'wordmark' && <Word x={0.5} y={31} />}
    </svg>
  )
}
