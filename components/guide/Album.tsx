'use client'

import { CheckIcon, PushPinIcon, XIcon } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { Completion } from '@/components/Completion'
import type { AlbumTrace } from '@/content/build'
import { format, t } from '@/i18n'
import { isSeen, useCollection, type Entry } from '@/lib/reader/collection'
import { pad, useGuideData } from './data'
import { usePins } from './Pins'
import { photoSrc, RarityMarks, Trace } from './Trace'
import { TRACE_ICONS } from './traceIcons'

/**
 * The album view of a guide, port of "Album.dc.html": title, full completion, region filter, the
 * pinned cards ("In evidenza") and one page per region with a box per trace. The first page is the
 * whole country: the cover, the coat of arms and the flag. A box opens the trace ("Traccia") in a
 * bottom sheet on phones, a window from 640px.
 */
export function Album() {
  const { traces, cards, name, country, regions } = useGuideData()
  const { entries } = useCollection()
  const pins = usePins(country)
  const [region, setRegion] = useState<string | null>(null)
  const [open, setOpen] = useState<string | null>(null)
  const seen = (tr: AlbumTrace) => isSeen(entries[tr.key])
  const ofRegion = (r: string | null) => traces.filter((tr) => r === null || tr.region === r)
  // Regions without traces have no page and no filter.
  const withTraces = Object.entries(regions).filter(([id]) => ofRegion(id).length > 0)
  const filters = [
    { id: null, name: t.guide.album.all },
    ...withTraces.map(([id, n]) => ({ id, name: n })),
  ].map((f) => {
    const list = ofRegion(f.id)
    return { ...f, count: `${list.filter(seen).length}/${list.length}` }
  })
  const pages = [
    ...(region === null
      ? [{ id: 'country', name, traces: traces.filter((tr) => !tr.region) }]
      : []),
    ...Object.entries(regions)
      .filter(([id]) => region === null || id === region)
      .map(([id, n]) => ({ id, name: n, traces: ofRegion(id) })),
  ].filter((p) => p.traces.length > 0)
  const pinned = pins.flatMap((p) => {
    const card = cards.find((c) => c.id === p.card)
    if (!card) return []
    const list = card.traces
      .flatMap((id) => traces.filter((tr) => tr.id === id))
      .sort((a, b) => a.num - b.num)
    return [{ id: `pinned-${card.anchor}`, name: card.name, traces: list }]
  })
  const current = open ? traces.find((tr) => tr.id === open) : undefined

  return (
    <div className="mx-auto max-w-[1100px] px-[clamp(20px,5vw,48px)] pt-[clamp(48px,8vw,96px)]">
      <div className="flex flex-col gap-[60px] font-body [text-wrap:pretty] text-text">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs tracking-[.16em] text-accent-700 uppercase">
              {format(t.guide.album.kicker, { name, n: traces.length })}
            </span>
            <h2 className="m-0 text-[clamp(40px,8vw,64px)] leading-none font-semibold tracking-[-.02em]">
              {t.guide.album.heading}
            </h2>
          </div>
          <Completion name={name} traces={traces} variant="full" className="max-w-[560px]" />
          {withTraces.length > 0 && (
            <div
              role="group"
              aria-label={t.guide.album.regionFilter}
              className="flex flex-wrap gap-2"
            >
              {filters.map((f) => {
                const on = region === f.id
                return (
                  <button
                    key={f.id ?? 'all'}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setRegion(f.id)}
                    className={`flex min-h-[44px] cursor-pointer items-center gap-[8px] rounded-md border-0 px-4 font-body text-[15px] hover:bg-accent-100 ${on ? 'bg-accent-100 text-accent-800 shadow-[inset_0_0_0_1.5px_var(--color-accent)]' : 'bg-transparent text-text shadow-[inset_0_0_0_1px_var(--color-neutral-300)]'}`}
                  >
                    <span>{f.name}</span>
                    <span className="text-[13px] text-neutral-700 tabular-nums">{f.count}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {pinned.length > 0 && (
          <section aria-labelledby="album-pinned" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h3
                id="album-pinned"
                className="m-0 flex items-center gap-[10px] text-[clamp(26px,5vw,34px)] leading-[1.1]"
              >
                <PushPinIcon
                  weight="duotone"
                  size={24}
                  aria-hidden="true"
                  className="text-accent-700"
                />
                {t.guide.album.pinnedTitle}
              </h3>
              <span className="max-w-[52ch] text-[15px] leading-[1.45] text-neutral-700 italic">
                {t.guide.album.pinnedLede}
              </span>
            </div>
            {pinned.map((p) => (
              <Page key={p.id} page={p} entries={entries} onOpen={setOpen} level={4} />
            ))}
          </section>
        )}

        {traces.length === 0 ? (
          <p className="m-0 text-[17px] text-neutral-700 italic">{t.guide.album.empty}</p>
        ) : (
          pages.map((p) => <Page key={p.id} page={p} entries={entries} onOpen={setOpen} />)
        )}
      </div>
      {current && (
        <TraceDialog
          trace={current}
          region={current.region ? regions[current.region] : name}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  )
}

function Page({
  page,
  entries,
  onOpen,
  level = 3,
}: {
  page: { id: string; name: string; traces: AlbumTrace[] }
  entries: Record<string, Entry>
  onOpen: (id: string) => void
  level?: 3 | 4
}) {
  const seenList = page.traces.filter((tr) => isSeen(entries[tr.key]))
  const points = seenList.reduce((s, tr) => s + tr.points, 0)
  const total = page.traces.reduce((s, tr) => s + tr.points, 0)
  const H = level === 3 ? 'h3' : 'h4'
  return (
    <section aria-labelledby={`album-${page.id}`} className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <H
          id={`album-${page.id}`}
          className={`m-0 ${level === 3 ? 'text-[clamp(26px,5vw,34px)] leading-[1.1]' : 'text-xl leading-[1.2]'}`}
        >
          {page.name}
        </H>
        <span className="text-[15px] text-neutral-700 tabular-nums">
          {format(t.guide.album.regionLine, {
            seen: seenList.length,
            n: page.traces.length,
            points,
            total,
          })}
        </span>
      </div>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-3 gap-y-4 p-0">
        {page.traces.map((tr) => (
          <li key={tr.id} className="min-w-0">
            <TraceBox trace={tr} entry={entries[tr.key]} onOpen={() => onOpen(tr.id)} />
          </li>
        ))}
      </ul>
    </section>
  )
}

/** A box of the album: the reader's photo with a check, or a dashed box with number and icon. */
function TraceBox({
  trace,
  entry,
  onOpen,
}: {
  trace: AlbumTrace
  entry: Entry | undefined
  onOpen: () => void
}) {
  const num = pad(trace.num)
  const where = t.guide.album.where[trace.where]
  const seen = isSeen(entry)
  const src = photoSrc(entry, 'thumb')
  const Glyph = TRACE_ICONS[trace.icon]
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={
        format(t.guide.album.traceAria, {
          num,
          name: trace.name,
          rarity: t.guide.album.rarity[trace.rarity],
          where: where.toLowerCase(),
          state: seen ? t.guide.album.seen : t.guide.album.toFind,
        }) + (trace.isNew && !seen ? t.guide.album.isNewAria : '')
      }
      className="flex w-full cursor-pointer flex-col gap-2 border-0 bg-transparent p-0 text-left font-body text-text hover:text-accent-800"
    >
      <span
        className={`relative block aspect-[4/3] w-full overflow-hidden rounded-md border-[1.5px] bg-bg ${seen ? 'border-transparent' : 'border-dashed border-neutral-500'}`}
      >
        {seen ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- signed URL or local preview */}
            {src && <img src={src} alt="" className="absolute inset-0 size-full object-cover" />}
            <span
              aria-hidden="true"
              className="absolute top-[6px] left-[6px] flex items-center gap-[3px] rounded-md bg-bg py-px pr-[7px] pl-[5px] text-xs font-semibold tabular-nums shadow-sm"
            >
              <CheckIcon weight="bold" size={13} className="text-accent-700" />
              {num}
            </span>
          </>
        ) : (
          <>
            <span
              aria-hidden="true"
              className="absolute top-[6px] left-[12px] text-[44px] leading-none font-semibold tracking-[-.03em] text-neutral-600 tabular-nums"
            >
              {num}
            </span>
            <Glyph
              weight="duotone"
              size={32}
              aria-hidden="true"
              className="absolute right-[12px] bottom-[10px] text-neutral-400"
            />
          </>
        )}
        {trace.isNew && !seen && (
          <span className="tag tag-accent-2 absolute top-[6px] right-[6px]">
            {t.guide.album.isNew}
          </span>
        )}
      </span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="text-[15px] leading-[1.3] font-semibold">{trace.name}</span>
        <span aria-hidden="true" className="flex items-center gap-[8px] text-xs text-neutral-700">
          <RarityMarks points={trace.points} height={10} />
          {trace.where === 'city' && trace.city ? trace.city : where}
        </span>
      </span>
    </button>
  )
}

/** An open box: the whole trace, in a bottom sheet (phones) or a window (from 640px). */
function TraceDialog({
  trace,
  region,
  onClose,
}: {
  trace: AlbumTrace
  region: string
  onClose: () => void
}) {
  const close = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    close.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      // The photo panel, on top, closes first.
      if (e.key === 'Escape' && !document.querySelector('[aria-modal="true"][aria-labelledby]'))
        onClose()
    }
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      opener?.focus?.()
    }
  }, [onClose])
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-[color-mix(in_srgb,var(--color-neutral-900)_50%,transparent)] sm:items-center sm:p-6"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={format(t.guide.trace.aria, { num: pad(trace.num), name: trace.name })}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92%] w-full flex-col overflow-hidden rounded-t-lg bg-bg shadow-lg sm:max-h-[min(820px,100%)] sm:w-[min(720px,100%)] sm:rounded-lg"
      >
        <div aria-hidden="true" className="flex flex-none justify-center pt-[10px] sm:hidden">
          <span className="h-[4px] w-[40px] rounded-[2px] bg-neutral-300" />
        </div>
        <div className="flex flex-none items-center justify-between gap-2 pt-2 pr-3 pl-4">
          <span className="text-[11px] tracking-[.14em] text-neutral-700 uppercase">
            {format(t.guide.album.dialogKicker, { region })}
          </span>
          <button
            ref={close}
            type="button"
            className="btn btn-ghost btn-icon size-[44px] text-text"
            aria-label={t.guide.album.close}
            onClick={onClose}
          >
            <XIcon size={22} aria-hidden="true" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-2 pb-[calc(20px+env(safe-area-inset-bottom,0px))]">
          <Trace id={trace.id} />
        </div>
      </div>
    </div>
  )
}
