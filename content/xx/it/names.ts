import type { GuideNames } from '@/content/types'
import { Food, Landscape, Person, Section, Template, Trace } from '../structure'

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
  /**
   * Section titles. A chapter's title is the same in every guide: its entry here is its line
   * under the title in the summary ("La guida in sei capitoli").
   */
  sections: {
    [Section.Identity]: 'Bandiera e stemma',
    [Section.History]: 'La riga del capitolo nel sommario',
    [Section.Part]: 'Titolo della parte',
    [Section.DateList]: 'Elenco di date',
    [Section.RegionalPart]: 'Parte legata a una regione',
    [Section.People]: 'Chi incontrerai nei musei',
    [Section.RegionsAndCities]: 'Cosa vedere sul posto',
    [Section.RegionsAndCitiesNorth]: places[Template.North],
    [Section.RegionsAndCitiesSouth]: places[Template.South],
    [Section.Nature]: 'Montagne, fiumi e parchi',
    [Section.Food]: 'Cosa ordinare',
  },
  /** Trace texts: plain text, also shown in the album. `place` is the line under the name. */
  traces: {
    [Trace.ClockTower]: {
      name: 'Torre dell’orologio',
      local: 'Nome locale',
      place: `${places[Template.CityOne]}, ${places[Template.North]}`,
      text: 'Cos’è la traccia, in due o tre frasi: perché vale la pena cercarla.',
      find: 'Come trovarla: indirizzo e punto preciso, da dove si vede meglio.',
    },
    [Trace.BirthHouse]: {
      name: 'Casa natale',
      place: `${places[Template.CityOne]}, ${places[Template.North]}`,
      text: 'Una traccia che compare in due schede: nella seconda si legge «Anche in».',
      find: 'Piazza principale, angolo nord.',
      invite: 'L’invito della nota, se diverso da «Che cosa ti ha colpito?»',
    },
    [Trace.Fortress]: {
      name: 'Fortezza sul monte',
      place: `Valle del fiume, ${places[Template.North]}`,
      // No `text`: optional, when the text around the trace already says it. Only "Come trovarla".
      find: 'A piedi dal parcheggio sulla strada, un’ora di salita.',
    },
    [Trace.Painting]: {
      name: 'Il quadro del museo',
      local: 'Titolo originale',
      place: `${places[Template.CityThree]}, ${places[Template.South]}`,
      text: 'Una traccia nuova, con un’immagine di repertorio (qui manca: segnaposto).',
      find: 'Museo civico, primo piano, ultima sala.',
    },
    [Trace.Lake]: {
      name: 'Il lago sotto la cima',
      local: 'Nome locale del lago',
      place: `Parco nazionale, ${places[Template.South]}`,
      text: 'Una traccia di paesaggio: un punto preciso, da fotografare, dentro un ambiente più grande.',
      find: 'Sentiero segnato dal rifugio, due ore di cammino; percorribile da giugno a ottobre.',
    },
    [Trace.Dish]: {
      name: 'Il piatto nazionale',
      local: 'Nome nel menù',
      place: 'In tutto il paese',
      // No `text`: the card's intro already says what it is.
      find: 'Dove ordinarlo e come riconoscerlo: in quali locali, in quale stagione.',
    },
    [Trace.RegionalDish]: {
      name: 'La variante del Sud',
      local: 'Nome locale',
      place: places[Template.South],
      text: 'Che cosa cambia rispetto alla ricetta comune, in una o due frasi.',
      find: 'Nei ristoranti tradizionali della regione.',
    },
  },
  /** Card headings; a city card takes the city's name. */
  cards: {
    [Person.Someone]: { name: 'Un personaggio', local: 'Nome locale', dates: '1431 – 1476' },
    [Template.CityOne]: {
      name: places[Template.CityOne],
      local: 'Nome locale · Altro nome',
      traceTexts: {
        [Trace.BirthHouse]:
          'Nella scheda della città, la stessa casa racconta il quartiere. Foto, numero e indicazioni restano quelli della traccia condivisa con il personaggio.',
      },
    },
    [Template.CityThree]: { name: places[Template.CityThree] },
    [Landscape.Mountains]: { name: 'Le montagne', local: 'Nome locale' },
    [Food.Dish]: { name: 'Il piatto nazionale', local: 'Nome locale' },
  },
}
