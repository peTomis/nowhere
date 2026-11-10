import { defineGuide } from '@/content/types'

/*
 * Structure of the template guide (/template): the same in every language (docs/data-model.md
 * §2). "xx" is an ISO user-assigned code, so it never clashes with a real country. To start a new
 * guide, copy the whole folder to content/<cc>/ (see README, "Adding a guide").
 */

/**
 * Regions and cities: English slugs prefixed by the country code (docs/data-model.md §4). The
 * values are stored in readers' browsers by the trip filter: don't rename them once published.
 */
export enum Template {
  // regions
  North = 'xx.north',
  South = 'xx.south',
  // cities
  CityOne = 'xx.city-one',
  CityTwo = 'xx.city-two',
  CityThree = 'xx.city-three',
}

/**
 * Chapters, parts, titled timelines and regions: index entries and URL anchors (`xx.section.`
 * dropped). Their titles are in it/names.ts, their `on` and dates here.
 */
export enum Section {
  Identity = 'xx.section.identity',
  History = 'xx.section.history',
  Part = 'xx.section.part',
  DateList = 'xx.section.date-list',
  RegionalPart = 'xx.section.regional-part',
  People = 'xx.section.people',
  RegionsAndCities = 'xx.section.regions-and-cities',
  RegionsAndCitiesNorth = 'xx.section.regions-and-cities.north',
  RegionsAndCitiesSouth = 'xx.section.regions-and-cities.south',
  Nature = 'xx.section.nature',
  Food = 'xx.section.food',
}

/** Traces of the album (`<cc>.place.<slug>`) and persons (`<cc>.person.<slug>`): stored with the reader's photos, never rename them. */
export enum Trace {
  ClockTower = 'xx.place.clock-tower',
  BirthHouse = 'xx.place.birth-house',
  Fortress = 'xx.place.fortress',
  Painting = 'xx.place.painting',
}

export enum Person {
  Someone = 'xx.person.someone',
}

const { North, South, CityOne, CityTwo, CityThree } = Template

export const structure = defineGuide<Template, Section>({
  country: 'xx',
  /** Trip filter: regions, each with its cities (a region may have none). */
  regions: [
    { id: North, cities: [CityOne, CityTwo] },
    { id: South, cities: [CityThree] },
  ],
  /**
   * In page order. Chapters (level 1) are the six of every guide, in their fixed order: `chapter`
   * gives their number and title (identity 1, history 2, people 3, cities 4, nature 5, food 6); a
   * guide leaves out those not written yet. Parts (2) are numbered from this order. `period` gives
   * the dates of the section's title and index entry (chapters show theirs only under the title).
   */
  sections: [
    { id: Section.Identity, level: 1, chapter: 'identity', on: 'always' },
    {
      id: Section.History,
      level: 1,
      chapter: 'history',
      on: 'always',
      period: { from: -1000, to: 1500 },
    },
    { id: Section.Part, level: 2, on: 'always', period: { from: -1000, to: 1400 } },
    { id: Section.DateList, level: 3, on: 'always', period: { from: 1000, to: 1400 } },
    { id: Section.RegionalPart, level: 2, on: [South], period: { from: 1500 } },
    { id: Section.People, level: 1, chapter: 'people', on: 'always' },
    { id: Section.RegionsAndCities, level: 1, chapter: 'cities', on: 'always' },
    { id: Section.RegionsAndCitiesNorth, level: 2, on: [North] },
    { id: Section.RegionsAndCitiesSouth, level: 2, on: [South] },
    { id: Section.Nature, level: 1, chapter: 'nature', on: 'always' },
    { id: Section.Food, level: 1, chapter: 'food', on: 'always' },
  ],
  /**
   * The album's own traces, from 04 (01–03 are the cover, the coat of arms and the flag, added
   * by the kit). `where`: 'city' (needs `city`), 'nearby' or 'remote'. `image`: stock picture
   * shown in grey until the reader's photo (missing here, so a placeholder).
   */
  traces: [
    {
      id: Trace.ClockTower,
      region: North,
      city: CityOne,
      where: 'city',
      rarity: 'common',
      icon: 'clock',
    },
    {
      id: Trace.BirthHouse,
      region: North,
      city: CityOne,
      where: 'city',
      rarity: 'common',
      icon: 'house',
    },
    { id: Trace.Fortress, region: North, where: 'remote', rarity: 'very-rare', icon: 'mountains' },
    {
      id: Trace.Painting,
      region: South,
      city: CityThree,
      where: 'city',
      rarity: 'rare',
      icon: 'frame',
      image: { src: '/guides/template/trace-painting.jpg' },
      isNew: true,
    },
  ],
  /** Person and city cards (a city card's id is the city): each listed once in the body with <Card>. */
  cards: [
    {
      id: Person.Someone,
      kind: 'person',
      region: North,
      traces: [Trace.BirthHouse, Trace.Fortress],
    },
    { id: CityOne, kind: 'city', region: North, traces: [Trace.ClockTower, Trace.BirthHouse] },
    { id: CityThree, kind: 'city', region: South, traces: [Trace.Painting] },
  ],
})
