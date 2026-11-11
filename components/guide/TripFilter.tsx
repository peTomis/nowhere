'use client'

import { CaretDownIcon, CaretUpIcon, CheckSquareIcon, SquareIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { useTrip } from './trip'
import { format, t } from '@/i18n'

/** Trip filter (shown as "Filtra per regione"): regions as checkboxes and read-only cities. */
export function TripFilter({ country, size }: { country: string; size: 'sidebar' | 'menu' }) {
  const trip = useTrip()
  const [open, setOpen] = useState<string[]>([])
  const big = size === 'menu'
  const { regions, regionsTotal, cities } = trip.counts
  const recap = trip.filtered
    ? format(t.guide.trip.recap, { regions, regionsTotal, cities })
    : t.guide.trip.fullText

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[11px] tracking-[.16em] text-neutral-700 uppercase">
          {t.guide.trip.title}
        </span>
        {trip.filtered && (
          <button
            type="button"
            onClick={trip.showAll}
            className={`cursor-pointer border-0 bg-transparent p-0 font-body text-accent-700 hover:text-accent-800 hover:underline ${big ? 'min-h-[44px] text-[15px]' : 'text-[13px]'}`}
          >
            {t.guide.trip.showAll}
          </button>
        )}
      </div>
      <div className="flex flex-col gap-[2px]">
        <span className={`leading-[1.3] font-semibold ${big ? 'text-xl' : 'text-base'}`}>
          {country}
        </span>
        <span
          className={`leading-[1.4] text-neutral-700 italic ${big ? 'text-[15px]' : 'text-[13px]'}`}
        >
          {recap}
        </span>
      </div>
      <div className={`flex flex-col ${big ? '' : 'gap-[2px]'}`}>
        {trip.places.map((p) => {
          const ron = trip.on(p.id)
          const isOpen = open.includes(p.id)
          const Box = ron ? CheckSquareIcon : SquareIcon
          const Caret = isOpen ? CaretUpIcon : CaretDownIcon
          return (
            <div key={p.id} className="flex flex-col">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={ron}
                  onClick={() => trip.toggleRegion(p.id)}
                  className={`flex min-w-0 flex-1 cursor-pointer items-center gap-[8px] border-0 bg-transparent p-0 text-left font-body leading-[1.3] font-semibold text-text hover:text-accent-700 ${big ? 'min-h-[44px] text-lg' : 'min-h-[28px] text-[15px]'}`}
                >
                  <Box
                    weight="duotone"
                    size={big ? 22 : 20}
                    className={ron ? 'text-accent-700' : 'text-neutral-600'}
                  />
                  <span>{p.name}</span>
                </button>
                {p.cities.length > 0 && (
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-label={format(t.guide.trip.citiesOf, { name: p.name })}
                    onClick={() =>
                      setOpen((value) =>
                        value.includes(p.id) ? value.filter((id) => id !== p.id) : [...value, p.id],
                      )
                    }
                    className={`flex flex-none cursor-pointer items-center gap-1 border-0 bg-transparent px-[2px] font-body text-neutral-700 tabular-nums hover:text-accent-700 ${big ? 'min-h-[44px] min-w-[64px] justify-end text-[15px]' : 'min-h-[28px] text-[13px]'}`}
                  >
                    <span>{p.cities.length}</span>
                    <Caret weight="duotone" size={big ? 18 : 16} />
                  </button>
                )}
              </div>
              {p.cities.length > 0 && isOpen && (
                <div
                  className={`flex flex-wrap ${big ? 'gap-[8px] pt-1 pb-[12px] pl-[30px]' : 'gap-[6px] pt-1 pb-[8px] pl-[28px]'} ${ron ? '' : 'opacity-45'}`}
                  aria-label={format(t.guide.trip.citiesOf, { name: p.name })}
                >
                  {p.cities.map((c) => (
                    <span
                      key={c.id}
                      className={`tag font-body ${ron ? 'tag-accent' : 'tag-neutral'} ${big ? 'min-h-[44px] px-[14px] text-[15px]' : 'text-[13px]'}`}
                    >
                      {c.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
