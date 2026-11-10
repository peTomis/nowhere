import type { ReactNode } from 'react'

/*
 * Content ids are language-independent English slugs prefixed by the country's ISO 3166-1 alpha-2
 * code (docs/data-model.md §4): regions and cities `ro.transylvania`, sections
 * `ro.section.ottoman-suzerainty.transylvania`. Each guide declares them as string enums and uses
 * GuideContent<Enum>, so a mistyped id in places, toc `on` or a block's `on` fails the typecheck.
 * Region and city ids are stored in readers' browsers; section ids are URL anchors: once
 * published, never rename them.
 */

/** URL anchor (and HTML id) of a section: its id without `<cc>.section.`. */
export function anchorOf(id: string): string {
  return id.replace(/^[a-z]{2}\.section\./, '')
}

/** A region the reader can include or exclude from their trip, with its cities. */
export type Place<P extends string = string> = {
  id: P
  name: string
  cities: { id: P; name: string }[]
}

/**
 * For which places of the trip a block (or an index entry) is shown: at least one of them must
 * be in the trip. 'always' shows it whatever the reader has selected, even nothing.
 */
export type Visibility<P extends string = string> = P[] | 'always'

/**
 * The six chapters every guide is made of, in page order: their number is their position here
 * (Città is always chapter 4) and their title is the same in every guide (i18n `guide.chapters`).
 * A guide may leave some out while they are not written yet.
 */
export const CHAPTERS = ['identity', 'history', 'people', 'cities', 'nature', 'food'] as const

export type ChapterKind = (typeof CHAPTERS)[number]

/** A chapter's fixed number, from 1. */
export const chapterNumber = (kind: ChapterKind) => CHAPTERS.indexOf(kind) + 1

/** One entry of the guide index. `id` is the anchor of the section it points to. */
export type TocEntry<P extends string = string> = {
  id: string
  label: string
  level: 1 | 2 | 3
  /** A chapter's fixed number. */
  number?: number
  /** Period shown under (sidebar) or next to (menu) the label. */
  dates?: string
  /** The same as the `on` of the section it points to. */
  on: Visibility<P>
}

/**
 * Author and licence of an image that is not the author's own work (B9). `unverified` keeps the
 * build green while the source is being checked: the validator lists it as a warning, the way
 * `TODO verificare` comments mark unverified facts.
 */
export type Credit = { author: string; license: string; url?: string } | { unverified: string }

/** An image of the guide, under `public/`. `credit` is required once the file exists. */
export type GuideImage = { src: string; alt: string; credit?: Credit }

/** A whole guide in one locale: its structure, that locale's names, and the page content. */
export type GuideContent<P extends string = string, S extends string = string> = {
  structure: GuideStructure<P, S>
  names: GuideNames<P, S>
  /** Image under `public/`; the cover falls back to a plain ground until it exists. */
  cover?: GuideImage
  /**
   * Color of the country name and of the nowhere logo on the cover — always the same, so they
   * read as one print color over the photo. Any CSS color; prefer a token, e.g.
   * 'var(--color-bg)'. Defaults to the text color.
   */
  coverInk?: string
  emblems?: (GuideImage & {
    kind: 'coat-of-arms' | 'flag'
    width: number
    height: number
  })[]
  body: ReactNode
}

/*
 * Structure (docs/data-model.md §2): what is the same in every language. Texts live in the
 * locale's names module (GuideNames) and in its body.
 */

/**
 * A year (BC years negative), a century (`{ century: -1 }` = I sec. a.C.), optionally approximate.
 * Formatted per locale (i18n/dates.ts), so structure never holds a date string.
 */
export type Year = number | { century: number; circa?: true } | { year: number; circa: true }

/** A period: `to` omitted for a single date. */
export type Period = { from: Year; to?: Year }

/** A historical region of the trip filter, with its cities (filter order). */
export type RegionDef<P extends string = string> = { id: P; cities: P[] }

/**
 * A chapter (level 1), part (2) or titled timeline/region (3) of the body: one index entry. The
 * order of the list is the order of the page; part numbers come from it.
 */
export type SectionDef<S extends string = string, P extends string = string> = {
  id: S
  /** Index level; also how the kit numbers it (chapters and parts are numbered). */
  level: 1 | 2 | 3
  /**
   * Which of the six chapters a level-1 section is (required there, not allowed below): it gives
   * the chapter's number and title.
   */
  chapter?: ChapterKind
  /** The places for which the section and its index entry are shown. */
  on: Visibility<P>
  period?: Period
  /**
   * A known mismatch between `period` and the section's events, being checked: the validator
   * reports it as a warning instead of an error (like a `TODO verificare`). Say what to check.
   */
  verify?: string
}

/** How rare a trace is; worth 1, 2 or 3 points toward the album completion. */
export type Rarity = 'common' | 'rare' | 'very-rare'

export const RARITY_POINTS: Record<Rarity, number> = { common: 1, rare: 2, 'very-rare': 3 }

/**
 * Where a trace is: in a city of the guide, near one, out of the way, or anywhere in the country
 * (the three traces every album opens with: cover, coat of arms, flag).
 */
export type TraceWhere = 'city' | 'nearby' | 'remote' | 'anywhere'

/** The icon of a trace still to find (components/guide/traceIcons.tsx). */
export type TraceIcon =
  | 'bank'
  | 'bridge'
  | 'castle'
  | 'church'
  | 'clock'
  | 'flag'
  | 'frame'
  | 'house'
  | 'image'
  | 'mosaic'
  | 'mountains'
  | 'music'
  | 'paint'
  | 'pin'
  | 'shield'
  | 'steps'
  | 'trophy'
  | 'wall'
  | 'waves'

/**
 * A trace: a place to find on the trip, one box of the album (docs/data-model.md §3, a "place"
 * subject). Every album opens with three traces the kit adds by itself (the cover, the coat of
 * arms and the flag, numbers 01–03, content/build.ts): the guide's own traces follow, from 04, in
 * the order of this list.
 */
export type TraceDef<P extends string = string> = {
  /** `<cc>.place.<slug>`, e.g. `ro.place.biertan-fortified-church`. Stored with the reader's photos. */
  id: string
  /** Region of the trip filter. */
  region: P
  /** City of the region, when `where` is 'city'. */
  city?: P
  where: Exclude<TraceWhere, 'anywhere'>
  rarity: Rarity
  icon: TraceIcon
  /**
   * Stock image ("Repertorio"), shown in grey until the reader adds a photo. Without it the box
   * shows a plain placeholder. `credit` is required once the file exists (B9).
   */
  image?: { src: string; credit?: Credit }
  /** Marked "Nuova" in the album until seen. */
  isNew?: true
}

/**
 * A person or city card ("Scheda", B9–B10): an introduction, its traces, and "Da ricordare". The
 * texts are in the body (`<Card>`); the name in the names module.
 */
export type CardDef<P extends string = string> = {
  /** A person: `<cc>.person.<slug>`. A city: the city's id (one card per city). */
  id: string
  kind: 'person' | 'city'
  /** Region in the card's kicker ("Personaggio · Valacchia"). */
  region: P
  /** Trace ids, in order (2–5). */
  traces: string[]
}

export type GuideStructure<P extends string = string, S extends string = string> = {
  /** ISO 3166-1 alpha-2, the prefix of every id of the guide. */
  country: string
  regions: RegionDef<P>[]
  sections: SectionDef<S, P>[]
  /** The guide's own traces, in album order (after the cover, the flag and the coat of arms). */
  traces?: TraceDef<P>[]
  /** Person and city cards, in the order of "Personaggi e città" in the album opening. */
  cards?: CardDef<P>[]
}

/** A locale's texts for a trace (plain text: they are also shown in the album). */
export type TraceText = {
  name: string
  /** Local name, after the name in italics: "Turnul cu Ceas". */
  local?: string
  /** Where it is, under the name: "Sighișoara, Transilvania". */
  place: string
  /**
   * What it is: two or three sentences. Optional: leave it out when the text around the trace
   * already says it (the trace then shows only "Come trovarla").
   */
  text?: string
  /** "Come trovarla": the address and how to find the exact spot. */
  find: string
  /** Placeholder of the reader's note; defaults to "Che cosa ti ha colpito?". */
  invite?: string
  /** For 'nearby': how far, e.g. "a 30 km da Brașov". */
  distance?: string
}

/** A locale's texts for a card's heading and its entry in "Personaggi e città". */
export type CardText = {
  name: string
  /** Local or other names, after the name in italics: "Hermannstadt · Nagyszeben". */
  local?: string
  /** Under the heading: "1431 – 1476". */
  dates?: string
}

/** A locale's short texts for a guide's structure. The default locale must name every id. */
export type GuideNames<P extends string = string, S extends string = string> = {
  places: Record<P, string>
  /**
   * Section titles. A chapter's title is fixed (i18n `guide.chapters`): its entry here is instead
   * its line under the title in the guide's summary, e.g. "Bandiera e stemma".
   */
  sections: Record<S, string>
  /** Trace texts by trace id. */
  traces?: Record<string, TraceText>
  /** Card names by card id. */
  cards?: Record<string, CardText>
}

/** Identity: ties a structure's enums together so the kit and the names are typed by them. */
export function defineGuide<P extends string, S extends string>(
  structure: GuideStructure<P, S>,
): GuideStructure<P, S> {
  return structure
}
