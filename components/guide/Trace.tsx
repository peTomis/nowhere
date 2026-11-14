'use client'

import {
  ArrowsClockwiseIcon,
  BuildingsIcon,
  CheckCircleIcon,
  CheckIcon,
  CircleNotchIcon,
  CloudSlashIcon,
  CompassIcon,
  GlobeHemisphereEastIcon,
  ImageIcon,
  LockSimpleIcon,
  MapPinIcon,
  MapTrifoldIcon,
  PathIcon,
  PencilSimpleIcon,
  SignpostIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import type { AlbumTrace } from '@/content/build'
import { traceAnchor } from '@/content/anchors'
import type { TraceTheme, TraceWhere } from '@/content/types'
import { format, locale, t } from '@/i18n'
import { isSeen, retryPhoto, useCollection, type Entry } from '@/lib/reader/collection'
import { pad, useTrace } from './data'
import { openPhotoPanel } from './panelStore'
import { PhotoViewer } from './PhotoViewer'
import { TRACE_ICONS } from './traceIcons'

/*
 * A trace, port of "Traccia.dc.html": the reader's photo (or the stock image in grey, or a
 * placeholder) with the album number, where it is and how rare, the name, the reader's note, the
 * state of the photo with its actions, other cards that list it, what it is and how to find it.
 * Used in the person and city cards and in the album's open box. The image opens the reader's
 * photo full screen, or, without one, does what the add button does.
 */

export const WHERE_ICONS: Record<TraceWhere, typeof BuildingsIcon> = {
  city: BuildingsIcon,
  nearby: SignpostIcon,
  remote: PathIcon,
  region: MapTrifoldIcon,
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
          className={`w-[3px] rounded-sm ${i <= points ? 'bg-text' : 'bg-neutral-300'}`}
          style={{ height }}
        />
      ))}
    </span>
  )
}

/** The image of a photo saved or being saved. */
/** Border of a trace's box: none with the reader's photo, else dashed in the theme's color. */
export const boxBorder = (seen: boolean, theme: TraceTheme | null) =>
  seen
    ? 'border-transparent'
    : theme === 'nature'
      ? 'border-dashed border-album-nature'
      : theme === 'food'
        ? 'border-dashed border-album-food'
        : 'border-dashed border-neutral-500'

/**
 * Author and licence of a trace's stock image. Shown in the photo panel, not under the box: the
 * image is only a grey placeholder until the reader's photo replaces it.
 */
export function StockCredit({ credit }: { credit: NonNullable<AlbumTrace['image']>['credit'] }) {
  if (!credit) return null
  return (
    <p className="m-0 text-xs leading-[1.4] text-neutral-700">
      {t.guide.trace.stock} · {credit.author} ·{' '}
      {credit.url ? (
        <a
          href={credit.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-800 underline decoration-neutral-400 underline-offset-2"
        >
          {credit.license}
        </a>
      ) : (
        credit.license
      )}
    </p>
  )
}

/** "Museo nazionale di storia della Romania, Bucarest, Valacchia": the site, then the place. */
export const placeLine = (trace: Pick<AlbumTrace, 'within' | 'place'>) =>
  [trace.within, trace.place].filter(Boolean).join(', ')

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
  text,
  heading: Heading = 'h4',
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
  /** Description in this card; the album keeps the shared trace description. */
  text?: string
  /** The name's heading: h5 under a timeline event, whose title is an h4. */
  heading?: 'h4' | 'h5'
}) {
  const trace = useTrace(id)
  const { session, entries } = useCollection()
  const router = useRouter()
  const [viewing, setViewing] = useState(false)
  if (!trace) return null
  const description = text ?? trace.text
  // City cards leave the place out (it is the card's city), but keep the site it is in.
  const pinLine = showPlace ? placeLine(trace) : trace.within
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
  const signedOut = session === 'signed-out'
  // Without a photo, the image is the add button (there is no separate one).
  const add = () => (signedOut ? router.push('/account') : openPhotoPanel(trace.id, 'new'))
  const box = `relative block aspect-[4/3] w-full overflow-hidden rounded-md border-[1.5px] bg-bg p-0 ${boxBorder(seen, trace.theme)}`

  return (
    <article
      id={card ? traceAnchor(card, trace.id, prefix) : anchor}
      aria-label={format(seen ? t.guide.trace.ariaSeen : t.guide.trace.aria, {
        num,
        name: trace.name,
      })}
      className="flex scroll-mt-16 flex-col gap-4 font-body text-pretty text-text"
    >
      <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
        <figure className="m-0 flex min-w-0 flex-[1_1_260px] flex-col gap-2">
          <PhotoBox
            box={box}
            alt={alt}
            onView={seen && src ? () => setViewing(true) : undefined}
            onAdd={seen ? undefined : add}
            addLabel={signedOut ? t.guide.trace.signIn : t.guide.trace.add}
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
          </PhotoBox>
          {viewing && src && <PhotoViewer src={src} alt={alt} onClose={() => setViewing(false)} />}
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
          <Heading className="m-0 text-[clamp(20px,3.6vw,24px)] leading-[1.2]">
            {trace.name}
            {trace.local && trace.local !== trace.name && (
              <span className="ml-[.3em] font-normal text-neutral-700 italic">{trace.local}</span>
            )}
          </Heading>
          {pinLine && (
            <span className="flex items-center gap-[6px] text-sm leading-[1.4] text-neutral-700">
              <MapPinIcon weight="duotone" size={16} aria-hidden="true" />
              {pinLine}
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
            <TraceActions trace={trace} entry={entry} date={date} onEdit={edit} />
          </div>

          {others.length > 0 && (
            <span className="flex flex-wrap items-center gap-[6px] text-sm text-neutral-700">
              {t.guide.trace.alsoIn}
              {others.map((c) => (
                <a
                  key={c.id}
                  href={`#${traceAnchor(c.id, trace.id)}`}
                  className="-my-2 py-2 text-accent-700 hover:text-accent-800 hover:underline"
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
        {description && (
          <p className="m-0 max-w-[56ch] min-w-0 flex-[1_1_280px] text-base leading-[1.55]">
            {description}
          </p>
        )}
        <div
          className={`flex min-w-0 flex-col gap-[2px] ${description ? 'max-w-[56ch] flex-[1_1_240px]' : 'flex-1'}`}
        >
          <span className="flex items-center gap-[6px] text-[11px] tracking-[.14em] text-neutral-700 uppercase">
            <CompassIcon weight="duotone" size={16} aria-hidden="true" />
            {t.guide.trace.find}
          </span>
          <span className="text-[15px] leading-normal text-neutral-800">{trace.find}</span>
        </div>
      </div>
    </article>
  )
}

/** The image's box: a button to the photo full screen, a click target to add one, or a picture. */
function PhotoBox({
  box,
  alt,
  onView,
  onAdd,
  addLabel,
  children,
}: {
  box: string
  alt: string
  onView?: () => void
  /** For a trace still to find: the box opens the photo panel (or sign-in). */
  onAdd?: () => void
  addLabel?: string
  children: ReactNode
}) {
  if (onView)
    return (
      <button
        type="button"
        aria-label={format(t.guide.trace.open, { alt })}
        onClick={onView}
        className={`${box} cursor-zoom-in`}
      >
        {children}
      </button>
    )
  if (onAdd)
    return (
      <button
        type="button"
        aria-label={`${addLabel} · ${alt}`}
        onClick={onAdd}
        className={`${box} cursor-pointer`}
      >
        {children}
      </button>
    )
  return (
    <div role="img" aria-label={alt} className={box}>
      {children}
    </div>
  )
}

const ghost =
  'btn btn-ghost inline-flex min-h-[44px] items-center gap-[6px] px-2 text-[15px] text-accent-700'

function TraceActions({
  trace,
  entry,
  date,
  onEdit,
}: {
  trace: AlbumTrace
  entry: Entry | undefined
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
  // A trace still to find has no action here: its photo box is the add button.
  if (!isSeen(entry)) return null
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
        <span className="flex items-start gap-[6px] py-2 text-sm leading-[1.45] text-neutral-800">
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
