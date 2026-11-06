import { guideKit } from '@/components/guide/content'
import type { GuideContent } from '@/lib/guide'

/*
 * Template guide, shown at /template: every element of the guide kit with placeholder text that
 * says what the element is for. To start a new guide, copy this file to content/guides/<slug>.tsx,
 * register the guide in data/guides.ts and content/guides/index.ts, and put the images in
 * public/guides/<slug>/. Guide texts (titles, place names, alt texts) live here, not in i18n.
 * The image paths below point to files that don't exist, so the page shows the placeholders.
 */

/** The country name on the cover (a real guide takes it from data/guides.ts). */
export const name = 'Paese'

const dir = '/guides/template'

/** Index labels and dates, reused as the titles of the matching sections. */
const headings = {
  chapter1: 'Titolo del capitolo',
  part1: 'Titolo della parte',
  part1Dates: '1000 a.C. – 1000',
  list: 'Elenco di date',
  part2: 'Parte legata a una regione',
  part2Dates: '1500',
  chapter2: 'Regioni e città',
}

/** Region names: trip filter, index and region titles. */
const regions = {
  nord: 'Nord',
  sud: 'Sud',
}

/** City names: trip filter and city titles. */
const cities = {
  cittaUno: 'Città uno',
  cittaDue: 'Città due',
  cittaTre: 'Città tre',
}

/**
 * Regions and cities of the guide, with their Italian names. The values are stored in the
 * reader's localStorage by the trip filter: don't rename them once published.
 */
enum Template {
  // regions
  Nord = 'nord',
  Sud = 'sud',
  // cities
  CittaUno = 'citta-uno',
  CittaDue = 'citta-due',
  CittaTre = 'citta-tre',
}

/** The guide kit, narrowed to this guide's places: `on` only accepts Template ids. */
const {
  A,
  Aside,
  Callout,
  Chapter,
  City,
  D,
  Detail,
  Event,
  Figure,
  Glossary,
  MapFigure,
  N,
  Note,
  Part,
  PhotoGrid,
  Position,
  Positions,
  Region,
  Source,
  Text,
  Timeline,
} = guideKit<Template>()

const { Nord, Sud, CittaUno, CittaDue, CittaTre } = Template

export const template: GuideContent<Template> = {
  cover: { src: `${dir}/cover.jpg`, alt: 'Foto di copertina' },
  /** Country name and nowhere logo on the cover: always one color. */
  coverInk: 'var(--color-text)',
  emblems: [
    {
      src: `${dir}/coat-of-arms.png`,
      alt: 'Stemma del paese',
      kind: 'coat-of-arms',
      width: 480,
      height: 695,
    },
    { src: `${dir}/flag.svg`, alt: 'Bandiera del paese', kind: 'flag', width: 72, height: 48 },
  ],
  /** Trip filter: regions, each with its cities (a region may have none). */
  places: [
    {
      id: Nord,
      name: regions.nord,
      cities: [
        { id: CittaUno, name: cities.cittaUno },
        { id: CittaDue, name: cities.cittaDue },
      ],
    },
    {
      id: Sud,
      name: regions.sud,
      cities: [{ id: CittaTre, name: cities.cittaTre }],
    },
  ],
  /** Index: `id` is the anchor of the section, `on` the same places as the section's `on`. */
  toc: [
    { id: 'cap-1', label: headings.chapter1, level: 1, on: 'always' },
    { id: 'parte-1', label: headings.part1, level: 2, dates: headings.part1Dates, on: 'always' },
    { id: 'elenco', label: headings.list, level: 3, on: 'always' },
    {
      id: 'parte-2',
      label: headings.part2,
      level: 2,
      dates: headings.part2Dates,
      on: [Sud],
    },
    { id: 'cap-2', label: headings.chapter2, level: 1, on: 'always' },
    { id: 'reg-nord', label: regions.nord, level: 2, on: [Nord] },
    { id: 'reg-sud', label: regions.sud, level: 2, on: [Sud] },
  ],
  body: <Body />,
}

/*
 * Every block has an `on`: the places of the trip for which it is shown (at least one must be
 * in the trip), or "always" to show it whatever the reader selected, even nothing. Blocks nest, so a block is shown only if its parents are too: the chapter gets
 * the widest list, the texts inside it the same list or a part of it.
 */
function Body() {
  return (
    <>
      {/* Chapter: number, title (from the toc), lede and an optional period. Its parts go inside. */}
      <Chapter
        on="always"
        id="cap-1"
        number={1}
        title={headings.chapter1}
        lede="Il sommario del capitolo in una frase, in corsivo."
        period="1000 a.C. – 1500"
      >
        <Text on="always">
          Paragrafo introduttivo: un quadro generale in due o tre frasi. I nomi di persone, luoghi e
          opere vanno in <N>magenta</N>, le opere anche in corsivo, come{' '}
          <N work>Titolo dell’opera</N>; le date con l’evidenziatore: <D>1492</D>. Un nome può
          portare a una pagina esterna, come{' '}
          <N href="https://it.wikipedia.org/wiki/Pagina_principale">questo</N>, e anche un testo
          normale: <A href="https://it.wikipedia.org/wiki/Pagina_principale">un link</A>.
        </Text>
        <Text on={[Nord]}>Un paragrafo visibile solo se il viaggio include il Nord.</Text>
        <Text on={[Nord, Sud]}>
          Un paragrafo con più motivi per essere visto: basta una delle regioni della lista.
        </Text>
        <MapFigure
          on="always"
          src={`${dir}/map.png`}
          alt="Cartina del paese con le regioni"
          ratio="666/400"
          places={[
            { name: 'Primo luogo', note: 'nota breve, numerata sulla cartina' },
            { name: 'Secondo luogo', note: 'le voci vanno in colonne' },
            { name: 'Terzo luogo', note: 'quante ne servono' },
          ]}
        />

        {/* Part: a section of the chapter; the kicker repeats the dates of the toc entry. */}
        <Part
          on="always"
          id="parte-1"
          kicker={`Parte I · ${headings.part1Dates}`}
          title={headings.part1}
        >
          <Timeline on="always">
            <Event
              on="always"
              date="1000 a.C."
              title={
                <>
                  Evento con nota nel titolo <Aside>(tra parentesi)</Aside>
                </>
              }
            >
              <Detail on="always">
                <D>950–900 a.C.</D> Un dettaglio che inizia con la sua data
              </Detail>
              <Detail on="always">Un dettaglio senza data: ogni riga ha il rombo azzurro.</Detail>
            </Event>
            <Event on="always" date="500" title="Evento con un riquadro da vedere sul posto">
              <Detail on="always">
                Un dettaglio con un nome: <N>Nome proprio</N>.
              </Detail>
              <Callout on={[Nord]} kind="onsite">
                Da approfondire sul posto: visibile solo se il viaggio include il <N>Nord</N>.
              </Callout>
            </Event>
            <Event on="always" date="1000" title="Evento con un termine da spiegare">
              <Glossary on="always" term="termine" origin="dal latino">
                la definizione, breve, dopo il trattino.
              </Glossary>
            </Event>
            <Event on="always" title="Evento senza data: niente evidenziatore a margine">
              <Detail on="always">Per un fatto senza una data precisa: basta non indicarla.</Detail>
            </Event>
          </Timeline>

          <PhotoGrid>
            <Figure on="always" caption="Griglia di foto: prima didascalia" ratio="4/5" />
            <Figure on="always" caption="Seconda didascalia, stessa proporzione" ratio="4/5" />
          </PhotoGrid>

          <Callout on="always" kind="debate" title="Un punto controverso, posto come domanda?">
            <Positions>
              <Position on="always" title="Prima tesi">
                Chi la sostiene e cosa dice, in una o due frasi.
              </Position>
              <Position on="always" title="Seconda tesi">
                <N>Un autore</N> (XIX sec.): la posizione opposta.
              </Position>
            </Positions>
            <Note on="always">La nota finale: cosa sappiamo davvero e cosa vedrai nei musei.</Note>
          </Callout>

          <Timeline
            on="always"
            id="elenco"
            title={
              <>
                {headings.list} <Aside italic>1000 – 1400</Aside>
              </>
            }
          >
            <Event
              on="always"
              date="1000"
              title="Timeline con titolo e id: compare nell’indice e si segue scorrendo"
            />
            <Event
              on="always"
              date="1200"
              title={
                <>
                  Un evento di una sola riga, con un nome: <N>Nome proprio</N>
                </>
              }
            />
            <Event
              on={[Sud]}
              date="1400"
              title="Un evento visibile solo con il Sud, con una fonte al posto di un dettaglio"
            >
              <Source on={[Sud]}>
                <N work>Titolo della fonte</N>, con un giudizio sulla sua attendibilità.
              </Source>
            </Event>
          </Timeline>
        </Part>

        {/* A part tied to a region: its toc entry has the same `on`. */}
        <Part
          on={[Sud]}
          id="parte-2"
          kicker={`Parte II · ${headings.part2Dates}`}
          title={headings.part2}
        >
          <Timeline on="always">
            <Event on={[Sud]} date="1500" title="Evento di una parte legata a una regione">
              <Detail on={[Sud]}>
                Questa parte e la sua voce nell’indice spariscono senza il Sud.
              </Detail>
            </Event>
          </Timeline>
        </Part>

        <Callout on="always" kind="remember">
          <Text on="always">
            Il riassunto del capitolo: le due o tre cose da tenere a mente prima di passare oltre.
          </Text>
        </Callout>
      </Chapter>

      {/* gap="wide" spaces out the regions. */}
      <Chapter
        on="always"
        id="cap-2"
        number={2}
        title={headings.chapter2}
        lede="Cosa vedere sul posto, regione per regione."
        gap="wide"
      >
        <Region
          on={[Nord]}
          id="reg-nord"
          name={regions.nord}
          photo={{ caption: 'Foto della regione, in proporzione 3:2' }}
          intro={
            <>
              Introduzione alla regione: geografia e storia in breve, con nomi come{' '}
              <N>Nome proprio</N> e date come <D>1918</D>.
            </>
          }
        >
          <City on={[CittaUno]} name={cities.cittaUno} local="Nome locale">
            <Detail on={[CittaUno]}>
              Città senza foto, con il nome nella lingua locale accanto al titolo.
            </Detail>
            <Detail on={[CittaUno]}>
              <N>Un monumento</N>, del <D>1817</D>.
            </Detail>
          </City>
          <City
            on={[CittaDue]}
            name={cities.cittaDue}
            photo={{ caption: 'Città con foto accanto al testo' }}
          >
            <Detail on={[CittaDue]}>Con la foto, testo e immagine stanno affiancati.</Detail>
          </City>
          <Text on={[CittaUno, CittaDue]}>
            Un paragrafo per chi visita almeno una delle due città.
          </Text>
        </Region>

        <Region
          on={[Sud]}
          id="reg-sud"
          name={regions.sud}
          photo={{ caption: 'Foto della seconda regione' }}
          intro={<>Una seconda regione, per vedere la spaziatura tra le regioni.</>}
        >
          <City on={[CittaTre]} name={cities.cittaTre}>
            <Detail on={[CittaTre]}>Città minima: solo il nome e i dettagli.</Detail>
          </City>
        </Region>
      </Chapter>
    </>
  )
}
