import {
  Annotated,
  Aside,
  Callout,
  Chapter,
  City,
  D,
  DateList,
  DateRow,
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
  Timeline,
} from '@/components/guide/content'
import { Only as AnyOnly, Unless as AnyUnless, type Gate } from '@/components/guide/trip'
import type { GuideContent } from '@/lib/guide'
import { format, t } from '@/i18n'

const dir = '/guides/romania'
const { toc: headings, regions, alt } = t.guides.romania

/**
 * Regions and cities of this guide. The values are stored in the reader's localStorage by the
 * trip filter: don't rename them once published.
 */
enum Romania {
  // regions
  Dobrogea = 'dobrogea',
  Moldavia = 'moldavia',
  Transilvania = 'transilvania',
  Valacchia = 'valacchia',
  // cities
  Sibiu = 'sibiu',
  Brasov = 'brasov',
  Sighisoara = 'sighisoara',
  Bucarest = 'bucarest',
  Iasi = 'iasi',
  Suceava = 'suceava',
  Constanta = 'constanta',
  Tulcea = 'tulcea',
}

const Only: Gate<Romania> = AnyOnly
const Unless: Gate<Romania> = AnyUnless

export const romania: GuideContent<Romania> = {
  cover: { src: `${dir}/cover.jpg`, alt: alt.cover },
  /** Country name and nowhere logo on the cover. */
  coverInk: 'var(--color-text)',
  emblems: [
    {
      src: `${dir}/coat-of-arms.png`,
      alt: alt.coatOfArms,
      kind: 'coat-of-arms',
      width: 480,
      height: 695,
    },
    {
      src: `${dir}/flag.svg`,
      alt: alt.flag,
      kind: 'flag',
      width: 72,
      height: 48,
    },
  ],
  places: [
    {
      id: Romania.Dobrogea,
      name: regions.dobrogea,
      cities: [],
    },
    {
      id: Romania.Moldavia,
      name: regions.moldavia,
      cities: [],
    },
    {
      id: Romania.Transilvania,
      name: regions.transilvania,
      cities: [],
    },
    { id: Romania.Valacchia, name: regions.valacchia, cities: [] },
  ],
  toc: [
    { id: 'cap-1', label: headings.chapter1, level: 1 },
    { id: 'parte-1', label: headings.part1, level: 2, dates: headings.part1Dates },
    { id: 'popoli', label: headings.peoples, level: 3 },
    {
      id: 'parte-2',
      label: headings.part2,
      level: 2,
      dates: headings.part2Dates,
      when: [Romania.Valacchia, Romania.Moldavia],
    },
    { id: 'cap-2', label: headings.chapter2, level: 1 },
    { id: 'reg-transilvania', label: regions.transilvania, level: 2, when: [Romania.Transilvania] },
    { id: 'reg-valacchia', label: regions.valacchia, level: 2, when: [Romania.Valacchia] },
    { id: 'reg-moldavia', label: regions.moldavia, level: 2, when: [Romania.Moldavia] },
    { id: 'reg-dobrogea', label: regions.dobrogea, level: 2, when: [Romania.Dobrogea] },
  ],
  body: <Body />,
}

function Body() {
  return (
    <>
      <Chapter
        id="cap-1"
        number={1}
        title={headings.chapter1}
        lede="Le regioni, i popoli e le date per leggere i musei del viaggio."
        period="200 a.C. – 1359"
      >
        <p className="m-0 max-w-[62ch]">
          La Romania di oggi riunisce tre principati storici — <N>Valacchia</N>, <N>Moldavia</N> e{' '}
          <N>Transilvania</N> — e la <N>Dobrogea</N> sul Mar Nero. Per secoli hanno avuto sovrani,
          lingue e chiese diverse: tenerlo a mente aiuta a capire perché ogni regione racconta la
          propria storia.
        </p>
        <MapFigure
          src={`${dir}/map.png`}
          alt={alt.map}
          ratio="666/400"
          places={[
            { name: 'Sarmizegetusa Regia', note: 'capitale dacica, sito UNESCO' },
            { name: 'Statua di Decebalo', note: 'sul Danubio, presso Orșova' },
            { name: 'Delta del Danubio', note: 'Dobrogea, ciò che resta dopo il 274' },
          ]}
        />
      </Chapter>

      <Part id="parte-1" kicker={`Parte I · ${headings.part1Dates}`} title={headings.part1}>
        <Timeline>
          <Event
            date="200 a.C."
            title={
              <>
                Dacia <Aside>(Daci)</Aside>
              </>
            }
          >
            <Detail>
              <D>82–44 a.C.</D> <N>Burebista</N>, il più grande sovrano della Dacia
            </Detail>
            <Detail>
              <D>101–106</D> Conquista romana della Dacia
            </Detail>
          </Event>
          <Event date="106" title="La Dacia annessa all’Impero romano">
            <Detail>
              <N>Decebalo</N>, ultimo sovrano della Dacia, fu sconfitto da <N>Traiano</N> e si
              suicidò.
            </Detail>
            <Detail>
              La capitale scelta fu <N>Sarmizegetusa Regia</N> (sito UNESCO).
            </Detail>
            <Detail>
              Qui nascono la <N>lingua rumena</N> e il nome Romania.
            </Detail>
          </Event>
          <Event date="274" title="Dacia abbandonata per ragioni strategiche">
            <Detail>
              Rimane solo la <N>Dobrogea</N> (delta del Danubio).
            </Detail>
            <Only on={Romania.Dobrogea}>
              <Callout kind="onsite">
                La Dobrogea, insieme a <N>Orșova</N> e alla <N>statua di Decebalo</N>.
              </Callout>
            </Only>
          </Event>
        </Timeline>

        <PhotoGrid>
          <Figure caption="Sarmizegetusa Regia, capitale dei Daci" ratio="4/5" />
          <Figure caption="Statua di Decebalo sul Danubio" ratio="4/5" />
        </PhotoGrid>

        <Only on={Romania.Transilvania}>
          <Callout kind="debate" title="Chi è arrivato prima in Transilvania?">
            <Positions>
              <Position title="Continuità daco-romana">
                La storiografia romena: la popolazione romanizzata rimase a nord del Danubio.
              </Position>
              <Position title="Teoria immigrazionista">
                <N>Roesler</N> (XIX sec.), adottata dalla storiografia ungherese: i Valacchi
                arrivarono dai Balcani nel XII–XIII secolo.
              </Position>
            </Positions>
            <Note>
              Le fonti scritte tra il 300 e il 1000 sono quasi assenti: nessuna delle due tesi è
              dimostrata. Il dibattito reggeva le rivendicazioni sulla Transilvania — nei musei
              romeni vedrai solo la prima versione.
            </Note>
          </Callout>
        </Only>

        <DateList
          id="popoli"
          title={
            <>
              {headings.peoples} <Aside italic>290 – 895</Aside>
            </>
          }
        >
          <DateRow date="290">
            <div>
              Arrivano i <N>Goti</N> (Germani dell’Est)
            </div>
          </DateRow>
          <DateRow date="376">
            <div>
              Gli <N>Unni</N> sconfiggono i Goti
            </div>
          </DateRow>
          <Only on={Romania.Transilvania}>
            <DateRow date="454">
              <div>
                I <N>Gepidi</N> (Germani) dominano Transilvania, Banato e Crișana
              </div>
            </DateRow>
          </Only>
          <Only on={Romania.Dobrogea}>
            <DateRow date="568">
              <div>
                Gli <N>Avari</N> (turcici) sottomettono i Gepidi; la Dobrugia diventa bulgara
                (ortodossa)
              </div>
            </DateRow>
          </Only>
          <Only on={Romania.Transilvania}>
            <DateRow date="895">
              <div>
                Prima presenza documentata dei <N>Siculi</N> (Székely)
              </div>
              <Source>
                <N work>Gesta Hungarorum</N>, la più antica cronaca ungherese giunta fino a noi — ma
                scritta circa 300 anni dopo i fatti: attendibilità dubbia.
              </Source>
            </DateRow>
          </Only>
        </DateList>
      </Part>

      <Only on={[Romania.Valacchia, Romania.Moldavia]}>
        <Part id="parte-2" kicker={`Parte II · ${headings.part2Dates}`} title={headings.part2}>
          <Timeline>
            <Only on={Romania.Valacchia}>
              <Event
                date="1310"
                title={
                  <>
                    Nasce il principato di <N>Valacchia</N>
                  </>
                }
              >
                <Detail>
                  Istituito da <N>Basarab I</N>
                </Detail>
                <Detail>
                  <D>1386</D> Nascono i <N>Drăculești</N> (da Mircea I) e i <N>Dănești</N> (da Dan
                  I), le due linee principali della Casa di Basarab.
                </Detail>
              </Event>
            </Only>
            <Only on={Romania.Moldavia}>
              <Event date="1359" title="Indipendenza della Moldavia dal Regno d’Ungheria">
                <Detail>
                  Per mano di <N>Bogdan I</N>, voivoda del Maramureș (regione storica oggi divisa
                  tra Romania e Ucraina), poi anche di Moldavia.
                </Detail>
                <Glossary term="voivoda" origin="dallo slavo">
                  comandante di un’unità militare; poi titolo del sovrano.
                </Glossary>
                <Annotated
                  src={`${dir}/moldavia-historical-flag.png`}
                  alt={alt.moldaviaHistoricalFlag}
                  ratio="180/119"
                  label={
                    <>
                      Bandiera della
                      <br />
                      Moldavia storica
                    </>
                  }
                />
              </Event>
            </Only>
          </Timeline>
        </Part>
      </Only>

      <Chapter
        id="cap-2"
        number={2}
        title={headings.chapter2}
        lede="Cosa vedere sul posto, regione per regione."
        gap="wide"
      >
        <Unless on={[Romania.Transilvania, Romania.Valacchia, Romania.Moldavia, Romania.Dobrogea]}>
          <p className="m-0 text-neutral-700 italic">
            {format(t.guide.trip.noRegions, { trip: t.guide.trip.title })}
          </p>
        </Unless>
        <Only on={Romania.Transilvania}>
          <Region
            id="reg-transilvania"
            name={regions.transilvania}
            photo={{ caption: 'Sibiu, Piața Mare' }}
            intro={
              <>
                Altopiano chiuso dall’arco dei <N>Carpazi</N>. Per secoli parte del{' '}
                <N>Regno d’Ungheria</N>, poi principato autonomo, è unita alla Romania dal{' '}
                <D>1918</D>. Qui vivono romeni e ungheresi; i <N>Sassoni</N>, coloni tedeschi
                arrivati nel XII secolo, hanno lasciato le città fortificate.
              </>
            }
          >
            <Only on={Romania.Sibiu}>
              <City name="Sibiu" local="Hermannstadt">
                <Detail>
                  La principale città dei Sassoni, Capitale europea della cultura nel <D>2007</D>.
                </Detail>
                <Detail>
                  <N>Museo Brukenthal</N>, aperto al pubblico nel <D>1817</D>: uno dei più antichi
                  musei dell’Europa continentale.
                </Detail>
              </City>
            </Only>
            <Only on={Romania.Brasov}>
              <City name="Brașov" local="Kronstadt">
                <Detail>
                  Città sassone ai piedi del monte <N>Tâmpa</N>.
                </Detail>
                <Detail>
                  <N>Chiesa Nera</N> (Biserica Neagră), gotica: prende il nome dall’incendio del{' '}
                  <D>1689</D>.
                </Detail>
                <Detail>
                  A circa 30 km, il <N>castello di Bran</N>.
                </Detail>
              </City>
            </Only>
            <Only on={Romania.Sighisoara}>
              <City
                name="Sighișoara"
                local="Schäßburg"
                photo={{ caption: 'La Torre dell’Orologio' }}
              >
                <Detail>
                  Cittadella medievale ancora abitata, sito UNESCO dal <D>1999</D>.
                </Detail>
                <Detail>
                  Secondo la tradizione vi nacque <N>Vlad III</N>, detto l’Impalatore.
                </Detail>
              </City>
            </Only>
          </Region>
        </Only>

        <Only on={Romania.Valacchia}>
          <Region
            id="reg-valacchia"
            name={regions.valacchia}
            photo={{ caption: 'Bucarest, Ateneo Romeno' }}
            intro={
              <>
                La pianura tra i <N>Carpazi</N> e il <N>Danubio</N>. Principato dal <D>1310</D>, si
                unisce alla <N>Moldavia</N> nel <D>1859</D>: è il nucleo da cui nasce la Romania
                moderna.
              </>
            }
          >
            <Only on={Romania.Bucarest}>
              <City name="Bucarest" local="București">
                <Detail>
                  Capitale della Valacchia dal <D>1659</D> e della Romania dal <D>1862</D>.
                </Detail>
                <Detail>
                  <N>Palazzo del Parlamento</N>, voluto da <N>Ceaușescu</N> negli anni Ottanta: uno
                  dei più grandi edifici amministrativi al mondo.
                </Detail>
                <Detail>
                  <N>Ateneo Romeno</N> (<D>1888</D>), sede della Filarmonica <N>George Enescu</N>.
                </Detail>
              </City>
            </Only>
          </Region>
        </Only>

        <Only on={Romania.Moldavia}>
          <Region
            id="reg-moldavia"
            name={regions.moldavia}
            photo={{ caption: 'Voroneț, monastero dipinto' }}
            intro={
              <>
                A est dei <N>Carpazi</N>, principato indipendente dal <D>1359</D>. A nord c’è la{' '}
                <N>Bucovina</N>; la parte orientale, la <N>Bessarabia</N>, corrisponde in gran parte
                all’attuale Repubblica di Moldova.
              </>
            }
          >
            <Only on={Romania.Iasi}>
              <City name="Iași">
                <Detail>
                  Capitale della Moldavia dal <D>1564</D>; dal <D>1860</D> sede della prima
                  università romena.
                </Detail>
                <Detail>
                  <N>Palazzo della Cultura</N>, neogotico (<D>1906–1925</D>): oggi ospita quattro
                  musei.
                </Detail>
              </City>
            </Only>
            <Only on={Romania.Suceava}>
              <City name="Suceava">
                <Detail>
                  Capitale della Moldavia sotto <N>Stefano il Grande</N> (<D>1457–1504</D>).
                </Detail>
                <Detail>
                  Base per i <N>monasteri dipinti della Bucovina</N>, sito UNESCO: il più noto è{' '}
                  <N>Voroneț</N>.
                </Detail>
              </City>
            </Only>
          </Region>
        </Only>

        <Only on={Romania.Dobrogea}>
          <Region
            id="reg-dobrogea"
            name={regions.dobrogea}
            photo={{ caption: 'Delta del Danubio' }}
            intro={
              <>
                Tra il <N>Danubio</N> e il <N>Mar Nero</N>: colonie greche, poi provincia romana,
                bizantina e ottomana. È romena dal <D>1878</D>.
              </>
            }
          >
            <Only on={Romania.Constanta}>
              <City name="Constanța">
                <Detail>
                  L’antica <N>Tomis</N>, colonia greca sul Mar Nero.
                </Detail>
                <Detail>
                  Qui fu esiliato <N>Ovidio</N> nell’<D>8 d.C.</D>: vi scrisse i <N work>Tristia</N>{' '}
                  e le <N work>Epistulae ex Ponto</N>.
                </Detail>
              </City>
            </Only>
            <Only on={Romania.Tulcea}>
              <City name="Tulcea">
                <Detail>
                  Porta d’accesso al <N>delta del Danubio</N>, sito UNESCO dal <D>1991</D>.
                </Detail>
              </City>
            </Only>
          </Region>
        </Only>
      </Chapter>
    </>
  )
}
