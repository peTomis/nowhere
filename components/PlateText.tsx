import type { ElementType, ReactNode } from 'react'

/**
 * Text printed as misregistered C/M/Y plates (.cmyk-head / .cmyk-num classes).
 * The .paper span carries the real text for assistive tech; the plates are aria-hidden.
 */
type PlateTextProps = {
  children: ReactNode
  as?: ElementType
  /** "head" for display headlines, "num" for large numerals. */
  kind?: 'head' | 'num'
  className?: string
}

export function PlateText({
  children,
  as: Tag = 'span',
  kind = 'head',
  className,
}: PlateTextProps) {
  return (
    <Tag className={`cmyk-${kind} ${className ?? ''}`.trim()}>
      <span className="paper">{children}</span>
      {(['c', 'm', 'y'] as const).map((p) => (
        <span key={p} className={`plate plate-${p}`} aria-hidden="true">
          {children}
        </span>
      ))}
    </Tag>
  )
}
