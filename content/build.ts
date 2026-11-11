import 'server-only'
import { format, t } from '@/i18n'
import { formatPeriod } from '@/i18n/dates'
import { publicAsset } from '@/lib/assets'
import { cardAnchor } from './anchors'
import { BUILT_IN_TRACES, builtInTrace, subjectKey, type Subject } from './subjects'
import {
  RARITY_POINTS,
  chapterNumber,
  type Credit,
  type GuideContent,
  type GuideNames,
  type GuideStructure,
  type Place,
  type Rarity,
  type TocEntry,
  type TraceIcon,
  type TraceText,
  type TraceWhere,
} from './types'

/** Trip filter entries (regions with their cities) from the structure and a locale's names. */
export function placesOf<P extends string, S extends string>(
  structure: GuideStructure<P, S>,
  names: GuideNames<P, S>,
): Place<P>[] {
  return structure.regions.map((r) => ({
    id: r.id,
    name: names.places[r.id],
    cities: r.cities.map((c) => ({ id: c, name: names.places[c] })),
  }))
}

/**
 * The index, from the sections. Chapters show their number and fixed title, and their period in
 * the body only, not in the index. The person cards follow the Personaggi chapter as its entries,
 * in the order of structure.cards.
 */
export function tocOf<P extends string, S extends string>(
  structure: GuideStructure<P, S>,
  names: GuideNames<P, S>,
): TocEntry<P>[] {
  const persons = (structure.cards ?? [])
    .filter((c) => c.kind === 'person')
    .map((c): TocEntry<P> => ({
      id: c.id,
      label: names.cards?.[c.id]?.name ?? c.id,
      level: 2,
      on: c.on,
    }))
  return structure.sections.flatMap((s) => {
    const entry: TocEntry<P> = {
      id: s.id,
      label: s.chapter ? t.guide.chapters[s.chapter] : names.sections[s.id],
      level: s.level,
      number: s.chapter && chapterNumber(s.chapter),
      dates: s.level > 1 && s.period ? formatPeriod(s.period) : undefined,
      on: s.on,
    }
    return s.chapter === 'people' ? [entry, ...persons] : [entry]
  })
}

/** A chapter in the guide's summary ("La guida in sei capitoli"). */
export type ChapterEntry = { id: string; number: number; title: string; line: string }

/** The guide's chapters, for its summary: the fixed title and the guide's line under it. */
export function chaptersOf<P extends string, S extends string>(
  structure: GuideStructure<P, S>,
  names: GuideNames<P, S>,
): ChapterEntry[] {
  return structure.sections.flatMap((s) =>
    s.chapter
      ? [
          {
            id: s.id,
            number: chapterNumber(s.chapter),
            title: t.guide.chapters[s.chapter],
            line: names.sections[s.id],
          },
        ]
      : [],
  )
}

/** Stock image of a trace, only when the file exists (else the box shows a placeholder). */
export type TraceImage = {
  src: string
  credit?: { author: string; license: string; url?: string }
  /** 'contain' for the coat of arms and the flag: the whole emblem, not a crop. */
  fit?: 'cover' | 'contain'
}

/** A trace as the album, the cards and the photo panel show it: plain data for client components. */
export type AlbumTrace = {
  id: string
  /** What the reader's photo and note are about. */
  subject: Subject
  /** subjectKey(subject): the key of the reader's collection. */
  key: string
  /** Position in the album, from 1: 01–03 are the cover, the flag and the coat of arms. */
  num: number
  name: string
  local?: string
  /** Where it is, under the name. */
  place: string
  /** Region id; null for the three traces of the whole country. */
  region: string | null
  /** City name when the trace is in a city. */
  city?: string
  where: TraceWhere
  distance?: string
  rarity: Rarity
  points: number
  isNew: boolean
  icon: TraceIcon
  /** Optional description; without it the trace shows only "Come trovarla". */
  text?: string
  find: string
  invite: string
  image?: TraceImage
  /** Cards that list the trace: its anchors are `trace-<card anchor>-<trace slug>`. */
  cards: { id: string; name: string; anchor: string }[]
}

/** A person or city card, as the pins and the album show it. */
export type GuideCard = {
  traceTexts?: Partial<Record<string, string>>
  id: string
  kind: 'person' | 'city'
  /** HTML id of the card: the id without `<cc>.` and `person.`. */
  anchor: string
  name: string
  local?: string
  dates?: string
  region: string
  regionName: string
  /** Trace ids, in order. */
  traces: string[]
}

const credit = (c: Credit | undefined) => (c && 'author' in c ? c : undefined)

/**
 * The album's traces: first the three of the whole country (cover, coat of arms, flag, with the
 * guide's cover and emblems as their stock images), then the guide's own, from 04.
 */
export function tracesOf<P extends string, S extends string>(
  content: GuideContent<P, S>,
  /** Country name, in the built-in traces' texts. */
  country: string,
): AlbumTrace[] {
  const { structure, names } = content
  const cc = structure.country
  const cardsOf = (id: string) =>
    (structure.cards ?? [])
      .filter((c) => c.traces.includes(id))
      .map((c) => ({ id: c.id, name: names.cards?.[c.id]?.name ?? c.id, anchor: cardAnchor(c.id) }))
  const stock = (
    src: string | undefined,
    c: Credit | undefined,
    fit: TraceImage['fit'] = 'cover',
  ): TraceImage | undefined => {
    const file = publicAsset(src)
    return file ? { src: file, credit: credit(c), fit } : undefined
  }
  const builtIn = BUILT_IN_TRACES.map((kind): AlbumTrace => {
    const { id, subject } = builtInTrace(cc, kind)
    const text = t.guide.builtIn[kind]
    const emblem = content.emblems?.find((e) => e.kind === kind)
    const image = kind === 'cover' ? content.cover : emblem
    return {
      id,
      subject,
      key: subjectKey(subject),
      num: 0,
      name: text.name,
      place: format(text.place, { name: country }),
      region: null,
      where: 'anywhere',
      rarity: 'common',
      points: RARITY_POINTS.common,
      isNew: false,
      icon: kind === 'cover' ? 'image' : kind === 'flag' ? 'flag' : 'shield',
      find: text.find,
      invite: text.invite,
      image: stock(image?.src, image?.credit, kind === 'cover' ? 'cover' : 'contain'),
      cards: [],
    }
  })
  const own = (structure.traces ?? []).map((tr): AlbumTrace => {
    const text: TraceText = names.traces?.[tr.id] ?? { name: tr.id, place: '', find: '' }
    const subject: Subject = { kind: 'place', id: tr.id }
    return {
      id: tr.id,
      subject,
      key: subjectKey(subject),
      num: 0,
      name: text.name,
      local: text.local,
      place: text.place,
      region: tr.region,
      city: tr.city && names.places[tr.city],
      where: tr.where,
      distance: text.distance,
      rarity: tr.rarity,
      points: RARITY_POINTS[tr.rarity],
      isNew: !!tr.isNew,
      icon: tr.icon,
      text: text.text,
      find: text.find,
      invite: text.invite ?? t.guide.photo.invite,
      image: stock(tr.image?.src, tr.image?.credit),
      cards: cardsOf(tr.id),
    }
  })
  return [...builtIn, ...own].map((tr, i) => ({ ...tr, num: i + 1 }))
}

/** The guide's person and city cards. */
export function cardsOf<P extends string, S extends string>(
  structure: GuideStructure<P, S>,
  names: GuideNames<P, S>,
): GuideCard[] {
  return (structure.cards ?? []).map((c) => {
    const text = names.cards?.[c.id]
    return {
      id: c.id,
      kind: c.kind,
      anchor: cardAnchor(c.id),
      name: text?.name ?? c.id,
      local: text?.local,
      dates: text?.dates,
      region: c.region,
      regionName: names.places[c.region],
      traces: c.traces,
      traceTexts: text?.traceTexts,
    }
  })
}
