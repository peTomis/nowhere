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

/** One entry of the guide index. `id` is the anchor of the section it points to. */
export type TocEntry<P extends string = string> = {
  id: string
  label: string
  level: 1 | 2 | 3
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
 * order of the list is the order of the page; chapter and part numbers come from it.
 */
export type SectionDef<S extends string = string, P extends string = string> = {
  id: S
  /** Index level; also how the kit numbers it (chapters and parts are numbered). */
  level: 1 | 2 | 3
  /** The places for which the section and its index entry are shown. */
  on: Visibility<P>
  period?: Period
  /**
   * A known mismatch between `period` and the section's events, being checked: the validator
   * reports it as a warning instead of an error (like a `TODO verificare`). Say what to check.
   */
  verify?: string
}

export type GuideStructure<P extends string = string, S extends string = string> = {
  /** ISO 3166-1 alpha-2, the prefix of every id of the guide. */
  country: string
  regions: RegionDef<P>[]
  sections: SectionDef<S, P>[]
}

/** A locale's short texts for a guide's structure. The default locale must name every id. */
export type GuideNames<P extends string = string, S extends string = string> = {
  places: Record<P, string>
  sections: Record<S, string>
}

/** Identity: ties a structure's enums together so the kit and the names are typed by them. */
export function defineGuide<P extends string, S extends string>(
  structure: GuideStructure<P, S>,
): GuideStructure<P, S> {
  return structure
}
