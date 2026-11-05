import type { ReactNode } from 'react'

/*
 * Place ids are generic: each guide declares a string enum of its regions and cities
 * (e.g. `enum Romania { Transilvania = 'transilvania', … }`) and uses GuideContent<Romania>,
 * so a mistyped id in places, toc `when` or <Only on> fails the typecheck.
 * The enum values are what gets stored in localStorage: don't rename them once published.
 */

/** A region the reader can include or exclude from their trip, with its cities. */
export type Place<P extends string = string> = {
  id: P
  name: string
  cities: { id: P; name: string }[]
}

/** One entry of the guide index. `id` is the anchor of the section it points to. */
export type TocEntry<P extends string = string> = {
  id: string
  label: string
  level: 1 | 2 | 3
  /** Period shown under (sidebar) or next to (menu) the label. */
  dates?: string
  /** Show the entry only when at least one of these places is in the trip. */
  when?: P[]
}

export type GuideContent<P extends string = string> = {
  /** Image under `public/`; the cover falls back to a plain ground until it exists. */
  cover?: { src: string; alt: string }
  /**
   * Color of the country name and of the nowhere logo on the cover — always the same, so they
   * read as one print color over the photo. Any CSS color; prefer a token, e.g.
   * 'var(--color-bg)'. Defaults to the text color.
   */
  coverInk?: string
  emblems?: {
    src: string
    alt: string
    kind: 'coat-of-arms' | 'flag'
    width: number
    height: number
  }[]
  places: Place<P>[]
  toc: TocEntry<P>[]
  body: ReactNode
}
