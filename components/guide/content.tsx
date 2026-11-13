import { ImageIcon } from '@phosphor-icons/react/ssr'
import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'
import { publicAsset } from '@/lib/assets'
import {
  anchorOf,
  chapterNumber,
  type GuideNames,
  type GuideStructure,
  type Credit,
  type SectionDef,
  type Visibility,
} from '@/content/types'
import { formatPeriod, roman } from '@/i18n/dates'
import { format, t } from '@/i18n'
import { cardAnchor } from '@/content/anchors'
import { builtInTrace } from '@/content/subjects'
import { CardTraces } from './CardTraces'
import { PinButton } from './Pins'
import { Today } from './Today'
import { Trace } from './Trace'
import { Only, Unless } from './trip'

/*
 * Building blocks for guide content, from "Guida Romania - Sito.dc.html".
 * Inline (no trip gate): <D> date, <N> name/place/work (`href` to link it), <A> link, <Aside>. Containers (no gate):
 * PhotoGrid, PhotoRow, Positions. Every other block takes a required `on`: the regions/cities of the trip
 * for which it is shown — at least one of them must be in the trip — or 'always'. Blocks nest, so
 * a block is shown only if its parents are too: give a chapter the widest set, its texts a subset.
 * Content files get the kit bound to their structure through guideKit(structure, names).
 */

/** Places for which a block is shown: a list (one text can serve several places) or 'always'. */
type On<P extends string> = { on: Visibility<P> }

const kicker = 'text-xs tracking-[.16em] uppercase'
const label = 'text-[11px] tracking-[.14em] uppercase'

/** A date, marked with the highlighter. */
export function D({ children }: { children: ReactNode }) {
  return <span className="date-mark">{children}</span>
}

/** External links (Wikipedia and the like) open in a new tab. */
const external = { target: '_blank', rel: 'noopener noreferrer' } as const
const underline = 'underline decoration-1 underline-offset-3 hover:decoration-2'

/** A name, place or work: magenta, the system's second spot color. `href` links it out. */
export function N({
  children,
  work,
  href,
}: {
  children: ReactNode
  work?: boolean
  href?: string
}) {
  const className = `text-accent-2-700 ${work ? 'italic' : ''}`
  return href ? (
    <a href={href} {...external} className={`${className} ${underline}`}>
      {children}
    </a>
  ) : (
    <span className={className}>{children}</span>
  )
}

/** A link on plain text (for a name, use <N href>). */
export function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} {...external} className={`text-accent-700 ${underline}`}>
      {children}
    </a>
  )
}

function ChapterView<P extends string>({
  on,
  ...props
}: On<P> & {
  id: string
  number: number
  title: string
  lede: string
  period?: string
  children: ReactNode
  gap?: 'normal' | 'wide'
}) {
  return (
    <Only on={on}>
      <section
        id={anchorOf(props.id)}
        className={`flex scroll-mt-[80px] flex-col ${props.gap === 'wide' ? 'gap-[60px]' : 'gap-8'}`}
      >
        <div className="flex flex-col gap-2">
          <div className={`${kicker} text-accent-700`}>
            {format(t.guide.content.chapter, { number: props.number })}
          </div>
          <h2 className="m-0 max-w-[13ch] text-[clamp(38px,7vw,56px)] leading-[1.04] tracking-[-.02em]">
            {props.title}
          </h2>
          <p className="mt-1 mb-0 max-w-[36ch] text-[clamp(19px,3vw,21px)] leading-[1.35] text-neutral-800 italic">
            {props.lede}
          </p>
          {props.period && (
            <div className="mt-1 text-[13px] tracking-[.04em] text-neutral-700">{props.period}</div>
          )}
        </div>
        {props.children}
      </section>
    </Only>
  )
}

/** A part of a chapter (inside <Chapter>): the top margin keeps the chapters' 100px rhythm. */
function PartView<P extends string>({
  on,
  ...props
}: On<P> & { id: string; kicker: string; title: string; children: ReactNode }) {
  return (
    <Only on={on}>
      <section id={anchorOf(props.id)} className="mt-12 flex scroll-mt-[80px] flex-col gap-8">
        <div className="flex flex-col gap-1">
          <div className={`${kicker} text-accent-700`}>{props.kicker}</div>
          <h3 className="m-0 text-[clamp(28px,5vw,36px)] leading-[1.1]">{props.title}</h3>
        </div>
        {props.children}
      </section>
    </Only>
  )
}

/** A paragraph. `muted` for a quiet, italic note. */
export function Text<P extends string>({
  on,
  muted,
  children,
}: On<P> & { muted?: boolean; children: ReactNode }) {
  return (
    <Only on={on}>
      <p className={`m-0 max-w-[62ch] ${muted ? 'text-neutral-700 italic' : ''}`}>{children}</p>
    </Only>
  )
}

/**
 * A list of events on a rail. With a `title` it is a section of its own (heading as in the
 * design's date lists); give it an `id` to anchor a toc entry and follow it in the index.
 */
function TimelineView<P extends string>({
  on,
  id,
  title,
  children,
}: On<P> & { id?: string; title?: ReactNode; children: ReactNode }) {
  const events = <div className="flex flex-col">{children}</div>
  return (
    <Only on={on}>
      {title ? (
        <div id={id && anchorOf(id)} className="mt-4 flex scroll-mt-[80px] flex-col gap-3">
          <h4 className="m-0 text-[clamp(21px,4vw,24px)] leading-[1.2]">{title}</h4>
          {events}
        </div>
      ) : (
        <div id={id && anchorOf(id)} className="scroll-mt-[80px]">
          {events}
        </div>
      )}
    </Only>
  )
}

/** A timeline entry: date in the margin, dot on the rail, title and details. */
export function Event<P extends string>({
  on,
  ...props
}: On<P> & {
  /** Without a date the margin stays empty (no highlighter); the dot keeps the rail aligned. */
  date?: ReactNode | null
  title: ReactNode
  children?: ReactNode
}) {
  return (
    <Only on={on}>
      <div className="timeline-item">
        <div className="pt-[1px] text-right">
          {props.date != null && (
            <span className="date-mark px-[3px] text-[clamp(15px,3.6vw,17px)] font-semibold">
              {props.date}
            </span>
          )}
        </div>
        <div className="timeline-rail" aria-hidden="true" />
        <div className="timeline-body flex flex-col gap-[6px]">
          <h4 className="m-0 text-[clamp(18px,3.6vw,20px)] leading-[1.3]">{props.title}</h4>
          {props.children}
        </div>
      </div>
    </Only>
  )
}

/**
 * A context card in a timeline, between the events: the background of a period (society, climate,
 * economy). Boxed like the glossary, labelled "Contesto · period" in place of a date, with a
 * hollow dot on the rail so it reads apart from the events.
 */
export function Context<P extends string>({
  on,
  ...props
}: On<P> & { period: ReactNode; title: ReactNode; children: ReactNode }) {
  return (
    <Only on={on}>
      <div className="timeline-item timeline-context">
        <div />
        <div className="timeline-rail" aria-hidden="true" />
        <div className="timeline-body">
          <div className="flex max-w-[52ch] flex-col gap-2 rounded-md bg-surface p-4">
            <div className={`${label} text-accent-700`}>
              {t.guide.content.context} · {props.period}
            </div>
            <h4 className="m-0 text-[17px] leading-[1.3] font-semibold">{props.title}</h4>
            <div className="text-[15px] leading-normal">{props.children}</div>
          </div>
        </div>
      </div>
    </Only>
  )
}

/** A detail line, marked with the cyan diamond. */
export function Detail<P extends string>({ on, children }: On<P> & { children: ReactNode }) {
  return (
    <Only on={on}>
      <div className="grid grid-cols-[18px_minmax(0,1fr)]">
        <span className="mt-[10px] size-[6px] rotate-45 bg-accent" aria-hidden="true" />
        <span>{children}</span>
      </div>
    </Only>
  )
}

/** Muted aside in a heading, e.g. a period or a local name. */
export function Aside({ children, italic }: { children: ReactNode; italic?: boolean }) {
  return (
    <span className={`font-normal text-neutral-700 ${italic ? 'italic' : ''}`}>{children}</span>
  )
}

/** A source line in an event, in place of a detail: aligned with the details, no diamond. */
export function Source<P extends string>({ on, children }: On<P> & { children: ReactNode }) {
  return (
    <Only on={on}>
      <div className="grid grid-cols-[18px_minmax(0,1fr)]">
        <span aria-hidden="true" />
        <div className="flex max-w-[52ch] flex-wrap gap-x-3 gap-y-1 text-sm leading-[1.45] text-neutral-800">
          <span className={`${label} pt-[2px] text-neutral-700`}>{t.guide.content.source}</span>
          <span className="flex-[1_1_220px]">{children}</span>
        </div>
      </div>
    </Only>
  )
}

/**
 * Boxed aside. "onsite" = to look into on the spot; "debate" = a disputed point (positions and a
 * note inside); "remember" = the takeaway of a chapter or part.
 */
export function Callout<P extends string>({
  on,
  ...props
}: On<P> & {
  kind: 'onsite' | 'debate' | 'remember'
  title?: ReactNode
  children: ReactNode
}) {
  return (
    <Only on={on}>
      {props.kind === 'onsite' ? (
        <Onsite {...props} />
      ) : (
        <Boxed label={t.guide.content[props.kind]} {...props} />
      )}
    </Only>
  )
}

function Onsite(props: { children: ReactNode }) {
  return (
    <div className="mt-2 flex max-w-[46ch] flex-col gap-2 rounded-md bg-surface p-4">
      <div className={`${label} text-accent-2-700`}>{t.guide.content.onsite}</div>
      <div className="text-[15px]">{props.children}</div>
    </div>
  )
}

function Boxed(props: { label: string; title?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-md bg-surface p-[clamp(20px,4vw,32px)]">
      <div className="flex flex-col gap-2">
        <div className={`${label} leading-[1.2] text-accent-2-700`}>{props.label}</div>
        {props.title && (
          <h4 className="m-0 text-[clamp(18px,3.6vw,20px)] leading-[1.25]">{props.title}</h4>
        )}
      </div>
      {props.children}
    </div>
  )
}

/** Two positions side by side inside a "debate" callout. */
export function Positions({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-6 gap-y-4 text-[15px] leading-normal">
      {children}
    </div>
  )
}

export function Position<P extends string>({
  on,
  title,
  children,
}: On<P> & { title: string; children: ReactNode }) {
  return (
    <Only on={on}>
      <div className="flex flex-col gap-1">
        <div className="font-semibold">{title}</div>
        <div>{children}</div>
      </div>
    </Only>
  )
}

export function Note<P extends string>({ on, children }: On<P> & { children: ReactNode }) {
  return (
    <Only on={on}>
      <p className="m-0 text-[15px] leading-normal text-neutral-800 italic">{children}</p>
    </Only>
  )
}

export function Glossary<P extends string>({
  on,
  term,
  origin,
  children,
}: On<P> & {
  term: string
  origin?: string
  children: ReactNode
}) {
  return (
    <Only on={on}>
      <div className="mt-1 flex max-w-[46ch] flex-col gap-2 rounded-md bg-surface p-4">
        <div className={`${label} text-accent-700`}>{t.guide.content.glossary}</div>
        <div className="text-[15px]">
          <span className="font-semibold italic">{term}</span>
          {origin && <span className="text-neutral-700"> ({origin})</span>} — {children}
        </div>
      </div>
    </Only>
  )
}

/** An image, or a quiet placeholder while the file is not in `public/` yet. */
function Picture(props: {
  src?: string
  alt: string
  ratio: string
  sizes: string
  className?: string
  /** Transparent image (an emblem): no backdrop, shown whole instead of cropped. */
  cutout?: boolean
}) {
  const src = publicAsset(props.src)
  return (
    <div
      className={`relative overflow-hidden rounded-md ${src && props.cutout ? '' : 'bg-neutral-200'} ${props.className ?? ''}`}
      style={{ aspectRatio: props.ratio }}
    >
      {src ? (
        <Image
          src={src}
          alt={props.alt}
          fill
          sizes={props.sizes}
          className={props.cutout ? 'object-contain' : 'object-cover'}
        />
      ) : (
        <div
          className="absolute inset-0 grid place-items-center text-neutral-500"
          role="img"
          aria-label={props.alt}
        >
          <ImageIcon weight="duotone" size={32} />
        </div>
      )}
    </div>
  )
}

export function Figure<P extends string>({ on, ...props }: On<P> & Parameters<typeof Photo>[0]) {
  return (
    <Only on={on}>
      <Photo {...props} />
    </Only>
  )
}

/** Figure without a gate, for the photos of Region and City. */
function Photo(props: {
  src?: string
  alt?: string
  /** Author and licence: required by the validator once the file exists. */
  credit?: Credit
  caption: string
  ratio: string
  /** Transparent image (an emblem): no backdrop, shown whole instead of cropped. */
  cutout?: boolean
  /** `emblem`: a flag or coat of arms at a fixed height, as wide as its `ratio` makes it. */
  size?: 'full' | 'emblem'
  className?: string
  style?: CSSProperties
}) {
  const emblem = props.size === 'emblem'
  return (
    <figure
      className={`m-0 flex flex-col gap-2 ${props.className ?? ''}`}
      style={{ '--ratio': `calc(${props.ratio})`, ...props.style } as CSSProperties}
    >
      <Picture
        src={props.src}
        alt={props.alt ?? props.caption}
        ratio={props.ratio}
        cutout={props.cutout}
        sizes={emblem ? '320px' : '(min-width: 960px) 720px, 100vw'}
        className={emblem ? 'h-40 w-[calc(var(--ratio)*var(--spacing)*40)] max-w-full' : 'w-full'}
      />
      <figcaption className="mt-0 text-sm leading-[1.4] text-neutral-700 italic">
        {props.caption}
      </figcaption>
    </figure>
  )
}

export function PhotoGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-4 gap-y-6">
      {children}
    </div>
  )
}

/**
 * Figures side by side at the same height (e.g. a flag and a coat of arms): each takes a width
 * proportional to its `ratio`, read from the `--ratio` its <figure> publishes.
 */
export function PhotoRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-4 *:min-w-0 *:flex-[var(--ratio)_1_0%]">{children}</div>
  )
}

/** Map with numbered places in the caption. */
export function MapFigure<P extends string>({
  on,
  ...props
}: On<P> & {
  src?: string
  alt: string
  credit?: Credit
  ratio: string
  places: { name: string; note: string }[]
}) {
  return (
    <Only on={on}>
      <figure className="m-0 flex flex-col gap-3">
        <Picture
          src={props.src}
          alt={props.alt}
          ratio={props.ratio}
          sizes="(min-width: 960px) 720px, 100vw"
          className="w-full"
        />
        <figcaption className="mt-0 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-4 gap-y-3 text-sm leading-[1.4] text-text">
          {props.places.map((p, i) => (
            <div key={p.name} className="flex gap-[8px]">
              <span className="grid size-[18px] flex-none place-items-center rounded-full bg-accent-2 text-[11px] font-semibold text-bg">
                {i + 1}
              </span>
              <span>
                <span className="font-semibold">{p.name}</span>
                <br />
                {p.note}
              </span>
            </div>
          ))}
        </figcaption>
      </figure>
    </Only>
  )
}

function RegionView<P extends string>({
  on,
  ...props
}: On<P> & {
  id: string
  name: string
  children: ReactNode
  intro: ReactNode
  photo: { src?: string; caption: string; credit?: Credit }
}) {
  return (
    <Only on={on}>
      <div id={anchorOf(props.id)} className="flex scroll-mt-[80px] flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h3 className="m-0 text-[clamp(28px,5vw,36px)] leading-[1.1]">{props.name}</h3>
          <p className="m-0 max-w-[62ch]">{props.intro}</p>
        </div>
        <Photo src={props.photo.src} caption={props.photo.caption} ratio="3/2" />
        {props.children}
      </div>
    </Only>
  )
}

export function City<P extends string>({
  on,
  ...props
}: On<P> & {
  name: string
  local?: string
  photo?: { src?: string; caption: string; credit?: Credit }
  children: ReactNode
}) {
  // flex-[1_1_260px] only in the side-by-side layout with a photo: in a column the basis
  // would become a 260px minimum height.
  const body = (
    <div className={`flex min-w-0 flex-col gap-[6px] ${props.photo ? 'flex-[1_1_260px]' : ''}`}>
      <h4 className="m-0 text-[clamp(18px,3.6vw,20px)] leading-[1.3]">
        {props.name} {props.local && <Aside italic>{props.local}</Aside>}
      </h4>
      {props.children}
    </div>
  )
  if (!props.photo) return <Only on={on}>{body}</Only>
  return (
    <Only on={on}>
      <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
        <Photo
          src={props.photo.src}
          caption={props.photo.caption}
          ratio="4/3"
          className="max-w-[280px] flex-[1_1_200px]"
        />
        {body}
      </div>
    </Only>
  )
}

/*
 * What the content validator (lib/content/validate.ts) needs to know about each kit component:
 * it walks a guide's element tree without rendering it, and recognises the kit by reference.
 */
export type KitKind =
  | 'gate' // a block with `on`
  | 'event' // a gate with a `date`
  | 'figure' // a gate with an image (`src`, `credit`)
  | 'city' // a gate with an optional `photo`
  | 'section' // Chapter, Part, Region: `section`
  | 'timeline' // `section` or `on`
  | 'only'
  | 'unless'
  | 'container' // no `on`: inline marks and pure containers
  | 'card' // a gate with a `card` id, `intro` and `remember`
  | 'today' // `traces`

/** Kind and name by component (names survive minification, for readable error paths). */
const kinds = new WeakMap<object, { kind: KitKind; name: string }>()
const kind = (k: KitKind, fns: Record<string, object>) =>
  Object.entries(fns).forEach(([name, f]) => kinds.set(f, { kind: k, name }))

const known = (type: unknown) =>
  typeof type === 'function' || (typeof type === 'object' && type !== null)
    ? kinds.get(type)
    : undefined

export const kitKindOf = (type: unknown) => known(type)?.kind
export const kitNameOf = (type: unknown) => known(type)?.name

kind('gate', { Text, Context, Detail, Source, Callout, Position, Note, Glossary })
kind('event', { Event })
kind('figure', { Figure, MapFigure })
kind('city', { City })
kind('only', { Only })
kind('unless', { Unless })
kind('container', { A, D, N, Aside, PhotoGrid, PhotoRow, Positions })
kind('today', { Today })

/**
 * The kit bound to one guide: `on` only accepts its place ids, and the sectioning blocks
 * (Chapter, Part, titled Timeline, Region) take a `section` id from which they read their anchor,
 * `on`, title, number and dates (the same data that builds the index):
 *   const { Chapter, Detail, … } = guideKit(structure, names)
 */
export function guideKit<P extends string, S extends string>(
  structure: GuideStructure<P, S>,
  names: GuideNames<P, S>,
) {
  const { sections } = structure
  const def = (id: S) => {
    const d = sections.find((s) => s.id === id)
    if (!d) throw new Error(`Unknown section ${id}`)
    return d
  }
  /** Position among the parts since the enclosing chapter: Parte I, II… */
  const number = (id: S) => {
    const i = sections.findIndex((s) => s.id === id)
    const level = sections[i].level
    let n = 0
    for (let j = i; j >= 0 && sections[j].level >= level; j--) if (sections[j].level === level) n++
    return n
  }
  const dates = (d: SectionDef<S, P>) => (d.period ? formatPeriod(d.period) : undefined)

  /**
   * One of the six chapters (`chapter` in structure.ts): its number and title are fixed, the lede
   * is the guide's.
   */
  function Chapter(props: {
    section: S
    lede: string
    children: ReactNode
    gap?: 'normal' | 'wide'
  }) {
    const d = def(props.section)
    if (!d.chapter) throw new Error(`Section ${d.id} is not a chapter`)
    return (
      <ChapterView
        on={d.on}
        id={d.id}
        number={chapterNumber(d.chapter)}
        title={t.guide.chapters[d.chapter]}
        lede={props.lede}
        period={dates(d)}
        gap={props.gap}
      >
        {props.children}
      </ChapterView>
    )
  }

  function Part(props: { section: S; children: ReactNode }) {
    const d = def(props.section)
    const when = dates(d)
    const kicker = format(t.guide.content.part, { number: roman(number(d.id)) })
    return (
      <PartView
        on={d.on}
        id={d.id}
        kicker={when ? `${kicker} · ${when}` : kicker}
        title={names.sections[d.id]}
      >
        {props.children}
      </PartView>
    )
  }

  /** With `section`: a titled timeline in the index. Without: a plain list of events. */
  function Timeline(props: ({ section: S } | On<P>) & { children: ReactNode }) {
    if (!('section' in props)) return <TimelineView on={props.on}>{props.children}</TimelineView>
    const d = def(props.section)
    const when = dates(d)
    return (
      <TimelineView
        on={d.on}
        id={d.id}
        title={
          <>
            {names.sections[d.id]} {when && <Aside italic>{when}</Aside>}
          </>
        }
      >
        {props.children}
      </TimelineView>
    )
  }

  function Region(props: {
    section: S
    intro: ReactNode
    photo: { src?: string; caption: string; credit?: Credit }
    children: ReactNode
  }) {
    const d = def(props.section)
    return (
      <RegionView
        on={d.on}
        id={d.id}
        name={names.sections[d.id]}
        intro={props.intro}
        photo={props.photo}
      >
        {props.children}
      </RegionView>
    )
  }

  /**
   * A person, city, landscape or food card ("Scheda", B9–B12): heading with the pin button,
   * introduction, the context boxes (`<Context>` as children, the timeline's boxes without the
   * rail: curiosities and background), the card's traces (from structure.cards, those in the trip
   * first) and "Da ricordare". `intro` and `remember` are one paragraph each. Its `on` comes from
   * structure.cards, as a part's comes from
   * its section. A copy of it is shown in "In evidenza" when pinned (`idPrefix`, `heading` and
   * `ungated` are set by the guide for that copy, never in content).
   */
  function Card(props: {
    card: string
    intro: ReactNode
    remember: ReactNode
    children?: ReactNode
    idPrefix?: string
    heading?: boolean
    ungated?: boolean
  }) {
    const def = structure.cards?.find((c) => c.id === props.card)
    if (!def) throw new Error(`Unknown card ${props.card}`)
    const text = names.cards?.[def.id]
    const name = text?.name ?? def.id
    // Person and landscape cards sit right under their chapter; city and food cards under a part.
    const H = def.kind === 'city' || def.kind === 'food' ? 'h4' : 'h3'
    const prefix = props.idPrefix ?? ''
    return (
      <Only on={props.ungated ? 'always' : def.on}>
        <article
          id={`${prefix}${cardAnchor(def.id)}`}
          className="flex scroll-mt-[80px] flex-col gap-8"
        >
          <div className="flex flex-col gap-4">
            {props.heading !== false && (
              <header className="flex flex-col gap-1">
                <div className={`${kicker} text-accent-700`}>
                  {t.guide.album.kind[def.kind]} ·{' '}
                  {def.region ? names.places[def.region] : t.guide.album.where.anywhere}
                </div>
                <div className="flex items-center gap-2">
                  <H
                    className={`m-0 ${H === 'h3' ? 'text-[clamp(28px,5vw,36px)] leading-[1.1]' : 'text-[clamp(26px,4.6vw,32px)] leading-[1.15]'}`}
                  >
                    {name}
                    {text?.local && (
                      <>
                        {' '}
                        <span className="font-normal text-neutral-700 italic">{text.local}</span>
                      </>
                    )}
                  </H>
                  <PinButton card={def.id} name={name} />
                </div>
                {text?.dates && (
                  <div className="text-[13px] tracking-[.04em] text-neutral-700">{text.dates}</div>
                )}
              </header>
            )}
            <p className="m-0 max-w-[62ch]">{props.intro}</p>
          </div>
          {props.children && (
            <div className="card-contexts flex flex-col gap-4">{props.children}</div>
          )}
          <CardTraces card={def.id} prefix={prefix} />
          <div className="flex flex-col gap-2">
            <span className={`${label} text-accent-2-700`}>{t.guide.trace.remember}</span>
            <p className="m-0 max-w-[34ch] text-[clamp(20px,3.4vw,24px)] leading-[1.35] italic">
              {props.remember}
            </p>
          </div>
        </article>
      </Only>
    )
  }

  /**
   * The flag or the coat of arms as a trace of the album (02, 03): the guide's emblem image as
   * the placeholder, in grey, until the reader adds their photo. Goes in the emblems chapter.
   */
  function Emblem(props: { kind: 'coat-of-arms' | 'flag'; on: Visibility<P> }) {
    const { id } = builtInTrace(structure.country, props.kind)
    return (
      <Only on={props.on}>
        <Trace id={id} anchor={`trace-${props.kind}`} showPlace={false} />
      </Only>
    )
  }

  kind('section', { Chapter, Part, Region })
  kind('timeline', { Timeline })
  kind('card', { Card })
  kind('gate', { Emblem })

  return {
    A,
    D,
    N,
    Aside,
    PhotoGrid,
    PhotoRow,
    Positions,
    Only: Only<P>,
    Unless: Unless<P>,
    Chapter,
    Timeline,
    Part,
    Region,
    Text: Text<P>,
    Event: Event<P>,
    Context: Context<P>,
    Detail: Detail<P>,
    Source: Source<P>,
    Callout: Callout<P>,
    Position: Position<P>,
    Note: Note<P>,
    Glossary: Glossary<P>,
    Figure: Figure<P>,
    MapFigure: MapFigure<P>,
    City: City<P>,
    Card,
    Emblem,
    Today,
  }
}
