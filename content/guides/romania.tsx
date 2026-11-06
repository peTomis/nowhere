import { guideKit } from '@/components/guide/content'
import type { GuideContent } from '@/lib/guide'

const dir = '/guides/romania'

/** Index labels and dates, reused as the titles of the matching sections. */
const headings = {
  chapter1: 'Dalla Dacia ai principati',
  part1: 'Dacia e Roma',
  part1Dates: '200 a.C. – 274',
  peoples: 'Anni di passaggio',
  part2: 'I principati',
  part2Dates: '1000 – 1359',
  part3: "L'alto Medioevo",
  part3Dates: '1359 – 1529',
  chapter2: "L'era moderna",
  part4: 'Ottomani e Principato di Transilvania',
  part4Dates: '1541 – 1601',
  part5: 'Autonomia e conquista asburgica',
  part5Dates: '1606 – 1699',
  part6: 'Asburgo, Russia e declino ottomano',
  part6Dates: '1699 – 1791',
  part7: 'Verso la Romania moderna',
  part7Dates: '1812 – 1848',
  chapter3: 'Regioni e città',
}

/** Region names: trip filter, index and region titles. */
const regions = {
  dobrogea: 'Dobrogea',
  moldavia: 'Moldavia',
  transilvania: 'Transilvania',
  valacchia: 'Valacchia',
}

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

const {
  Aside,
  Callout,
  Chapter,
  City,
  D,
  Detail,
  Event,
  Glossary,
  MapFigure,
  N,
  Note,
  Part,
  Position,
  Positions,
  Region,
  Source,
  Text,
  Timeline,
} = guideKit<Romania>()

const { Dobrogea, Moldavia, Transilvania, Valacchia } = Romania

export const romania: GuideContent<Romania> = {
  cover: { src: `${dir}/cover.jpg`, alt: 'Il castello di Bran al tramonto' },
  /** Country name and nowhere logo on the cover. */
  coverInk: 'var(--color-text)',
  emblems: [
    {
      src: `${dir}/coat-of-arms.png`,
      alt: 'Stemma della Romania',
      kind: 'coat-of-arms',
      width: 480,
      height: 695,
    },
    {
      src: `${dir}/flag.svg`,
      alt: 'Bandiera della Romania',
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
    { id: 'c-1', label: headings.chapter1, level: 1, on: 'always' },
    { id: 'p-1', label: headings.part1, level: 2, dates: headings.part1Dates, on: 'always' },
    { id: 's-1-1', label: headings.part1, level: 3, dates: headings.part1Dates, on: 'always' },
    { id: 's-1-2', label: headings.peoples, level: 3, dates: '290 - 895', on: 'always' },
    {
      id: 'p-2',
      label: headings.part2,
      level: 2,
      dates: headings.part2Dates,
      on: 'always',
    },
    { id: 'p-3', label: headings.part3, level: 2, dates: headings.part3Dates, on: 'always' },
    { id: 'c-2', label: headings.chapter2, level: 1, on: 'always' },
    {
      id: 'p-4',
      label: headings.part4,
      level: 2,
      dates: headings.part4Dates,
      on: [Transilvania, Valacchia, Moldavia],
    },
    { id: 'p-5', label: headings.part5, level: 2, dates: headings.part5Dates, on: [Transilvania] },
    {
      id: 'p-6',
      label: headings.part6,
      level: 2,
      dates: headings.part6Dates,
      on: [Transilvania, Valacchia, Moldavia],
    },
    {
      id: 'p-7',
      label: headings.part7,
      level: 2,
      dates: headings.part7Dates,
      on: [Transilvania, Valacchia, Moldavia],
    },
    { id: 'c-3', label: headings.chapter3, level: 1, on: 'always' },

    { id: 'reg-transilvania', label: regions.transilvania, level: 2, on: [Transilvania] },
    { id: 'reg-valacchia', label: regions.valacchia, level: 2, on: [Valacchia] },
    { id: 'reg-moldavia', label: regions.moldavia, level: 2, on: [Moldavia] },
    { id: 'reg-dobrogea', label: regions.dobrogea, level: 2, on: [Dobrogea] },
  ],
  body: <Body />,
}

function Body() {
  return (
    <>
      <Chapter
        on="always"
        id="c-1"
        number={1}
        title={headings.chapter1}
        lede="Le regioni, i popoli e le date."
        period="200 a.C. – 1359"
      >
        <Text on="always">
          La Romania di oggi riunisce tre principati storici {'('}
          <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N>,{' '}
          <N href="https://it.wikipedia.org/wiki/Moldavia">Moldavia</N> e{' '}
          <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N>
          {')'} e la <N href="https://it.wikipedia.org/wiki/Dobrogea">Dobrogea</N> sul Mar Nero. Per
          secoli hanno avuto sovrani, lingue e chiese diverse: tenerlo a mente aiuta a capire perché
          ogni regione racconta la propria storia.
        </Text>
        <MapFigure
          on="always"
          src={`${dir}/historical-regions.webp`}
          alt="Cartina della Romania con le regioni storiche"
          ratio="666/400"
          places={[]}
        />

        <Part
          on="always"
          id="p-1"
          kicker={`Parte I · ${headings.part1Dates}`}
          title={headings.part1}
        >
          <Timeline on="always" id="s-1-1">
            <Event on="always" title={<>Geti e Daci</>}>
              <Detail on="always">
                Discendenti dai <N href="https://it.wikipedia.org/wiki/Traci">Traci</N>, popolazioni
                indoeuropee dei Balcani. Dei <N href="https://it.wikipedia.org/wiki/Geti">Geti</N>{' '}
                si parla già nel VI secolo a.C., dei{' '}
                <N href="https://it.wikipedia.org/wiki/Daci">Daci</N> solo dal I secolo a.C.
              </Detail>
              <Detail on={[Valacchia, Transilvania]}>
                Probabilmente lo stesso popolo ma in due zone geografiche diverse: i{' '}
                <N href="https://it.wikipedia.org/wiki/Geti">Geti</N> tra il Danubio e il Mar Nero,
                a contatto con i Greci, i <N href="https://it.wikipedia.org/wiki/Daci">Daci</N> a
                nord, nei Carpazi della Transilvania, a contatto con i Celti.
              </Detail>
              <Detail on="always">
                Entrambi i popoli vivevano in tribù, con insediamenti fortificati, elite
                aristocratiche e tradizioni religiose.
              </Detail>
            </Event>
            <Event
              on="always"
              date="200 a.C."
              title={
                <>
                  Dacia <Aside>(Daci)</Aside>
                </>
              }
            >
              <Detail on="always">
                <D>82–44 a.C.</D> <N href="https://it.wikipedia.org/wiki/Burebista">Burebista</N>,
                re dei Geti e dei Daci, fu il primo sovrano a unificare le tribù della regione.
              </Detail>
              <Detail on={[Valacchia, Transilvania]}>
                È oggi presente una statua di{' '}
                <N href="https://it.wikipedia.org/wiki/Burebista">Burebista</N> a{' '}
                <N href="https://it.wikipedia.org/wiki/Călărași_(Romania)">Călărași</N>, città
                capoluogo dell'omonimo distretto, ed una a{' '}
                <N href="https://it.wikipedia.org/wiki/Orăștie_(comune)">Orăștie</N>, città nel{' '}
                <N href="https://it.wikipedia.org/wiki/Distretto_di_Hunedoara">
                  distretto di Hunedoara
                </N>
                , nella Transilvania.
              </Detail>
              <Detail on="always">
                La capitale scelta da{' '}
                <N href="https://it.wikipedia.org/wiki/Burebista">Burebista</N> fu{' '}
                <N href="https://it.wikipedia.org/wiki/Sarmizegetusa_Regia">Sarmizegetusa Regia</N>,
                fortezza costituita da sei cittadelle erette in cima ad una rupe delle{' '}
                <N href="https://it.wikipedia.org/wiki/Fortezze_dacie_dei_monti_Orăștie">
                  Orăștie Mountains
                </N>
                , a 1200 metri di altezza. Fu l'
                <N href="https://it.wikipedia.org/wiki/Oppidum">oppidum</N> più industrializzato,
                tra i centri politici e religiosi europei dell'età preistorica. Tutte le sei
                fortezze fanno parte del patrimonio Mondiale dell'UNESCO.
              </Detail>
              <Detail on="always">
                <D>101–106</D> Conquista romana della{' '}
                <N href="https://it.wikipedia.org/wiki/Dacia_(regione_storica)">Dacia</N>
              </Detail>
            </Event>
            <Event on="always" date="106" title="La Dacia annessa all’Impero romano">
              <Detail on="always">
                <N>Decebalo</N>, ultimo sovrano della Dacia, fu sconfitto da <N>Traiano</N> e si
                suicidò.
              </Detail>
              <Detail on="always">
                La capitale scelta fu{' '}
                <N href="https://it.wikipedia.org/wiki/Sarmizegetusa">Sarmizegetusa Regia</N> (sito
                UNESCO).
              </Detail>
              <Detail on="always">
                Qui nascono la <N>lingua rumena</N> e il nome Romania.
              </Detail>
            </Event>
            <Event on="always" date="274" title="Dacia abbandonata per ragioni strategiche">
              <Detail on="always">
                Mantengono solo la <N href="https://it.wikipedia.org/wiki/Dobrogea">Dobrogea</N>,
                sul delta del Danubio.
              </Detail>
            </Event>
          </Timeline>

          <Callout on={[Transilvania]} kind="debate" title="Chi è arrivato prima in Transilvania?">
            <Positions>
              <Position on={[Transilvania]} title="Continuità daco-romana">
                La storiografia romena: la popolazione romanizzata rimase a nord del Danubio.
              </Position>
              <Position on={[Transilvania]} title="Teoria immigrazionista">
                <N>Roesler</N> (XIX sec.), adottata dalla storiografia ungherese: i Valacchi
                arrivarono dai Balcani nel XII–XIII secolo.
              </Position>
            </Positions>
            <Note on={[Transilvania]}>
              Le fonti scritte tra il 300 e il 1000 sono quasi assenti: nessuna delle due tesi è
              dimostrata. Il dibattito fu chiave per le rivendicazioni più recenti tra Romania e
              Ungheria sulla Transilvania. Nei musei romeni, per ovvie ragioni, viene proposta la
              prima versione.
            </Note>
          </Callout>

          <Timeline
            on="always"
            id="s-1-2"
            title={
              <>
                Anni di passaggio <Aside italic>290 – 895</Aside>
              </>
            }
          >
            <Event
              on="always"
              date="290"
              title={
                <>
                  Arrivano i <N href="https://it.wikipedia.org/wiki/Goti">Goti</N> (Germani
                  dell’Est)
                </>
              }
            />
            <Event
              on="always"
              date="376"
              title={
                <>
                  Gli <N href="https://it.wikipedia.org/wiki/Unni">Unni</N> sconfiggono i Goti
                </>
              }
            />
            <Event
              on={[Transilvania]}
              date="454"
              title={
                <>
                  I <N href="https://it.wikipedia.org/wiki/Gepidi">Gepidi</N> (Germani di stirpe
                  gotica) dominano{' '}
                  <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N>,{' '}
                  <N href="https://it.wikipedia.org/wiki/Banato">Banato</N> e{' '}
                  <N href="https://it.wikipedia.org/wiki/Crișana">Crișana</N>
                </>
              }
            />
            <Event
              on="always"
              date="568"
              title={
                <>
                  Gli <N href="https://it.wikipedia.org/wiki/Avari">Avari</N> (nomadi di origini
                  sconosciute) sottomettono i Gepidi. Nel frattempo, la{' '}
                  <N href="https://it.wikipedia.org/wiki/Dobrogea">Dobrogea</N> diventa bulgara (si
                  instaura la religione ortodossa)
                </>
              }
            />
            <Event
              on={[Transilvania]}
              date="895"
              title={
                <>
                  Prima presenza documentata dei{' '}
                  <N href="https://it.wikipedia.org/wiki/Siculi_(Transilvania)">Siculi</N> (Székely)
                </>
              }
            >
              <Source on={[Transilvania]}>
                La fonte principale di questo periodo è l'opera{' '}
                <N work href="https://it.wikipedia.org/wiki/Gesta_Hungarorum">
                  Gesta Hungarorum
                </N>
                , la più antica cronaca ungherese giunta fino a noi. È stata scritta circa 300 anni
                dopo i fatti: la veridicità dei fatti è quindi dubbia.
              </Source>
            </Event>
          </Timeline>
        </Part>

        <Part
          on={[Transilvania, Valacchia, Moldavia]}
          id="p-2"
          kicker={`Parte II · ${headings.part2Dates}`}
          title={headings.part2}
        >
          <Timeline on="always" id="s-2-1">
            <Event
              on={[Transilvania]}
              date="1000"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N>,{' '}
                  <N href="https://it.wikipedia.org/wiki/Banato">Banato</N> e{' '}
                  <N href="https://it.wikipedia.org/wiki/Crișana">Crișana</N> accorpati al Regno di
                  Ungheria
                </>
              }
            >
              <Detail on={[Transilvania]}>
                Diventano un unico <N href="https://it.wikipedia.org/wiki/Voivodato">voivodato</N>{' '}
                con amministrazione propria.
              </Detail>
            </Event>
            <Event on={[Transilvania]} date="1150" title="Sassoni si stabiliscono in Transilvania">
              <Detail on={[Transilvania]}>
                Gli Ungheresi, per contrastare i ripetuti attacchi dei{' '}
                <N href="https://it.wikipedia.org/wiki/Cumani">Cumani</N>, invitano i{' '}
                <N href="https://it.wikipedia.org/wiki/Sassoni">Sassoni</N> (coloni tedeschi) a
                stabilirsi in <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N>
              </Detail>
            </Event>
            <Event
              on={[Transilvania]}
              date="1200"
              title=" I conflitti con i Mongoli creano danni importanti"
            ></Event>
            <Event
              on={[Valacchia]}
              date="1310"
              title={
                <>
                  Nasce il principato di{' '}
                  <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N>
                </>
              }
            >
              <Detail on={[Valacchia]}>
                Istituito da <N href="https://it.wikipedia.org/wiki/Basarab_I">Basarab I</N>
              </Detail>
              <Detail on={[Valacchia]}>
                <D>1386</D> Nascono i{' '}
                <N href="https://it.wikipedia.org/wiki/Drăculești">Drăculești</N> (da Mircea I) e i{' '}
                <N href="https://it.wikipedia.org/wiki/Dăneștii">Dăneștii</N> (da Dan I), le due
                linee principali della Casa di Basarab.
              </Detail>
            </Event>
            <Event
              on={[Moldavia]}
              date="1359"
              title="Indipendenza della Moldavia dal Regno d’Ungheria"
            >
              <Detail on={[Moldavia]}>
                Per mano di <N href="https://it.wikipedia.org/wiki/Bogdan_I">Bogdan I</N>, voivoda
                del <N href="https://it.wikipedia.org/wiki/Maramureș">Maramureș</N> (regione storica
                oggi divisa tra Romania e Ucraina), poi anche di{' '}
                <N href="https://it.wikipedia.org/wiki/Moldavia_(regione_storica)">Moldavia</N>.
              </Detail>
              <Glossary on={[Moldavia]} term="voivoda" origin="dallo slavo">
                comandante di un’unità militare; poi titolo del sovrano.
              </Glossary>
            </Event>
          </Timeline>
        </Part>

        <Part
          on={[Valacchia, Moldavia]}
          id="p-3"
          kicker={`Parte III · ${headings.part3Dates}`}
          title={headings.part3}
        >
          <Timeline on="always" id="s-3-1">
            <Event
              on={[Valacchia, Moldavia]}
              date="1417"
              title="Vassallaggio dei principati agli Ottomani"
            >
              <Detail on={[Valacchia, Moldavia]}>
                <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Moldavia">Moldavia</N> diventano vassalli
                degli Ottomani, ma riescono a mantenere la propria autonomia grazie a sovrani come{' '}
                <N href="https://it.wikipedia.org/wiki/Mircea_il_Vecchio">Mircea il Vecchio</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Stefano_III_il_Grande">Stefano il Grande</N>.
              </Detail>
            </Event>
            <Event
              on={[Transilvania]}
              date="1437"
              title="L'esclusione dei Romeni ortodossi dal potere"
            >
              <Detail on={[Transilvania]}>
                In <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N> i Romeni
                ortodossi vengono progressivamente esclusi dal potere, soprattutto dopo l'
                <N href="https://it.wikipedia.org/wiki/Unio_Trium_Nationum">
                  Unione delle tre nazioni
                </N>
                , nata contro la{' '}
                <N href="https://it.wikipedia.org/wiki/Rivolta_di_Bobâlna">rivolta di Bobâlna</N>,
                che privilegiò nobili ungheresi, siculi e sassoni.
              </Detail>
            </Event>
            <Event
              on="always"
              date="1512-1521"
              title="La prima opera originale della letteratura romena"
            >
              <Detail on="always">
                <N href="https://it.wikipedia.org/wiki/Basarab_V_Neagoe">Neagoe Basarab</N> scrive{' '}
                <N>Insegnamenti di Neagoe Basarab al figlio Teodosio</N>.
              </Detail>
            </Event>
            <Event on={[Transilvania]} date="1514" title="La ribellione di György Dózsa">
              <Detail on={[Transilvania]}>
                I contadini, guidati da{' '}
                <N href="https://it.wikipedia.org/wiki/György_Dózsa">György Dózsa</N>, si ribellano.
                Vengono sconfitti a <N href="https://it.wikipedia.org/wiki/Timișoara">Timișoara</N>,
                con il risultato che questa battaglia diventa la causa di un inasprimento della
                servitù della gleba.
              </Detail>
            </Event>
            <Event
              on="always"
              date="1525"
              title="Battaglie invano per l'indipendenza dagli Ottomani"
            >
              <Detail on="always">
                <N href="https://it.wikipedia.org/wiki/Radu_de_la_Afumați">Radu de la Afumați</N>{' '}
                combatte i Turchi ma, dopo una ventina di battaglie, viene sconfitto e deve
                accettarne la sovranità e sopportare un aumento dei tributi.
              </Detail>
            </Event>
            <Event on="always" date="1526" title="Frattura del Regno d’Ungheria">
              <Detail on="always">
                A Mohács, in Ungheria, gli Ottomani distruggono l’esercito ungherese, provocando una
                crisi nel regno e la contesa per il trono tra{' '}
                <N href="https://it.wikipedia.org/wiki/Giovanni_I_d%27Ungheria">
                  Giovanni I d’Ungheria
                </N>{' '}
                e{' '}
                <N href="https://it.wikipedia.org/wiki/Ferdinando_I_d%27Asburgo">
                  Ferdinando I d’Asburgo
                </N>
                .
              </Detail>
            </Event>
            <Event on="always" date="1529" title="La conquista ottomana">
              <Detail on="always">
                <N href="https://it.wikipedia.org/wiki/Petru_IV_Rareș">Petru IV Rareș</N> interviene
                nella lotta per la corona del Regno d'Ungheria, invade la{' '}
                <N href="https://it.wikipedia.org/wiki/Terra_dei_Siculi">terra dei Siculi</N> e
                sconfigge l'esercito dei sostenitori di{' '}
                <N href="https://it.wikipedia.org/wiki/Ferdinando_I_d%27Asburgo">Ferdinando I</N> .{' '}
                <N href="https://it.wikipedia.org/wiki/Giovanni_I_d%27Ungheria">Giovanni I</N>{' '}
                diventò vassallo del sultano, completando l'ultimo passo per l'ottenimento della
                Romania da parte degli ottomani.
              </Detail>
            </Event>
          </Timeline>
        </Part>
      </Chapter>

      <Chapter
        on="always"
        id="c-2"
        number={2}
        title={headings.chapter2}
        lede="Tre principati tra Ottomani, Asburgo e Russia."
        period="1530 – 1848"
      >
        <Part
          on={[Transilvania, Valacchia, Moldavia]}
          id="p-4"
          kicker={`Parte I · ${headings.part4Dates}`}
          title={headings.part4}
        >
          <Timeline on="always" id="s-4-1">
            <Event
              on={[Transilvania]}
              date="1541"
              title={
                <>
                  Caduta di <N href="https://it.wikipedia.org/wiki/Buda">Buda</N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                Gli Ottomani occupano la capitale ungherese. La{' '}
                <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N> emerge come
                entità politica distinta, sotto la sovranità ottomana.
              </Detail>
            </Event>
            <Event
              on={[Transilvania]}
              date="1568"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Editto_di_Turda">Editto di Torda</N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                La Transilvania riconosce quattro confessioni cristiane: cattolica, luterana,
                calvinista e unitaria. Gli ortodossi rimangono soltanto tollerati.
              </Detail>
            </Event>
            <Event
              on={[Transilvania]}
              date="1570"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Trattato_di_Spira">Trattato di Spira</N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                Viene formalizzato il{' '}
                <N href="https://it.wikipedia.org/wiki/Principato_di_Transilvania">
                  Principato di Transilvania
                </N>
                , autonomo ma sottoposto alla sovranità ottomana.
              </Detail>
            </Event>
            <Event
              on={[Transilvania, Valacchia, Moldavia]}
              date="1594–1595"
              title="Rivolta anti-ottomana"
            >
              <Detail on={[Transilvania, Valacchia, Moldavia]}>
                <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Moldavia">Moldavia</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N> si alleano
                contro i Turchi.
              </Detail>
            </Event>
            <Event
              on={[Transilvania, Valacchia, Moldavia]}
              date="1599–1600"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Michele_il_Coraggioso">
                    Michele il Coraggioso
                  </N>
                </>
              }
            >
              <Detail on={[Transilvania, Valacchia, Moldavia]}>
                Il principe di Valacchia conquista la Transilvania e la Moldavia, riunendo per breve
                tempo i tre principati sotto un unico sovrano.
              </Detail>
            </Event>
            <Event
              on={[Transilvania, Valacchia, Moldavia]}
              date="1601"
              title="Morte di Michele il Coraggioso"
            >
              <Detail on={[Transilvania, Valacchia, Moldavia]}>
                Viene assassinato e l’unione dei principati si dissolve.
              </Detail>
            </Event>
          </Timeline>
        </Part>

        <Part
          on={[Transilvania]}
          id="p-5"
          kicker={`Parte II · ${headings.part5Dates}`}
          title={headings.part5}
        >
          <Timeline on="always" id="s-5-1">
            <Event
              on={[Transilvania]}
              date="1606"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Pace_di_Zsitvatorok">
                    Pace di Zsitvatorok
                  </N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                Termina la{' '}
                <N href="https://it.wikipedia.org/wiki/Lunga_guerra_turca">Lunga guerra</N> tra
                Asburgo e Ottomani; la Transilvania conserva la propria autonomia sotto sovranità
                ottomana.
              </Detail>
            </Event>
            <Event
              on={[Transilvania]}
              date="1613–1629"
              title={
                <>
                  Regno di{' '}
                  <N href="https://it.wikipedia.org/wiki/Gabriele_Bethlen">Gabriele Bethlen</N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                Un periodo di sviluppo economico, culturale e politico della Transilvania.
              </Detail>
            </Event>
            <Event on={[Transilvania]} date="1657–1662" title="Crisi della Transilvania">
              <Detail on={[Transilvania]}>
                Guerre e interventi ottomani indeboliscono gravemente l’autonomia del principato.
              </Detail>
            </Event>
            <Event
              on={[Transilvania]}
              date="1683"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Battaglia_di_Vienna">
                    Battaglia di Vienna
                  </N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                Gli Ottomani vengono sconfitti; comincia il loro progressivo arretramento
                nell’Europa centrale.
              </Detail>
            </Event>
            <Event on={[Transilvania]} date="1688" title="Passaggio agli Asburgo">
              <Detail on={[Transilvania]}>
                La Transilvania accetta la protezione austriaca, abbandonando la sovranità ottomana.
              </Detail>
            </Event>
            <Event
              on={[Transilvania]}
              date="1699"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Pace_di_Carlowitz">Pace di Carlowitz</N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                Gli Ottomani riconoscono formalmente il dominio asburgico sulla Transilvania.
              </Detail>
            </Event>
          </Timeline>
        </Part>

        <Part
          on={[Transilvania, Valacchia, Moldavia]}
          id="p-6"
          kicker={`Parte III · ${headings.part6Dates}`}
          title={headings.part6}
        >
          <Timeline on="always" id="s-6-1">
            <Event
              on={[Transilvania]}
              date="1699–1701"
              title={
                <>
                  Nasce la{' '}
                  <N href="https://it.wikipedia.org/wiki/Chiesa_greco-cattolica_rumena">
                    Chiesa greco-cattolica rumena
                  </N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                Una parte del clero ortodosso transilvano riconosce l’autorità del papa, mantenendo
                il rito orientale.
              </Detail>
            </Event>
            <Event
              on={[Moldavia]}
              date="1711"
              title={
                <>
                  Sconfitta russo-moldava{' '}
                  <Aside>
                    (
                    <N href="https://it.wikipedia.org/wiki/Battaglia_del_Prut">
                      battaglia del Prut
                    </N>
                    )
                  </Aside>
                </>
              }
            >
              <Detail on={[Moldavia]}>
                La Moldavia tenta di liberarsi dal controllo ottomano alleandosi con{' '}
                <N href="https://it.wikipedia.org/wiki/Pietro_I_di_Russia">Pietro il Grande</N>, ma
                viene sconfitta.
              </Detail>
            </Event>
            <Event
              on={[Moldavia, Valacchia]}
              date="1711–1716"
              title={
                <>
                  Inizio dell’epoca dei{' '}
                  <N href="https://it.wikipedia.org/wiki/Fanarioti">Fanarioti</N>
                </>
              }
            >
              <Detail on={[Moldavia, Valacchia]}>
                Gli Ottomani affidano Moldavia e Valacchia a governanti prevalentemente greci,
                nominati da Istanbul.
              </Detail>
            </Event>
            <Event
              on={[Moldavia, Valacchia]}
              date="1774"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Trattato_di_Küçük_Kaynarca">
                    Pace di Küçük Kaynarca
                  </N>
                </>
              }
            >
              <Detail on={[Moldavia, Valacchia]}>
                La Russia rafforza la propria influenza sui principati rumeni, che restano sotto
                sovranità ottomana.
              </Detail>
            </Event>
            <Event
              on={[Moldavia]}
              date="1775"
              title={
                <>
                  Annessione della <N href="https://it.wikipedia.org/wiki/Bucovina">Bucovina</N>
                </>
              }
            >
              <Detail on={[Moldavia]}>
                L’Austria acquisisce la regione settentrionale della Moldavia.
              </Detail>
            </Event>
            <Event
              on={[Transilvania]}
              date="1784"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Rivolta_di_Horea,_Cloșca_e_Crișan">
                    Rivolta di Horea, Cloșca e Crișan
                  </N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                Grande insurrezione contadina in Transilvania contro i privilegi feudali, duramente
                repressa dagli Asburgo.
              </Detail>
            </Event>
            <Event
              on={[Transilvania]}
              date="1791"
              title={
                <>
                  <N work>Supplex Libellus Valachorum</N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                I rappresentanti rumeni della Transilvania chiedono il riconoscimento
                dell’uguaglianza politica e religiosa, senza successo.
              </Detail>
            </Event>
          </Timeline>
        </Part>

        <Part
          on={[Transilvania, Valacchia, Moldavia]}
          id="p-7"
          kicker={`Parte IV · ${headings.part7Dates}`}
          title={headings.part7}
        >
          <Timeline on="always" id="s-7-1">
            <Event
              on={[Moldavia]}
              date="1812"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Trattato_di_Bucarest_(1812)">
                    Trattato di Bucarest
                  </N>
                </>
              }
            >
              <Detail on={[Moldavia]}>
                La Russia annette la{' '}
                <N href="https://it.wikipedia.org/wiki/Bessarabia">Bessarabia</N>, sottraendola alla
                Moldavia.
              </Detail>
            </Event>
            <Event
              on="always"
              date="1815"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Congresso_di_Vienna">
                    Congresso di Vienna
                  </N>
                </>
              }
            >
              <Detail on="always">
                Si consolida il quadro geopolitico della regione, dominato da Austria, Russia e
                Impero ottomano.
              </Detail>
            </Event>
            <Event
              on={[Valacchia]}
              date="1821"
              title={
                <>
                  Rivolta di{' '}
                  <N href="https://it.wikipedia.org/wiki/Tudor_Vladimirescu">Tudor Vladimirescu</N>
                </>
              }
            >
              <Detail on={[Valacchia]}>
                Insurrezione in Valacchia contro il sistema fanariota, che contribuisce alla fine
                del governo dei Fanarioti nel <D>1822</D>.
              </Detail>
            </Event>
            <Event
              on={[Transilvania, Valacchia, Moldavia]}
              date="1848"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Moti_del_1848">Rivoluzioni</N> nei
                  principati
                </>
              }
            >
              <Detail on={[Transilvania, Valacchia, Moldavia]}>
                Moti liberali e nazionali coinvolgono Valacchia, Moldavia e Transilvania, ponendo le
                basi per la futura unificazione rumena.
              </Detail>
            </Event>
          </Timeline>
        </Part>

        <Callout on="always" kind="remember">
          <Text on="always">
            Durante l’età moderna il territorio dell’attuale Romania rimase diviso tra tre realtà
            politiche. La Transilvania passò dall’influenza ottomana a quella asburgica, mentre
            Valacchia e Moldavia conservarono una propria amministrazione sotto la sovranità
            ottomana, subendo una crescente influenza russa. La Romania come Stato unitario non
            esisteva ancora.
          </Text>
        </Callout>
      </Chapter>

      <Chapter
        on="always"
        id="c-3"
        number={3}
        title={headings.chapter3}
        lede="Cosa vedere sul posto, regione per regione."
        gap="wide"
      >
        <Region
          on={[Transilvania]}
          id="reg-transilvania"
          name={regions.transilvania}
          photo={{ caption: 'Sibiu, Piața Mare' }}
          intro={
            <>
              Altopiano chiuso dall’arco dei <N>Carpazi</N>. Per secoli parte del{' '}
              <N>Regno d’Ungheria</N>, poi principato autonomo, è unita alla Romania dal <D>1918</D>
              . Qui vivono romeni e ungheresi; i <N>Sassoni</N>, coloni tedeschi arrivati nel XII
              secolo, hanno lasciato le città fortificate.
            </>
          }
        >
          <City on={[Romania.Sibiu]} name="Sibiu" local="Hermannstadt">
            <Detail on={[Romania.Sibiu]}>
              La principale città dei Sassoni, Capitale europea della cultura nel <D>2007</D>.
            </Detail>
            <Detail on={[Romania.Sibiu]}>
              <N>Museo Brukenthal</N>, aperto al pubblico nel <D>1817</D>: uno dei più antichi musei
              dell’Europa continentale.
            </Detail>
          </City>
          <City on={[Romania.Brasov]} name="Brașov" local="Kronstadt">
            <Detail on={[Romania.Brasov]}>
              Città sassone ai piedi del monte <N>Tâmpa</N>.
            </Detail>
            <Detail on={[Romania.Brasov]}>
              <N>Chiesa Nera</N> (Biserica Neagră), gotica: prende il nome dall’incendio del{' '}
              <D>1689</D>.
            </Detail>
            <Detail on={[Romania.Brasov]}>
              A circa 30 km, il <N>castello di Bran</N>.
            </Detail>
          </City>
          <City
            on={[Romania.Sighisoara]}
            name="Sighișoara"
            local="Schäßburg"
            photo={{ caption: 'La Torre dell’Orologio' }}
          >
            <Detail on={[Romania.Sighisoara]}>
              Cittadella medievale ancora abitata, sito UNESCO dal <D>1999</D>.
            </Detail>
            <Detail on={[Romania.Sighisoara]}>
              Secondo la tradizione vi nacque <N>Vlad III</N>, detto l’Impalatore.
            </Detail>
          </City>
        </Region>

        <Region
          on={[Valacchia]}
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
          <City on={[Romania.Bucarest]} name="Bucarest" local="București">
            <Detail on={[Romania.Bucarest]}>
              Capitale della Valacchia dal <D>1659</D> e della Romania dal <D>1862</D>.
            </Detail>
            <Detail on={[Romania.Bucarest]}>
              <N>Palazzo del Parlamento</N>, voluto da <N>Ceaușescu</N> negli anni Ottanta: uno dei
              più grandi edifici amministrativi al mondo.
            </Detail>
            <Detail on={[Romania.Bucarest]}>
              <N>Ateneo Romeno</N> (<D>1888</D>), sede della Filarmonica <N>George Enescu</N>.
            </Detail>
          </City>
        </Region>

        <Region
          on={[Moldavia]}
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
          <City on={[Romania.Iasi]} name="Iași">
            <Detail on={[Romania.Iasi]}>
              Capitale della Moldavia dal <D>1564</D>; dal <D>1860</D> sede della prima università
              romena.
            </Detail>
            <Detail on={[Romania.Iasi]}>
              <N>Palazzo della Cultura</N>, neogotico (<D>1906–1925</D>): oggi ospita quattro musei.
            </Detail>
          </City>
          <City on={[Romania.Suceava]} name="Suceava">
            <Detail on={[Romania.Suceava]}>
              Capitale della Moldavia sotto <N>Stefano il Grande</N> (<D>1457–1504</D>).
            </Detail>
            <Detail on={[Romania.Suceava]}>
              Base per i <N>monasteri dipinti della Bucovina</N>, sito UNESCO: il più noto è{' '}
              <N>Voroneț</N>.
            </Detail>
          </City>
        </Region>

        <Region
          on={[Dobrogea]}
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
          <City on={[Romania.Constanta]} name="Constanța">
            <Detail on={[Romania.Constanta]}>
              L’antica <N>Tomis</N>, colonia greca sul Mar Nero.
            </Detail>
            <Detail on={[Romania.Constanta]}>
              Qui fu esiliato <N>Ovidio</N> nell’<D>8 d.C.</D>: vi scrisse i <N work>Tristia</N> e
              le <N work>Epistulae ex Ponto</N>.
            </Detail>
          </City>
          <City on={[Romania.Tulcea]} name="Tulcea">
            <Detail on={[Romania.Tulcea]}>
              Porta d’accesso al <N>delta del Danubio</N>, sito UNESCO dal <D>1991</D>.
            </Detail>
          </City>
        </Region>
      </Chapter>
    </>
  )
}
