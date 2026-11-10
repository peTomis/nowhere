'use client'

import {
  ArrowsClockwiseIcon,
  BuildingsIcon,
  CameraIcon,
  CheckCircleIcon,
  CheckIcon,
  CircleNotchIcon,
  CloudSlashIcon,
  CompassIcon,
  GlobeHemisphereEastIcon,
  ImageIcon,
  LockSimpleIcon,
  MapPinIcon,
  PathIcon,
  PencilSimpleIcon,
  SignpostIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import type { AlbumTrace } from '@/content/build'
import { traceAnchor } from '@/content/anchors'
import type { TraceWhere } from '@/content/types'
import { format, locale, t } from '@/i18n'
import { isSeen, retryPhoto, useCollection, type Entry } from '@/lib/reader/collection'
import { pad, useTrace } from './data'
import { openPhotoPanel } from './panelStore'
import { TRACE_ICONS } from './traceIcons'

/*
 * A trace, port of "Traccia.dc.html": the reader's photo (or the stock image in grey, or a
 * placeholder) with the album number, where it is and how rare, the name, the reader's note, the
 * state of the photo with its actions, other cards that list it, what it is and how to find it.
 * Used in the person and city cards and in the album's open box.
 */

export const WHERE_ICONS: Record<TraceWhere, typeof BuildingsIcon> = {
  city: BuildingsIcon,
  nearby: SignpostIcon,
  remote: PathIcon,
  anywhere: GlobeHemisphereEastIcon,
}

export const formatDay = (iso: string) =>
  new Date(iso).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })

/** The three rarity marks: filled up to the trace's points. */
export function RarityMarks({ points, height = 11 }: { points: number; height?: number }) {
  return (
    <span aria-hidden="true" className="flex items-center gap-[2px]">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-[3px] rounded-[1px] ${i <= points ? 'bg-text' : 'bg-neutral-300'}`}
          style={{ height }}
        />
      ))}
    </span>
  )
}

/** The image of a photo saved or being saved. */
export const photoSrc = (e: Entry | undefined, size: 'full' | 'thumb') =>
  e?.local?.preview ?? e?.photo?.[size]

const spin = (
  <CircleNotchIcon
    size={18}
    aria-hidden="true"
    className="text-accent-700 motion-safe:animate-spin"
  />
)

export function Trace({
  id,
  card,
  anchor,
  prefix = '',
  showPlace = true,
}: {
  id: string
  /** HTML id when the trace is not in a card (the coat of arms and the flag in the text). */
  anchor?: string
  /** The card that lists it: gives its anchor, and "Anche in" names the other cards. */
  card?: string
  /** Id prefix of a pinned copy ("ev-"), so anchors stay unique. */
  prefix?: string
  /** The place line under the name; city cards leave it out (it is the card's city). */
  showPlace?: boolean
}) {
  const trace = useTrace(id)
  const { session, entries } = useCollection()
  if (!trace) return null
  const entry = entries[trace.key]
  const seen = isSeen(entry)
  const num = pad(trace.num)
  const local = entry?.local
  const date = seen ? formatDay(local?.createdAt ?? entry!.photo!.createdAt) : ''
  const src = photoSrc(entry, 'full')
  const stock = !seen ? trace.image : undefined
  const Where = WHERE_ICONS[trace.where]
  const Glyph = TRACE_ICONS[trace.icon]
  const others = trace.cards.filter((c) => c.id !== card)
  const alt = seen
    ? format(t.guide.trace.altSeen, { name: trace.name, date })
    : format(stock ? t.guide.trace.altStock : t.guide.trace.altEmpty, { num, name: trace.name })
  const rarity = t.guide.album.rarityLabel[trace.rarity]
  const edit = () => openPhotoPanel(trace.id, 'edit')

  return (
    <article
      id={card ? traceAnchor(card, trace.id, prefix) : anchor}
      aria-label={format(seen ? t.guide.trace.ariaSeen : t.guide.trace.aria, {
        num,
        name: trace.name,
      })}
      className="flex scroll-mt-[80px] flex-col gap-4 font-body [text-wrap:pretty] text-text"
    >
      <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
        <figure className="m-0 flex min-w-0 flex-[1_1_260px] flex-col gap-2">
          <div
            role="img"
            aria-label={alt}
            className={`relative aspect-[4/3] w-full overflow-hidden rounded-md border-[1.5px] bg-bg ${seen ? 'border-transparent' : 'border-dashed border-neutral-500'}`}
          >
            {seen && src ? (
              // eslint-disable-next-line @next/next/no-img-element -- signed URL or local preview
              <img src={src} alt="" className="absolute inset-0 size-full object-cover" />
            ) : stock?.fit === 'contain' ? (
              // An emblem: whole, centered, under the number.
              <div className="absolute inset-[30%_16%_10%] opacity-[.22] grayscale">
                <Image src={stock.src} alt="" fill sizes="280px" className="object-contain" />
              </div>
            ) : stock ? (
              <div className="absolute inset-0 opacity-[.22] grayscale">
                <Image src={stock.src} alt="" fill sizes="360px" className="object-cover" />
                <Glyph
                  weight="duotone"
                  aria-hidden="true"
                  className="absolute right-[12%] bottom-[22%] size-[clamp(72px,16vw,104px)] text-neutral-900"
                />
              </div>
            ) : (
              !seen && (
                <div className="absolute inset-0 grid place-items-center bg-neutral-200">
                  <ImageIcon
                    weight="duotone"
                    size={56}
                    aria-hidden="true"
                    className="text-neutral-700"
                  />
                </div>
              )
            )}
            {seen ? (
              <span
                aria-hidden="true"
                className="absolute top-[8px] left-[8px] flex items-center gap-1 rounded-md bg-bg py-[2px] pr-[8px] pl-[6px] text-[13px] font-semibold tabular-nums shadow-sm"
              >
                <CheckIcon weight="bold" size={14} className="text-accent-700" />
                {num}
              </span>
            ) : (
              <span
                aria-hidden="true"
                className="absolute top-[6px] left-[14px] text-[clamp(48px,10vw,64px)] leading-none font-semibold tracking-[-.03em] text-text tabular-nums"
              >
                {num}
              </span>
            )}
            {local?.state === 'pending' && (
              <div className="absolute inset-0 grid place-items-center bg-[color-mix(in_srgb,var(--color-bg)_50%,transparent)]">
                <span className="flex items-center gap-[8px] rounded-md bg-bg px-3 py-[6px] text-sm shadow-sm">
                  {spin}
                  {t.guide.trace.loadingPhoto}
                </span>
              </div>
            )}
          </div>
          {stock?.credit && (
            <figcaption className="m-0 text-xs leading-[1.4] text-neutral-700">
              {t.guide.trace.stock} · {stock.credit.author} ·{' '}
              {stock.credit.url ? (
                <a
                  href={stock.credit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-800 underline decoration-neutral-400 underline-offset-2"
                >
                  {stock.credit.license}
                </a>
              ) : (
                stock.credit.license
              )}
            </figcaption>
          )}
        </figure>

        <div className="flex min-w-0 flex-[999_1_280px] flex-col gap-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] leading-[1.3] tracking-[.14em] text-neutral-700 uppercase">
            <span className="flex flex-wrap items-center gap-x-[6px] gap-y-[2px]">
              <Where weight="duotone" size={16} aria-hidden="true" />
              <span>{t.guide.album.where[trace.where]}</span>
              {trace.distance && (
                <span className="text-[13px] tracking-normal text-neutral-800 normal-case italic">
                  {trace.distance}
                </span>
              )}
            </span>
            <span
              role="img"
              aria-label={format(t.guide.trace.rarityAria, {
                rarity: rarity.toLowerCase(),
                points:
                  trace.points === 1
                    ? t.guide.trace.pointOne
                    : format(t.guide.trace.points, { n: trace.points }),
              })}
              className="flex items-center gap-[6px]"
            >
              <RarityMarks points={trace.points} />
              <span aria-hidden="true">{rarity}</span>
            </span>
          </div>
          <h4 className="m-0 text-[clamp(20px,3.6vw,24px)] leading-[1.2]">
            {trace.name}
            {trace.local && trace.local !== trace.name && (
              <span className="ml-[.3em] font-normal text-neutral-700 italic">{trace.local}</span>
            )}
          </h4>
          {showPlace && trace.place && (
            <span className="flex items-center gap-[6px] text-sm leading-[1.4] text-neutral-700">
              <MapPinIcon weight="duotone" size={16} aria-hidden="true" />
              {trace.place}
            </span>
          )}

          {seen && entry?.note && (
            <div className="mt-1 flex flex-col gap-1">
              <span className="max-w-[48ch] text-[17px] leading-[1.45] italic">«{entry.note}»</span>
              <span className="flex items-center gap-[6px] text-xs text-neutral-700">
                <LockSimpleIcon weight="duotone" size={14} aria-hidden="true" />
                {t.guide.trace.private}
              </span>
            </div>
          )}

          <div className="mt-1 flex flex-col gap-2">
            <TraceActions
              trace={trace}
              entry={entry}
              signedOut={session === 'signed-out'}
              date={date}
              onEdit={edit}
            />
          </div>

          {others.length > 0 && (
            <span className="flex flex-wrap items-center gap-[6px] text-sm text-neutral-700">
              {t.guide.trace.alsoIn}
              {others.map((c) => (
                <a
                  key={c.id}
                  href={`#${traceAnchor(c.id, trace.id)}`}
                  className="-my-[10px] py-[10px] text-accent-700 hover:text-accent-800 hover:underline"
                >
                  {c.name}
                </a>
              ))}
            </span>
          )}
        </div>
      </div>

      {/* The description is optional: without it, "Come trovarla" takes the whole row. */}
      <div className="flex flex-wrap items-start gap-x-6 gap-y-3">
        {trace.text && (
          <p className="m-0 max-w-[56ch] min-w-0 flex-[1_1_280px] text-base leading-[1.55]">
            {trace.text}
          </p>
        )}
        <div
          className={`flex min-w-0 flex-col gap-[2px] ${trace.text ? 'max-w-[56ch] flex-[1_1_240px]' : 'flex-1'}`}
        >
          <span className="flex items-center gap-[6px] text-[11px] tracking-[.14em] text-neutral-700 uppercase">
            <CompassIcon weight="duotone" size={16} aria-hidden="true" />
            {t.guide.trace.find}
          </span>
          <span className="text-[15px] leading-[1.5] text-neutral-800">{trace.find}</span>
        </div>
      </div>
    </article>
  )
}

const ghost =
  'btn btn-ghost inline-flex min-h-[44px] items-center gap-[6px] px-2 text-[15px] text-accent-700'

function TraceActions({
  trace,
  entry,
  signedOut,
  date,
  onEdit,
}: {
  trace: AlbumTrace
  entry: Entry | undefined
  signedOut: boolean
  date: string
  onEdit: () => void
}) {
  const local = entry?.local
  const editButton = (
    <button type="button" className={ghost} onClick={onEdit}>
      <PencilSimpleIcon weight="duotone" size={18} aria-hidden="true" />
      {t.guide.trace.edit}
    </button>
  )
  if (!isSeen(entry)) {
    if (signedOut)
      return (
        <div>
          <Link
            href="/account"
            className="btn btn-secondary inline-flex min-h-[44px] items-center gap-[8px] bg-bg text-left text-[15px] whitespace-normal no-underline"
          >
            <CameraIcon weight="duotone" size={20} aria-hidden="true" className="text-accent-700" />
            {t.guide.trace.signIn}
          </Link>
        </div>
      )
    return (
      <div>
        <button
          type="button"
          className="btn btn-secondary inline-flex min-h-[44px] items-center gap-[8px] bg-bg text-left text-[15px] whitespace-normal"
          onClick={() => openPhotoPanel(trace.id, 'new')}
        >
          <CameraIcon weight="duotone" size={20} aria-hidden="true" className="text-accent-700" />
          {t.guide.trace.add}
        </button>
      </div>
    )
  }
  if (local?.state === 'pending')
    return (
      <span
        role="status"
        className="flex min-h-[44px] items-center gap-[8px] text-sm text-neutral-800"
      >
        {spin}
        {format(t.guide.trace.saving, { date })}
      </span>
    )
  if (local?.state === 'offline')
    return (
      <div role="status" className="flex flex-wrap items-center gap-x-2">
        <span className="flex items-start gap-[6px] py-[10px] text-sm leading-[1.45] text-neutral-800">
          <CloudSlashIcon
            weight="duotone"
            size={20}
            aria-hidden="true"
            className="flex-none text-neutral-700"
          />
          <span>{format(t.guide.trace.offline, { date })}</span>
        </span>
        {editButton}
      </div>
    )
  if (local)
    return (
      <div role="alert" className="flex flex-col gap-2 rounded-md bg-surface px-4 py-3">
        <span className="flex items-center gap-[8px] text-[15px] font-semibold">
          <WarningCircleIcon weight="duotone" size={20} aria-hidden="true" />
          {t.guide.trace.errorTitle}
        </span>
        <span className="text-sm leading-[1.45] text-neutral-800">
          {local.state === 'session' ? t.guide.trace.errorSession : t.guide.trace.errorText}
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-secondary inline-flex min-h-[44px] items-center gap-[8px] bg-bg text-[15px]"
            onClick={() => retryPhoto(trace.key)}
          >
            <ArrowsClockwiseIcon
              weight="duotone"
              size={18}
              aria-hidden="true"
              className="text-accent-700"
            />
            {t.guide.trace.retry}
          </button>
          <button type="button" className={ghost} onClick={onEdit}>
            {t.guide.trace.edit}
          </button>
        </div>
      </div>
    )
  return (
    <div className="flex flex-wrap items-center gap-x-2">
      <span className="mr-1 flex min-h-[44px] items-center gap-[6px] text-sm text-neutral-800">
        <CheckCircleIcon
          weight="duotone"
          size={20}
          aria-hidden="true"
          className="text-accent-700"
        />
        {format(t.guide.trace.seenOn, { date })}
      </span>
      {editButton}
    </div>
  )
}
