import type { GuideSources } from '@/content/types'
import { Landscape, Person, Section, Template } from './structure'

/*
 * The template's bibliography, shown in its "Fonti" view: the pages read while writing the guide,
 * grouped by entry of the index (a chapter, a part, a person, city or landscape card). `title`
 * and `site` as the page gives them, in its own language. The same for every locale. What each
 * page was used for and what is still to verify go in the research notes
 * (content/<cc>/research/), not here. Placeholders: the links lead nowhere.
 */
export const sources: GuideSources = {
  [Section.History]: [
    {
      title: 'Una storia generale del paese',
      site: 'Editore accademico',
      url: 'https://example.org/storia-generale',
    },
  ],
  [Section.Part]: [
    {
      title: 'Un articolo su un fatto della parte',
      site: 'Rivista di storia',
      url: 'https://example.org/articolo',
    },
  ],
  [Person.Someone]: [
    { title: 'La voce sul personaggio', site: 'Enciclopedia', url: 'https://example.org/voce' },
  ],
  [Template.CityOne]: [
    {
      title: 'La scheda del monumento',
      site: 'Registro dei monumenti',
      url: 'https://example.org/monumento',
    },
  ],
  [Template.CityThree]: [
    { title: 'La pagina del museo', site: 'Museo civico', url: 'https://example.org/museo' },
  ],
  [Landscape.Mountains]: [
    { title: 'Il sito del parco', site: 'Parco nazionale', url: 'https://example.org/parco' },
  ],
}
