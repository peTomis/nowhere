import { ImageIcon } from '@phosphor-icons/react/ssr'
import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'
import { publicAsset } from '@/lib/assets'

/*
 * Building blocks for guide content, from "Guida Romania - Sito.dc.html".
 * Inline: <D> date, <N> name/place/work. Blocks: Chapter, Part, Timeline/Event, Detail,
 * DateList/DateRow, Callout, Glossary, Source, Region, City, Figure, MapFigure, Legend.
 * Content tied to a region or city goes inside <Only on="…"> (see ./trip).
 */

const kicker = 'text-xs tracking-[.16em] uppercase'
const label = 'text-[11px] tracking-[.14em] uppercase'

/** A date, marked with the highlighter. */
export function D({ children }: { children: ReactNode }) {
  return <span className="date-mark">{children}</span>
}

/** A name, place or work: magenta, the system's second spot color. */
export function N({ children, work }: { children: ReactNode; work?: boolean }) {
  return <span className={`text-accent-2-700 ${work ? 'italic' : ''}`}>{children}</span>
}

export function Chapter(props: {
  id: string
  number: number
  title: string
  lede: string
  period?: string
  children: ReactNode
  gap?: 'normal' | 'wide'
}) {
  return (
    <section
      id={props.id}
      className={`flex scroll-mt-[80px] flex-col ${props.gap === 'wide' ? 'gap-[60px]' : 'gap-8'}`}
    >
      <div className="flex flex-col gap-2">
        <div className={`${kicker} text-accent-700`}>Capitolo {props.number}</div>
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
  )
}

export function Part(props: { id: string; kicker: string; title: string; children: ReactNode }) {
  return (
    <section id={props.id} className="flex scroll-mt-[80px] flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className={`${kicker} text-accent-700`}>{props.kicker}</div>
        <h3 className="m-0 text-[clamp(28px,5vw,36px)] leading-[1.1]">{props.title}</h3>
      </div>
      {props.children}
    </section>
  )
}

export function Timeline({ children }: { children: ReactNode }) {
  return <div className="flex flex-col">{children}</div>
}

/** A timeline entry: date in the margin, dot on the rail, title and details. */
export function Event(props: { date: ReactNode; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="timeline-item">
      <div className="pt-[1px] text-right">
        <span className="date-mark px-[3px] text-[clamp(15px,3.6vw,17px)] font-semibold">
          {props.date}
        </span>
      </div>
      <div className="timeline-rail" aria-hidden="true" />
      <div className="timeline-body flex flex-col gap-[6px]">
        <h4 className="m-0 text-[clamp(18px,3.6vw,20px)] leading-[1.3]">{props.title}</h4>
        {props.children}
      </div>
    </div>
  )
}

/** A detail line, marked with the cyan diamond. */
export function Detail({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[18px_minmax(0,1fr)]">
      <span className="mt-[10px] size-[6px] rotate-45 bg-accent" aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}

/** Muted aside in a heading, e.g. a period or a local name. */
export function Aside({ children, italic }: { children: ReactNode; italic?: boolean }) {
  return (
    <span className={`font-normal text-neutral-700 ${italic ? 'italic' : ''}`}>{children}</span>
  )
}

export function DateList(props: { id?: string; title: ReactNode; children: ReactNode }) {
  return (
    <div id={props.id} className="mt-4 flex scroll-mt-[80px] flex-col gap-3">
      <h4 className="m-0 text-[clamp(21px,4vw,24px)] leading-[1.2]">{props.title}</h4>
      <div className="flex flex-col gap-2">{props.children}</div>
    </div>
  )
}

export function DateRow({ date, children }: { date: ReactNode; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[clamp(62px,16vw,92px)_minmax(0,1fr)] gap-x-[clamp(16px,4vw,28px)]">
      <div className="text-right">
        <span className="date-mark px-[3px] font-semibold">{date}</span>
      </div>
      <div className="flex flex-col gap-[6px]">{children}</div>
    </div>
  )
}

export function Source({ children }: { children: ReactNode }) {
  return (
    <div className="flex max-w-[52ch] flex-wrap gap-x-3 gap-y-1 text-sm leading-[1.45] text-neutral-800">
      <span className={`${label} pt-[2px] text-neutral-700`}>Fonte</span>
      <span className="flex-[1_1_220px]">{children}</span>
    </div>
  )
}

/** Boxed aside. "onsite" = to look into on the spot; "debate" = a disputed point. */
export function Callout(props: {
  kind: 'onsite' | 'debate'
  title?: ReactNode
  children: ReactNode
}) {
  if (props.kind === 'onsite') {
    return (
      <div className="mt-2 flex max-w-[46ch] flex-col gap-2 rounded-md bg-surface p-4">
        <div className={`${label} text-accent-2-700`}>Da approfondire sul posto</div>
        <div className="text-[15px]">{props.children}</div>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-4 rounded-md bg-surface p-[clamp(20px,4vw,32px)]">
      <div className="flex flex-col gap-2">
        <div className={`${label} leading-[1.2] text-accent-2-700`}>Punto controverso</div>
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

export function Position({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-semibold">{title}</div>
      <div>{children}</div>
    </div>
  )
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="m-0 text-[15px] leading-normal text-neutral-800 italic">{children}</p>
}

export function Glossary({
  term,
  origin,
  children,
}: {
  term: string
  origin?: string
  children: ReactNode
}) {
  return (
    <div className="mt-1 flex max-w-[46ch] flex-col gap-2 rounded-md bg-surface p-4">
      <div className={`${label} text-accent-700`}>Glossario</div>
      <div className="text-[15px]">
        <span className="font-semibold italic">{term}</span>
        {origin && <span className="text-neutral-700"> ({origin})</span>} — {children}
      </div>
    </div>
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

export function Figure(props: {
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
export function MapFigure(props: {
  src?: string
  alt: string
  ratio: string
  places: { name: string; note: string }[]
}) {
  return (
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
  )
}

/** "Come leggere": the key to the inline marks. */
export function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-800">
      <span className={`${label} text-neutral-700`}>Come leggere</span>
      <span className="flex items-center gap-[8px]">
        <span className="date-mark px-[3px] font-semibold text-text">1310</span>date
      </span>
      <span className="flex items-center gap-[8px]">
        <span className="text-accent-2-700">Basarab I</span>nomi, luoghi, opere
      </span>
      <span className="flex items-center gap-[8px]">
        <span className="size-[10px] rounded-full bg-accent" />
        evento
      </span>
      <span className="flex items-center gap-[8px]">
        <span className="size-[6px] rotate-45 bg-accent" />
        dettaglio
      </span>
    </div>
  )
}

/** An image with a pointer line to its label, e.g. a historical flag. */
export function Annotated(props: { src?: string; alt: string; ratio: string; label: ReactNode }) {
  const src = publicAsset(props.src)
  return (
    <div className="mt-3 flex flex-wrap items-center gap-y-2">
      <div
        className="relative w-[clamp(140px,40vw,180px)] flex-none bg-neutral-200"
        style={{ aspectRatio: props.ratio }}
      >
        {src && <Image src={src} alt={props.alt} fill sizes="180px" className="object-cover" />}
      </div>
      <span className="flex flex-none items-center" aria-hidden="true">
        <span className="-ml-1 size-[7px] rounded-full bg-accent-2-700" />
        <span className="h-px w-[36px] bg-accent-2-700" />
      </span>
      <span className="pl-[10px] text-[15px] leading-[1.35] text-accent-2-700 italic">
        {props.label}
      </span>
    </div>
  )
}

export function Region(props: {
  id: string
  name: string
  children: ReactNode
  intro: ReactNode
  photo: { src?: string; caption: string }
}) {
  return (
    <div id={props.id} className="flex scroll-mt-[80px] flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h3 className="m-0 text-[clamp(28px,5vw,36px)] leading-[1.1]">{props.name}</h3>
        <p className="m-0 max-w-[62ch]">{props.intro}</p>
      </div>
      <Figure src={props.photo.src} caption={props.photo.caption} ratio="3/2" />
      {props.children}
    </div>
  )
}

export function City(props: {
  name: string
  local?: string
  photo?: { src?: string; caption: string }
  children: ReactNode
}) {
  const body = (
    <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-[6px]">
      <h4 className="m-0 text-[clamp(18px,3.6vw,20px)] leading-[1.3]">
        {props.name} {props.local && <Aside italic>{props.local}</Aside>}
      </h4>
      {props.children}
    </div>
  )
  if (!props.photo) return body
  return (
    <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
      <Figure
        src={props.photo.src}
        caption={props.photo.caption}
        ratio="4/3"
        className="max-w-[280px] flex-[1_1_200px]"
      />
      {body}
    </div>
  )
}
