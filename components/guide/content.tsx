import { ImageIcon } from '@phosphor-icons/react/ssr'
import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'
import { publicAsset } from '@/lib/assets'
import type { Visibility } from '@/lib/guide'
import { format, t } from '@/i18n'
import { Only, Unless } from './trip'

/*
 * Building blocks for guide content, from "Guida Romania - Sito.dc.html".
 * Inline (no trip gate): <D> date, <N> name/place/work (`href` to link it), <A> link, <Aside>. Containers (no gate):
 * PhotoGrid, Positions. Every other block takes a required `on`: the regions/cities of the trip
 * for which it is shown — at least one of them must be in the trip — or 'always'. Blocks nest, so
 * a block is shown only if its parents are too: give a chapter the widest set, its texts a subset.
 * Content files get the kit narrowed to their place enum through guideKit<Enum>().
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

export function Chapter<P extends string>({
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
        id={props.id}
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
export function Part<P extends string>({
  on,
  ...props
}: On<P> & { id: string; kicker: string; title: string; children: ReactNode }) {
  return (
    <Only on={on}>
      <section id={props.id} className="mt-12 flex scroll-mt-[80px] flex-col gap-8">
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
export function Timeline<P extends string>({
  on,
  id,
  title,
  children,
}: On<P> & { id?: string; title?: ReactNode; children: ReactNode }) {
  const events = <div className="flex flex-col">{children}</div>
  return (
    <Only on={on}>
      {title ? (
        <div id={id} className="mt-4 flex scroll-mt-[80px] flex-col gap-3">
          <h4 className="m-0 text-[clamp(21px,4vw,24px)] leading-[1.2]">{title}</h4>
          {events}
        </div>
      ) : (
        <div id={id} className="scroll-mt-[80px]">
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
}) {
  const src = publicAsset(props.src)
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-neutral-200 ${props.className ?? ''}`}
      style={{ aspectRatio: props.ratio }}
    >
      {src ? (
        <Image src={src} alt={props.alt} fill sizes={props.sizes} className="object-cover" />
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
  caption: string
  ratio: string
  className?: string
  style?: CSSProperties
}) {
  return (
    <figure className={`m-0 flex flex-col gap-2 ${props.className ?? ''}`} style={props.style}>
      <Picture
        src={props.src}
        alt={props.alt ?? props.caption}
        ratio={props.ratio}
        sizes="(min-width: 960px) 720px, 100vw"
        className="w-full"
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

/** Map with numbered places in the caption. */
export function MapFigure<P extends string>({
  on,
  ...props
}: On<P> & {
  src?: string
  alt: string
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

export function Region<P extends string>({
  on,
  ...props
}: On<P> & {
  id: string
  name: string
  children: ReactNode
  intro: ReactNode
  photo: { src?: string; caption: string }
}) {
  return (
    <Only on={on}>
      <div id={props.id} className="flex scroll-mt-[80px] flex-col gap-6">
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
  photo?: { src?: string; caption: string }
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

/**
 * The kit narrowed to one guide's place enum, so `on` only accepts its ids:
 *   const { Chapter, Detail, … } = guideKit<Romania>()
 */
export function guideKit<P extends string>() {
  return {
    A,
    D,
    N,
    Aside,
    PhotoGrid,
    Positions,
    Only: Only<P>,
    Unless: Unless<P>,
    Chapter: Chapter<P>,
    Timeline: Timeline<P>,
    Part: Part<P>,
    Text: Text<P>,
    Event: Event<P>,
    Detail: Detail<P>,
    Source: Source<P>,
    Callout: Callout<P>,
    Position: Position<P>,
    Note: Note<P>,
    Glossary: Glossary<P>,
    Figure: Figure<P>,
    MapFigure: MapFigure<P>,
    Region: Region<P>,
    City: City<P>,
  }
}
