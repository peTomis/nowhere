import { guideKit } from '@/components/guide/content'
import type { GuideContent } from '@/content/types'
import { Ro, RoSection, structure } from '../structure'
import { names } from './names'

const dir = '/guides/romania'

/** Images whose author and licence are not recorded yet: the validator lists them as warnings. */
const creditToVerify = { unverified: 'author and licence to record' }

const {
  Callout,
  Chapter,
  Context,
  D,
  Detail,
  Event,
  Emblem,
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
} = guideKit(structure, names)

const { Dobruja, Moldavia, Transylvania, Wallachia } = Ro

export const romania: GuideContent<Ro, RoSection> = {
  structure,
  names,
  cover: {
    src: `${dir}/cover.jpg`,
    alt: 'Il castello di Bran al tramonto',
    credit: creditToVerify,
  },
  /** Country name and nowhere logo on the cover. */
  coverInk: 'var(--color-text)',
  emblems: [
    {
      src: `${dir}/coat-of-arms.png`,
      credit: creditToVerify,
      alt: 'Stemma della Romania',
      kind: 'coat-of-arms',
      width: 480,
      height: 695,
    },
    {
      src: `${dir}/flag.svg`,
      credit: creditToVerify,
      alt: 'Bandiera della Romania',
      kind: 'flag',
      width: 72,
      height: 48,
    },
  ],
  body: <Body />,
}

function Body() {
  return (
    <>
      <Chapter
        section={RoSection.Emblems}
        lede="I simboli che vedi su edifici pubblici, monete e passaporti."
      >
        <Part section={RoSection.Flag}>
          <Emblem kind="flag" on="always" />
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

        <Part section={RoSection.CoatOfArms}>
          <Emblem kind="coat-of-arms" on="always" />
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

      <Chapter section={RoSection.History} lede="Le regioni, i popoli e le date.">
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
          credit={creditToVerify}
          alt="Cartina della Romania con le regioni storiche"
          ratio="666/400"
          places={[]}
        />

        <Part section={RoSection.DaciaToHungarians}>
          <Timeline section={RoSection.DaciaAndRome}>
            <Event on="always" title={<>Geti e Daci</>}>
              <Detail on="always">
                Discendenti dai <N href="https://it.wikipedia.org/wiki/Traci">Traci</N>, popolazioni
                indoeuropee dei Balcani. Dei <N href="https://it.wikipedia.org/wiki/Geti">Geti</N>{' '}
                si parla già nel VI secolo a.C., dei{' '}
                <N href="https://it.wikipedia.org/wiki/Daci">Daci</N> solo dal I secolo a.C.
              </Detail>
              <Detail on={[Wallachia, Transylvania]}>
                Probabilmente lo stesso popolo ma in due zone geografiche diverse: i{' '}
                <N href="https://it.wikipedia.org/wiki/Geti">Geti</N> tra il Danubio e il Mar Nero,
                a contatto con i Greci, i <N href="https://it.wikipedia.org/wiki/Daci">Daci</N> a
                nord, nei Carpazi della Transilvania, a contatto con i Celti.
              </Detail>
              <Detail on="always">
                Entrambi i popoli vivono in tribù, con insediamenti fortificati, élite
                aristocratiche e tradizioni religiose.
              </Detail>
            </Event>
            <Event on="always" date="I sec. a.C." title={<>Il regno dacico</>}>
              <Detail on="always">
                <D>82–44 a.C.</D> <N href="https://it.wikipedia.org/wiki/Burebista">Burebista</N>,
                re dei Geti e dei Daci, riunisce sotto il suo potere le tribù della regione.
              </Detail>
              <Detail on={[Wallachia, Transylvania]}>
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
                Decebalo. È il principale centro politico, religioso e artigianale del regno.
              </Detail>
              <Detail on="always">
                Con altre cinque fortezze dei monti Orăștie fa parte del{' '}
                <N href="https://it.wikipedia.org/wiki/Fortezze_dacie_dei_monti_Orăștie">
                  patrimonio mondiale dell’UNESCO
                </N>
                .
              </Detail>
            </Event>
            <Event on="always" date="101–106" title="Traiano conquista la Dacia">
              <Detail on="always">
                <N>Decebalo</N>, ultimo sovrano della Dacia, è sconfitto da <N>Traiano</N> e si
                toglie la vita.
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
            <Event on="always" date="271–275" title="Roma si ritira dalla Dacia">
              <Detail on="always">
                Sotto <N href="https://it.wikipedia.org/wiki/Aureliano">Aureliano</N> l’esercito e
                l’amministrazione imperiale lasciano la provincia a nord del Danubio. Che cosa
                faccia la popolazione civile è discusso (vedi sotto).
              </Detail>
              <Detail on="always">
                Resta nell’Impero la <N href="https://it.wikipedia.org/wiki/Dobrogea">Dobrogea</N>,
                tra il Danubio e il Mar Nero, che non fa parte della Dacia ma della{' '}
                <N href="https://it.wikipedia.org/wiki/Mesia">Mesia</N>.
              </Detail>
            </Event>
          </Timeline>

          <Callout
            on={[Transylvania]}
            kind="debate"
            title="Dopo il ritiro romano, dove si continua a parlare latino?"
          >
            <Positions>
              <Position on={[Transylvania]} title="Continuità a nord del Danubio">
                Formulata nel Settecento da Inocențiu Micu-Klein e dagli eruditi della Scuola
                transilvana, sostenuta dalla maggior parte degli storici romeni: una popolazione
                latinofona resta nell’ex provincia e lì si forma il romeno.
              </Position>
              <Position on={[Transylvania]} title="Formazione a sud del Danubio">
                Formulata nel 1871 dall’austriaco <N>Eduard Robert Roesler</N> e ripresa poi da gran
                parte della storiografia ungherese: il romeno si forma nelle province a sud del
                Danubio e i valacchi arrivano a nord del Danubio più tardi, fra XII e XIII secolo.
              </Position>
            </Positions>
            <Note on={[Transylvania]}>
              Tre cose vanno tenute distinte. Gli scavi mostrano abitati nell’ex provincia anche
              dopo il 275, ma non dicono che lingua vi si parlasse. Fra il IV e il XII secolo le
              fonti scritte sulla regione sono quasi assenti. I valacchi a nord del Danubio
              compaiono nei documenti del Regno d’Ungheria dall’inizio del XIII secolo, e il romeno
              scritto solo nel Cinquecento. Nessuna delle due tesi è dimostrata. Il dibattito ha
              pesato sulle contese tra Romania e Ungheria per la Transilvania.
            </Note>
          </Callout>

          <Timeline section={RoSection.MigrationPeriod}>
            <Event
              on={[Wallachia, Moldavia, Transylvania]}
              date="290–568"
              title="Goti, Unni, Gepidi e Avari"
            >
              <Detail on={[Wallachia, Moldavia]}>
                <D>290</D> I <N href="https://it.wikipedia.org/wiki/Goti">Goti</N> (Germani
                dell’Est) dominano Moldavia e Valacchia. <D>376</D> Gli{' '}
                <N href="https://it.wikipedia.org/wiki/Unni">Unni</N> li sconfiggono.
              </Detail>
              <Detail on={[Transylvania]}>
                <D>454</D> I <N href="https://it.wikipedia.org/wiki/Gepidi">Gepidi</N> (Germani
                imparentati con i Goti) dominano{' '}
                <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Banato">Banato</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Crișana">Crișana</N>. <D>568</D> Gli{' '}
                <N href="https://it.wikipedia.org/wiki/Avari">Avari</N>, nomadi di origine incerta,
                li sottomettono.
              </Detail>
            </Event>
            <Context on={[Dobruja]} period="IV–VII secolo" title="La Dobrogea romana e bizantina">
              Alla fine del III secolo, con le riforme di{' '}
              <N href="https://it.wikipedia.org/wiki/Diocleziano">Diocleziano</N>, la regione fra il
              Danubio e il Mar Nero diventa la provincia di{' '}
              <N href="https://en.wikipedia.org/wiki/Scythia_Minor">Scizia Minore</N>, con capitale
              Tomis (oggi <N href="https://it.wikipedia.org/wiki/Costanza_(Romania)">Constanța</N>).
              Resta all’Impero romano d’Oriente fino al VII secolo, come avamposto di Costantinopoli
              alle foci del Danubio. Gli scavi di Tomis, di{' '}
              <N href="https://it.wikipedia.org/wiki/Histria">Histria</N>, antica colonia greca, e
              di Tropaeum Traiani, città sorta accanto al trofeo eretto da Traiano nel 109, mostrano
              come vi si diffonde il cristianesimo. Ad{' '}
              <N href="https://it.wikipedia.org/wiki/Adamclisi">Adamclisi</N> si vede oggi una
              ricostruzione del trofeo.
            </Context>
            <Event
              on={[Dobruja]}
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
              <Detail on={[Dobruja]}>
                <D>864–865</D> La Bulgaria si converte al{' '}
                <N href="https://it.wikipedia.org/wiki/Cristianizzazione_della_Bulgaria">
                  cristianesimo
                </N>
                .
              </Detail>
            </Event>
            <Context on="always" period="Dal VI secolo" title="Slavi e slavone">
              Dal VI secolo le fonti scritte segnalano gruppi di Slavi lungo il Danubio. Il contatto
              fra le lingue parlate lascia nel romeno, lingua romanza, molte parole slave, fra cui
              termini religiosi arrivati dal greco attraverso lo slavo. Cosa diversa è lo{' '}
              <N href="https://it.wikipedia.org/wiki/Lingua_slava_ecclesiastica">slavone</N>, la
              lingua scritta della Chiesa bulgara: in Valacchia e Moldavia diventa la lingua della
              liturgia e delle cancellerie. Il romeno lo sostituisce nei documenti dal Cinquecento e
              nella liturgia solo nell’Ottocento.
            </Context>
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
              <Detail on={[Transylvania]}>
                Secondo le Gesta Hungarorum in Crișana vivono già i{' '}
                <N href="https://it.wikipedia.org/wiki/Siculi_(Transilvania)">Siculi</N> (Székely),
                che si uniscono a loro.
              </Detail>
              <Source on={[Transylvania]}>
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

        <Part section={RoSection.Principalities}>
          <Timeline on="always">
            <Event on={[Dobruja]} date="971–1185" title="La Dobrogea torna bizantina">
              <Detail on={[Dobruja]}>
                <D>971</D> L’imperatore{' '}
                <N href="https://it.wikipedia.org/wiki/Giovanni_I_Zimisce">Giovanni Zimisce</N>{' '}
                respinge i Rus’ di Svjatoslav e conquista la Bulgaria orientale. Presidia la
                Dobrogea e il delta con truppe bizantine, restaura le fortezze del Danubio, fra cui
                Dristra (oggi <N href="https://it.wikipedia.org/wiki/Silistra">Silistra</N>, in
                Bulgaria), Isaccea, Dinogetia e Capidava, e ne costruisce di nuove, come quella di
                Păcuiul lui Soare. Le fonti bizantine chiameranno la provincia Paristrion.
              </Detail>
              <Detail on={[Dobruja]}>
                <D>1027–1091</D> I <N href="https://it.wikipedia.org/wiki/Peceneghi">Peceneghi</N>,
                nomadi delle steppe, attraversano più volte il Danubio. Dal 1045 gruppi di loro
                ottengono di stabilirsi nella regione in cambio della difesa del confine. Nel 1091
                l’esercito bizantino li sconfigge definitivamente.
              </Detail>
              <Detail on={[Dobruja]}>
                Alla fine dell’XI secolo arrivano i{' '}
                <N href="https://it.wikipedia.org/wiki/Cumani">Cumani</N>, altri nomadi delle
                steppe: saccheggiano la regione a più riprese, e una parte di loro vi si stabilisce.
              </Detail>
              <Detail on={[Dobruja]}>
                <D>1185</D> Una rivolta contro Bisanzio fa nascere il{' '}
                <N href="https://it.wikipedia.org/wiki/Secondo_Impero_bulgaro">
                  Secondo Impero bulgaro
                </N>{' '}
                sulle terre della vecchia provincia danubiana. Il controllo bizantino sulla regione
                finisce nell’ultimo quarto del secolo.
                {/* TODO verificare: cosa si vede oggi delle fortezze bizantine (Capidava, Dinogetia, Păcuiul lui Soare) e come si visitano. */}
              </Detail>
            </Event>
            <Event
              on={[Transylvania]}
              date="1003 ca."
              title={
                <>
                  Spedizione di Stefano I d’Ungheria in{' '}
                  <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N>
                </>
              }
            >
              <Detail on={[Transylvania]}>
                Intorno al 1003{' '}
                <N href="https://it.wikipedia.org/wiki/Stefano_I_d%27Ungheria">
                  Stefano I d’Ungheria
                </N>{' '}
                porta le sue truppe in Transilvania. Il controllo del regno sulla regione si
                consolida nei due secoli successivi.
              </Detail>
              <Detail on={[Transylvania]}>
                Dalla fine del XII secolo è governata da un{' '}
                <N href="https://it.wikipedia.org/wiki/Voivodato">voivoda</N>. Il{' '}
                <N href="https://it.wikipedia.org/wiki/Banato">Banato</N> e la{' '}
                <N href="https://it.wikipedia.org/wiki/Crișana">Crișana</N> restano invece comitati
                governati direttamente dal re.
              </Detail>
            </Event>
            <Event
              on={[Transylvania]}
              date="1150"
              title={
                <>
                  Coloni sassoni in{' '}
                  <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N>
                </>
              }
            >
              <Detail on={[Transylvania]}>
                Il re d’Ungheria invita coloni tedeschi, fiamminghi e valloni, poi chiamati{' '}
                <N href="https://it.wikipedia.org/wiki/Sassoni">sassoni</N>, a popolare e difendere
                la frontiera orientale. Nel 1224 il <N work>Diploma Andreanum</N> garantisce loro
                ampie autonomie.
              </Detail>
            </Event>
            <Event
              on={[Transylvania]}
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
              <Detail on={[Transylvania]}>
                Dopo la ritirata dei mongoli i re d’Ungheria spingono nobili e città a costruire
                fortificazioni in pietra.
              </Detail>
              <Detail on={[Transylvania]}>
                Castelli, mura cittadine e chiese fortificate si costruiscono e si ampliano in più
                fasi, dal XIII al XVI secolo. Sette villaggi con chiese fortificate, fra cui Biertan
                e Viscri, sono patrimonio dell’UNESCO.
              </Detail>
            </Event>
            <Event
              on={[Wallachia]}
              date="1310 ca."
              title={
                <>
                  Nasce il principato di{' '}
                  <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N>
                </>
              }
            >
              <Detail on={[Wallachia]}>
                Istituito da <N href="https://it.wikipedia.org/wiki/Basarab_I">Basarab I</N>.
              </Detail>
              <Detail on={[Wallachia]}>
                Nel 1330 sconfigge Carlo I d’Ungheria a Posada e rende la Valacchia indipendente.
              </Detail>
              <Detail on={[Wallachia]}>
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
            <Context on={[Wallachia, Moldavia]} period="Dal 1385" title="La schiavitù dei rom">
              Il primo documento che nomina i{' '}
              <N href="https://it.wikipedia.org/wiki/Rom_(popolo)">rom</N> in Valacchia è del 1385:
              il principe <N href="https://it.wikipedia.org/wiki/Dan_I_di_Valacchia">Dan I</N>{' '}
              conferma al monastero di Tismana quaranta famiglie di «ațigani» appartenute al
              monastero di Vodița. In Valacchia e Moldavia i rom sono schiavi: il principe, i
              monasteri e i boiardi possono possederli, donarli, lasciarli in eredità e venderli. Le
              riforme del Settecento sulla servitù dei contadini non li riguardano: la schiavitù dei
              rom è ancora in vigore nel 1818 e viene abolita solo nel 1855–1856.
            </Context>
            <Event on={[Dobruja]} date="XIV sec." title="Nasce la Dobrogea">
              <Detail on={[Dobruja]}>
                Dopo il dominio mongolo, nella regione tra il Danubio e il Mar Nero si forma un
                piccolo principato legato a Bisanzio. Il suo signore Dobrotitsa le dà il nome. Nel
                1390 la conquista{' '}
                <N href="https://it.wikipedia.org/wiki/Mircea_il_Vecchio">Mircea il Vecchio</N>, nel
                1395 la occupano gli ottomani.
              </Detail>
            </Event>
          </Timeline>
        </Part>

        <Part section={RoSection.LateMiddleAges}>
          <Timeline on="always">
            <Event on={[Dobruja]} date="1416–1420" title="La Dobrogea diventa ottomana">
              <Detail on={[Dobruja]}>
                Dopo un periodo sotto{' '}
                <N href="https://it.wikipedia.org/wiki/Mircea_il_Vecchio">Mircea il Vecchio</N>, la
                regione passa agli ottomani: gli storici indicano il 1416, il 1417 o il 1420. Le
                bocche del <N href="https://it.wikipedia.org/wiki/Danubio">Danubio</N>, con{' '}
                <N href="https://it.wikipedia.org/wiki/Kilija">Chilia</N> (oggi Kilija, in Ucraina),
                restano a Valacchia e Moldavia fino al 1484.
              </Detail>
              <Detail on={[Dobruja]}>
                A differenza di Valacchia e Moldavia non diventa uno Stato vassallo ma una provincia
                ottomana, e lo resterà fino al 1878.
              </Detail>
            </Event>
            <Event
              on={[Wallachia]}
              date="1417"
              title="La Valacchia diventa vassalla degli ottomani"
            >
              <Detail on={[Wallachia]}>
                <N href="https://it.wikipedia.org/wiki/Mircea_il_Vecchio">Mircea il Vecchio</N>{' '}
                accetta di pagare un tributo, ma la{' '}
                <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N> mantiene la propria
                autonomia.
              </Detail>
            </Event>
            <Event
              on={[Transylvania]}
              date="1437"
              title="Nobiltà, siculi e sassoni stringono un’alleanza"
            >
              <Detail on={[Transylvania]}>
                Durante la{' '}
                <N href="https://it.wikipedia.org/wiki/Rivolta_di_Bobâlna">rivolta di Bobâlna</N>,
                la nobiltà, i siculi e i sassoni di{' '}
                <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N> si promettono
                aiuto reciproco contro i contadini ribelli. Il patto, rinnovato nel 1438, è
                l’origine dell’
                <N href="https://it.wikipedia.org/wiki/Unio_Trium_Nationum">
                  Unione delle Tre Nazioni
                </N>
                .
              </Detail>
              <Detail on={[Transylvania]}>
                Le tre <i>nationes</i> non sono popoli in senso moderno, ma corpi politici definiti
                da privilegi. Singole famiglie di origine romena possono entrare nella nobiltà, e
                spesso ne adottano lingua e confessione. La popolazione romena ortodossa resta però
                senza una rappresentanza collettiva: è la questione che tornerà nelle petizioni del
                Settecento.
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
            <Event on={[Wallachia]} date="1512–1521" title="Neagoe Basarab e Curtea de Argeș">
              <Detail on={[Wallachia]}>
                Nel 1517 <N href="https://it.wikipedia.org/wiki/Basarab_V_Neagoe">Neagoe Basarab</N>{' '}
                fa consacrare la chiesa del monastero di Curtea de Argeș, pensata come necropoli
                della sua famiglia. Alla fine dell’Ottocento Carol I ne fa la necropoli dei re di
                Romania: nella chiesa si trovano le tombe di Carol I e Ferdinando I e delle loro
                regine.
                {/* Restoration works on the church until April 2028 (Adevărul, Dec. 2024): check access before publishing. */}
              </Detail>
              <Detail on={[Wallachia]}>
                A Neagoe sono attribuiti gli <N work>Insegnamenti al figlio Teodosio</N>, consigli
                sul governo scritti in slavone. Gli studiosi discutono se ne sia davvero l’autore.
              </Detail>
            </Event>
            <Event on={[Transylvania]} date="1514" title="La ribellione di György Dózsa">
              <Detail on={[Transylvania]}>
                I contadini, guidati da{' '}
                <N href="https://it.wikipedia.org/wiki/György_Dózsa">György Dózsa</N>, si ribellano
                e vengono sconfitti a{' '}
                <N href="https://it.wikipedia.org/wiki/Timișoara">Timișoara</N>. La repressione è
                durissima: la Dieta del 1514 vincola per sempre i contadini alla terra.
              </Detail>
            </Event>
            <Event on={[Wallachia, Transylvania]} date="1521" title="La lettera di Neacșu">
              <Detail on={[Wallachia, Transylvania]}>
                Da <N href="https://it.wikipedia.org/wiki/Câmpulung">Câmpulung</N>, in Valacchia, il
                mercante Neacșu avverte Hans Benkner, giudice di{' '}
                <N href="https://it.wikipedia.org/wiki/Brașov">Brașov</N>, dei movimenti delle
                truppe ottomane sul Danubio. Le due città commerciano attraverso i Carpazi, e un
                attacco minaccerebbe entrambe.
              </Detail>
              <Detail on={[Wallachia, Transylvania]}>
                Neacșu scrive in romeno con l’alfabeto cirillico, con formule di apertura e chiusura
                in slavone. È il più antico documento in romeno giunto fino a noi di cui si conosca
                la data.
              </Detail>
            </Event>
            <Event on="always" date="1526–1538" title="Frattura del Regno d’Ungheria">
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
              <Detail on={[Transylvania]}>
                <D>1538</D> Con il{' '}
                <N href="https://it.wikipedia.org/wiki/Trattato_di_Gran_Varadino">
                  trattato di Gran Varadino
                </N>{' '}
                i due re si dividono l’Ungheria. Giovanni, che non ha figli, promette la successione
                agli Asburgo.
              </Detail>
            </Event>
            <Event on={[Moldavia]} date="1530–1537" title="Petru Rareș e le chiese dipinte">
              <Detail on={[Moldavia]}>
                <N href="https://it.wikipedia.org/wiki/Petru_Rareș">Petru Rareș</N>, figlio naturale
                di Stefano il Grande, regna in Moldavia dal 1527 al 1538 e di nuovo dal 1541 al
                1546. Nel 1530 ricostruisce la chiesa del monastero di Probota, destinata a
                necropoli: vi è sepolto con la moglie Elena. Nel 1532 fa costruire la chiesa di
                Moldovița.
              </Detail>
              <Detail on={[Moldavia]}>
                Durante il suo regno le facciate di queste e di altre chiese, come Humor, si coprono
                di affreschi. A Moldovița un’iscrizione data le pitture al 1537.
              </Detail>
              <Detail on={[Moldavia]}>
                In molte di queste chiese l’Inno acatisto dipinto sulle facciate si chiude con la
                scena dell’Assedio di Costantinopoli. A Moldovița è la meglio conservata: si trova
                sulla facciata sud, in basso, sotto le finestre del pronao.
              </Detail>
              <Detail on={[Moldavia]}>
                Le chiese dipinte del nord della Moldavia sono patrimonio{' '}
                <N href="https://it.wikipedia.org/wiki/Chiese_della_Moldavia">UNESCO</N>. Sucevița,
                costruita dai Movilă negli anni Ottanta del Cinquecento e dipinta alla fine del
                secolo, ne riprende i temi.
              </Detail>
            </Event>
          </Timeline>
        </Part>

        <Part section={RoSection.OttomanSuzerainty}>
          <Text on={[Transylvania, Wallachia, Moldavia, Dobruja]}>
            Dal Cinquecento le quattro regioni dipendono dalla Porta in modi diversi. La Dobrogea è
            una provincia amministrata direttamente dagli ottomani. Valacchia e Moldavia sono
            principati tributari, con principi e istituzioni proprie. In Transilvania, dopo la crisi
            del Regno d’Ungheria, nasce un principato tributario con una propria Dieta.
          </Text>
          <Timeline on="always">
            <Event
              on={[Transylvania]}
              date="1541–1570"
              title={
                <>
                  Nasce il{' '}
                  <N href="https://it.wikipedia.org/wiki/Principato_di_Transilvania">
                    principato di Transilvania
                  </N>
                </>
              }
            >
              <Detail on={[Transylvania]}>
                <D>1541</D> Con la caduta di <N href="https://it.wikipedia.org/wiki/Buda">Buda</N>{' '}
                (oggi parte di Budapest), gli ottomani di{' '}
                <N href="https://it.wikipedia.org/wiki/Solimano_il_Magnifico">
                  Solimano il Magnifico
                </N>{' '}
                occupano la capitale del{' '}
                <N href="https://it.wikipedia.org/wiki/Regno_d%27Ungheria">Regno d’Ungheria</N>. In
                cambio di un tributo annuo, il sultano affida le terre a est del Tibisco alla regina
                Isabella e a suo figlio.
              </Detail>
              <Detail on={[Transylvania]}>
                Alla <N>Dieta di Debrecen</N> (oggi in Ungheria), le regioni orientali del regno,
                compresa la <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N>,
                giurano fedeltà a{' '}
                <N href="https://it.wikipedia.org/wiki/Giovanni_II_d'Ungheria">János Zsigmond</N>{' '}
                (Giovanni II Sigismondo). Nasce un’entità politica distinta, sotto la{' '}
                <N href="https://it.wikipedia.org/wiki/Impero_ottomano">sovranità ottomana</N>.
              </Detail>
              <Detail on={[Transylvania]}>
                <D>1570</D> Con il{' '}
                <N href="https://it.wikipedia.org/wiki/Trattato_di_Spira">trattato di Spira</N>{' '}
                János Zsigmond rinuncia al titolo di re d’Ungheria. Il principato è formalizzato:
                autonomo, ma sottoposto alla sovranità ottomana.
              </Detail>
            </Event>
            <Event
              on={[Wallachia]}
              date="1545"
              title="Mircea Ciobanul, principe nominato dal sultano"
            >
              <Detail on={[Wallachia]}>
                <N href="https://it.wikipedia.org/wiki/Mircea_V_il_Pastore">Mircea Ciobanul</N> sale
                al trono di <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N> nominato
                dal sultano, al posto di Radu Paisie. Per ottenere la nomina paga somme alla{' '}
                <N href="https://it.wikipedia.org/wiki/Sublime_Porta">Porta</N>.
              </Detail>
            </Event>
            <Event
              on={[Transylvania]}
              date="1568"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Editto_di_Turda">Editto di Turda</N>
                </>
              }
            >
              <Detail on={[Transylvania]}>
                La Dieta stabilisce che i predicatori possono annunciare il Vangelo secondo la
                propria interpretazione. Ogni comunità può tenere il predicatore di cui accetta
                l’insegnamento, e nessuno può essere costretto o oltraggiato per la sua religione.
                Non è una libertà religiosa individuale in senso moderno: la delibera tutela
                predicatori e comunità.
              </Detail>
              <Detail on={[Transylvania]}>
                Il sistema delle quattro confessioni riconosciute,{' '}
                <N href="https://it.wikipedia.org/wiki/Chiesa_cattolica">cattolica</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Luteranesimo">luterana</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Calvinismo">calvinista</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Unitarianesimo">unitaria</N>, si completa
                solo negli anni Ottanta del Cinquecento. Gli{' '}
                <N href="https://it.wikipedia.org/wiki/Chiesa_ortodossa_rumena">ortodossi</N>{' '}
                restano tollerati, senza i privilegi delle confessioni riconosciute.
              </Detail>
            </Event>
            <Event on={[Moldavia]} date="1574" title="Ioan Vodă rifiuta il tributo">
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
              on={[Transylvania, Wallachia, Moldavia]}
              date="1594–1601"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Michele_il_Coraggioso">
                    Michele il Coraggioso
                  </N>
                </>
              }
            >
              <Detail on={[Transylvania, Wallachia, Moldavia]}>
                <D>1594–1595</D>{' '}
                <N href="https://it.wikipedia.org/wiki/Moldavia_(regione_storica)">Moldavia</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Transilvania">Transilvania</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N> si alleano contro
                gli <N href="https://it.wikipedia.org/wiki/Impero_ottomano">ottomani</N>.
                Nell’agosto 1595 Michele, principe di Valacchia, li batte a Călugăreni.
              </Detail>
              <Detail on={[Transylvania, Wallachia, Moldavia]}>
                <D>1599–1600</D> Michele conquista la Transilvania nell’ottobre 1599 e la{' '}
                <N href="https://it.wikipedia.org/wiki/Moldavia_(regione_storica)">Moldavia</N>{' '}
                nella primavera del 1600. Per pochi mesi del 1600 i tre principati sono sotto un
                unico sovrano, ma ciascuno conserva le proprie istituzioni.
              </Detail>
              <Detail on={[Transylvania, Wallachia, Moldavia]}>
                Nel settembre 1600 la nobiltà transilvana, con le truppe imperiali di{' '}
                <N href="https://it.wikipedia.org/wiki/Giorgio_Basta">Giorgio Basta</N>, lo
                sconfigge a Mirăslău. Michele perde la Transilvania.
              </Detail>
              <Detail on={[Transylvania, Wallachia, Moldavia]}>
                {/* Days omitted on purpose: sources mix Julian and Gregorian dates (murder on 9 or 19 August). */}
                <D>1601</D> In agosto Michele vince con Basta la{' '}
                <N href="https://it.wikipedia.org/wiki/Battaglia_di_Guruslău">
                  battaglia di Guruslău
                </N>
                , oggi nel distretto di Sălaj. Circa due settimane dopo i soldati di Basta lo
                uccidono a <N href="https://it.wikipedia.org/wiki/Câmpia_Turzii">Câmpia Turzii</N>,
                vicino a <N href="https://it.wikipedia.org/wiki/Turda">Turda</N>.
              </Detail>
            </Event>
            <Event
              on={[Transylvania]}
              date="1604–1606"
              title={
                <>
                  Rivolta di{' '}
                  <N href="https://it.wikipedia.org/wiki/István_Bocskai">István Bocskai</N>
                </>
              }
            >
              <Detail on={[Transylvania]}>
                <D>1604</D> Il comandante imperiale accusa di tradimento il possidente calvinista e
                gli confisca i beni.{' '}
                <N href="https://it.wikipedia.org/wiki/István_Bocskai">Bocskai</N> assolda gli{' '}
                <N href="https://it.wikipedia.org/wiki/Aiduchi">aiduchi</N> e si ribella.
              </Detail>
              <Detail on={[Transylvania]}>
                <D>1605</D> Le{' '}
                <N href="https://it.wikipedia.org/wiki/Unio_Trium_Nationum">Tre Nazioni</N> giurano
                fedeltà a Bocskai, nominato principe dal sultano. Le sue truppe invadono Ungheria e
                Austria, e nel 1606, con il{' '}
                <N href="https://it.wikipedia.org/wiki/Trattato_di_Vienna_(1606)">
                  Trattato di Vienna
                </N>
                , costringono gli <N href="https://it.wikipedia.org/wiki/Asburgo">Asburgo</N> alla
                pace.
              </Detail>
              <Detail on={[Transylvania]}>
                <D>1606</D> La{' '}
                <N href="https://it.wikipedia.org/wiki/Pace_di_Zsitvatorok">pace di Zsitvatorok</N>{' '}
                chiude la{' '}
                <N href="https://it.wikipedia.org/wiki/Lunga_guerra_turca">Lunga guerra</N>:{' '}
                <N href="https://it.wikipedia.org/wiki/Rodolfo_II_d%27Asburgo">Rodolfo II</N>{' '}
                riconosce che i principi di Transilvania sono sottoposti al sultano. Bocskai muore
                senza figli alla fine dell’anno.
              </Detail>
            </Event>
            <Context on={[Transylvania]} period="1593–1606" title="La catastrofe demografica">
              La <N href="https://it.wikipedia.org/wiki/Lunga_guerra_turca">Lunga guerra</N> spopola
              la Transilvania. In una lettera del 1603{' '}
              <N href="https://it.wikipedia.org/wiki/Giorgio_Basta">Giorgio Basta</N> descrive il
              paese come un deserto, con miniere abbandonate e senza manodopera.
            </Context>
          </Timeline>

          <Timeline section={RoSection.OttomanSuzeraintyTransylvania}>
            <Context on={[Transylvania]} period="XVII secolo" title="Freddo, peste e nuove colture">
              Inverni lunghi, estati piovose e autunni brevi, effetto della{' '}
              <N href="https://it.wikipedia.org/wiki/Piccola_era_glaciale">piccola era glaciale</N>,
              spingono a trasformare i terreni d’altura in pascoli. Le epidemie di{' '}
              <N href="https://it.wikipedia.org/wiki/Peste_bubbonica">peste</N> tornano a più
              riprese. Il <N href="https://it.wikipedia.org/wiki/Mais">mais</N>, arrivato dalle
              Americhe, compare nelle fonti nel 1611 e diventa un alimento popolare. Il{' '}
              <N href="https://it.wikipedia.org/wiki/Tabacco">tabacco</N> si coltiva dalla seconda
              metà del secolo, e già nel 1670 la Dieta regola il fumo.
            </Context>
            <Event
              on={[Transylvania]}
              date="1613–1629"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Gabriele_Bethlen">Gábor Bethlen</N>
                </>
              }
            >
              <Detail on={[Transylvania]}>
                Arriva con truppe ottomane, valacche e{' '}
                <N href="https://it.wikipedia.org/wiki/Tatari_di_Crimea">tatare</N>, al posto di{' '}
                <N href="https://ro.wikipedia.org/wiki/Gabriel_Báthory">Gábor Báthory</N>, che la{' '}
                <N href="https://it.wikipedia.org/wiki/Sublime_Porta">Porta</N> ha deciso di
                deporre. {/* Day omitted on purpose: sources give 13 or 23 October 1613. */}
                Nell’ottobre 1613 la Dieta riunita a{' '}
                <N href="https://it.wikipedia.org/wiki/Cluj-Napoca">Cluj</N> lo elegge principe.
                Introduce il <N href="https://it.wikipedia.org/wiki/Mercantilismo">mercantilismo</N>{' '}
                e crea monopoli di Stato.
              </Detail>
              <Detail on={[Transylvania]}>
                <D>1618</D> La Dieta permette a minatori locali e stranieri di aprire liberamente
                nuove miniere, esentandoli dalle tasse. Oltre a oro, argento e ferro, ad{' '}
                <N href="https://it.wikipedia.org/wiki/Abrud">Abrud</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Zlatna">Zlatna</N> si estrae{' '}
                <N href="https://it.wikipedia.org/wiki/Mercurio_(elemento_chimico)">mercurio</N>,
                una fonte importante di entrate per lo Stato.
              </Detail>
              <Detail on={[Transylvania]}>
                <D>1619–1626</D> Nella{' '}
                <N href="https://it.wikipedia.org/wiki/Guerra_dei_trent%27anni">
                  guerra dei Trent’anni
                </N>{' '}
                si allea con l’
                <N href="https://it.wikipedia.org/wiki/Unione_evangelica">Unione evangelica</N> e
                invade per tre volte l’
                <N href="https://it.wikipedia.org/wiki/Ungheria_asburgica">Ungheria asburgica</N>.
                Nel 1620 viene eletto re d’Ungheria, ma rinuncia al titolo in cambio di sette
                comitati.
              </Detail>
              <Detail on={[Transylvania]}>
                <D>1622</D> Fonda ad{' '}
                <N href="https://it.wikipedia.org/wiki/Alba_Iulia">Alba Iulia</N>, sua capitale, un
                collegio riformato di livello superiore. L’edificio, poi trasformato in caserma,
                sorge ancora nella cittadella.
              </Detail>
            </Event>
            <Context
              on={[Transylvania]}
              period="1613–1648"
              title="Ricostruzione e nuovo volto delle città"
            >
              Gli insediamenti distrutti dalla guerra vengono ricostruiti. Ad{' '}
              <N href="https://it.wikipedia.org/wiki/Alba_Iulia">Alba Iulia</N> e a{' '}
              <N href="https://it.wikipedia.org/wiki/Gilău">Gilău</N> compaiono parchi, statue,
              piazze ampie e fontane in stile{' '}
              <N href="https://it.wikipedia.org/wiki/Architettura_rinascimentale">rinascimentale</N>
              . Dal 1620 diventano rari i decreti sul ritorno dei servi fuggiaschi, segno che la
              popolazione si sta riprendendo.
            </Context>
            <Event
              on={[Transylvania]}
              date="1653"
              title={
                <>
                  <N work href="https://ro.wikipedia.org/wiki/Approbatae_Constitutiones">
                    Approbatae
                  </N>
                </>
              }
            >
              <Detail on={[Transylvania]}>
                <N href="https://it.wikipedia.org/wiki/Giorgio_II_Rákóczi">György II Rákóczi</N> fa
                pubblicare il codice delle leggi del principato. Impone il ritorno dei contadini
                fuggiaschi nelle tenute come servi e vieta ai romeni di portare armi.
              </Detail>
            </Event>
            <Event on={[Transylvania]} date="1657–1662" title="La crisi del principato">
              <Detail on={[Transylvania]}>
                <D>1657</D>{' '}
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
              <Detail on={[Transylvania]}>
                <D>1658–1662</D> Principi filo-ottomani e anti-ottomani si scontrano. Gli ottomani
                conquistano <N href="https://it.wikipedia.org/wiki/Oradea">Oradea</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Ineu">Ineu</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Lugoj">Lugoj</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Caransebeș">Caransebeș</N> e distruggono la
                capitale <N href="https://it.wikipedia.org/wiki/Alba_Iulia">Alba Iulia</N>. Il
                conflitto si chiude con la morte di{' '}
                <N href="https://ro.wikipedia.org/wiki/Ioan_Kemény">János Kemény</N> nel gennaio
                1662.
              </Detail>
            </Event>
            <Unless on={[Dobruja]}>
              <MocaniContext on={[Transylvania]} />
            </Unless>
            <Event
              on={[Transylvania]}
              date="1661–1686"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Michele_I_Apafi">Mihály I Apafi</N> fra
                  ottomani e Asburgo
                </>
              }
            >
              <Detail on={[Transylvania]}>
                Il principe è scelto su richiesta degli ottomani. È il primo a invitare il vescovo
                ortodosso alla Dieta e nel 1669 fa pubblicare le <N work>Compilatae</N>. Nel 1683 è
                costretto a marciare con gli ottomani su{' '}
                <N href="https://it.wikipedia.org/wiki/Battaglia_di_Vienna">Vienna</N>.
              </Detail>
              <Detail on={[Transylvania]}>
                <D>1685–1686</D> Con il trattato di{' '}
                <N href="https://it.wikipedia.org/wiki/Cârțișoara">Cârțișoara</N> la Transilvania
                aderisce in segreto alla{' '}
                <N href="https://it.wikipedia.org/wiki/Lega_Santa_(1684)">Lega Santa</N>. Con quello
                di Vienna del giugno 1686 accetta presidi imperiali a{' '}
                <N href="https://it.wikipedia.org/wiki/Deva_(Romania)">Deva</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Cluj-Napoca">Cluj</N>.
              </Detail>
            </Event>
          </Timeline>

          <Timeline section={RoSection.OttomanSuzeraintyWallachia}>
            <BoyarsContext on={[Wallachia]} />
            <Event on={[Wallachia]} date="1611–1631" title="Boiardi contro mercanti greci">
              <Detail on={[Wallachia]}>
                <D>1611</D> La <N href="https://it.wikipedia.org/wiki/Sublime_Porta">Porta</N>{' '}
                insedia <N href="https://it.wikipedia.org/wiki/Radu_Mihnea">Radu Mihnea</N> al posto
                di <N href="https://ro.wikipedia.org/wiki/Radu_Șerban">Radu Șerban</N>, salito al
                trono con l’appoggio degli Asburgo. Comincia l’immigrazione su larga scala dei greci
                del <N href="https://it.wikipedia.org/wiki/Fanar">Fanar</N>, a Istanbul, che
                acquistano terre e poi il rango di{' '}
                <N href="https://it.wikipedia.org/wiki/Boiari">boiardi</N>. Non è ancora il periodo
                fanariota, che comincia un secolo dopo.
              </Detail>
              <Detail on={[Wallachia]}>
                <D>1618</D> I boiardi guidati da <N>Lupu Mehedițeanu</N> uccidono possidenti e
                mercanti greci, protetti dal principe{' '}
                <N href="https://ro.wikipedia.org/wiki/Alexandru_Iliaș">Alexandru Iliaș</N>.
              </Detail>
              <Detail on={[Wallachia]}>
                <D>1631</D> I boiardi ribelli costringono{' '}
                <N href="https://ro.wikipedia.org/wiki/Leon_Tomșa">Leon Tomșa</N> a cacciare i greci
                senza moglie locale né terre, e a esentare i boiardi dalle tasse.
              </Detail>
            </Event>
            <Event
              on={[Wallachia]}
              date="1632–1654"
              title={
                <>
                  <N href="https://ro.wikipedia.org/wiki/Matei_Basarab">Matei Basarab</N>
                </>
              }
            >
              <Detail on={[Wallachia]}>
                Per farsi confermare dalla{' '}
                <N href="https://it.wikipedia.org/wiki/Sublime_Porta">Porta</N> triplica il tributo,
                da 45.000 a 135.000 <N href="https://it.wikipedia.org/wiki/Tallero">talleri</N>.
                Riapre le miniere, costruisce o restaura 30 chiese e fonda una scuola superiore a{' '}
                <N href="https://it.wikipedia.org/wiki/Târgoviște">Târgoviște</N> nel 1646.
              </Detail>
            </Event>
            <Event on={[Wallachia]} date="1659–1660" title="Bucarest diventa la capitale">
              <Detail on={[Wallachia]}>
                Fino ad allora i principi risiedono ora a{' '}
                <N href="https://it.wikipedia.org/wiki/Târgoviște">Târgoviște</N>, ora a{' '}
                <N href="https://it.wikipedia.org/wiki/Bucarest">Bucarest</N>, che si trova sulla
                strada commerciale fra Brașov e il Danubio. Nel 1659, sotto la pressione della{' '}
                <N href="https://it.wikipedia.org/wiki/Sublime_Porta">Porta</N> e durante il regno
                di <N href="https://ro.wikipedia.org/wiki/Gheorghe_Ghica">Gheorghe Ghica</N>,
                Bucarest diventa la capitale. Dal 1660 è la residenza stabile dei principi. Della
                loro corte restano le rovine della Curtea Veche, oggi museo nel centro storico.
              </Detail>
              <Detail on={[Wallachia]}>
                Il commercio cresce: nel 1666 i viaggiatori stranieri contano a Bucarest sette{' '}
                <N href="https://it.wikipedia.org/wiki/Caravanserraglio">caravanserragli</N>.
              </Detail>
            </Event>
            <Event
              on={[Wallachia]}
              date="1678–1688"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Șerban_Cantacuzino">Șerban Cantacuzino</N>
                </>
              }
            >
              <Detail on={[Wallachia]}>
                Fonda una scuola superiore, costruisce strade e ponti e porta il{' '}
                <N href="https://it.wikipedia.org/wiki/Mais">mais</N> in Valacchia. Offre a{' '}
                <N href="https://it.wikipedia.org/wiki/Leopoldo_I_d%27Asburgo">Leopoldo I</N> la
                sottomissione in cambio del{' '}
                <N href="https://it.wikipedia.org/wiki/Banato">Banato</N> e del trono ereditario, ma
                muore nell’ottobre 1688, prima che le trattative si concludano.
              </Detail>
              <Detail on={[Wallachia]}>
                <D>1688</D> A <N href="https://it.wikipedia.org/wiki/Bucarest">Bucarest</N> viene
                stampata la{' '}
                <N href="https://ro.wikipedia.org/wiki/Biblia_de_la_București">
                  Bibbia di Bucarest
                </N>
                , la prima traduzione completa della Bibbia in romeno.
              </Detail>
            </Event>
          </Timeline>

          <Timeline section={RoSection.OttomanSuzeraintyMoldavia}>
            <Unless on={[Wallachia]}>
              <BoyarsContext on={[Moldavia]} />
            </Unless>
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
              <Detail on={[Moldavia]}>
                <D>1652–1653</D> La figlia{' '}
                <N href="https://ro.wikipedia.org/wiki/Ruxandra_Lupu">Ruxandra</N> sposa{' '}
                <N href="https://ro.wikipedia.org/wiki/Timuș_Hmelnițki">Tymofij</N>, figlio del capo{' '}
                <N href="https://it.wikipedia.org/wiki/Cosacchi">cosacco</N>{' '}
                <N href="https://it.wikipedia.org/wiki/Bohdan_Chmel%27nyc%27kyj">
                  Bohdan Chmel’nyc’kyj
                </N>
                . Il <N href="https://it.wikipedia.org/wiki/Logoteta">logoteta</N>{' '}
                <N href="https://ro.wikipedia.org/wiki/Gheorghe_Ștefan">Gheorghe Ștefan</N> lo
                rovescia, e il tentativo di tornare al trono fallisce a{' '}
                <N href="https://ro.wikipedia.org/wiki/Bătălia_de_la_Finta">Finta</N> nel maggio
                1653.
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
              che perde la sua influenza su Moldavia e Valacchia. Alcuni principi e gruppi di
              boiardi iniziano allora a cercare l’appoggio della{' '}
              <N href="https://it.wikipedia.org/wiki/Impero_russo">Russia</N>, mentre altri restano
              legati alla Porta o alla Polonia.
            </Context>
          </Timeline>

          <Timeline section={RoSection.OttomanSuzeraintyDobruja}>
            <Context on={[Dobruja]} period="XVI–XVII secolo" title="Una provincia di frontiera">
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
            <MocaniContext on={[Dobruja]} />
            <Context on={[Dobruja]} period="XVII–XVIII secolo" title="I lipoveni">
              Nel delta e nelle attuali province di Tulcea e Constanța si stabiliscono i{' '}
              <N href="https://it.wikipedia.org/wiki/Lipoveni">lipoveni</N>, Vecchi credenti russi
              in fuga dalle persecuzioni. Le fonti collocano il loro arrivo tra la seconda metà del
              Seicento e il Settecento.
            </Context>
          </Timeline>
        </Part>

        <Part section={RoSection.ThreeEmpires}>
          <Timeline on="always">
            <Event
              on={[Moldavia, Wallachia]}
              date="1711 e 1716"
              title={
                <>
                  Inizia il periodo <N href="https://it.wikipedia.org/wiki/Fanarioti">fanariota</N>
                </>
              }
            >
              <Detail on={[Moldavia, Wallachia]}>
                Dopo la <N href="https://it.wikipedia.org/wiki/Pace_del_Prut">pace del Prut</N> la{' '}
                <N href="https://it.wikipedia.org/wiki/Sublime_Porta">Porta</N> non lascia più
                scegliere i principi ai boiardi:{' '}
                <N href="https://it.wikipedia.org/wiki/Moldavia_(regione_storica)">Moldavia</N> dal
                1711 e <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N> dal 1716
                vengono affidate a <N href="https://it.wikipedia.org/wiki/Ospodaro">ospodari</N>{' '}
                nominati dal sultano, quasi sempre membri di famiglie greche del{' '}
                <N href="https://it.wikipedia.org/wiki/Fanar">Fanar</N>. Il sistema dura fino al
                1821.
              </Detail>
              <Detail on={[Moldavia, Wallachia]}>
                La nomina dipende dalle somme pagate a Istanbul, e ogni nuovo principe impone nuove
                tasse per recuperarle. La storiografia romena ha descritto a lungo questo periodo
                come un’epoca di oppressione fiscale. Meno spesso si ricordano le scuole finanziate
                dai principi fanarioti e le loro riforme, come quelle di{' '}
                <N href="https://ro.wikipedia.org/wiki/Constantin_Mavrocordat">
                  Constantin Mavrocordat
                </N>{' '}
                in Valacchia nel 1746 e in Moldavia nel 1749.
              </Detail>
            </Event>
            <Event
              on={[Moldavia, Wallachia]}
              date="1768–1774"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Guerra_russo-turca_(1768-1774)">
                    Guerra russo-turca
                  </N>
                </>
              }
            >
              <Detail on={[Moldavia, Wallachia]}>
                La <N href="https://it.wikipedia.org/wiki/Impero_russo">Russia</N> occupa{' '}
                <N href="https://it.wikipedia.org/wiki/Moldavia_(regione_storica)">Moldavia</N> e
                Valacchia per tutta la guerra. Con la{' '}
                <N href="https://it.wikipedia.org/wiki/Trattato_di_Küçük_Kaynarca">
                  pace di Küçük Kaynarca
                </N>{' '}
                del 1774 ottiene le terre tra{' '}
                <N href="https://it.wikipedia.org/wiki/Dnepr">Dnepr</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Bug_Meridionale">Bug</N>. I principati
                restano sotto sovranità ottomana.
              </Detail>
              <Detail on={[Moldavia, Wallachia]}>
                Il trattato permette ai principi di tenere propri rappresentanti a Istanbul e al
                ministro russo di intervenire presso la Porta a favore dei principati. Più tardi la
                Russia di{' '}
                <N href="https://it.wikipedia.org/wiki/Caterina_II_di_Russia">Caterina II</N> e dei
                suoi successori lo invoca come base di un diritto più ampio di proteggere i
                cristiani ortodossi dell’Impero ottomano. Gli storici discutono quanto il testo
                giustifichi questa lettura.
              </Detail>
            </Event>
            <Event on={[Moldavia]} date="1787–1792" title="Il Dnestr diventa confine">
              <Detail on={[Moldavia]}>
                <N href="https://it.wikipedia.org/wiki/Impero_russo">Russia</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Monarchia_asburgica">Austria</N> entrano in{' '}
                <N href="https://it.wikipedia.org/wiki/Guerra_russo-turca_(1787-1792)">
                  guerra con gli ottomani
                </N>
                . Il <N href="https://it.wikipedia.org/wiki/Trattato_di_Iași">trattato di Iași</N>{' '}
                del gennaio 1792 fissa il <N href="https://it.wikipedia.org/wiki/Dnestr">Dnestr</N>{' '}
                come confine russo-moldavo.
              </Detail>
            </Event>
            <Event
              on={[Moldavia, Wallachia]}
              date="1806–1812"
              title={<>Occupazione russa e pace di Bucarest</>}
            >
              <Detail on={[Moldavia, Wallachia]}>
                Nell’agosto 1806, mentre la Francia di{' '}
                <N href="https://it.wikipedia.org/wiki/Napoleone_Bonaparte">Napoleone</N> e la
                Russia si contendono l’influenza a Istanbul, la{' '}
                <N href="https://it.wikipedia.org/wiki/Sublime_Porta">Porta</N> depone i principi
                filorussi di{' '}
                <N href="https://it.wikipedia.org/wiki/Moldavia_(regione_storica)">Moldavia</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N>. Poi li reintegra,
                ma in novembre l’esercito di{' '}
                <N href="https://it.wikipedia.org/wiki/Alessandro_I_di_Russia">Alessandro I</N>{' '}
                occupa i due principati.
              </Detail>
              <Detail on={[Moldavia, Wallachia]}>
                Dal marzo 1811{' '}
                <N href="https://it.wikipedia.org/wiki/Michail_Illarionovič_Kutuzov">Kutuzov</N> è
                comandante in capo dell’armata del Danubio e conduce le trattative. La{' '}
                <N href="https://it.wikipedia.org/wiki/Trattato_di_Bucarest_(1812)">
                  pace firmata a Bucarest
                </N>{' '}
                nel 1812 dà alla Russia la parte della Moldavia fra{' '}
                <N href="https://it.wikipedia.org/wiki/Prut">Prut</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Dnestr">Dnestr</N>, compreso il{' '}
                <N href="https://it.wikipedia.org/wiki/Budžak">Budžak</N>: è la{' '}
                <N href="https://it.wikipedia.org/wiki/Bessarabia">Bessarabia</N>. Moldavia e
                Valacchia tornano sotto la sovranità ottomana.
              </Detail>
            </Event>
          </Timeline>

          <Timeline section={RoSection.ThreeEmpiresTransylvania}>
            <Event on={[Transylvania]} date="1688–1699" title={<>Dagli ottomani agli Asburgo</>}>
              <Detail on={[Transylvania]}>
                Nel febbraio 1688 il generale imperiale{' '}
                <N href="https://it.wikipedia.org/wiki/Antonio_Carafa_(generale)">Antonio Carafa</N>{' '}
                costringe le{' '}
                <N href="https://it.wikipedia.org/wiki/Unio_Trium_Nationum">Tre Nazioni</N> a
                riconoscere il dominio ereditario degli{' '}
                <N href="https://it.wikipedia.org/wiki/Asburgo">Asburgo</N> e piega con la forza{' '}
                <N href="https://it.wikipedia.org/wiki/Sibiu">Sibiu</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Brașov">Brașov</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Bistrița">Bistrița</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Baia_Mare">Baia Mare</N>. Nello stesso anno
                la Dieta rinuncia alla sovranità ottomana e accetta la protezione austriaca.
              </Detail>
              <Detail on={[Transylvania]}>
                <D>1691</D> Con il <N work>Diploma Leopoldinum</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Leopoldo_I_d%27Asburgo">Leopoldo I</N>{' '}
                conferma le libertà delle Tre Nazioni e delle quattro confessioni riconosciute. Gli
                ortodossi romeni restano fuori da entrambi i sistemi di privilegio. Il governo passa
                a un governatorato con sede a Sibiu, sotto il controllo di Vienna.
              </Detail>
              <Detail on={[Transylvania]}>
                Nel 1699, con la{' '}
                <N href="https://it.wikipedia.org/wiki/Pace_di_Carlowitz">pace di Carlowitz</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Istanbul">Istanbul</N> riconosce il dominio{' '}
                <N href="https://it.wikipedia.org/wiki/Asburgo">asburgico</N>.
              </Detail>
            </Event>
            <Event on={[Transylvania]} date="1699–1701" title={<>L’Unione con Roma</>}>
              <Detail on={[Transylvania]}>
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
            <Context on={[Transylvania]} period="XVIII secolo" title="La condizione dei romeni">
              La maggioranza romena resta esclusa dalla politica e quasi tutta asservita. Per
              sposarsi, trasferirsi o fare un mestiere serve il permesso del signore. Gli ortodossi
              pagano la <N href="https://it.wikipedia.org/wiki/Decima">decima</N> alla Chiesa del
              proprietario, cattolica o protestante, e molti preti ortodossi vivono da contadini.
            </Context>
            <Event
              on={[Transylvania]}
              date="1729–1744"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Inocențiu_Micu-Klein">
                    Inocențiu Micu-Klein
                  </N>{' '}
                  e <N href="https://it.wikipedia.org/wiki/Blaj">Blaj</N>
                </>
              }
            >
              <Detail on={[Transylvania]}>
                Il vescovo greco-cattolico, diventato barone e membro della Dieta, chiede parità per
                i romeni. Sostiene che pagano più tasse e danno più soldati di ogni altra nazione. I
                deputati lo deridono paragonando i romeni alle tarme nei vestiti. Klein ripara a
                Roma, dove muore nel 1768.
              </Detail>
              <Detail on={[Transylvania]}>
                Nel corso del secolo i preti greco-cattolici formati a Roma e a Vienna diffondono le
                idee occidentali e la tesi delle origini daco-romane (
                <N href="https://ro.wikipedia.org/wiki/Școala_Ardeleană">Scuola transilvana</N>).
                Adattano l’
                <N href="https://it.wikipedia.org/wiki/Alfabeto_latino">alfabeto latino</N> al
                romeno e pubblicano grammatiche e libri di preghiere. Blaj, sede della Chiesa
                greco-cattolica, diventa il centro culturale romeno.
              </Detail>
            </Event>
            <Event
              on={[Transylvania]}
              date="1784–1790"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Rivolta_di_Horea,_Cloșca_e_Crișan">
                    Rivolta di Horea, Cloșca e Crișan
                  </N>{' '}
                  e riforme di Giuseppe II
                </>
              }
            >
              <Detail on={[Transylvania]}>
                <D>1784</D> I servi, convinti di avere l’appoggio dell’imperatore, saccheggiano
                castelli e uccidono circa 100 nobili.{' '}
                <N href="https://it.wikipedia.org/wiki/Giuseppe_II_d%27Asburgo-Lorena">
                  Giuseppe II
                </N>{' '}
                amnistia i partecipanti, ma non i capi. Horea e Cloșca vengono suppliziati sulla
                ruota ad Alba Iulia nel febbraio 1785; Crișan si toglie la vita in carcere.
              </Detail>
              <Detail on={[Transylvania]}>
                <D>1785–1790</D> L’imperatore abolisce la{' '}
                <N href="https://it.wikipedia.org/wiki/Servitù_della_gleba">servitù della gleba</N>,
                annulla la costituzione transilvana, scioglie l’
                <N href="https://it.wikipedia.org/wiki/Unio_Trium_Nationum">
                  Unione delle Tre Nazioni
                </N>{' '}
                e impone il tedesco come lingua ufficiale. Davanti al malcontento diffuso, poco
                prima di morire revoca molte riforme.
              </Detail>
            </Event>
            <Event
              on={[Transylvania]}
              date="1791–1792"
              title={
                <>
                  Il{' '}
                  <N work href="https://ro.wikipedia.org/wiki/Supplex_Libellus_Valachorum">
                    Supplex Libellus Valachorum
                  </N>
                </>
              }
            >
              <Detail on={[Transylvania]}>
                Nel 1791 gli intellettuali romeni legati alla Scuola transilvana preparano una
                petizione collettiva per{' '}
                <N href="https://it.wikipedia.org/wiki/Leopoldo_II_d%27Asburgo-Lorena">
                  Leopoldo II
                </N>
                , che il vescovo greco-cattolico di Oradea, Ignatie Darabant, invia a Vienna.
                Invocando la discendenza dai coloni romani, chiedono che i romeni siano riconosciuti
                come quarta nazione, con diritti politici e una rappresentanza proporzionale.
              </Detail>
              <Detail on={[Transylvania]}>
                Nell’agosto 1791 la Dieta concede la libertà di culto agli ortodossi, ma respinge la
                parità politica. Nel 1792 i vescovi Ioan Bob, greco-cattolico, e Gherasim Adamovici,
                ortodosso, presentano a Vienna un secondo memoriale, più organico. Anche questo
                resta senza esito.
              </Detail>
            </Event>
          </Timeline>

          <Timeline section={RoSection.ThreeEmpiresWallachia}>
            <Event
              on={[Wallachia]}
              date="1688–1714"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Constantin_Brâncoveanu">
                    Constantin Brâncoveanu
                  </N>
                </>
              }
            >
              <Detail on={[Wallachia]}>
                Con i <N href="https://ro.wikipedia.org/wiki/Familia_Cantemir">Cantemir</N> in
                Moldavia, il principe spera nell’aiuto russo per liberarsi degli ottomani, ma non si
                arriva a un’intesa stabile.
              </Detail>
              <Detail on={[Wallachia]}>
                Nel 1714 viene deposto e decapitato a Istanbul insieme ai quattro figli. Il suo nome
                resta legato allo stile brâncovenesc, che vedi al monastero di Horezu e al palazzo
                di Mogoșoaia, vicino a Bucarest.
              </Detail>
            </Event>
            <Event
              on={[Wallachia]}
              date="1718–1739"
              title={
                <>
                  <N href="https://ro.wikipedia.org/wiki/Banatul_Craiovei">Il Banato di Craiova</N>
                </>
              }
            >
              <Detail on={[Wallachia]}>
                L’<N href="https://it.wikipedia.org/wiki/Oltenia">Oltenia</N>, la parte occidentale
                della Valacchia, passa all’
                <N href="https://it.wikipedia.org/wiki/Monarchia_asburgica">Austria</N> con il nome
                di Banato di Craiova. Con la pace di Belgrado del 1739 l’Oltenia viene reintegrata
                nella Valacchia, principato tributario della Porta.
              </Detail>
            </Event>
            <Event on={[Wallachia]} date="1746" title="Mavrocordat abolisce la servitù personale">
              <Detail on={[Wallachia]}>
                Il principe fanariota{' '}
                <N href="https://ro.wikipedia.org/wiki/Constantin_Mavrocordat">
                  Constantin Mavrocordat
                </N>{' '}
                abolisce la <i>rumânie</i>, il vincolo che lega il contadino al signore: pagando un
                riscatto, i servi diventano liberi di spostarsi da una tenuta all’altra. Restano
                però soggetti a decine di tasse e prestazioni. La riforma non riguarda i rom, che
                restano schiavi.
              </Detail>
            </Event>
          </Timeline>

          <Timeline section={RoSection.ThreeEmpiresMoldavia}>
            <Event
              on={[Moldavia]}
              date="1711"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Dimitrie_Cantemir">Dimitrie Cantemir</N> si
                  schiera con lo zar
                </>
              }
            >
              <Detail on={[Moldavia]}>
                Dopo la sconfitta di{' '}
                <N href="https://it.wikipedia.org/wiki/Battaglia_di_Poltava">Poltava</N>, il re di
                Svezia <N href="https://it.wikipedia.org/wiki/Carlo_XII_di_Svezia">Carlo XII</N> si
                rifugia nella fortezza ottomana di Tighina (oggi in Moldova). Nel novembre 1710 il
                sultano dichiara guerra alla Russia di{' '}
                <N href="https://it.wikipedia.org/wiki/Pietro_I_di_Russia">Pietro il Grande</N>.
              </Detail>
              <Detail on={[Moldavia]}>
                Nell’aprile 1711, con l’accordo di{' '}
                <N href="https://ro.wikipedia.org/wiki/Tratatul_de_la_Luțk">Luc’k</N> (oggi in
                Ucraina), il principe di Moldavia passa dalla parte dello zar. In caso di vittoria i
                Cantemir avrebbero avuto un trono ereditario, la Moldavia il{' '}
                <N href="https://it.wikipedia.org/wiki/Dnestr">Dnestr</N> come confine, compreso il{' '}
                <N href="https://it.wikipedia.org/wiki/Budžak">Budžak</N> controllato da ottomani e
                tatari, e la fine del tributo.
              </Detail>
              <Detail on={[Moldavia]}>
                A fine giugno lo zar arriva a <N href="https://it.wikipedia.org/wiki/Iași">Iași</N>.
                In luglio l’esercito russo-moldavo è{' '}
                <N href="https://it.wikipedia.org/wiki/Battaglia_del_Prut">sconfitto sul Prut</N>,
                presso Stănilești, e la{' '}
                <N href="https://it.wikipedia.org/wiki/Pace_del_Prut">pace del Prut</N> obbliga i
                russi a lasciare la Moldavia. Cantemir e molti boiardi fuggono in Russia.
              </Detail>
            </Event>
            <Event on={[Moldavia]} date="1749" title="Mavrocordat abolisce la servitù personale">
              <Detail on={[Moldavia]}>
                Il principe fanariota{' '}
                <N href="https://ro.wikipedia.org/wiki/Constantin_Mavrocordat">
                  Constantin Mavrocordat
                </N>{' '}
                riunisce i boiardi nella{' '}
                <N href="https://ro.wikipedia.org/wiki/Mănăstirea_Sfinții_Trei_Ierarhi_din_Iași">
                  chiesa dei Tre Gerarchi
                </N>{' '}
                a <N href="https://it.wikipedia.org/wiki/Iași">Iași</N> e abolisce la <i>vecinie</i>
                , il vincolo che lega il contadino al signore: pagando un riscatto, i servi
                diventano liberi di spostarsi da una tenuta all’altra. Restano però soggetti a tasse
                e prestazioni. Tre anni prima Mavrocordat aveva fatto lo stesso in Valacchia. La
                riforma non riguarda i rom, che restano schiavi.
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
              <Detail on={[Moldavia]}>
                In seguito unita alla{' '}
                <N href="https://it.wikipedia.org/wiki/Regno_di_Galizia_e_Lodomiria">Galizia</N>, la
                regione attira coloni ucraini, tedeschi, ungheresi, ebrei e armeni con terre
                gratuite ed esenzioni fiscali.
              </Detail>
            </Event>
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
              <Detail on={[Moldavia]}>
                <D>1817</D> Le autorità russe compilano una catagrafia, un registro fiscale che
                conta le famiglie, non le persone. Da questi dati lo storico Ion Nistor ricava circa
                l’86% di moldoveni.
              </Detail>
            </Event>
          </Timeline>

          <Timeline section={RoSection.ThreeEmpiresDobruja}>
            <Event
              on={[Dobruja]}
              date="Dal 1775"
              title={
                <>
                  La <N href="https://en.wikipedia.org/wiki/Danubian_Sich">Sič danubiana</N>
                </>
              }
            >
              <Detail on={[Dobruja]}>
                Dopo la distruzione della{' '}
                <N href="https://it.wikipedia.org/wiki/Sič_di_Zaporižžja">Sič di Zaporož’e</N>,
                cosacchi zaporoghi si rifugiano nel delta, sotto la protezione del sultano.
                Sconfiggono i cosacchi nekrasoviani, anch’essi rifugiati in Dobrogea, e ne prendono
                il centro, Dunavățu de Sus. La loro ultima Sič, a Dunavăț, dura dal 1814 al 1828. I
                loro discendenti vivono ancora nel delta.
              </Detail>
            </Event>
            <Event on={[Dobruja]} date="1791–1812" title="Guerre russo-ottomane in Dobrogea">
              <Detail on={[Dobruja]}>
                <D>1791</D> A <N href="https://en.wikipedia.org/wiki/Battle_of_M%C4%83cin">Măcin</N>{' '}
                i circa 30.000 russi di{' '}
                <N href="https://it.wikipedia.org/wiki/Nikolaj_Vasil%27evič_Repnin">Repnin</N>
                battono un esercito ottomano molto più numeroso. La sconfitta porta alla{' '}
                <N href="https://it.wikipedia.org/wiki/Trattato_di_Iași">pace di Iași</N>.
              </Detail>
              <Detail on={[Dobruja]}>
                <D>1809–1810</D> I russi passano il Danubio e prendono Isaccea e Tulcea senza
                combattere, poi Măcin e Hârșova. Silistra (oggi in Bulgaria) si arrende nel maggio
                1810.
              </Detail>
              <Detail on={[Dobruja]}>
                <D>1812</D> Con la{' '}
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
            Durante l’età moderna il territorio dell’attuale Romania resta diviso. La Transilvania
            passa dalla sovranità ottomana al dominio asburgico. Valacchia e Moldavia conservano
            principi e istituzioni proprie sotto la sovranità ottomana, con una crescente influenza
            russa. La Dobrogea è invece una provincia amministrata direttamente dagli ottomani.
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
function BoyarsContext({ on }: { on: Ro[] }) {
  return (
    <Context on={on} period="Dopo il 1601" title="Boiardi, servi e troni in vendita">
      In <N href="https://it.wikipedia.org/wiki/Valacchia">Valacchia</N> e{' '}
      <N href="https://it.wikipedia.org/wiki/Moldavia_(regione_storica)">Moldavia</N> i{' '}
      <N href="https://it.wikipedia.org/wiki/Boiari">boiardi</N> si impossessano delle terre dei
      contadini e la{' '}
      <N href="https://it.wikipedia.org/wiki/Servitù_della_gleba">servitù della gleba</N> si
      estende. Chi aspira al trono deve comprarlo con somme enormi e poi rifarsi tassando i
      contadini.
    </Context>
  )
}

/**
 * Context card shared by Dobrogea and Transilvania: in the Dobrogea section, and in the
 * Transilvania one when Dobrogea is not in the trip (so it is never shown twice).
 */
function MocaniContext({ on }: { on: Ro[] }) {
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
