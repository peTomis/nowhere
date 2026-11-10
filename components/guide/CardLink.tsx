'use client'

import type { ReactNode } from 'react'
import { setGuideView } from './view'

/** A link to a card in the text: switches back from the album first, so the anchor exists. */
export function CardLink({ anchor, children }: { anchor: string; children: ReactNode }) {
  return (
    <a
      href={`#${anchor}`}
      onClick={() => setGuideView('guide')}
      className="flex min-h-[44px] flex-col gap-1 text-text no-underline hover:text-accent-800"
    >
      {children}
    </a>
  )
}
