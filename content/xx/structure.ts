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
  Chapter = 'xx.section.chapter',
  Part = 'xx.section.part',
  DateList = 'xx.section.date-list',
  RegionalPart = 'xx.section.regional-part',
  RegionsAndCities = 'xx.section.regions-and-cities',
  RegionsAndCitiesNorth = 'xx.section.regions-and-cities.north',
  RegionsAndCitiesSouth = 'xx.section.regions-and-cities.south',
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
   * In page order: chapters (level 1) and parts (2) are numbered from it. `period` gives the dates
   * of the section's title and index entry (chapters show theirs only under the title).
   */
  sections: [
    { id: Section.Chapter, level: 1, on: 'always', period: { from: -1000, to: 1500 } },
    { id: Section.Part, level: 2, on: 'always', period: { from: -1000, to: 1400 } },
    { id: Section.DateList, level: 3, on: 'always', period: { from: 1000, to: 1400 } },
    { id: Section.RegionalPart, level: 2, on: [South], period: { from: 1500 } },
    { id: Section.RegionsAndCities, level: 1, on: 'always' },
    { id: Section.RegionsAndCitiesNorth, level: 2, on: [North] },
    { id: Section.RegionsAndCitiesSouth, level: 2, on: [South] },
  ],
})
