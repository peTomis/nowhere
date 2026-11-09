/**
 * Guide registry. Every country with a guide (ready or in progress) lives here;
 * the home map colors countries by `status`.
 *
 * `id` is the ISO 3166-1 alpha-2 code in lowercase ('ro'): the prefix of every content id of the
 * guide and the key of the reader's data. `numeric` is the ISO 3166-1 numeric code, the id of the
 * world TopoJSON features (Romania = '642'). `slug` is the URL segment: English, never translated.
 */
export type GuideStatus = 'ready' | 'draft'

export type Guide = {
  id: string
  numeric: string
  slug: string
  name: string
  status: GuideStatus
  /** [longitude, latitude] of the country. */
  at: [number, number]
  /** Trip date (ISO), if known. */
  tripDate?: string
  summary?: string
}

export const guides: Guide[] = [
  {
    id: 'ro',
    numeric: '642',
    slug: 'romania',
    name: 'Romania',
    status: 'ready',
    at: [24.9, 45.9],
    summary: 'Transilvania, Bucarest e i Carpazi.',
  },
]

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug)
