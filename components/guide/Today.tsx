'use client'

import { t } from '@/i18n'
import { useGuideData } from './data'
import { Trace } from './Trace'
import { useShown } from './trip'

/**
 * "Oggi" under a timeline event: up to two traces where the story can be seen today, shown in
 * full as in the cards (photo box, rarity, "Come trovarla", the reader's photo and note), so the
 * reader can add the photo from the timeline too; "Anche in" links to the cards that list it.
 * Deviation from "OggiTracce.dc.html", which has a line of links. A trace whose cards the trip
 * filter all hides is skipped, so the list can name a third trace as a fallback: the first two
 * still shown are displayed. Anchor: `trace-today-<slug>` (one event per trace, validated).
 */
export function Today({ traces: ids }: { traces: string[] }) {
  const { traces, cards } = useGuideData()
  const shown = useShown()
  const cardShown = (id: string) => {
    const def = cards.find((c) => c.id === id)
    return !def || shown(def.on)
  }
  const items = ids
    .flatMap((id) => traces.filter((tr) => tr.id === id))
    .filter((tr) => tr.cards.length === 0 || tr.cards.some((c) => cardShown(c.id)))
    .slice(0, 2)
  if (items.length === 0) return null
  return (
    <section aria-label={t.guide.trace.today} className="mt-4 flex flex-col gap-8">
      <span className="-mb-4 text-[11px] tracking-[.14em] text-neutral-700 uppercase">
        {t.guide.trace.today}
      </span>
      {items.map((tr) => (
        <Trace
          key={tr.id}
          id={tr.id}
          anchor={`trace-today-${tr.id.replace(/^[a-z]{2}\.(place\.)?/, '')}`}
          heading="h5"
        />
      ))}
    </section>
  )
}
