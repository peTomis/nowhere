'use client'

import { format, t } from '@/i18n'
import { useGuideData } from './data'
import { Trace } from './Trace'
import { useTrip } from './trip'

/**
 * The traces of a person or city card: those in the reader's trip first, then the others under
 * "Fuori dal tuo viaggio" (from "Scheda.dc.html"). A trace is in the trip when its region is, and
 * its city when it has one.
 */
export function CardTraces({
  card,
  prefix = '',
}: {
  card: string
  /** Id prefix of a pinned copy. */
  prefix?: string
}) {
  const { cards, traces, regions } = useGuideData()
  const trip = useTrip()
  const def = cards.find((c) => c.id === card)
  if (!def) return null
  const list = def.traces.flatMap((id) => traces.filter((tr) => tr.id === id))
  const inTrip = (id: string) => {
    const tr = list.find((x) => x.id === id)
    if (!tr?.region) return true
    const city = def.kind === 'city' ? undefined : tr.city
    return trip.on(tr.region) && (!city || !trip.excluded(city))
  }
  const first = list.filter((tr) => inTrip(tr.id))
  const rest = list.filter((tr) => !inTrip(tr.id))
  const split = first.length > 0 && rest.length > 0
  const named = [...new Set(first.map((tr) => regions[tr.region ?? ''] ?? ''))].filter(Boolean)
  const regionsText =
    named.length > 1
      ? `${named.slice(0, -1).join(', ')}${t.guide.trace.and}${named.at(-1)}`
      : named[0]
  const shown = split ? first : list
  const showPlace = def.kind !== 'city'

  return (
    <section aria-label={t.guide.trace.traces} className="flex flex-col gap-8">
      <div className="flex flex-col gap-[2px]">
        <span className="text-[11px] tracking-[.14em] text-neutral-700 uppercase">
          {t.guide.trace.traces}
        </span>
        {split && (
          <span className="text-sm text-neutral-700 italic">
            {format(t.guide.trace.tripFirst, { regions: regionsText })}
          </span>
        )}
      </div>
      {shown.map((tr) => (
        <Trace
          key={tr.id}
          id={tr.id}
          card={card}
          prefix={prefix}
          showPlace={showPlace}
          text={def.traceTexts?.[tr.id]}
        />
      ))}
      {split && (
        <>
          <span className="-mb-4 text-[11px] tracking-[.14em] text-neutral-700 uppercase">
            {t.guide.trace.outsideTrip}
          </span>
          {rest.map((tr) => (
            <Trace
              key={tr.id}
              id={tr.id}
              card={card}
              prefix={prefix}
              showPlace={showPlace}
              text={def.traceTexts?.[tr.id]}
            />
          ))}
        </>
      )}
    </section>
  )
}
