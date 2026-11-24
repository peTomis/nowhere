'use client'

/**
 * A script that runs while the HTML is parsed, before the first paint (Next's "preventing flash
 * before hydration" guide). On a client-side navigation it is rendered inert (`text/plain`): there
 * the components already have the browser's values.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
