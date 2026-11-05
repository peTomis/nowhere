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
  Legend,
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
import { Only, Unless } from '@/components/guide/trip'
import type { GuideContent } from '@/lib/guide'

/** Guida Romania — from "Guida Romania - Sito.dc.html" (claude.ai/design). */

const dir = '/guides/romania'

export const romania: GuideContent = {
  cover: { src: `${dir}/cover.jpg`, alt: 'Il castello di Bran sotto la neve' },
  /** Country name and nowhere logo on the cover. */
  coverInk: 'var(--color-text)',
  emblems: [
    {
      src: `${dir}/stemma.png`,
      alt: 'Stemma della Romania',
      kind: 'coat-of-arms',
      width: 480,
      height: 695,
    },
    {
      src: `${dir}/bandiera.svg`,
      alt: 'Bandiera della Romania',
      kind: 'flag',
      width: 72,
      height: 48,
    },
  ],
  places: [
    {
      id: 'dobrogea',
      name: 'Dobrogea',
      cities: [],
    },
    {
      id: 'moldavia',
      name: 'Moldavia',
      cities: [],
    },
    {
      id: 'transilvania',
      name: 'Transilvania',
      cities: [],
    },
    { id: 'valacchia', name: 'Valacchia', cities: [] },
  ],
  toc: [
    { id: 'cap-1', label: 'Dalla Dacia ai principati', level: 1 },
    { id: 'parte-1', label: 'Dacia e Roma', level: 2, dates: '200 a.C. – 274' },
    { id: 'popoli', label: 'Popoli di passaggio', level: 3 },
    {
      id: 'parte-2',
      label: 'I principati',
      level: 2,
      dates: '1310 – 1359',
      when: ['valacchia', 'moldavia'],
    },
    { id: 'cap-2', label: 'Regioni e città', level: 1 },
    { id: 'reg-transilvania', label: 'Transilvania', level: 2, when: ['transilvania'] },
    { id: 'reg-valacchia', label: 'Valacchia', level: 2, when: ['valacchia'] },
    { id: 'reg-moldavia', label: 'Moldavia', level: 2, when: ['moldavia'] },
    { id: 'reg-dobrogea', label: 'Dobrogea', level: 2, when: ['dobrogea'] },
  ],
  body: <Body />,
}

function Body() {
  return (
    <>
      <Chapter
        id="cap-1"
        number={1}
        title="Dalla Dacia ai principati"
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
          src={`${dir}/mappa.png`}
          alt="Cartina della Romania con le regioni storiche"
          ratio="666/400"
          places={[
            { name: 'Sarmizegetusa Regia', note: 'capitale dacica, sito UNESCO' },
            { name: 'Statua di Decebalo', note: 'sul Danubio, presso Orșova' },
            { name: 'Delta del Danubio', note: 'Dobrogea, ciò che resta dopo il 274' },
          ]}
        />
        <Legend />
      </Chapter>

      <Part id="parte-1" kicker="Parte I · 200 a.C. – 274" title="Dacia e Roma">
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
            <Only on="dobrogea">
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

        <Only on="transilvania">
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
              Popoli di passaggio <Aside italic>290 – 895</Aside>
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
          <Only on="transilvania">
            <DateRow date="454">
              <div>
                I <N>Gepidi</N> (Germani) dominano Transilvania, Banato e Crișana
              </div>
            </DateRow>
          </Only>
          <Only on="dobrogea">
            <DateRow date="568">
              <div>
                Gli <N>Avari</N> (turcici) sottomettono i Gepidi; la Dobrugia diventa bulgara
                (ortodossa)
              </div>
            </DateRow>
          </Only>
          <Only on="transilvania">
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

      <Only on={['valacchia', 'moldavia']}>
        <Part id="parte-2" kicker="Parte II · 1310 – 1359" title="I principati">
          <Timeline>
            <Only on="valacchia">
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
            <Only on="moldavia">
              <Event date="1359" title="Indipendenza della Moldavia dal Regno d’Ungheria">
                <Detail>
                  Per mano di <N>Bogdan I</N>, voivoda del Maramureș (regione storica oggi divisa
                  tra Romania e Ucraina), poi anche di Moldavia.
                </Detail>
                <Glossary term="voivoda" origin="dallo slavo">
                  comandante di un’unità militare; poi titolo del sovrano.
                </Glossary>
                <Annotated
                  src={`${dir}/bandiera-moldavia-storica.png`}
                  alt="Bandiera della Moldavia storica"
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
        title="Regioni e città"
        lede="Cosa vedere sul posto, regione per regione."
        gap="wide"
      >
        <Unless on={['transilvania', 'valacchia', 'moldavia', 'dobrogea']}>
          <p className="m-0 text-neutral-700 italic">
            Nessuna regione attiva: scegline almeno una in «Il tuo viaggio».
          </p>
        </Unless>
        <Only on="transilvania">
          <Region
            id="reg-transilvania"
            name="Transilvania"
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
            <Only on="sibiu">
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
            <Only on="brasov">
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
            <Only on="sighisoara">
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

        <Only on="valacchia">
          <Region
            id="reg-valacchia"
            name="Valacchia"
            photo={{ caption: 'Bucarest, Ateneo Romeno' }}
            intro={
              <>
                La pianura tra i <N>Carpazi</N> e il <N>Danubio</N>. Principato dal <D>1310</D>, si
                unisce alla <N>Moldavia</N> nel <D>1859</D>: è il nucleo da cui nasce la Romania
                moderna.
              </>
            }
          >
            <Only on="bucarest">
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

        <Only on="moldavia">
          <Region
            id="reg-moldavia"
            name="Moldavia"
            photo={{ caption: 'Voroneț, monastero dipinto' }}
            intro={
              <>
                A est dei <N>Carpazi</N>, principato indipendente dal <D>1359</D>. A nord c’è la{' '}
                <N>Bucovina</N>; la parte orientale, la <N>Bessarabia</N>, corrisponde in gran parte
                all’attuale Repubblica di Moldova.
              </>
            }
          >
            <Only on="iasi">
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
            <Only on="suceava">
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

        <Only on="dobrogea">
          <Region
            id="reg-dobrogea"
            name="Dobrogea"
            photo={{ caption: 'Delta del Danubio' }}
            intro={
              <>
                Tra il <N>Danubio</N> e il <N>Mar Nero</N>: colonie greche, poi provincia romana,
                bizantina e ottomana. È romena dal <D>1878</D>.
              </>
            }
          >
            <Only on="constanta">
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
            <Only on="tulcea">
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
