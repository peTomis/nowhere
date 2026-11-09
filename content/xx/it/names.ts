import type { GuideNames } from '@/content/types'
import { Section, Template } from '../structure'

/** Italian names of the template's places and sections (index, titles, trip filter). */

const places: Record<Template, string> = {
  [Template.North]: 'Nord',
  [Template.South]: 'Sud',
  [Template.CityOne]: 'Città uno',
  [Template.CityTwo]: 'Città due',
  [Template.CityThree]: 'Città tre',
}

export const names: GuideNames<Template, Section> = {
  places,
  sections: {
    [Section.Chapter]: 'Titolo del capitolo',
    [Section.Part]: 'Titolo della parte',
    [Section.DateList]: 'Elenco di date',
    [Section.RegionalPart]: 'Parte legata a una regione',
    [Section.RegionsAndCities]: 'Regioni e città',
    [Section.RegionsAndCitiesNorth]: places[Template.North],
    [Section.RegionsAndCitiesSouth]: places[Template.South],
  },
}
