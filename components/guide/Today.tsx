'use client'

import { CheckCircleIcon } from '@phosphor-icons/react'
import { Fragment } from 'react'
import { traceAnchor } from '@/content/anchors'
import { t } from '@/i18n'
import { isSeen, useCollection } from '@/lib/reader/collection'
import { useGuideData } from './data'

/**
 * "Oggi:" under an event, port of "OggiTracce.dc.html": up to two traces where the story can be
 * seen today, linking to the trace in its first card, with a check once it is in the album.
 */
export function Today({ traces: ids }: { traces: string[] }) {
  const { traces } = useGuideData()
  const { entries } = useCollection()
  const items = ids.flatMap((id) => traces.filter((tr) => tr.id === id)).slice(0, 2)
  if (items.length === 0) return null
  return (
    <p className="mt-[2px] mb-0 flex flex-wrap items-baseline gap-x-[6px] font-body text-sm leading-[1.5] text-neutral-800">
      <span className="text-neutral-700 italic">{t.guide.trace.today}</span>
      {items.map((tr, i) => {
        const seen = isSeen(entries[tr.key])
        const card = tr.cards[0]
        const label = (
          <>
            {tr.name}
            {seen && (
              <>
                <CheckCircleIcon
                  weight="duotone"
                  size={15}
                  aria-hidden="true"
                  className="translate-y-[2px]"
                />
                <span className="sr-only">{t.guide.trace.todaySeen}</span>
              </>
            )}
          </>
        )
        return (
          <Fragment key={tr.id}>
            <span className="inline-flex items-baseline gap-[6px]">
              {card ? (
                <a
                  href={`#${traceAnchor(card.id, tr.id)}`}
                  className="-my-[11px] inline-flex items-baseline gap-1 py-[11px] text-accent-700 underline decoration-accent-300 underline-offset-3 hover:text-accent-800 hover:decoration-current"
                >
                  {label}
                </a>
              ) : (
                <span className="inline-flex items-baseline gap-1">{label}</span>
              )}
              {i < items.length - 1 && (
                <span aria-hidden="true" className="text-neutral-500">
                  ·
                </span>
              )}
            </span>
          </Fragment>
        )
      })}
    </p>
  )
}
