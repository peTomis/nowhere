/**
 * Guide registry. Every country with a guide (ready or in progress) lives here;
 * the home map colors countries by `status`.
 *
 * `countryId` is the ISO 3166-1 numeric code (the same id as the world TopoJSON
 * features, e.g. Romania = "642").
 */
export type GuideStatus = 'ready' | 'draft'

export type Guide = {
  slug: string
  countryId: string
  name: string
  status: GuideStatus
  /** [longitude, latitude] of the country, used to center the map on narrow screens. */
  at: [number, number]
  /** Trip date (ISO), if known. */
  tripDate?: string
  summary?: string
}

export const guides: Guide[] = [
  {
    slug: 'romania',
    countryId: '642',
    name: 'Romania',
    status: 'ready',
    at: [24.9, 45.9],
    summary: 'Transilvania, Bucarest e i Carpazi.',
  },
]

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug)
export const getGuideByCountry = (countryId: string) =>
  guides.find((g) => g.countryId === countryId)
