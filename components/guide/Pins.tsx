'use client'

import { CaretDownIcon, CaretRightIcon, MapTrifoldIcon, PushPinIcon } from '@phosphor-icons/react'
import { useId, useSyncExternalStore, type ReactNode } from 'react'
import { format, t } from '@/i18n'
import { isSeen, useCollection } from '@/lib/reader/collection'
import { pinsOf, pinsUsed, setPins, subscribePrefs, type Pin } from '@/lib/reader/prefs'
import { useGuideData } from './data'
import { showNotice } from './notice'
import { useTrip } from './trip'

/*
 * Pinning person and city cards to the top of the guide: the pin button ("Fissa.dc.html") and
 * the "In evidenza" box ("InEvidenza.dc.html") with a full copy of every pinned card, open or
 * folded. Pins are a device preference (lib/reader/prefs.ts). Pinning sections is not ported.
 */

export const PINNED_ID = 'in-evidenza'

const NONE: Pin[] = []

export function usePins(country: string): Pin[] {
  return useSyncExternalStore(
    subscribePrefs,
    () => pinsOf(country),
    () => NONE,
  )
}

function usePinsUsed(country: string): boolean {
  return useSyncExternalStore(
    subscribePrefs,
    () => pinsUsed(country),
    () => false,
  )
}

function scrollToPinned() {
  const el = document.getElementById(PINNED_ID)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 88,
    behavior: reduce ? 'auto' : 'smooth',
  })
}

/** The round pin button next to a card's title. */
export function PinButton({ card, name }: { card: string; name: string }) {
  const { country } = useGuideData()
  const pins = usePins(country)
  const on = pins.some((p) => p.card === card)
  const toggle = () => {
    if (!on) {
      setPins(country, [
        { card, collapsed: false, createdAt: Date.now() },
        ...pins.filter((p) => p.card !== card),
      ])
      showNotice({
        text: format(t.guide.pins.pinned, { name }),
        action: t.guide.pins.see,
        icon: 'pin',
        run: scrollToPinned,
      })
      return
    }
    const before = pins
    setPins(
      country,
      pins.filter((p) => p.card !== card),
    )
    showNotice({
      text: format(t.guide.pins.unpinned, { name }),
      action: t.guide.pins.undo,
      icon: 'unpin',
      run: () => setPins(country, before),
    })
  }
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={format(t.guide.pins.button, { name })}
      title={on ? t.guide.pins.unpin : t.guide.pins.pin}
      onClick={(e) => {
        e.stopPropagation()
        toggle()
      }}
      className="grid size-[44px] flex-none cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0 font-body text-text hover:bg-accent-100 active:bg-accent-200"
    >
      <span
        aria-hidden="true"
        className={`grid size-[34px] place-items-center rounded-full border-[1.5px] transition-colors ${on ? 'border-accent-700 bg-accent-700 text-bg' : 'border-neutral-500 bg-transparent text-neutral-800'}`}
      >
        <PushPinIcon weight="duotone" size={18} />
      </span>
    </button>
  )
}

/**
 * "In evidenza", at the top of the text: the pinned cards, newest first, each a full copy that
 * can be folded. Before the first pin, a short explanation. Not shown in guides without cards.
 */
export function Pinned({ copies }: { copies: Record<string, ReactNode> }) {
  const { country, cards, regions, traces } = useGuideData()
  const pins = usePins(country)
  const used = usePinsUsed(country)
  const { entries } = useCollection()
  const trip = useTrip()
  const ids = useId()
  const items = pins.flatMap((p) => {
    const card = cards.find((c) => c.id === p.card)
    return card && copies[card.id] ? [{ pin: p, card }] : []
  })
  if (cards.length === 0 || (items.length === 0 && used)) return null
  const fold = (card: string, collapsed: boolean) =>
    setPins(
      country,
      pins.map((p) => (p.card === card ? { ...p, collapsed } : p)),
    )

  return (
    <section
      id={PINNED_ID}
      aria-labelledby={`${ids}-h`}
      className="flex scroll-mt-[88px] flex-col gap-2 rounded-md bg-surface px-[clamp(16px,3.5vw,32px)] py-[clamp(16px,3.5vw,28px)]"
    >
      <h2
        id={`${ids}-h`}
        className="m-0 flex items-center gap-[8px] text-xs leading-[1.3] font-normal tracking-[.16em] text-accent-700 uppercase"
      >
        <PushPinIcon weight="duotone" size={18} aria-hidden="true" />
        {t.guide.pins.title}
      </h2>
      {items.length === 0 && (
        <p className="mt-1 mb-0 max-w-[56ch] text-base leading-[1.55] text-neutral-800">
          {t.guide.pins.empty.split('{icon}')[0]}
          <span
            role="img"
            aria-label={t.guide.pins.iconLabel}
            className="mx-[2px] inline-grid size-[26px] place-items-center rounded-full border-[1.5px] border-neutral-500 align-middle text-neutral-800"
          >
            <PushPinIcon weight="duotone" size={14} aria-hidden="true" />
          </span>
          {t.guide.pins.empty.split('{icon}')[1]}
        </p>
      )}
      {items.map(({ pin, card }) => {
        const open = !pin.collapsed
        const seen = card.traces.filter((id) =>
          isSeen(entries[traces.find((tr) => tr.id === id)?.key ?? '']),
        ).length
        // A person belongs to the whole guide; a city can be out of the trip.
        const outside = card.kind === 'city' && !trip.on(card.id)
        const Caret = open ? CaretDownIcon : CaretRightIcon
        return (
          <div key={card.id} className="flex flex-col">
            <div className="flex items-center gap-1">
              <h3 className="m-0 min-w-0 flex-1 font-[inherit] text-[length:inherit] leading-[inherit]">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => fold(card.id, open)}
                  className="flex min-h-[52px] w-full cursor-pointer items-center gap-[10px] border-0 bg-transparent py-1 text-left font-body text-text hover:text-accent-800"
                >
                  <Caret size={20} aria-hidden="true" className="flex-none text-neutral-700" />
                  <span className="flex min-w-0 flex-col gap-[2px]">
                    {open && (
                      <span className="text-[11px] leading-[1.3] tracking-[.14em] text-accent-700 uppercase">
                        {t.guide.album.kind[card.kind]} · {regions[card.region]}
                      </span>
                    )}
                    <span className="flex flex-wrap items-baseline gap-x-[10px] gap-y-[2px]">
                      <span
                        className={`leading-[1.15] font-semibold ${open ? 'text-[clamp(24px,4.6vw,30px)]' : 'text-[19px]'}`}
                      >
                        {card.name}
                      </span>
                      <span className="text-sm leading-[1.3] whitespace-nowrap text-neutral-700 tabular-nums">
                        {format(t.guide.pins.seenCount, { seen, n: card.traces.length })}
                      </span>
                      {outside && (
                        <span className="inline-flex items-center gap-1 text-[13px] leading-[1.3] whitespace-nowrap text-neutral-800 italic">
                          <MapTrifoldIcon weight="duotone" size={15} aria-hidden="true" />
                          {t.guide.pins.outside}
                        </span>
                      )}
                    </span>
                  </span>
                </button>
              </h3>
              <PinButton card={card.id} name={card.name} />
            </div>
            {open && (
              <div className="flex flex-col gap-4 pt-3 pb-6">
                {outside && (
                  <p className="m-0 max-w-[56ch] text-[15px] leading-[1.5] text-neutral-800 italic">
                    {format(t.guide.pins.outsideText, { name: card.name })}
                  </p>
                )}
                {copies[card.id]}
              </div>
            )}
          </div>
        )
      })}
    </section>
  )
}
