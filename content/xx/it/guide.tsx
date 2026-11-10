import { guideKit } from '@/components/guide/content'
import type { GuideContent } from '@/content/types'
import { Person, Section, Template, Trace, structure } from '../structure'
import { names } from './names'

/*
 * Template guide, shown at /template: every element of the guide kit with placeholder text that
 * says what the element is for. A guide is a folder content/<cc>/ (cc = ISO 3166-1 alpha-2):
 * structure.ts (ids, regions, sections: the same in every language), it/names.ts (place and
 * section names), it/guide.tsx (this file: cover, emblems and the body). To start a new guide,
 * copy content/xx/, register it in content/countries.ts, content/guides.ts and
 * content/structures.ts, and put the images
 * in public/guides/<slug>/. Guide texts (titles, place names, alt texts) live in the guide, not in
 * i18n. The image paths below point to files that don't exist, so the page shows the placeholders.
 */

/** The country name on the cover (a real guide takes it from content/countries.ts). */
export const name = 'Paese'

const dir = '/guides/template'

/** The guide kit bound to this guide: `on` only accepts Template ids, `section` Section ids. */
const {
  A,
  Aside,
  Callout,
  Card,
  Chapter,
  City,
  Context,
  D,
  Detail,
  Emblem,
  Event,
  Figure,
  Glossary,
  MapFigure,
  N,
  Note,
  Part,
  PhotoGrid,
  PhotoRow,
  Position,
  Positions,
  Region,
  Source,
  Text,
  Timeline,
  Today,
} = guideKit(structure, names)

const { North, South, CityOne, CityTwo, CityThree } = Template

export const template: GuideContent<Template, Section> = {
  structure,
  names,
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
      {/*
        Chapter: `section` gives its anchor, `on`, title and period (structure.ts + names.ts); the
        number follows the order of the sections. The lede is written here. Its parts go inside.
      */}
      <Chapter section={Section.Chapter} lede="Il sommario del capitolo in una frase, in corsivo.">
        <Text on="always">
          Paragrafo introduttivo: un quadro generale in due o tre frasi. I nomi di persone, luoghi e
          opere vanno in <N>magenta</N>, le opere anche in corsivo, come{' '}
          <N work>Titolo dell’opera</N>; le date con l’evidenziatore: <D>1492</D>. Un nome può
          portare a una pagina esterna, come{' '}
          <N href="https://it.wikipedia.org/wiki/Pagina_principale">questo</N>, e anche un testo
          normale: <A href="https://it.wikipedia.org/wiki/Pagina_principale">un link</A>.
        </Text>
        <Text on={[North]}>Un paragrafo visibile solo se il viaggio include il Nord.</Text>
        <Text on={[North, South]}>
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

        {/* Part: numbered in its chapter; the kicker shows the number and the section's dates. */}
        <Part section={Section.Part}>
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
              {/* "Oggi:": up to two traces where the event can be seen today. */}
              <Today traces={[Trace.BirthHouse, Trace.Fortress]} />
            </Event>
            <Event on="always" date="500" title="Evento con un riquadro da vedere sul posto">
              <Detail on="always">
                Un dettaglio con un nome: <N>Nome proprio</N>.
              </Detail>
              <Callout on={[North]} kind="onsite">
                Da approfondire sul posto: visibile solo se il viaggio include il <N>Nord</N>.
              </Callout>
            </Event>
            <Event on="always" date="1000" title="Evento con un termine da spiegare">
              <Glossary on="always" term="termine" origin="dal latino">
                la definizione, breve, dopo il trattino.
              </Glossary>
            </Event>
            <Context on="always" period="XI secolo" title="Scheda di contesto tra gli eventi">
              Lo sfondo di un periodo (società, clima, economia): al posto della data c’è la
              dicitura “Contesto” con il periodo, e sul binario un pallino vuoto.
            </Context>
            <Event on="always" title="Evento senza data: niente evidenziatore a margine">
              <Detail on="always">Per un fatto senza una data precisa: basta non indicarla.</Detail>
            </Event>
          </Timeline>

          <PhotoGrid>
            <Figure on="always" caption="Griglia di foto: prima didascalia" ratio="4/5" />
            <Figure on="always" caption="Seconda didascalia, stessa proporzione" ratio="4/5" />
          </PhotoGrid>

          <PhotoRow>
            <Figure on="always" caption="Riga di foto: stessa altezza" ratio="3/2" />
            <Figure
              on="always"
              caption="Con cutout: immagine trasparente (uno stemma), senza fondo né ritaglio"
              ratio="2/3"
              cutout
            />
          </PhotoRow>

          <Figure
            on="always"
            caption="Emblema: bandiera o stemma ad altezza fissa, largo quanto la sua proporzione"
            ratio="3/2"
            size="emblem"
          />

          {/*
            The flag or the coat of arms as a trace of the album (02, 03): put it in the emblems
            chapter. Its placeholder is the guide's emblem image (emblems, above), in grey.
          */}
          <Emblem kind="flag" on="always" />

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

          <Timeline section={Section.DateList}>
            <Event
              on="always"
              date="1000"
              title="Timeline con una sezione: compare nell’indice e si segue scorrendo"
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
              on={[South]}
              date="1400"
              title="Un evento visibile solo con il Sud, con una fonte al posto di un dettaglio"
            >
              <Source on={[South]}>
                <N work>Titolo della fonte</N>, con un giudizio sulla sua attendibilità.
              </Source>
            </Event>
          </Timeline>
        </Part>

        {/* A part tied to a region: its `on` (in structure.ts) hides it and its index entry. */}
        <Part section={Section.RegionalPart}>
          <Timeline on="always">
            <Event on={[South]} date="1500" title="Evento di una parte legata a una regione">
              <Detail on={[South]}>
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
        section={Section.RegionsAndCities}
        lede="Cosa vedere sul posto, regione per regione."
        gap="wide"
      >
        <Region
          section={Section.RegionsAndCitiesNorth}
          photo={{ caption: 'Foto della regione, in proporzione 3:2' }}
          intro={
            <>
              Introduzione alla regione: geografia e storia in breve, con nomi come{' '}
              <N>Nome proprio</N> e date come <D>1918</D>.
            </>
          }
        >
          <City on={[CityOne]} name={names.places[CityOne]} local="Nome locale">
            <Detail on={[CityOne]}>
              Città senza foto, con il nome nella lingua locale accanto al titolo.
            </Detail>
            <Detail on={[CityOne]}>
              <N>Un monumento</N>, del <D>1817</D>.
            </Detail>
          </City>
          <City
            on={[CityTwo]}
            name={names.places[CityTwo]}
            photo={{ caption: 'Città con foto accanto al testo' }}
          >
            <Detail on={[CityTwo]}>Con la foto, testo e immagine stanno affiancati.</Detail>
          </City>
          <Text on={[CityOne, CityTwo]}>
            Un paragrafo per chi visita almeno una delle due città.
          </Text>
          {/* City card: its traces come from structure.cards; heading and pin button come by themselves. */}
          <Card
            card={CityOne}
            on={[CityOne]}
            intro={
              <>
                Introduzione alla città: un paragrafo, con <N>nomi</N> e date come <D>1999</D>.
              </>
            }
            remember="La frase da ricordare della città."
          />
        </Region>

        <Region
          section={Section.RegionsAndCitiesSouth}
          photo={{ caption: 'Foto della seconda regione' }}
          intro={<>Una seconda regione, per vedere la spaziatura tra le regioni.</>}
        >
          <City on={[CityThree]} name={names.places[CityThree]}>
            <Detail on={[CityThree]}>Città minima: solo il nome e i dettagli.</Detail>
          </City>
          <Card
            card={CityThree}
            on={[CityThree]}
            intro="Una scheda con una sola traccia, con immagine di repertorio."
            remember="Da ricordare: una frase sola."
          />
        </Region>
      </Chapter>

      {/* A person card: its kicker names its region; traces in the trip come first. */}
      <Chapter section={Section.People} lede="Poche figure, e i luoghi dove le si incontra ancora.">
        <Card
          card={Person.Someone}
          on="always"
          intro={
            <>
              Chi era, in un paragrafo: date come <D>1448</D>, nomi come <N>Un altro</N>.
            </>
          }
          remember="Il nome è di famiglia: la storia è un’altra."
        />
      </Chapter>
    </>
  )
}
