import { guideKit } from '@/components/guide/content'
import type { GuideContent } from '@/lib/guide'

const dir = '/guides/romania'

/** Index labels and dates, reused as the titles of the matching sections. */
const headings = {
  chapter1: 'La bandiera e lo stemma',
  flag: 'Bandiera',
  coatOfArms: 'Stemma',
  chapter2: 'Dalla Dacia ai principati',
  part1: 'Dacia e Roma',
  part1Dates: 'I sec. a.C. – 275',
  peoples: 'Anni di passaggio',
  peoplesDates: '290 – 895',
  part2: 'I principati',
  part2Dates: '1003 – 1395',
  part3: 'Il basso Medioevo',
  part3Dates: '1416 – 1538',
  chapter3: 'L’era moderna',
  part4: 'Sotto la sovranità ottomana',
  part4Dates: '1541 – 1688',
  part4TransilvaniaDates: '1606 – 1688',
  part4ValacchiaDates: '1606 – 1688',
  part4MoldaviaDates: '1606 – 1680',
  part4DobrogeaDates: '1541 – 1688',
  part5: 'Tra tre imperi',
  part5Dates: '1688 – 1818',
  part5TransilvaniaDates: '1688 – 1791',
  part5ValacchiaDates: '1688 – 1739',
  part5MoldaviaDates: '1709 – 1818',
  part5DobrogeaDates: '1775 – 1812',
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
  Context,
  D,
  Detail,
  Event,
  Figure,
  Glossary,
  MapFigure,
  N,
  Note,
  Part,
  Position,
  Positions,
  Source,
  Text,
  Timeline,
  Unless,
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
    { id: 'c-emblems', label: headings.chapter1, level: 1, on: 'always' },
    { id: 'p-flag', label: headings.flag, level: 2, on: 'always' },
    { id: 'p-coat-of-arms', label: headings.coatOfArms, level: 2, on: 'always' },
    { id: 'c-1', label: headings.chapter2, level: 1, on: 'always' },
    { id: 'p-1', label: headings.part1, level: 2, dates: headings.part1Dates, on: 'always' },
    { id: 's-1-1', label: headings.part1, level: 3, dates: headings.part1Dates, on: 'always' },
    { id: 's-1-2', label: headings.peoples, level: 3, dates: headings.peoplesDates, on: 'always' },
    {
      id: 'p-2',
      label: headings.part2,
      level: 2,
      dates: headings.part2Dates,
      on: [Transilvania, Valacchia, Moldavia, Dobrogea],
    },
    {
      id: 'p-3',
      label: headings.part3,
      level: 2,
      dates: headings.part3Dates,
      on: [Transilvania, Valacchia, Moldavia, Dobrogea],
    },
    { id: 'c-2', label: headings.chapter3, level: 1, on: 'always' },
    {
      id: 'p-4',
      label: headings.part4,
      level: 2,
      dates: headings.part4Dates,
      on: [Transilvania, Valacchia, Moldavia, Dobrogea],
    },
    {
      id: 's-4-2',
      label: regions.transilvania,
      level: 3,
      dates: headings.part4TransilvaniaDates,
      on: [Transilvania],
    },
    {
      id: 's-4-3',
      label: regions.valacchia,
      level: 3,
      dates: headings.part4ValacchiaDates,
      on: [Valacchia],
    },
    {
      id: 's-4-4',
      label: regions.moldavia,
      level: 3,
      dates: headings.part4MoldaviaDates,
      on: [Moldavia],
    },
    {
      id: 's-4-5',
      label: regions.dobrogea,
      level: 3,
      dates: headings.part4DobrogeaDates,
      on: [Dobrogea],
    },
    {
      id: 'p-5',
      label: headings.part5,
      level: 2,
      dates: headings.part5Dates,
      on: [Transilvania, Valacchia, Moldavia, Dobrogea],
    },
    {
      id: 's-5-2',
      label: regions.transilvania,
      level: 3,
      dates: headings.part5TransilvaniaDates,
      on: [Transilvania],
    },
    {
      id: 's-5-3',
      label: regions.valacchia,
      level: 3,
      dates: headings.part5ValacchiaDates,
      on: [Valacchia],
    },
    {
      id: 's-5-4',
      label: regions.moldavia,
      level: 3,
      dates: headings.part5MoldaviaDates,
      on: [Moldavia],
    },
    {
      id: 's-5-5',
      label: regions.dobrogea,
      level: 3,
      dates: headings.part5DobrogeaDates,
      on: [Dobrogea],
    },
  ],
  body: <Body />,
}

function Body() {
  return (
    <>
      <Chapter
        on="always"
        id="c-emblems"
        number={1}
        title={headings.chapter1}
        lede="I simboli che vedi su edifici pubblici, monete e passaporti."
      >
        <Part on="always" id="p-flag" kicker="Parte I" title={headings.flag}>
          <Figure
            on="always"
            src={`${dir}/flag.svg`}
            alt="Bandiera della Romania"
            caption="Il tricolore: blu, giallo e rosso, dall’asta."
            ratio="3/2"
            size="emblem"
          />
          <Text on="always">
            La bandiera romena ha tre bande verticali di uguale larghezza. Il blu è vicino all’asta,
            il giallo al centro e il rosso sul bordo esterno.
          </Text>
          <Text on="always">
            Nel 1848, in <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N>, il governo
            rivoluzionario adotta il tricolore e sceglie il motto da scrivere sulla bandiera:
            Dreptate, Frăție («Giustizia, Fraternità»). Nel tempo i singoli colori ricevono
            interpretazioni diverse. La Costituzione ne stabilisce l’ordine senza attribuire un
            significato a ciascuno.
          </Text>
          <Text on="always">
            Dopo l’unione di Valacchia e{' '}
            <N href="https://it.wikipedia.org/wiki/Moldavia_(regione_storica)">Moldavia</N> del
            1859, i{' '}
            <N href="https://it.wikipedia.org/wiki/Principato_di_Romania">Principati Uniti</N> usano
            gli stessi colori in bande orizzontali. La Costituzione del 1866 conferma i tre colori.
            Una legge del 1867 ripristina le bande verticali con il blu vicino all’asta.
          </Text>
          <Text on="always">
            Durante il regime comunista, al centro della bandiera compare lo stemma di Stato. Nel
            dicembre 1989 i manifestanti ritagliano lo stemma dalle bandiere che portano in piazza.
            Il tricolore con il buco al centro diventa uno dei simboli della{' '}
            <N href="https://it.wikipedia.org/wiki/Rivoluzione_romena_del_1989">rivoluzione</N>.
          </Text>
        </Part>

        <Part on="always" id="p-coat-of-arms" kicker="Parte II" title={headings.coatOfArms}>
          <Figure
            on="always"
            src={`${dir}/coat-of-arms.png`}
            alt="Stemma della Romania"
            caption="L’aquila d’oro con lo scudo delle regioni storiche."
            ratio="480/695"
            size="emblem"
            cutout
          />
          <Text on="always">
            L’aquila d’oro coronata riprende un antico emblema della{' '}
            <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N>. Già nel XIV secolo il
            principe{' '}
            <N href="https://it.wikipedia.org/wiki/Vladislav_I_di_Valacchia">Vladislav I</N> fa
            coniare monete con l’immagine dell’aquila. Nello stemma di oggi tiene nel becco una
            croce ortodossa e negli artigli una spada e una mazza di comando, due insegne del potere
            dei principi.
          </Text>
          <Text on="always">
            Sul petto dell’aquila uno scudo riunisce gli emblemi dei territori storici. In alto si
            ritrova l’aquila della Valacchia, accanto alla testa di uro della{' '}
            <N href="https://it.wikipedia.org/wiki/Moldavia_(regione_storica)">Moldavia</N> con una
            stella fra le corna. Più sotto, il leone sul ponte rappresenta il{' '}
            <N href="https://it.wikipedia.org/wiki/Banato">Banato</N> e l’
            <N href="https://it.wikipedia.org/wiki/Oltenia">Oltenia</N>. L’aquila nera e le sette
            torri rosse rappresentano la{' '}
            <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N> con il{' '}
            <N href="https://it.wikipedia.org/wiki/Maramureș">Maramureș</N> e la{' '}
            <N href="https://it.wikipedia.org/wiki/Crișana">Crișana</N>. In punta, due delfini d’oro
            rivolti l’uno verso l’altro richiamano le terre della{' '}
            <N href="https://it.wikipedia.org/wiki/Dobrogea">Dobrogea</N> sul Mar Nero.
          </Text>
          <Text on="always">
            La Romania adotta lo stemma nel 1992. Nel 2016 la corona torna sulla testa dell’aquila
            d’oro.
          </Text>
        </Part>
      </Chapter>

      <Chapter
        on="always"
        id="c-1"
        number={2}
        title={headings.chapter2}
        lede="Le regioni, i popoli e le date."
        period="I sec. a.C. – 1538"
      >
        <Text on="always">
          La Romania di oggi riunisce tre principati storici {'('}
          <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N>,{' '}
          <N href="https://it.wikipedia.org/wiki/Moldavia_(regione_storica)">Moldavia</N> e{' '}
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
                Entrambi i popoli vivevano in tribù, con insediamenti fortificati, élite
                aristocratiche e tradizioni religiose.
              </Detail>
            </Event>
            <Event on="always" date="I sec. a.C." title={<>Il regno dacico</>}>
              <Detail on="always">
                <D>82–44 a.C.</D> <N href="https://it.wikipedia.org/wiki/Burebista">Burebista</N>,
                re dei Geti e dei Daci, fu il primo sovrano a unificare le tribù della regione.
              </Detail>
              <Detail on={[Valacchia, Transilvania]}>
                Oggi lo ricordano due statue: a{' '}
                <N href="https://it.wikipedia.org/wiki/Călărași_(Romania)">Călărași</N>, capoluogo
                dell’omonimo distretto, e a{' '}
                <N href="https://it.wikipedia.org/wiki/Orăștie_(comune)">Orăștie</N>, nel{' '}
                <N href="https://it.wikipedia.org/wiki/Distretto_di_Hunedoara">
                  distretto di Hunedoara
                </N>
                , in Transilvania.
              </Detail>
              <Detail on="always">
                Dove fosse la capitale di{' '}
                <N href="https://it.wikipedia.org/wiki/Burebista">Burebista</N> è discusso: molti
                studiosi indicano Argedava o Costești.{' '}
                <N href="https://it.wikipedia.org/wiki/Sarmizegetusa_Regia">Sarmizegetusa Regia</N>,
                fortezza a 1200 metri di altezza sui monti Orăștie, diventa il centro del regno con
                Decebalo. Era il principale centro politico, religioso e artigianale del regno.
              </Detail>
              <Detail on="always">
                Con altre cinque fortezze dei monti Orăștie (Costești-Cetățuie, Costești-Blidaru,
                Piatra Roșie, Bănița e Căpâlna), siti separati tra loro, fa parte del{' '}
                <N href="https://it.wikipedia.org/wiki/Fortezze_dacie_dei_monti_Orăștie">
                  patrimonio mondiale dell’UNESCO
                </N>
                .
              </Detail>
            </Event>
            <Event on="always" date="101–106" title="Traiano conquista la Dacia">
              <Detail on="always">
                <N>Decebalo</N>, ultimo sovrano della Dacia, fu sconfitto da <N>Traiano</N> e si
                suicidò.
              </Detail>
              <Detail on="always">
                La capitale della nuova provincia è{' '}
                <N href="https://it.wikipedia.org/wiki/Ulpia_Traiana_Sarmizegetusa">
                  Ulpia Traiana Sarmizegetusa
                </N>
                , città fondata ex novo a circa 40 km dalla capitale dacica.
              </Detail>
              <Detail on="always">
                Comincia la{' '}
                <N href="https://it.wikipedia.org/wiki/Romanizzazione">romanizzazione</N>: dal
                latino parlato nelle province danubiane si formerà, nei secoli successivi, la{' '}
                <N href="https://it.wikipedia.org/wiki/Lingua_rumena">lingua romena</N>.
              </Detail>
            </Event>
            <Event on="always" date="271–275" title="Dacia abbandonata per ragioni strategiche">
              <Detail on="always">
                Sotto <N href="https://it.wikipedia.org/wiki/Aureliano">Aureliano</N> i Romani
                lasciano la Dacia. Resta romana la{' '}
                <N href="https://it.wikipedia.org/wiki/Dobrogea">Dobrogea</N>, tra il Danubio e il
                Mar Nero, che non faceva parte della Dacia ma della{' '}
                <N href="https://it.wikipedia.org/wiki/Mesia">Mesia</N>, romana dal 46 d.C.
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
              dimostrata. Il dibattito ha pesato sulle contese tra Romania e Ungheria per la
              Transilvania. Nei musei romeni troverai quasi sempre la prima versione.
            </Note>
          </Callout>

          <Timeline
            on="always"
            id="s-1-2"
            title={
              <>
                {headings.peoples} <Aside italic>{headings.peoplesDates}</Aside>
              </>
            }
          >
            <Event
              on="always"
              date="290"
              title={
                <>
                  I <N href="https://it.wikipedia.org/wiki/Goti">Goti</N> (Germani dell’Est)
                  dominano Moldavia e Valacchia
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
                  I <N href="https://it.wikipedia.org/wiki/Gepidi">Gepidi</N> (Germani imparentati
                  con i Goti) dominano{' '}
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
                  Gli <N href="https://it.wikipedia.org/wiki/Avari">Avari</N> (nomadi di origine
                  incerta) sottomettono i Gepidi
                </>
              }
            />
            <Event
              on="always"
              date="681"
              title={
                <>
                  La <N href="https://it.wikipedia.org/wiki/Dobrogea">Dobrogea</N> entra nel{' '}
                  <N href="https://it.wikipedia.org/wiki/Primo_Impero_bulgaro">
                    Primo Impero bulgaro
                  </N>
                </>
              }
            >
              <Detail on="always">
                <D>864–865</D> La Bulgaria si converte al{' '}
                <N href="https://it.wikipedia.org/wiki/Cristianizzazione_della_Bulgaria">
                  cristianesimo
                </N>
                .
              </Detail>
            </Event>
            <Event
              on="always"
              date="895"
              title={
                <>
                  Gli <N href="https://it.wikipedia.org/wiki/Ungari">Ungari</N> entrano nel bacino
                  dei Carpazi
                </>
              }
            >
              <Detail on="always">
                Spinti da Bulgari e Peceneghi, attraversano i Carpazi e occupano la pianura
                pannonica.
              </Detail>
              <Detail on={[Transilvania]}>
                Secondo le Gesta Hungarorum in Crișana vivono già i{' '}
                <N href="https://it.wikipedia.org/wiki/Siculi_(Transilvania)">Siculi</N> (Székely),
                che si uniscono a loro.
              </Detail>
              <Source on={[Transilvania]}>
                La fonte principale di questo periodo è l’opera{' '}
                <N work href="https://it.wikipedia.org/wiki/Gesta_Hungarorum">
                  Gesta Hungarorum
                </N>
                , la più antica cronaca ungherese giunta fino a noi. È stata scritta circa 300 anni
                dopo i fatti, quindi la sua attendibilità è dubbia. Le prime notizie affidabili sui
                Siculi vengono da documenti ungheresi successivi.
              </Source>
            </Event>
          </Timeline>
        </Part>

        <Part
          on={[Transilvania, Valacchia, Moldavia, Dobrogea]}
          id="p-2"
          kicker={`Parte II · ${headings.part2Dates}`}
          title={headings.part2}
        >
          <Timeline on="always" id="s-2-1">
            <Event
              on={[Transilvania]}
              date="1003 ca."
              title={
                <>
                  La <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N> entra nel
                  Regno d’Ungheria
                </>
              }
            >
              <Detail on={[Transilvania]}>
                Intorno al 1003{' '}
                <N href="https://it.wikipedia.org/wiki/Stefano_I_d%27Ungheria">
                  Stefano I d’Ungheria
                </N>{' '}
                sottomette la Transilvania. Il controllo del regno si consolida nei due secoli
                successivi.
              </Detail>
              <Detail on={[Transilvania]}>
                Dalla fine del XII secolo è governata da un{' '}
                <N href="https://it.wikipedia.org/wiki/Voivodato">voivoda</N>. Il{' '}
                <N href="https://it.wikipedia.org/wiki/Banato">Banato</N> e la{' '}
                <N href="https://it.wikipedia.org/wiki/Crișana">Crișana</N> restano invece comitati
                governati direttamente dal re.
              </Detail>
            </Event>
            <Event
              on={[Transilvania]}
              date="1150"
              title={
                <>
                  Coloni sassoni in{' '}
                  <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                Il re d’Ungheria invita coloni tedeschi, fiamminghi e valloni, poi chiamati{' '}
                <N href="https://it.wikipedia.org/wiki/Sassoni">sassoni</N>, a popolare e difendere
                la frontiera orientale. Nel 1224 il <N work>Diploma Andreanum</N> garantisce loro
                ampie autonomie.
              </Detail>
            </Event>
            <Event
              on={[Transilvania]}
              date="1241"
              title={
                <>
                  L’
                  <N href="https://it.wikipedia.org/wiki/Invasione_mongola_dell%27Europa">
                    invasione mongola
                  </N>{' '}
                  devasta la Transilvania
                </>
              }
            >
              <Detail on={[Transilvania]}>
                I mongoli distruggono Rodna e saccheggiano Bistrița, Cluj, Oradea, Alba Iulia e
                Sibiu. La popolazione cala di almeno il 15%. Dopo la ritirata i re spingono nobili e
                città a costruire fortificazioni in pietra: da qui nascono molti castelli e chiese
                fortificate.
              </Detail>
            </Event>
            <Event
              on={[Valacchia]}
              date="1310 ca."
              title={
                <>
                  Nasce il principato di{' '}
                  <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N>
                </>
              }
            >
              <Detail on={[Valacchia]}>
                Istituito da <N href="https://it.wikipedia.org/wiki/Basarab_I">Basarab I</N>.
              </Detail>
              <Detail on={[Valacchia]}>
                Nel 1330 sconfigge Carlo I d’Ungheria a Posada e rende la Valacchia indipendente.
              </Detail>
              <Detail on={[Valacchia]}>
                <D>1386</D> Sale al trono{' '}
                <N href="https://it.wikipedia.org/wiki/Mircea_il_Vecchio">Mircea il Vecchio</N>. Da
                lui discendono i <N href="https://it.wikipedia.org/wiki/Drăculești">Drăculești</N>,
                che prendono il nome da suo figlio{' '}
                <N href="https://it.wikipedia.org/wiki/Vlad_II_Dracul">Vlad II Dracul</N>, principe
                dal 1436; da <N href="https://it.wikipedia.org/wiki/Dan_I_di_Valacchia">Dan I</N>{' '}
                discendono i <N href="https://it.wikipedia.org/wiki/Dăneștii">Dăneștii</N>. Sono le
                due linee principali della Casa di Basarab.
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
            <Event on={[Dobrogea]} date="XIV sec." title="Nasce la Dobrogea">
              <Detail on={[Dobrogea]}>
                Dopo il dominio mongolo, nella regione tra il Danubio e il Mar Nero si forma un
                piccolo principato legato a Bisanzio. Il suo signore Dobrotitsa le dà il nome. Nel
                1390 la conquista{' '}
                <N href="https://it.wikipedia.org/wiki/Mircea_il_Vecchio">Mircea il Vecchio</N>, nel
                1395 la occupano gli ottomani.
              </Detail>
            </Event>
          </Timeline>
        </Part>

        <Part
          on={[Transilvania, Valacchia, Moldavia, Dobrogea]}
          id="p-3"
          kicker={`Parte III · ${headings.part3Dates}`}
          title={headings.part3}
        >
          <Timeline on="always" id="s-3-1">
            <Event on={[Dobrogea]} date="1416–1420" title="La Dobrogea diventa ottomana">
              <Detail on={[Dobrogea]}>
                Dopo un periodo sotto{' '}
                <N href="https://it.wikipedia.org/wiki/Mircea_il_Vecchio">Mircea il Vecchio</N>, la
                regione passa agli ottomani: gli storici indicano il 1416, il 1417 o il 1420. Le
                bocche del <N href="https://it.wikipedia.org/wiki/Danubio">Danubio</N>, con{' '}
                <N href="https://it.wikipedia.org/wiki/Kilija">Chilia</N> (oggi Kilija, in Ucraina),
                restano a Valacchia e Moldavia fino al 1484.
              </Detail>
              <Detail on={[Dobrogea]}>
                A differenza di Valacchia e Moldavia non diventa uno Stato vassallo ma una provincia
                ottomana, e lo resterà fino al 1878.
              </Detail>
            </Event>
            <Event
              on={[Valacchia]}
              date="1417"
              title="La Valacchia diventa vassalla degli ottomani"
            >
              <Detail on={[Valacchia]}>
                <N href="https://it.wikipedia.org/wiki/Mircea_il_Vecchio">Mircea il Vecchio</N>{' '}
                accetta di pagare un tributo, ma la{' '}
                <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N> mantiene la propria
                autonomia.
              </Detail>
            </Event>
            <Event
              on={[Transilvania]}
              date="1437"
              title="L’esclusione dei romeni ortodossi dal potere"
            >
              <Detail on={[Transilvania]}>
                In <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N> i romeni
                ortodossi vengono progressivamente esclusi dal potere, soprattutto dopo l’
                <N href="https://it.wikipedia.org/wiki/Unio_Trium_Nationum">
                  Unione delle Tre Nazioni
                </N>
                : l’alleanza di nobili ungheresi, siculi e sassoni nata per reprimere la{' '}
                <N href="https://it.wikipedia.org/wiki/Rivolta_di_Bobâlna">rivolta di Bobâlna</N>.
              </Detail>
            </Event>
            <Event
              on={[Moldavia]}
              date="1456"
              title="La Moldavia diventa tributaria degli ottomani"
            >
              <Detail on={[Moldavia]}>
                L’anno dopo sale al trono{' '}
                <N href="https://it.wikipedia.org/wiki/Stefano_III_il_Grande">Stefano il Grande</N>{' '}
                (1457–1504), che combatterà a lungo gli ottomani.
              </Detail>
            </Event>
            <Event
              on={[Valacchia]}
              date="1512–1521"
              title={
                <>
                  Gli <N work>Insegnamenti</N> di Neagoe Basarab
                </>
              }
            >
              <Detail on={[Valacchia]}>
                <N href="https://it.wikipedia.org/wiki/Basarab_V_Neagoe">Neagoe Basarab</N> scrive
                in slavone gli <N work>Insegnamenti al figlio Teodosio</N>, una delle opere più
                antiche della cultura romena. Nel 1517 fa consacrare la chiesa di Curtea de Argeș.
              </Detail>
            </Event>
            <Event on={[Transilvania]} date="1514" title="La ribellione di György Dózsa">
              <Detail on={[Transilvania]}>
                I contadini, guidati da{' '}
                <N href="https://it.wikipedia.org/wiki/György_Dózsa">György Dózsa</N>, si ribellano
                e vengono sconfitti a{' '}
                <N href="https://it.wikipedia.org/wiki/Timișoara">Timișoara</N>. La repressione è
                durissima: la Dieta del 1514 vincola per sempre i contadini alla terra.
              </Detail>
            </Event>
            <Event
              on={[Valacchia]}
              date="1522–1529"
              title="Radu de la Afumați resiste agli ottomani"
            >
              <Detail on={[Valacchia]}>
                <N href="https://it.wikipedia.org/wiki/Radu_de_la_Afumați">Radu de la Afumați</N>{' '}
                combatte gli ottomani ma, dopo una ventina di battaglie, viene sconfitto e deve
                accettarne la sovranità e sopportare un aumento dei tributi.
              </Detail>
            </Event>
            <Event on="always" date="1526" title="Frattura del Regno d’Ungheria">
              <Detail on="always">
                A Mohács, in Ungheria, gli ottomani distruggono l’esercito ungherese, provocando una
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
            <Event on={[Moldavia, Transilvania]} date="1529" title="Petru Rareș in Transilvania">
              <Detail on={[Moldavia, Transilvania]}>
                <N href="https://it.wikipedia.org/wiki/Petru_Rareș">Petru Rareș</N> interviene nella
                lotta per la corona del Regno d’Ungheria, invade la{' '}
                <N href="https://it.wikipedia.org/wiki/Terra_dei_Siculi">Terra dei Siculi</N> e
                sconfigge l’esercito dei sostenitori di{' '}
                <N href="https://it.wikipedia.org/wiki/Ferdinando_I_d%27Asburgo">Ferdinando I</N>.{' '}
                <N href="https://it.wikipedia.org/wiki/Giovanni_I_d%27Ungheria">Giovanni I</N>{' '}
                diventa vassallo del sultano, ma il regno resta suo.
              </Detail>
            </Event>
            <Event on={[Transilvania]} date="1538" title="Trattato di Gran Varadino">
              <Detail on={[Transilvania]}>
                Con il{' '}
                <N href="https://it.wikipedia.org/wiki/Trattato_di_Gran_Varadino">
                  trattato di Gran Varadino
                </N>
                , <N href="https://it.wikipedia.org/wiki/Ferdinando_I_d%27Asburgo">Ferdinando I</N>{' '}
                e <N href="https://it.wikipedia.org/wiki/Giovanni_I_d%27Ungheria">Giovanni I</N> si
                dividono l’Ungheria. Giovanni, che non ha figli, promette la successione agli
                Asburgo.
              </Detail>
            </Event>
          </Timeline>
        </Part>
      </Chapter>

      <Chapter
        on="always"
        id="c-2"
        number={3}
        title={headings.chapter3}
        lede="Principati e province tra Ottomani, Asburgo e Russia."
        period="1541 – 1818"
      >
        <Part
          on={[Transilvania, Valacchia, Moldavia, Dobrogea]}
          id="p-4"
          kicker={`Parte I · ${headings.part4Dates}`}
          title={headings.part4}
        >
          <Timeline on="always" id="s-4-1">
            <Event on={[Moldavia, Transilvania]} date="1541" title="Un anno turbolento">
              <Detail on={[Transilvania]}>
                Con la caduta di <N href="https://it.wikipedia.org/wiki/Buda">Buda</N> (oggi parte
                di Budapest), gli ottomani di{' '}
                <N href="https://it.wikipedia.org/wiki/Solimano_il_Magnifico">
                  Solimano il Magnifico
                </N>{' '}
                occupano la capitale del{' '}
                <N href="https://it.wikipedia.org/wiki/Regno_d%27Ungheria">Regno d’Ungheria</N>. In
                cambio di un tributo annuo, il sultano affida le terre a est del Tibisco alla regina
                Isabella e a suo figlio.
              </Detail>
              <Detail on={[Transilvania]}>
                Il 18 ottobre, alla <N>Dieta di Debrecen</N> (oggi in Ungheria), le regioni
                orientali del regno, compresa la{' '}
                <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N>, giurano
                fedeltà a{' '}
                <N href="https://it.wikipedia.org/wiki/Giovanni_II_d'Ungheria">János Zsigmond</N>{' '}
                (Giovanni II Sigismondo). Nasce un’entità politica distinta, mentre{' '}
                <N href="https://it.wikipedia.org/wiki/Giorgio_Martinuzzi">Giorgio Martinuzzi</N>{' '}
                tratta ancora con Ferdinando I la riunificazione del regno. La Transilvania passa
                sotto la{' '}
                <N href="https://it.wikipedia.org/wiki/Impero_ottomano">sovranità ottomana</N>.
              </Detail>
              <Detail on={[Moldavia]}>
                <N href="https://it.wikipedia.org/wiki/Petru_Rareș">Petru Rareș</N>, principe di{' '}
                <N href="https://it.wikipedia.org/wiki/Moldavia_(regione_storica)">Moldavia</N>,
                dopo aver invaso la <N href="https://it.wikipedia.org/wiki/Pocuzia">Pocuzia</N>{' '}
                (oggi in Ucraina) invano nel 1531 ed esser fuggito in{' '}
                <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N>, riottiene il
                trono pagando una forte somma. Dopo la sua morte la Moldavia precipita nelle lotte
                tra pretendenti e fazioni di{' '}
                <N href="https://it.wikipedia.org/wiki/Boiari">boiardi</N>.
              </Detail>
            </Event>
            <Event on={[Valacchia]} date="1545" title="Il primo principe nominato dal sultano">
              <Detail on={[Valacchia]}>
                <N href="https://it.wikipedia.org/wiki/Mircea_V_il_Pastore">Mircea Ciobanul</N>{' '}
                diventa il primo principe di{' '}
                <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N> insediato dal
                sultano. Da questo momento il trono va a chi offre il tributo più alto.
              </Detail>
            </Event>
            <Event
              on={[Transilvania]}
              date="1568"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Editto_di_Turda">Editto di Turda</N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                La Transilvania riconosce la libertà di culto per quattro confessioni cristiane:{' '}
                <N href="https://it.wikipedia.org/wiki/Chiesa_cattolica">cattolica</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Luteranesimo">luterana</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Calvinismo">calvinista</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Unitarianesimo">unitaria</N>. Gli{' '}
                <N href="https://it.wikipedia.org/wiki/Chiesa_ortodossa_rumena">ortodossi</N>{' '}
                rimangono soltanto tollerati.
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
                <N href="https://it.wikipedia.org/wiki/Giovanni_II_d'Ungheria">János Zsigmond</N>{' '}
                rinuncia al titolo di re di Ungheria. Viene formalizzato il{' '}
                <N href="https://it.wikipedia.org/wiki/Principato_di_Transilvania">
                  Principato di Transilvania
                </N>
                , autonomo ma sottoposto alla sovranità ottomana.
              </Detail>
            </Event>
            <Event on={[Moldavia]} date="1574" title="Un’altra lotta anti-ottomana">
              <Detail on={[Moldavia]}>
                <N href="https://ro.wikipedia.org/wiki/Ioan_Vodă_cel_Cumplit">
                  Ioan Vodă cel Cumplit
                </N>{' '}
                («il Terribile»), principe di{' '}
                <N href="https://it.wikipedia.org/wiki/Moldavia_(regione_storica)">Moldavia</N>, si
                rifiuta di pagare il tributo al sultano. Sconfigge un primo esercito ottomano vicino
                a <N href="https://ro.wikipedia.org/wiki/Bătălia_de_la_Jiliște">Jiliște</N>, ma il
                sultano ne manda un secondo: Ioan Vodă viene catturato e giustiziato.
              </Detail>
            </Event>
            <Event
              on={[Transilvania, Valacchia, Moldavia]}
              date="1594–1595"
              title="Rivolta anti-ottomana"
            >
              <Detail on={[Transilvania, Valacchia, Moldavia]}>
                <N href="https://it.wikipedia.org/wiki/Moldavia_(regione_storica)">Moldavia</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N> si alleano contro i{' '}
                <N href="https://it.wikipedia.org/wiki/Impero_ottomano">turchi</N>.
              </Detail>
              <Detail on={[Transilvania, Valacchia, Moldavia]}>
                Nell’agosto 1595 Michele il Coraggioso batte gli ottomani a Călugăreni.
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
                Il principe di <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N>{' '}
                conquista la <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N> e
                la <N href="https://it.wikipedia.org/wiki/Moldavia_(regione_storica)">Moldavia</N>,
                riunendo per breve tempo i tre principati sotto un unico sovrano. Il 18 settembre
                1600 viene sconfitto dalla nobiltà ungherese a Mirăslău.
              </Detail>
            </Event>
            <Event
              on={[Transilvania, Valacchia, Moldavia]}
              date="1601"
              title="Morte di Michele il Coraggioso"
            >
              <Detail on={[Transilvania, Valacchia, Moldavia]}>
                Il 3 agosto, insieme al generale imperiale{' '}
                <N href="https://it.wikipedia.org/wiki/Giorgio_Basta">Giorgio Basta</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Michele_il_Coraggioso">Michele</N> vince
                nella{' '}
                <N href="https://it.wikipedia.org/wiki/Battaglia_di_Guruslău">
                  battaglia di Guruslău
                </N>
                , presso il villaggio omonimo, oggi nel distretto di Sălaj. Il 19 agosto, viene
                assassinato per ordine dello stesso generale a{' '}
                <N href="https://it.wikipedia.org/wiki/Câmpia_Turzii">Câmpia Turzii</N>, vicino a{' '}
                <N href="https://it.wikipedia.org/wiki/Turda">Turda</N>, e l’unione dei principati
                si dissolve.
              </Detail>
            </Event>
            <Event
              on={[Valacchia, Transilvania]}
              date="1602"
              title={
                <>
                  <N href="https://ro.wikipedia.org/wiki/Radu_Șerban">Radu Șerban</N>
                </>
              }
            >
              <Detail on={[Valacchia, Transilvania]}>
                Con l’appoggio di{' '}
                <N href="https://it.wikipedia.org/wiki/Rodolfo_II_d%27Asburgo">Rodolfo II</N> sale
                al trono di <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N>. L’anno
                dopo invade la <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N>
                , sconfigge <N href="https://ro.wikipedia.org/wiki/Moise_Secuiul">Mózes Székely</N>{' '}
                e governa il principato in nome dell’imperatore.
              </Detail>
            </Event>
            <Event
              on={[Transilvania]}
              date="1604"
              title={
                <>
                  Rivolta di{' '}
                  <N href="https://it.wikipedia.org/wiki/István_Bocskai">István Bocskai</N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                Il comandante imperiale{' '}
                <N href="https://it.wikipedia.org/wiki/Giovan_Giacomo_Barbiano_di_Belgioioso">
                  Giovan Giacomo Barbiano di Belgioioso
                </N>{' '}
                accusa di tradimento il possidente calvinista e gli confisca i beni.{' '}
                <N href="https://it.wikipedia.org/wiki/István_Bocskai">Bocskai</N> assolda almeno
                5.000 <N href="https://it.wikipedia.org/wiki/Aiduchi">aiduchi</N> e si ribella.
              </Detail>
            </Event>
            <Event on={[Transilvania]} date="1605–1606" title="Trattato di Vienna">
              <Detail on={[Transilvania]}>
                Il 14 settembre 1605 le{' '}
                <N href="https://it.wikipedia.org/wiki/Unio_Trium_Nationum">Tre Nazioni</N> giurano
                fedeltà a <N href="https://it.wikipedia.org/wiki/István_Bocskai">Bocskai</N>,
                nominato principe dal sultano{' '}
                <N href="https://it.wikipedia.org/wiki/Ahmed_I">Ahmed I</N>. Le sue truppe invadono{' '}
                <N href="https://it.wikipedia.org/wiki/Regno_d%27Ungheria">Ungheria</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Arciducato_d%27Austria">Austria</N>, e il 23
                giugno 1606, con il{' '}
                <N href="https://it.wikipedia.org/wiki/Trattato_di_Vienna_(1606)">
                  Trattato di Vienna
                </N>
                , costringono gli <N href="https://it.wikipedia.org/wiki/Asburgo">Asburgo</N> alla
                pace.
              </Detail>
            </Event>
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
                Finisce la{' '}
                <N href="https://it.wikipedia.org/wiki/Lunga_guerra_turca">Lunga guerra</N>.{' '}
                <N href="https://it.wikipedia.org/wiki/Rodolfo_II_d%27Asburgo">Rodolfo II</N>{' '}
                riconosce che i principi di Transilvania sono sottoposti al sultano.{' '}
                <N href="https://it.wikipedia.org/wiki/István_Bocskai">Bocskai</N> muore senza figli
                il 29 dicembre.
              </Detail>
            </Event>
            <Context on={[Transilvania]} period="1593–1606" title="La catastrofe demografica">
              La <N href="https://it.wikipedia.org/wiki/Lunga_guerra_turca">Lunga guerra</N> spopola
              la Transilvania. Nei comitati di{' '}
              <N href="https://it.wikipedia.org/wiki/Comitato_di_Szilágy">Sălaj</N> e{' '}
              <N href="https://ro.wikipedia.org/wiki/Comitatul_Dăbâca">Dăbâca</N> i villaggi di
              pianura perdono circa l’80% degli abitanti e quelli di montagna circa il 45%.{' '}
              <N href="https://it.wikipedia.org/wiki/Sibiu">Sibiu</N> e{' '}
              <N href="https://it.wikipedia.org/wiki/Brașov">Brașov</N> perdono oltre il 75% della
              popolazione. In una lettera del 1603{' '}
              <N href="https://it.wikipedia.org/wiki/Giorgio_Basta">Giorgio Basta</N> descrive il
              paese come un deserto, con miniere abbandonate e senza manodopera.
            </Context>
          </Timeline>

          <Timeline
            on={[Transilvania]}
            id="s-4-2"
            title={
              <>
                {regions.transilvania} <Aside italic>{headings.part4TransilvaniaDates}</Aside>
              </>
            }
          >
            <Context
              on={[Transilvania]}
              period="XVII secolo"
              title="Piccola era glaciale ed epidemie"
            >
              Inverni lunghi, estati piovose e autunni brevi, effetto della{' '}
              <N href="https://it.wikipedia.org/wiki/Piccola_era_glaciale">piccola era glaciale</N>,
              spingono a trasformare i terreni d’altura in pascoli. Ogni decennio circa tornano
              epidemie di <N href="https://it.wikipedia.org/wiki/Morbillo">morbillo</N> e di{' '}
              <N href="https://it.wikipedia.org/wiki/Peste_bubbonica">peste bubbonica</N>.
            </Context>
            <Event
              on={[Transilvania]}
              date="1608–1613"
              title={
                <>
                  <N href="https://ro.wikipedia.org/wiki/Gabriel_Báthory">Gábor Báthory</N>
                </>
              }
            >
              {/* TODO verificare: Gábor Báthory prese Sibiu nel 1610, ma probabilmente non Brașov */}
              <Detail on={[Transilvania]}>
                Toglie il trono a{' '}
                <N href="https://ro.wikipedia.org/wiki/Sigismund_Rákóczi">Zsigmond Rákóczi</N> con
                l’aiuto degli <N href="https://it.wikipedia.org/wiki/Aiduchi">aiduchi</N>. Conquista{' '}
                <N href="https://it.wikipedia.org/wiki/Sibiu">Sibiu</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Brașov">Brașov</N> e invade la{' '}
                <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N> senza il consenso
                del sultano. Per questo la{' '}
                <N href="https://it.wikipedia.org/wiki/Sublime_Porta">Porta</N> decide di deporlo.
              </Detail>
            </Event>
            <Context on={[Transilvania]} period="1611–1700" title="Nuove colture">
              Il <N href="https://it.wikipedia.org/wiki/Mais">mais</N> arriva dalle Americhe:
              compare per la prima volta nelle fonti nel 1611 e diventa un alimento popolare. Il{' '}
              <N href="https://it.wikipedia.org/wiki/Tabacco">tabacco</N> si coltiva dalla seconda
              metà del secolo, e già nel 1670 la Dieta regola il fumo. Il{' '}
              <N href="https://it.wikipedia.org/wiki/Luppolo">luppolo</N> compare nelle zone
              montuose verso la fine del secolo.
            </Context>
            <Event
              on={[Transilvania]}
              date="1613"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Gabriele_Bethlen">Gábor Bethlen</N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                Arriva con truppe ottomane, valacche e{' '}
                <N href="https://it.wikipedia.org/wiki/Tatari_di_Crimea">tatare</N> e il 23
                settembre viene proclamato principe. Introduce il{' '}
                <N href="https://it.wikipedia.org/wiki/Mercantilismo">mercantilismo</N>, crea
                monopoli di Stato, fonda la prima accademia transilvana e rilancia le miniere.
              </Detail>
            </Event>
            <Context on={[Transilvania]} period="Dal 1618" title="La rinascita mineraria">
              La Dieta del 1618 permette a minatori locali e stranieri di aprire liberamente nuove
              miniere, esentandoli dalle tasse. Oltre a oro, argento e ferro, ad{' '}
              <N href="https://it.wikipedia.org/wiki/Abrud">Abrud</N> e{' '}
              <N href="https://it.wikipedia.org/wiki/Zlatna">Zlatna</N> si estrae{' '}
              <N href="https://it.wikipedia.org/wiki/Mercurio_(elemento_chimico)">mercurio</N>, una
              fonte importante di entrate per lo Stato.
            </Context>
            <Event
              on={[Transilvania]}
              date="1619–1626"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Guerra_dei_trent%27anni">
                    Guerra dei trent’anni
                  </N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                <N href="https://it.wikipedia.org/wiki/Gabriele_Bethlen">Bethlen</N> si allea con l’
                <N href="https://it.wikipedia.org/wiki/Unione_evangelica">Unione evangelica</N> e
                invade per tre volte l’
                <N href="https://it.wikipedia.org/wiki/Ungheria_asburgica">Ungheria asburgica</N>.
                Nel 1620 viene eletto re d’Ungheria, ma rinuncia al titolo in cambio di sette
                comitati.
              </Detail>
            </Event>
            <Event
              on={[Transilvania]}
              date="1630"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Giorgio_I_Rákóczi">György I Rákóczi</N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                Vince la contesa per la successione contro la vedova di Bethlen,{' '}
                <N href="https://it.wikipedia.org/wiki/Caterina_di_Brandeburgo">
                  Caterina di Brandeburgo
                </N>
                . Abolisce i monopoli e accumula oltre 30 grandi domini, spesso confiscandoli ad
                avversari accusati di tradimento.
              </Detail>
            </Event>
            <Event
              on={[Transilvania]}
              date="1648"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Pace_di_Vestfalia">Pace di Vestfalia</N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                Come alleata delle potenze protestanti, la{' '}
                <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N> viene citata
                nel trattato come entità sovrana.
              </Detail>
            </Event>
            <Context
              on={[Transilvania]}
              period="1613–1648"
              title="Ricostruzione e nuovo volto delle città"
            >
              Gli insediamenti distrutti dalla guerra vengono ricostruiti. Con l’
              <N href="https://it.wikipedia.org/wiki/Architettura_rinascimentale">
                architettura rinascimentale
              </N>{' '}
              le città perdono l’aspetto medievale: ad{' '}
              <N href="https://it.wikipedia.org/wiki/Alba_Iulia">Alba Iulia</N> e a{' '}
              <N href="https://it.wikipedia.org/wiki/Gilău">Gilău</N> compaiono parchi, statue,
              piazze ampie e fontane. Nei villaggi le capanne lasciano il posto a case con più
              stanze. Dal 1620 diventano rari i decreti sul ritorno dei servi fuggiaschi, segno che
              la popolazione si sta riprendendo.
            </Context>
            <Event
              on={[Transilvania]}
              date="1653"
              title={
                <>
                  <N work href="https://ro.wikipedia.org/wiki/Approbatae_Constitutiones">
                    Approbatae
                  </N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                <N href="https://it.wikipedia.org/wiki/Giorgio_II_Rákóczi">György II Rákóczi</N> fa
                pubblicare il codice delle leggi del principato. Impone il ritorno dei contadini
                fuggiaschi nelle tenute come servi e vieta ai romeni di portare armi.
              </Detail>
            </Event>
            <Event on={[Transilvania]} date="1657" title={<>Disfatta in Polonia</>}>
              <Detail on={[Transilvania]}>
                <N href="https://it.wikipedia.org/wiki/Giorgio_II_Rákóczi">György II Rákóczi</N>{' '}
                invade la{' '}
                <N href="https://it.wikipedia.org/wiki/Confederazione_polacco-lituana">Polonia</N>{' '}
                al fianco della <N href="https://it.wikipedia.org/wiki/Impero_svedese">Svezia</N>,
                viene battuto e al ritorno i{' '}
                <N href="https://it.wikipedia.org/wiki/Tatari_di_Crimea">tatari di Crimea</N>{' '}
                distruggono il suo esercito. Il{' '}
                <N href="https://it.wikipedia.org/wiki/Gran_visir">gran visir</N>{' '}
                <N href="https://it.wikipedia.org/wiki/Köprülü_Mehmed_Pascià">Köprülü Mehmed</N> lo
                fa deporre.
              </Detail>
            </Event>
            <Event on={[Transilvania]} date="1658–1662" title={<>Anni di guerra civile</>}>
              <Detail on={[Transilvania]}>
                Principi filo-ottomani e anti-ottomani si scontrano. Gli ottomani conquistano{' '}
                <N href="https://it.wikipedia.org/wiki/Oradea">Oradea</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Ineu">Ineu</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Lugoj">Lugoj</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Caransebeș">Caransebeș</N> e distruggono la
                capitale <N href="https://it.wikipedia.org/wiki/Alba_Iulia">Alba Iulia</N>. Il
                conflitto si chiude con la morte di{' '}
                <N href="https://ro.wikipedia.org/wiki/Ioan_Kemény">János Kemény</N> il 23 gennaio
                1662.
              </Detail>
            </Event>
            <Unless on={[Dobrogea]}>
              <MocaniContext on={[Transilvania]} />
            </Unless>
            <Event
              on={[Transilvania]}
              date="1661–1690"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Michele_I_Apafi">Mihály I Apafi</N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                Il principe è scelto su richiesta degli ottomani. È il primo a invitare il vescovo
                ortodosso alla Dieta e nel 1669 fa pubblicare le <N work>Compilatae</N>. Nel 1683 è
                costretto a marciare con gli ottomani su{' '}
                <N href="https://it.wikipedia.org/wiki/Battaglia_di_Vienna">Vienna</N>.
              </Detail>
            </Event>
            <Event on={[Transilvania]} date="1685–1686" title={<>Verso gli Asburgo</>}>
              <Detail on={[Transilvania]}>
                Con il trattato di <N href="https://it.wikipedia.org/wiki/Cârțișoara">Cârțișoara</N>{' '}
                la <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N> aderisce in
                segreto alla{' '}
                <N href="https://it.wikipedia.org/wiki/Lega_Santa_(1684)">Lega Santa</N>. Con quello
                di Vienna del 28 giugno 1686 accetta presidi imperiali a{' '}
                <N href="https://it.wikipedia.org/wiki/Deva_(Romania)">Deva</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Cluj-Napoca">Cluj</N>.
              </Detail>
            </Event>
            <Event
              on={[Transilvania]}
              date="1688"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Antonio_Carafa_(generale)">
                    Antonio Carafa
                  </N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                A febbraio il generale imperiale costringe le{' '}
                <N href="https://it.wikipedia.org/wiki/Unio_Trium_Nationum">Tre Nazioni</N> a
                riconoscere il dominio ereditario degli{' '}
                <N href="https://it.wikipedia.org/wiki/Asburgo">Asburgo</N> e piega con la forza{' '}
                <N href="https://it.wikipedia.org/wiki/Sibiu">Sibiu</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Brașov">Brașov</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Bistrița">Bistrița</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Baia_Mare">Baia Mare</N>.
              </Detail>
            </Event>
          </Timeline>

          <Timeline
            on={[Valacchia]}
            id="s-4-3"
            title={
              <>
                {regions.valacchia} <Aside italic>{headings.part4ValacchiaDates}</Aside>
              </>
            }
          >
            <BoyarsContext on={[Valacchia, Moldavia]} />
            <Event
              on={[Valacchia]}
              date="1611"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Radu_Mihnea">Radu Mihnea</N> e i{' '}
                  <N href="https://it.wikipedia.org/wiki/Fanarioti">fanarioti</N>
                </>
              }
            >
              <Detail on={[Valacchia]}>
                La <N href="https://it.wikipedia.org/wiki/Sublime_Porta">Porta</N> insedia Radu
                Mihnea al posto dell’anti-ottomano{' '}
                <N href="https://ro.wikipedia.org/wiki/Radu_Șerban">Radu Șerban</N>. Comincia
                l’immigrazione su larga scala dei greci del{' '}
                <N href="https://it.wikipedia.org/wiki/Fanar">Fanar</N>, che acquistano terre e poi
                il rango di <N href="https://it.wikipedia.org/wiki/Boiari">boiardi</N>.
              </Detail>
            </Event>
            <Event on={[Valacchia]} date="1618" title={<>Rivolta anti-greca</>}>
              <Detail on={[Valacchia]}>
                I <N href="https://it.wikipedia.org/wiki/Boiari">boiardi</N> guidati da{' '}
                <N>Lupu Mehedițeanu</N> uccidono possidenti e mercanti greci, protetti dal principe{' '}
                <N href="https://ro.wikipedia.org/wiki/Alexandru_Iliaș">Alexandru Iliaș</N>.
              </Detail>
            </Event>
            <Event
              on={[Valacchia]}
              date="1620–1621"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N> e{' '}
                  <N href="https://it.wikipedia.org/wiki/Moldavia_(regione_storica)">Moldavia</N>{' '}
                  unite
                </>
              }
            >
              {/* TODO verificare: nel 1620 in Moldavia regnava Alexandru Iliaș; l'unione sotto Radu Mihnea risale probabilmente al 1623–1626 */}
              <Detail on={[Valacchia]}>
                <N href="https://it.wikipedia.org/wiki/Radu_Mihnea">Radu Mihnea</N> governa entrambi
                i principati. Nel 1621 fa da mediatore nella pace tra ottomani e{' '}
                <N href="https://it.wikipedia.org/wiki/Confederazione_polacco-lituana">polacchi</N>{' '}
                dopo l’
                <N href="https://it.wikipedia.org/wiki/Battaglia_di_Chocim_(1621)">
                  assedio di Hotin
                </N>{' '}
                (oggi Chotyn, in Ucraina).
              </Detail>
            </Event>
            <Event on={[Valacchia]} date="1631" title={<>Espulsione dei greci</>}>
              <Detail on={[Valacchia]}>
                Il 19 luglio i boiardi ribelli costringono{' '}
                <N href="https://ro.wikipedia.org/wiki/Leon_Tomșa">Leon Tomșa</N> a cacciare i greci
                senza moglie locale né terre, e a esentare i boiardi dalle tasse.
              </Detail>
            </Event>
            <Event
              on={[Valacchia]}
              date="1632–1654"
              title={
                <>
                  <N href="https://ro.wikipedia.org/wiki/Matei_Basarab">Matei Basarab</N>
                </>
              }
            >
              <Detail on={[Valacchia]}>
                Sconfigge <N href="https://ro.wikipedia.org/wiki/Radu_Iliaș">Radu Iliaș</N> a{' '}
                <N href="https://ro.wikipedia.org/wiki/Mănăstirea_Plumbuita">Plumbuita</N> e
                triplica il tributo, da 45.000 a 135.000{' '}
                <N href="https://it.wikipedia.org/wiki/Tallero">talleri</N>, per farsi confermare.
                Riapre le miniere, costruisce o restaura 30 chiese e fonda una scuola superiore a{' '}
                <N href="https://it.wikipedia.org/wiki/Târgoviște">Târgoviște</N> nel 1646.
              </Detail>
            </Event>
            <Event
              on={[Valacchia]}
              date="1655"
              title={
                <>
                  Rivolta dei <N href="https://ro.wikipedia.org/wiki/Seimeni">seimeni</N>
                </>
              }
            >
              <Detail on={[Valacchia]}>
                I mercenari congedati da{' '}
                <N href="https://ro.wikipedia.org/wiki/Constantin_Șerban">Constantin Șerban</N> si
                uniscono ai servi ribelli. Vengono sconfitti sul{' '}
                <N href="https://ro.wikipedia.org/wiki/Râul_Teleajen">Teleajen</N> il 26 giugno
                dalle truppe transilvane e moldave.
              </Detail>
            </Event>
            <Event on={[Valacchia]} date="1659" title={<>Battaglia di Frătești</>}>
              <Detail on={[Valacchia]}>
                Il 23 novembre{' '}
                <N href="https://ro.wikipedia.org/wiki/Mihnea_al_III-lea">Mihnea III</N> batte gli
                ottomani, ma un’invasione turco-tatara lo costringe a fuggire in{' '}
                <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N>.
              </Detail>
            </Event>
            <Context
              on={[Valacchia]}
              period="Metà XVII secolo"
              title="Caravanserragli e ville nobiliari"
            >
              Si diffondono i{' '}
              <N href="https://it.wikipedia.org/wiki/Caravanserraglio">caravanserragli</N>, segno
              della crescita del commercio: nel 1666 i viaggiatori stranieri ne contano sette a{' '}
              <N href="https://it.wikipedia.org/wiki/Bucarest">Bucarest</N>. Le ville dei{' '}
              <N href="https://ro.wikipedia.org/wiki/Familia_Cantacuzino">Cantacuzino</N> a{' '}
              <N href="https://ro.wikipedia.org/wiki/Măgureni">Măgureni</N> e{' '}
              <N href="https://ro.wikipedia.org/wiki/Filipeștii_de_Târg">Filipești</N> mostrano la
              ricchezza dell’alta nobiltà.
            </Context>
            <Event
              on={[Valacchia]}
              date="1673"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Battaglia_di_Chocim_(1673)">
                    Battaglia di Hotin
                  </N>{' '}
                  <Aside>(oggi Chotyn, in Ucraina)</Aside>
                </>
              }
            >
              <Detail on={[Valacchia]}>
                Il principe valacco{' '}
                <N href="https://ro.wikipedia.org/wiki/Grigore_I_Ghica">Grigore I Ghica</N> viene
                catturato dai polacchi e gli ottomani sono sconfitti l’11 novembre. La{' '}
                <N href="https://it.wikipedia.org/wiki/Sublime_Porta">Porta</N> lo depone.
              </Detail>
            </Event>
            <Event
              on={[Valacchia]}
              date="1678–1688"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Șerban_Cantacuzino">Șerban Cantacuzino</N>
                </>
              }
            >
              <Detail on={[Valacchia]}>
                Fa giustiziare molti Băleni, fonda una scuola superiore, costruisce strade e ponti e
                porta il <N href="https://it.wikipedia.org/wiki/Mais">mais</N> in Valacchia. Offre a{' '}
                <N href="https://it.wikipedia.org/wiki/Leopoldo_I_d%27Asburgo">Leopoldo I</N> la
                sottomissione in cambio del{' '}
                <N href="https://it.wikipedia.org/wiki/Banato">Banato</N> e del trono ereditario, ma
                muore nell’ottobre 1688, prima che le trattative si concludano.
              </Detail>
            </Event>
          </Timeline>

          <Timeline
            on={[Moldavia]}
            id="s-4-4"
            title={
              <>
                {regions.moldavia} <Aside italic>{headings.part4MoldaviaDates}</Aside>
              </>
            }
          >
            <Unless on={[Valacchia]}>
              <BoyarsContext on={[Moldavia]} />
            </Unless>
            <Event
              on={[Moldavia]}
              date="1606–1611"
              title={
                <>
                  I <N href="https://ro.wikipedia.org/wiki/Dinastia_Movilă">Movilă</N>
                </>
              }
            >
              <Detail on={[Moldavia]}>
                <N href="https://it.wikipedia.org/wiki/Ieremia_Movilă">Ieremia Movilă</N> ottiene il
                riconoscimento ereditario del trono. Il figlio{' '}
                <N href="https://ro.wikipedia.org/wiki/Constantin_Movilă">Constantin</N>, però,
                irrita gli ottomani con l’alleanza polacca e viene sostituito da{' '}
                <N href="https://ro.wikipedia.org/wiki/Ștefan_al_II-lea_Tomșa">Ștefan II Tomșa</N>,
                che fa giustiziare molti <N href="https://it.wikipedia.org/wiki/Boiari">boiardi</N>.
              </Detail>
            </Event>
            <Event
              on={[Moldavia]}
              date="1617"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Trattato_di_Busza">Pace di Busza</N>
                </>
              }
            >
              <Detail on={[Moldavia]}>
                Il trattato polacco-ottomano include la{' '}
                <N href="https://it.wikipedia.org/wiki/Moldavia_(regione_storica)">Moldavia</N> e
                obbliga la{' '}
                <N href="https://it.wikipedia.org/wiki/Confederazione_polacco-lituana">Polonia</N> a
                non sostenere i rivali di{' '}
                <N href="https://it.wikipedia.org/wiki/Radu_Mihnea">Radu Mihnea</N>. Nello stesso
                anno scoppiano rivolte contadine contro le tasse.
              </Detail>
            </Event>
            <Event
              on={[Moldavia]}
              date="1619–1620"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Gașpar_Graziani">Gaspare Graziani</N>
                </>
              }
            >
              <Detail on={[Moldavia]}>
                La <N href="https://it.wikipedia.org/wiki/Sublime_Porta">Porta</N> affida la
                Moldavia all’avventuriero veneziano. Quando cerca un’alleanza anti-ottomana, i
                boiardi lo assassinano.
              </Detail>
            </Event>
            <Event
              on={[Moldavia]}
              date="1634–1653"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Vasile_Lupu">Vasile Lupu</N>
                </>
              }
            >
              <Detail on={[Moldavia]}>
                Di origine albanese, si considera erede degli imperatori bizantini. A{' '}
                <N href="https://it.wikipedia.org/wiki/Iași">Iași</N> fa costruire la{' '}
                <N href="https://ro.wikipedia.org/wiki/Mănăstirea_Sfinții_Trei_Ierarhi_din_Iași">
                  chiesa dei Tre Gerarchi
                </N>
                , fonda un <N href="https://ro.wikipedia.org/wiki/Colegiul_Vasilian">collegio</N>{' '}
                nel 1639 e nel 1642 porta la stampa in Moldavia. Tenta quattro volte, senza
                successo, di rovesciare{' '}
                <N href="https://ro.wikipedia.org/wiki/Matei_Basarab">Matei Basarab</N> in
                Valacchia.
              </Detail>
            </Event>
            <Event
              on={[Moldavia]}
              date="1652–1653"
              title={
                <>
                  Alleanza <N href="https://it.wikipedia.org/wiki/Cosacchi">cosacca</N> e caduta
                </>
              }
            >
              <Detail on={[Moldavia]}>
                La figlia di Lupu,{' '}
                <N href="https://ro.wikipedia.org/wiki/Ruxandra_Lupu">Ruxandra</N>, sposa{' '}
                <N href="https://ro.wikipedia.org/wiki/Timuș_Hmelnițki">Tymofij</N>, figlio di{' '}
                <N href="https://it.wikipedia.org/wiki/Bohdan_Chmel%27nyc%27kyj">
                  Bohdan Chmel’nyc’kyj
                </N>
                . Il <N href="https://it.wikipedia.org/wiki/Logoteta">logoteta</N>{' '}
                <N href="https://ro.wikipedia.org/wiki/Gheorghe_Ștefan">Gheorghe Ștefan</N> lo
                rovescia, e il tentativo di tornare al trono fallisce a{' '}
                <N href="https://ro.wikipedia.org/wiki/Bătălia_de_la_Finta">Finta</N> il 27 maggio
                1653.
              </Detail>
            </Event>
            <Event on={[Moldavia]} date="1659" title={<>Gheorghe Ștefan deposto</>}>
              <Detail on={[Moldavia]}>
                Disobbedisce alla <N href="https://it.wikipedia.org/wiki/Sublime_Porta">Porta</N>{' '}
                mandando 2.000 uomini con{' '}
                <N href="https://it.wikipedia.org/wiki/Giorgio_II_Rákóczi">Rákóczi</N> in Polonia.{' '}
                <N href="https://it.wikipedia.org/wiki/Istanbul">Istanbul</N> lo sostituisce con{' '}
                <N href="https://ro.wikipedia.org/wiki/Gheorghe_Ghica">Gheorghe Ghica</N>.
              </Detail>
            </Event>
            <Context
              on={[Moldavia]}
              period="1660–1680"
              title="Il declino polacco e la svolta verso la Russia"
            >
              Dopo il <N href="https://it.wikipedia.org/wiki/Diluvio_(Polonia)">Diluvio</N>,
              concluso nel 1660, gli attacchi di svedesi,{' '}
              <N href="https://it.wikipedia.org/wiki/Cosacchi">cosacchi</N> e{' '}
              <N href="https://it.wikipedia.org/wiki/Tatari_di_Crimea">tatari</N> lasciano in rovina
              la <N href="https://it.wikipedia.org/wiki/Confederazione_polacco-lituana">Polonia</N>,
              che perde la sua influenza sui principati romeni. La Polonia e l’Ungheria cattoliche
              cercano comunque di controllare Moldavia e Valacchia ortodosse. I principati iniziano
              allora a guardare alla <N href="https://it.wikipedia.org/wiki/Impero_russo">Russia</N>
              , un alleato che sembra innocuo per distanza geografica e affine per religione.
            </Context>
          </Timeline>

          <Timeline
            on={[Dobrogea]}
            id="s-4-5"
            title={
              <>
                {regions.dobrogea} <Aside italic>{headings.part4DobrogeaDates}</Aside>
              </>
            }
          >
            <Context on={[Dobrogea]} period="XVI–XVII secolo" title="Una provincia di frontiera">
              La regione fa parte del{' '}
              <N href="https://it.wikipedia.org/wiki/Sangiaccato">sangiaccato</N> di{' '}
              <N href="https://it.wikipedia.org/wiki/Silistra">Silistra</N> (oggi in Bulgaria), dove
              risiede il pascià, ed è divisa in distretti (<i>kaza</i>) come{' '}
              <N href="https://it.wikipedia.org/wiki/Tulcea">Tulcea</N>,{' '}
              <N href="https://it.wikipedia.org/wiki/Isaccea">Isaccea</N>,{' '}
              <N href="https://it.wikipedia.org/wiki/Măcin">Măcin</N>,{' '}
              <N href="https://it.wikipedia.org/wiki/Hârșova">Hârșova</N> e{' '}
              <N href="https://it.wikipedia.org/wiki/Babadag">Babadag</N>. Per rafforzarla
              militarmente i sultani vi insediano tatari, con terre in cambio del servizio militare.
            </Context>
            <MocaniContext on={[Dobrogea]} />
            <Context on={[Dobrogea]} period="XVII–XVIII secolo" title="I lipoveni">
              Nel delta e nelle attuali province di Tulcea e Constanța si stabiliscono i{' '}
              <N href="https://it.wikipedia.org/wiki/Lipoveni">lipoveni</N>, Vecchi credenti russi
              in fuga dalle persecuzioni. Le fonti collocano il loro arrivo tra la seconda metà del
              Seicento e il Settecento.
            </Context>
          </Timeline>
        </Part>

        <Part
          on={[Transilvania, Valacchia, Moldavia, Dobrogea]}
          id="p-5"
          kicker={`Parte II · ${headings.part5Dates}`}
          title={headings.part5}
        >
          <Timeline on="always" id="s-5-1">
            <Event
              on={[Moldavia, Valacchia]}
              date="1711–1821"
              title={
                <>
                  Periodo <N href="https://it.wikipedia.org/wiki/Fanarioti">fanariota</N>
                </>
              }
            >
              <Detail on={[Moldavia, Valacchia]}>
                Dopo la <N href="https://it.wikipedia.org/wiki/Pace_del_Prut">pace del Prut</N> la{' '}
                <N href="https://it.wikipedia.org/wiki/Sublime_Porta">Porta</N> non lascia più
                eleggere i principi, in Moldavia dal 1711 e in Valacchia dal 1716:{' '}
                <N href="https://it.wikipedia.org/wiki/Moldavia_(regione_storica)">Moldavia</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N> vengono affidate a{' '}
                <N href="https://it.wikipedia.org/wiki/Ospodaro">ospodari</N> greci del{' '}
                <N href="https://it.wikipedia.org/wiki/Fanar">Fanar</N>. La fine del Settecento è
                considerata uno dei periodi più bui della storia romena, perché molti principi
                pensano soprattutto ad arricchirsi.
              </Detail>
            </Event>
            <Event
              on={[Moldavia, Valacchia]}
              date="1768–1774"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Guerra_russo-turca_(1768-1774)">
                    Guerra russo-turca
                  </N>
                </>
              }
            >
              <Detail on={[Moldavia, Valacchia]}>
                La <N href="https://it.wikipedia.org/wiki/Impero_russo">Russia</N> occupa{' '}
                <N href="https://it.wikipedia.org/wiki/Moldavia_(regione_storica)">Moldavia</N> e
                Valacchia per tutta la guerra e conquista{' '}
                <N href="https://it.wikipedia.org/wiki/Chotyn">Hotin</N> (oggi Chotyn, in Ucraina),{' '}
                <N href="https://it.wikipedia.org/wiki/Tighina">Tighina</N> (oggi in Moldova),{' '}
                <N href="https://it.wikipedia.org/wiki/Iași">Iași</N> e Bucarest. Con la{' '}
                <N href="https://it.wikipedia.org/wiki/Trattato_di_Küçük_Kaynarca">
                  pace di Küçük Kaynarca
                </N>{' '}
                del 1774 ottiene le terre tra{' '}
                <N href="https://it.wikipedia.org/wiki/Dnepr">Dnepr</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Bug_Meridionale">Bug</N>. I principati
                restano sotto sovranità ottomana, ma{' '}
                <N href="https://it.wikipedia.org/wiki/Caterina_II_di_Russia">Caterina II</N> si
                proclama protettrice dei cristiani dei principati.
              </Detail>
            </Event>
            <Event on={[Moldavia]} date="1787–1792" title={<>Il sogno della Dacia</>}>
              <Detail on={[Moldavia]}>
                <N href="https://it.wikipedia.org/wiki/Impero_russo">Russia</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Monarchia_asburgica">Austria</N> entrano in{' '}
                <N href="https://it.wikipedia.org/wiki/Guerra_russo-turca_(1787-1792)">
                  guerra con gli ottomani
                </N>
                . Caterina vuole creare per{' '}
                <N href="https://it.wikipedia.org/wiki/Grigorij_Aleksandrovič_Potëmkin">Potëmkin</N>{' '}
                un principato di{' '}
                <N href="https://it.wikipedia.org/wiki/Dacia_(regione_storica)">Dacia</N> vassallo
                della Russia. Il{' '}
                <N href="https://it.wikipedia.org/wiki/Trattato_di_Iași">trattato di Iași</N> del
                gennaio 1792 fissa il <N href="https://it.wikipedia.org/wiki/Dnestr">Dnestr</N> come
                confine russo-moldavo.
              </Detail>
            </Event>
            <Event
              on={[Moldavia, Valacchia]}
              date="1806–1812"
              title={<>Occupazione russa e pace di Bucarest</>}
            >
              {/* TODO verificare: Kutuzov fu comandante dell'armata del Danubio dal 1811; titolo di «governatore generale» incerto */}
              <Detail on={[Moldavia, Valacchia]}>
                Spinto da <N href="https://it.wikipedia.org/wiki/Napoleone_Bonaparte">Napoleone</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Alessandro_I_di_Russia">Alessandro I</N>{' '}
                occupa{' '}
                <N href="https://it.wikipedia.org/wiki/Moldavia_(regione_storica)">Moldavia</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N>, e{' '}
                <N href="https://it.wikipedia.org/wiki/Michail_Illarionovič_Kutuzov">Kutuzov</N> ne
                diventa governatore generale. La{' '}
                <N href="https://it.wikipedia.org/wiki/Trattato_di_Bucarest_(1812)">
                  pace firmata a Bucarest
                </N>{' '}
                nel 1812 dà alla Russia la Moldavia orientale: la{' '}
                <N href="https://it.wikipedia.org/wiki/Bessarabia">Bessarabia</N> con il{' '}
                <N href="https://it.wikipedia.org/wiki/Budžak">Budžak</N>.
              </Detail>
            </Event>
          </Timeline>

          <Timeline
            on={[Transilvania]}
            id="s-5-2"
            title={
              <>
                {regions.transilvania} <Aside italic>{headings.part5TransilvaniaDates}</Aside>
              </>
            }
          >
            <Event on={[Transilvania]} date="1688–1699" title={<>Dagli ottomani agli Asburgo</>}>
              <Detail on={[Transilvania]}>
                Nel 1688 la Dieta rinuncia alla sovranità ottomana e accetta la protezione
                austriaca. Nel 1699, con la{' '}
                <N href="https://it.wikipedia.org/wiki/Pace_di_Carlowitz">pace di Carlowitz</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Istanbul">Istanbul</N> riconosce il dominio{' '}
                <N href="https://it.wikipedia.org/wiki/Asburgo">asburgico</N>. Vienna conferma i
                privilegi dei nobili e le quattro religioni riconosciute, ma prende il controllo
                diretto della regione.
              </Detail>
            </Event>
            <Event on={[Transilvania]} date="1699–1701" title={<>L’Unione con Roma</>}>
              <Detail on={[Transilvania]}>
                I <N href="https://it.wikipedia.org/wiki/Compagnia_di_Gesù">gesuiti</N> promettono
                al clero ortodosso promozione sociale ed esenzione dalla servitù. Con i decreti di{' '}
                <N href="https://it.wikipedia.org/wiki/Leopoldo_I_d%27Asburgo">Leopoldo I</N> nasce
                la{' '}
                <N href="https://it.wikipedia.org/wiki/Chiesa_greco-cattolica_rumena">
                  Chiesa greco-cattolica romena
                </N>
                , che mantiene il rito ortodosso ma riconosce il{' '}
                <N href="https://it.wikipedia.org/wiki/Papa">papa</N>. Molti preti e fedeli
                rifiutano l’Unione.
              </Detail>
            </Event>
            <Context on={[Transilvania]} period="XVIII secolo" title="La condizione dei romeni">
              La maggioranza romena resta esclusa dalla politica e quasi tutta asservita. Per
              sposarsi, trasferirsi o fare un mestiere serve il permesso del signore. Gli ortodossi
              pagano la <N href="https://it.wikipedia.org/wiki/Decima">decima</N> alla Chiesa del
              proprietario, cattolica o protestante, e molti preti ortodossi vivono da contadini.
            </Context>
            <Event on={[Transilvania]} date="1711" title={<>Fine della rivolta di Rákóczi</>}>
              <Detail on={[Transilvania]}>
                Repressa la{' '}
                <N href="https://it.wikipedia.org/wiki/Guerra_d%27indipendenza_di_Rákóczi">
                  ribellione
                </N>{' '}
                di nobili e servi ungheresi, durata otto anni, l’
                <N href="https://it.wikipedia.org/wiki/Monarchia_asburgica">Austria</N> consolida il
                controllo sulla{' '}
                <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N>. La Chiesa
                greco-cattolica diventerà uno dei motori del nazionalismo romeno.
              </Detail>
            </Event>
            <Event
              on={[Transilvania]}
              date="1729–1744"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Inocențiu_Micu-Klein">
                    Inocențiu Micu-Klein
                  </N>
                </>
              }
            >
              <Detail on={[Transilvania]}>
                Il vescovo greco-cattolico, diventato barone e membro della Dieta, chiede parità per
                i romeni. Sostiene che pagano più tasse e danno più soldati di ogni altra nazione. I
                deputati lo deridono paragonando i romeni alle tarme nei vestiti. Klein ripara a
                Roma, dove muore nel 1768.
              </Detail>
            </Event>
            <Context
              on={[Transilvania]}
              period="XVIII secolo"
              title="Blaj e la rinascita culturale"
            >
              I preti greco-cattolici formati a Roma e a Vienna diffondono le idee occidentali e la
              tesi delle origini daco-romane (
              <N href="https://ro.wikipedia.org/wiki/Școala_Ardeleană">Scuola transilvana</N>).
              Adattano l’<N href="https://it.wikipedia.org/wiki/Alfabeto_latino">alfabeto latino</N>{' '}
              al romeno e pubblicano grammatiche e libri di preghiere.{' '}
              <N href="https://it.wikipedia.org/wiki/Blaj">Blaj</N>, sede della Chiesa
              greco-cattolica, diventa il centro culturale romeno.
            </Context>
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
                I servi, convinti di avere l’appoggio dell’imperatore, saccheggiano castelli e
                uccidono circa 100 nobili.{' '}
                <N href="https://it.wikipedia.org/wiki/Giuseppe_II_d%27Asburgo-Lorena">
                  Giuseppe II
                </N>{' '}
                amnistia i partecipanti, ma non i capi. Horea e Cloșca vengono suppliziati sulla
                ruota ad Alba Iulia nel febbraio 1785; Crișan si toglie la vita in carcere.
              </Detail>
            </Event>
            <Event on={[Transilvania]} date="1785–1790" title={<>Le riforme di Giuseppe II</>}>
              <Detail on={[Transilvania]}>
                L’imperatore abolisce la{' '}
                <N href="https://it.wikipedia.org/wiki/Servitù_della_gleba">servitù della gleba</N>,
                annulla la costituzione transilvana, scioglie l’
                <N href="https://it.wikipedia.org/wiki/Unio_Trium_Nationum">
                  Unione delle Tre Nazioni
                </N>{' '}
                e impone il tedesco come lingua ufficiale. Davanti al malcontento diffuso, poco
                prima di morire revoca molte riforme.
              </Detail>
            </Event>
            <Event on={[Transilvania]} date="1791" title={<>La petizione dei vescovi</>}>
              <Detail on={[Transilvania]}>
                Il vescovo ortodosso e quello greco-cattolico chiedono a{' '}
                <N href="https://it.wikipedia.org/wiki/Leopoldo_II_d%27Asburgo-Lorena">
                  Leopoldo II
                </N>{' '}
                diritti politici per i romeni, invocando la loro discendenza dai Romani. La
                petizione è nota come{' '}
                <N work href="https://ro.wikipedia.org/wiki/Supplex_Libellus_Valachorum">
                  Supplex Libellus Valachorum
                </N>
                . La Dieta concede soltanto la libertà di culto agli ortodossi e respinge la parità
                politica.
              </Detail>
            </Event>
          </Timeline>

          <Timeline
            on={[Valacchia]}
            id="s-5-3"
            title={
              <>
                {regions.valacchia} <Aside italic>{headings.part5ValacchiaDates}</Aside>
              </>
            }
          >
            <Event
              on={[Valacchia]}
              date="1688"
              title={
                <>
                  <N href="https://ro.wikipedia.org/wiki/Biblia_de_la_București">
                    La Bibbia di Bucarest
                  </N>
                </>
              }
            >
              <Detail on={[Valacchia]}>
                A <N href="https://it.wikipedia.org/wiki/Bucarest">Bucarest</N> viene stampata la
                prima traduzione completa della Bibbia in romeno.
              </Detail>
            </Event>
            <Event
              on={[Valacchia]}
              date="1688–1714"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Constantin_Brâncoveanu">
                    Constantin Brâncoveanu
                  </N>
                </>
              }
            >
              <Detail on={[Valacchia]}>
                Con i <N href="https://ro.wikipedia.org/wiki/Familia_Cantemir">Cantemir</N> in
                Moldavia, il principe spera nell’aiuto russo per cacciare gli ottomani dalle
                fortezze di confine come <N href="https://it.wikipedia.org/wiki/Kilija">Chilia</N>{' '}
                (oggi Kilija, in Ucraina) e{' '}
                <N href="https://it.wikipedia.org/wiki/Bilhorod-Dnistrovs%27kyj">Cetatea Albă</N>{' '}
                (oggi Bilhorod-Dnistrovs’kyj, in Ucraina). Non si arriva a un’intesa stabile.
              </Detail>
              <Detail on={[Valacchia]}>
                Nel 1714 viene deposto e decapitato a Istanbul insieme ai quattro figli. Il suo nome
                resta legato allo stile brâncovenesc, che vedi al monastero di Horezu e al palazzo
                di Mogoșoaia, vicino a Bucarest.
              </Detail>
            </Event>
            <Event
              on={[Valacchia]}
              date="1718–1739"
              title={
                <>
                  <N href="https://ro.wikipedia.org/wiki/Banatul_Craiovei">Il Banato di Craiova</N>
                </>
              }
            >
              <Detail on={[Valacchia]}>
                L’<N href="https://it.wikipedia.org/wiki/Oltenia">Oltenia</N>, la parte occidentale
                della Valacchia, passa all’
                <N href="https://it.wikipedia.org/wiki/Monarchia_asburgica">Austria</N> con il nome
                di Banato di Craiova. Nel 1739 torna agli ottomani.
              </Detail>
            </Event>
          </Timeline>

          <Timeline
            on={[Moldavia]}
            id="s-5-4"
            title={
              <>
                {regions.moldavia} <Aside italic>{headings.part5MoldaviaDates}</Aside>
              </>
            }
          >
            <Event
              on={[Moldavia]}
              date="1709–1710"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Carlo_XII_di_Svezia">Carlo XII</N> a{' '}
                  <N href="https://it.wikipedia.org/wiki/Tighina">Tighina</N>
                </>
              }
            >
              <Detail on={[Moldavia]}>
                Il re di Svezia, sconfitto a{' '}
                <N href="https://it.wikipedia.org/wiki/Battaglia_di_Poltava">Poltava</N>, si rifugia
                nella fortezza ottomana di Tighina (oggi in Moldova).{' '}
                <N href="https://it.wikipedia.org/wiki/Pietro_I_di_Russia">Pietro il Grande</N>{' '}
                arriva a <N href="https://it.wikipedia.org/wiki/Iași">Iași</N> nel 1710 e apre i
                negoziati.
              </Detail>
            </Event>
            <Event
              on={[Moldavia]}
              date="1711"
              title={
                <>
                  <N href="https://ro.wikipedia.org/wiki/Tratatul_de_la_Luțk">Trattato di Luc’k</N>
                </>
              }
            >
              <Detail on={[Moldavia]}>
                Il 24 aprile nasce la prima alleanza russo-moldava contro gli ottomani.{' '}
                <N href="https://it.wikipedia.org/wiki/Dimitrie_Cantemir">Dimitrie Cantemir</N> avrà
                un trono ereditario, il confine sarà il{' '}
                <N href="https://it.wikipedia.org/wiki/Dnestr">Dnestr</N>, il{' '}
                <N href="https://it.wikipedia.org/wiki/Budžak">Budžak</N> resterà moldavo e non si
                pagherà più tributo. I boiardi festeggiano lo zar come «salvatore della Moldavia».
              </Detail>
            </Event>
            <Event
              on={[Moldavia]}
              date="1711"
              title={
                <>
                  Stănilești e{' '}
                  <N href="https://it.wikipedia.org/wiki/Pace_del_Prut">pace del Prut</N>
                </>
              }
            >
              <Detail on={[Moldavia]}>
                L’esercito russo-moldavo è{' '}
                <N href="https://it.wikipedia.org/wiki/Battaglia_del_Prut">sconfitto sul Prut</N> e
                la pace del 21 luglio impone condizioni dure. I russi devono lasciare la Moldavia,
                che dovrà pagare il passaggio delle truppe ottomane. Cantemir, molti boiardi e gran
                parte dell’esercito fuggono in Russia.
              </Detail>
            </Event>
            <Event
              on={[Moldavia]}
              date="Dopo il 1711"
              title={
                <>
                  Il <N href="https://it.wikipedia.org/wiki/Sangiaccato">sangiaccato</N> di Hotin
                </>
              }
            >
              <Detail on={[Moldavia]}>
                Gli ottomani ricostruiscono la{' '}
                <N href="https://it.wikipedia.org/wiki/Fortezza_di_Chotyn">fortezza di Hotin</N> con
                ingegneri francesi e ne fanno un sangiaccato di circa cento villaggi. La Moldavia è
                ora circondata da fortezze ottomane:{' '}
                <N href="https://it.wikipedia.org/wiki/Chotyn">Hotin</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Tighina">Tighina</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Bilhorod-Dnistrovs%27kyj">Cetatea Albă</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Kilija">Chilia</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Izmajil">Ismail</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Reni_(Ucraina)">Reni</N>, tutte oggi tra
                Ucraina e Moldova.
              </Detail>
            </Event>
            <Context
              on={[Moldavia]}
              period="XVIII secolo"
              title="Contadini in fuga verso la Moldavia"
            >
              Contadini <N href="https://it.wikipedia.org/wiki/Ruteni">ruteni</N> senza terra, in
              fuga dalla servitù in Polonia e Rutenia, si stabiliscono intorno a{' '}
              <N href="https://it.wikipedia.org/wiki/Chotyn">Hotin</N> (oggi Chotyn, in Ucraina),{' '}
              <N href="https://it.wikipedia.org/wiki/Chișinău">Chișinău</N> (oggi capitale della
              Moldova) e <N href="https://it.wikipedia.org/wiki/Černivci">Cernăuți</N> (oggi
              Černivci, in Ucraina). Dopo il 1749 la Moldavia diventa ancora più attraente per loro:
              in Polonia i servi devono 150 giorni di lavoro gratuito all’anno.
            </Context>
            <Event on={[Moldavia]} date="1741" title={<>Gli ussari moldavi</>}>
              <Detail on={[Moldavia]}>
                Il 14 ottobre, dopo la{' '}
                <N href="https://it.wikipedia.org/wiki/Guerra_russo-turca_(1735-1739)">
                  guerra del 1735–1739
                </N>
                , i moldavi al servizio della Russia formano il 96° Reggimento{' '}
                <N href="https://it.wikipedia.org/wiki/Ussaro">ussari</N>, guidato da un principe
                Cantemir. Il reggimento combatte contro la Svezia e, nella{' '}
                <N href="https://it.wikipedia.org/wiki/Guerra_dei_sette_anni">
                  guerra dei sette anni
                </N>
                , a{' '}
                <N href="https://it.wikipedia.org/wiki/Battaglia_di_Gross-Jägersdorf">
                  Gross-Jägersdorf
                </N>
                , <N href="https://it.wikipedia.org/wiki/Battaglia_di_Zorndorf">Zorndorf</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Battaglia_di_Kunersdorf">Kunersdorf</N>, e
                alla presa di Berlino nel 1760.
              </Detail>
            </Event>
            <Event on={[Moldavia]} date="1749" title={<>Abolizione della servitù</>}>
              <Detail on={[Moldavia]}>
                Il principe fanariota{' '}
                <N href="https://ro.wikipedia.org/wiki/Constantin_Mavrocordat">
                  Constantin Mavrocordat
                </N>{' '}
                riunisce i boiardi nella{' '}
                <N href="https://ro.wikipedia.org/wiki/Mănăstirea_Sfinții_Trei_Ierarhi_din_Iași">
                  chiesa dei Tre Gerarchi
                </N>{' '}
                a <N href="https://it.wikipedia.org/wiki/Iași">Iași</N> e abolisce la{' '}
                <N href="https://it.wikipedia.org/wiki/Servitù_della_gleba">servitù della gleba</N>.
                Tre anni prima aveva fatto lo stesso in Valacchia.
              </Detail>
            </Event>
            <Event
              on={[Moldavia]}
              date="1775–1777"
              title={
                <>
                  La perdita della <N href="https://it.wikipedia.org/wiki/Bucovina">Bucovina</N>
                </>
              }
            >
              <Detail on={[Moldavia]}>
                L’Austria di{' '}
                <N href="https://it.wikipedia.org/wiki/Maria_Teresa_d%27Austria">Maria Teresa</N>{' '}
                occupa il nord della Moldavia, con l’antica capitale{' '}
                <N href="https://it.wikipedia.org/wiki/Suceava">Suceava</N> e il monastero di Putna,
                dove è sepolto{' '}
                <N href="https://it.wikipedia.org/wiki/Stefano_III_il_Grande">Stefano il Grande</N>,
                e la <N href="https://it.wikipedia.org/wiki/Sublime_Porta">Porta</N> lo accetta.
                L’ospodaro{' '}
                <N href="https://ro.wikipedia.org/wiki/Grigore_al_III-lea_Ghica">
                  Grigore III Ghica
                </N>{' '}
                protesta e nel 1777 viene ucciso a Iași.
              </Detail>
            </Event>
            <Context on={[Moldavia]} period="1775 e oltre" title="La Bucovina austriaca">
              Nel 1775 la regione conta 75.000 romeni e 12.000 tra ruteni, ebrei e polacchi. Annessa
              alla <N href="https://it.wikipedia.org/wiki/Regno_di_Galizia_e_Lodomiria">Galizia</N>,
              attira coloni ucraini, tedeschi, ungheresi, ebrei e armeni con terre gratuite ed
              esenzioni fiscali.
            </Context>
            <Event
              on={[Moldavia]}
              date="1812–1818"
              title={
                <>
                  La <N href="https://it.wikipedia.org/wiki/Bessarabia">Bessarabia</N> russa
                </>
              }
            >
              <Detail on={[Moldavia]}>
                Lo statuto di colonizzazione del 26 giugno 1812 porta bulgari,{' '}
                <N href="https://it.wikipedia.org/wiki/Gagauzi">gagauzi</N>, tedeschi, ebrei,
                svizzeri e francesi. Lo Statuto concesso da{' '}
                <N href="https://it.wikipedia.org/wiki/Alessandro_I_di_Russia">Alessandro I</N> nel
                1818 a <N href="https://it.wikipedia.org/wiki/Chișinău">Chișinău</N> (oggi capitale
                della Moldova) dà alla provincia una certa autonomia, con il romeno accanto al russo
                nell’amministrazione. Migliaia di famiglie fuggono oltre il{' '}
                <N href="https://it.wikipedia.org/wiki/Prut">Prut</N> temendo la servitù, che alla
                fine non viene introdotta.
              </Detail>
            </Event>
            <Context on={[Moldavia]} period="1816" title="Il censimento della Bessarabia">
              Secondo il censimento russo i romeni sono il 92,5% su circa 480.000 abitanti, con
              minoranze ucraina, ebraica, tedesca e{' '}
              <N href="https://it.wikipedia.org/wiki/Lipoveni">lipovena</N>. La colonizzazione
              zarista ridurrà questa quota fino al 1918, quando la regione smette di essere russa.
            </Context>
          </Timeline>

          <Timeline
            on={[Dobrogea]}
            id="s-5-5"
            title={
              <>
                {regions.dobrogea} <Aside italic>{headings.part5DobrogeaDates}</Aside>
              </>
            }
          >
            <Event
              on={[Dobrogea]}
              date="1775–1828"
              title={
                <>
                  La <N href="https://en.wikipedia.org/wiki/Danubian_Sich">Sič danubiana</N>
                </>
              }
            >
              <Detail on={[Dobrogea]}>
                Dopo la distruzione della{' '}
                <N href="https://it.wikipedia.org/wiki/Sič_di_Zaporižžja">Sič di Zaporož’e</N>,
                cosacchi zaporoghi si rifugiano nel delta, sotto la protezione del sultano.
                Sconfiggono i cosacchi nekrasoviani, anch’essi rifugiati in Dobrogea, e ne prendono
                il centro, Dunavățu de Sus. La loro ultima Sič, a Dunavăț, dura dal 1814 al 1828. I
                loro discendenti vivono ancora nel delta.
              </Detail>
            </Event>
            <Event
              on={[Dobrogea]}
              date="1791"
              title={
                <>
                  <N href="https://en.wikipedia.org/wiki/Battle_of_M%C4%83cin">
                    Battaglia di Măcin
                  </N>
                </>
              }
            >
              <Detail on={[Dobrogea]}>
                Il 9 luglio i circa 30.000 russi di{' '}
                <N href="https://it.wikipedia.org/wiki/Nikolaj_Vasil%27evič_Repnin">Repnin</N>, con{' '}
                <N href="https://it.wikipedia.org/wiki/Michail_Illarionovič_Kutuzov">Kutuzov</N>,
                battono un esercito ottomano molto più numeroso. La sconfitta porta alla tregua di{' '}
                <N href="https://it.wikipedia.org/wiki/Galați">Galați</N> del 31 luglio, poi alla{' '}
                <N href="https://it.wikipedia.org/wiki/Trattato_di_Iași">pace di Iași</N>.
              </Detail>
            </Event>
            <Event on={[Dobrogea]} date="1809–1810" title="Le fortezze del Danubio">
              <Detail on={[Dobrogea]}>
                I russi passano il Danubio e prendono Isaccea e Tulcea senza combattere, poi Măcin e
                Hârșova. Silistra (oggi in Bulgaria) si arrende il 30 maggio 1810.
              </Detail>
            </Event>
            <Event on={[Dobrogea]} date="1812" title="Il Danubio diventa frontiera">
              <Detail on={[Dobrogea]}>
                Con la{' '}
                <N href="https://it.wikipedia.org/wiki/Trattato_di_Bucarest_(1812)">
                  pace di Bucarest
                </N>{' '}
                la Dobrogea resta ottomana, ma sull’altra riva del Danubio ora c’è la{' '}
                <N href="https://it.wikipedia.org/wiki/Bessarabia">Bessarabia</N> russa.
              </Detail>
            </Event>
          </Timeline>
        </Part>

        <Callout on="always" kind="remember">
          <Text on="always">
            Durante l’età moderna il territorio dell’attuale Romania rimase diviso. La Transilvania
            passò dall’influenza ottomana a quella asburgica. Valacchia e Moldavia conservarono una
            propria amministrazione sotto la sovranità ottomana, con una crescente influenza russa.
            La Dobrogea fu invece una provincia ottomana a tutti gli effetti. La Romania come Stato
            unitario non esisteva ancora.
          </Text>
        </Callout>
      </Chapter>
    </>
  )
}

/**
 * Context card shared by Valacchia and Moldavia: at the top of the Valacchia part, and of the
 * Moldavia part when Valacchia is not in the trip (so it is never shown twice).
 */
function BoyarsContext({ on }: { on: Romania[] }) {
  return (
    <Context on={on} period="Dopo il 1601" title="Boiardi, servi e troni in vendita">
      In <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N> e{' '}
      <N href="https://it.wikipedia.org/wiki/Moldavia_(regione_storica)">Moldavia</N> quasi tutte le
      terre sono già state concesse ai <N href="https://it.wikipedia.org/wiki/Boiari">boiardi</N> in
      cambio del servizio militare. I boiardi cominciano allora a impossessarsi delle terre dei
      contadini e la{' '}
      <N href="https://it.wikipedia.org/wiki/Servitù_della_gleba">servitù della gleba</N> si
      estende. Chi aspira al trono deve comprarlo con somme enormi e poi rifarsi tassando i
      contadini. Pochi principi muoiono di morte naturale.
    </Context>
  )
}

/**
 * Context card shared by Dobrogea and Transilvania: in the Dobrogea section, and in the
 * Transilvania one when Dobrogea is not in the trip (so it is never shown twice).
 */
function MocaniContext({ on }: { on: Romania[] }) {
  return (
    <Context on={on} period="Dal 1662" title="I mocani">
      Pastori romeni della <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N>, i{' '}
      <N href="https://ro.wikipedia.org/wiki/Mocani">mocani</N>, portano le greggi a svernare in
      Dobrogea: sono attestati già nel 1662. Molti vi si stabiliscono, perché nella provincia
      ottomana hanno più libertà e più terra. Vi arrivano anche contadini di Valacchia e Moldavia in
      fuga da tasse e corvée.
    </Context>
  )
}
