import { guideKit } from '@/components/guide/content'
import type { GuideContent } from '@/content/types'
import { Ro, RoFood, RoLandscape, RoPerson, RoSection, RoTrace, structure } from '../structure'
import { sources } from '../sources'
import { names } from './names'

const dir = '/guides/romania'

/** Images whose author and licence are not recorded yet: the validator lists them as warnings. */
const creditToVerify = { unverified: 'author and licence to record' }

const {
  Callout,
  Card,
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
  Today,
  Unless,
} = guideKit(structure, names)

const { Dobruja, Moldavia, Transylvania, Wallachia } = Ro

export const romania: GuideContent<Ro, RoSection> = {
  structure,
  names,
  cover: {
    src: `${dir}/cover.jpg`,
    alt: 'La chiesa fortificata di Biertan nella nebbia',
    credit: creditToVerify,
  },
  /** Country name and nowhere logo on the cover. */
  coverInk: 'var(--color-text)',
  emblems: [
    {
      src: `${dir}/coat-of-arms.png`,
      // The official arms with the crown restored in 2016, rendered from the Commons SVG.
      credit: {
        author: 'Wikimedia Commons',
        license: 'Public domain',
        url: 'https://commons.wikimedia.org/wiki/File:Coat_of_arms_of_Romania.svg',
      },
      alt: 'Stemma della Romania',
      kind: 'coat-of-arms',
      width: 480,
      height: 695,
    },
    {
      src: `${dir}/flag.svg`,
      credit: {
        author: 'AdiJapan',
        license: 'Public domain',
        url: 'https://commons.wikimedia.org/wiki/File:Flag_of_Romania.svg',
      },
      alt: 'Bandiera della Romania',
      kind: 'flag',
      width: 72,
      height: 48,
    },
  ],
  sources,
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
          credit={{
            author: 'petomis',
            license: 'Tutti i diritti riservati',
            url: 'https://www.petomis.com',
          }}
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
                fortezza a 1.200 m di quota sui monti Orăștie, diventa il centro del regno con
                Decebalo. È il principale centro politico, religioso e artigianale del regno.
              </Detail>
              <Detail on="always">
                Con altre cinque fortezze dei monti Orăștie fa parte del{' '}
                <N href="https://it.wikipedia.org/wiki/Fortezze_dacie_dei_monti_Orăștie">
                  patrimonio mondiale dell’UNESCO
                </N>
                .
              </Detail>
              <Today traces={[RoTrace.SarmizegetusaRegia]} />
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
              <Today traces={[RoTrace.TrajansBridgeRuins, RoTrace.TrajansColumnCopy]} />
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
              <Today traces={[RoTrace.ConstantaRomanMosaic]} />
            </Event>
            <Context on="always" period="Oggi" title="Una lingua neolatina">
              Il romeno è una lingua romanza, come l’italiano: <i>apă</i> è acqua, <i>pâine</i>{' '}
              pane, <i>frate</i> fratello, <i>a cânta</i> cantare. Nei secoli prende molte parole
              dallo slavo, dal greco, dal turco, dall’ungherese e poi dal francese. Fino
              all’Ottocento si scrive con l’alfabeto cirillico: l’alfabeto latino diventa ufficiale
              nei principati negli anni Sessanta dell’Ottocento.
            </Context>
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
                Nell’XI secolo i nomadi delle steppe, prima i{' '}
                <N href="https://it.wikipedia.org/wiki/Peceneghi">Peceneghi</N> e poi i{' '}
                <N href="https://it.wikipedia.org/wiki/Cumani">Cumani</N>, attraversano più volte il
                Danubio; una parte di loro si stabilisce nella regione.
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
              <Today traces={[RoTrace.BrasovBlackChurch, RoTrace.BranCastle]} />
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
              <Today traces={[RoTrace.VladDraculHouse]} />
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
            <Event on={[Transylvania]} date="1441–1456" title="Iancu de Hunedoara">
              <Detail on={[Transylvania]}>
                Nel 1441 il re Vladislao nomina voivoda di Transilvania{' '}
                <N href="https://it.wikipedia.org/wiki/Giovanni_Hunyadi">Iancu de Hunedoara</N>{' '}
                (Hunyadi János in ungherese), di una famiglia di piccola nobiltà di origine romena.
                Dal 1446 governa il Regno d’Ungheria in nome del re bambino Ladislao V.
              </Detail>
              <Detail on={[Transylvania]}>
                Nel luglio 1456 difende Belgrado (oggi in Serbia) dall’assedio di Maometto II. Muore
                di peste nell’accampamento l’11 agosto ed è sepolto nella cattedrale di Alba Iulia.
                Nel 1458 il figlio{' '}
                <N href="https://it.wikipedia.org/wiki/Mattia_Corvino">Mattia Corvino</N> diventa re
                d’Ungheria.
              </Detail>
              <Today traces={[RoTrace.CorvinCastle]} />
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
              <Today traces={[RoTrace.SuceavaCitadel]} />
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
              <Today traces={[RoTrace.CurteaDeArgesRoyalTombs]} />
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
                A Mohács, in Ungheria, gli ottomani distruggono l’esercito ungherese. Due re si
                contendono il trono,{' '}
                <N href="https://it.wikipedia.org/wiki/Giovanni_I_d%27Ungheria">
                  Giovanni I d’Ungheria
                </N>{' '}
                e{' '}
                <N href="https://it.wikipedia.org/wiki/Ferdinando_I_d%27Asburgo">
                  Ferdinando I d’Asburgo
                </N>
                , e nel 1538, con il{' '}
                <N href="https://it.wikipedia.org/wiki/Trattato_di_Gran_Varadino">
                  trattato di Gran Varadino
                </N>
                , si dividono il regno.
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
              <Today traces={[RoTrace.VoronetMonastery]} />
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
                <D>1541</D> Gli ottomani di{' '}
                <N href="https://it.wikipedia.org/wiki/Solimano_il_Magnifico">
                  Solimano il Magnifico
                </N>{' '}
                prendono <N href="https://it.wikipedia.org/wiki/Buda">Buda</N> (oggi parte di
                Budapest), capitale del{' '}
                <N href="https://it.wikipedia.org/wiki/Regno_d%27Ungheria">Regno d’Ungheria</N>. Le
                terre a est del Tibisco, Transilvania compresa, diventano un principato con una
                propria Dieta, autonomo ma tributario del sultano. Il{' '}
                <N href="https://it.wikipedia.org/wiki/Trattato_di_Spira">trattato di Spira</N> lo
                formalizza nel 1570.
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
                La Dieta stabilisce che ogni comunità può tenere il predicatore di cui accetta
                l’insegnamento, e che nessuno può essere perseguitato per la sua religione: tutela
                le comunità, non ancora il singolo. Ne nasce il sistema delle quattro confessioni
                riconosciute, <N href="https://it.wikipedia.org/wiki/Chiesa_cattolica">cattolica</N>
                , <N href="https://it.wikipedia.org/wiki/Luteranesimo">luterana</N>,{' '}
                <N href="https://it.wikipedia.org/wiki/Calvinismo">calvinista</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Unitarianesimo">unitaria</N>. Gli{' '}
                <N href="https://it.wikipedia.org/wiki/Chiesa_ortodossa_rumena">ortodossi</N>, cioè
                quasi tutti i romeni, restano soltanto tollerati. Per questo nelle città della
                Transilvania trovi chiese di confessioni diverse a pochi passi l’una dall’altra.
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
                <D>1595</D> Michele, principe di Valacchia, batte gli ottomani a Călugăreni.{' '}
                <D>1599–1600</D> Conquista la Transilvania e poi la Moldavia: per pochi mesi del
                1600 i tre principati hanno un solo sovrano, ma ciascuno conserva le proprie
                istituzioni.
              </Detail>
              <Detail on={[Transylvania, Wallachia, Moldavia]}>
                {/* Days omitted on purpose: sources mix Julian and Gregorian dates (murder on 9 or 19 August). */}
                Nel settembre 1600 la nobiltà transilvana e le truppe imperiali di{' '}
                <N href="https://it.wikipedia.org/wiki/Giorgio_Basta">Giorgio Basta</N> lo
                sconfiggono a Mirăslău. Nell’agosto <D>1601</D>, circa due settimane dopo aver vinto
                insieme a Basta la{' '}
                <N href="https://it.wikipedia.org/wiki/Battaglia_di_Guruslău">
                  battaglia di Guruslău
                </N>
                , i soldati dello stesso Basta lo uccidono a{' '}
                <N href="https://it.wikipedia.org/wiki/Câmpia_Turzii">Câmpia Turzii</N>, vicino a{' '}
                <N href="https://it.wikipedia.org/wiki/Turda">Turda</N>.
              </Detail>
              <Today traces={[RoTrace.MichaelTheBraveHeadTomb, RoTrace.MihaiVodaChurch]} />
            </Event>
          </Timeline>

          <Timeline section={RoSection.OttomanSuzeraintyTransylvania}>
            <Context on={[Transylvania]} period="XVII secolo" title="Arriva il mais">
              Il <N href="https://it.wikipedia.org/wiki/Mais">mais</N>, arrivato dalle Americhe,
              compare nelle fonti transilvane nel 1611 e diventa presto il cibo dei contadini: la
              mămăligă, che prima si preparava con il miglio, da allora si fa con la farina di mais.
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
                {/* Day omitted on purpose: sources give 13 or 23 October 1613. */}
                Eletto principe a <N href="https://it.wikipedia.org/wiki/Cluj-Napoca">Cluj</N> nel
                1613 con l’appoggio della{' '}
                <N href="https://it.wikipedia.org/wiki/Sublime_Porta">Porta</N>, riempie le casse
                con monopoli di Stato e nuove miniere, e nella{' '}
                <N href="https://it.wikipedia.org/wiki/Guerra_dei_trent%27anni">
                  guerra dei Trent’anni
                </N>{' '}
                invade tre volte l’
                <N href="https://it.wikipedia.org/wiki/Ungheria_asburgica">Ungheria asburgica</N>.
                Ad <N href="https://it.wikipedia.org/wiki/Alba_Iulia">Alba Iulia</N>, sua capitale,
                fonda nel 1622 un collegio riformato di livello superiore: l’edificio, poi
                trasformato in caserma, sorge ancora nella cittadella.
              </Detail>
            </Event>
            <Event on={[Transylvania]} date="1657–1662" title="La crisi del principato">
              <Detail on={[Transylvania]}>
                <N href="https://it.wikipedia.org/wiki/Giorgio_II_Rákóczi">György II Rákóczi</N>{' '}
                invade la{' '}
                <N href="https://it.wikipedia.org/wiki/Confederazione_polacco-lituana">Polonia</N>{' '}
                senza il consenso del sultano, viene sconfitto e deposto. Negli anni di guerra che
                seguono gli ottomani prendono{' '}
                <N href="https://it.wikipedia.org/wiki/Oradea">Oradea</N> e distruggono la capitale{' '}
                <N href="https://it.wikipedia.org/wiki/Alba_Iulia">Alba Iulia</N>.
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
                Scelto su richiesta degli ottomani, è il primo principe a invitare il vescovo
                ortodosso alla Dieta. Dopo la sconfitta ottomana a{' '}
                <N href="https://it.wikipedia.org/wiki/Battaglia_di_Vienna">Vienna</N>, nel 1683,
                accetta nel 1686 presidi imperiali a{' '}
                <N href="https://it.wikipedia.org/wiki/Deva_(Romania)">Deva</N> e a{' '}
                <N href="https://it.wikipedia.org/wiki/Cluj-Napoca">Cluj</N>: comincia il passaggio
                agli Asburgo.
              </Detail>
            </Event>
          </Timeline>

          <Timeline section={RoSection.OttomanSuzeraintyWallachia}>
            <BoyarsContext on={[Wallachia]} />
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
                <N href="https://it.wikipedia.org/wiki/Sublime_Porta">Porta</N> triplica il tributo.
                Poi riapre le miniere, costruisce o restaura una trentina di chiese e nel 1646 fonda
                una scuola superiore a{' '}
                <N href="https://it.wikipedia.org/wiki/Târgoviște">Târgoviște</N>, allora capitale.
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
                <N href="https://it.wikipedia.org/wiki/Mais">mais</N> in Valacchia. Nel <D>1688</D>,
                l’anno della sua morte, a Bucarest viene stampata la{' '}
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
                nel 1639 e nel 1642 porta la stampa in Moldavia. Nel 1653 i boiardi lo rovesciano.
              </Detail>
              <Today traces={[RoTrace.IasiThreeHierarchsMonastery]} />
            </Event>
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
              <N href="https://it.wikipedia.org/wiki/Babadag">Babadag</N>.
            </Context>
            <Event on={[Dobruja]} date="1593–1595" title={<>Arrivano i tatari</>}>
              <Detail on={[Dobruja]}>
                {/* TODO verificare: second source for 1593–1595 (Wikipedia, after F. de Jong). */}
                Per rafforzare la frontiera i sultani insediano in Dobrogea tatari{' '}
                <N href="https://it.wikipedia.org/wiki/Nogai">nogai</N> e del{' '}
                <N href="https://it.wikipedia.org/wiki/Budjak">Bugeac</N>, con terre in cambio del
                servizio militare. I loro discendenti sono ancora oggi una comunità della regione.
              </Detail>
            </Event>
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
                vengono affidate fino al 1821 a{' '}
                <N href="https://it.wikipedia.org/wiki/Ospodaro">ospodari</N> nominati dal sultano,
                quasi sempre greci del <N href="https://it.wikipedia.org/wiki/Fanar">Fanar</N>.
              </Detail>
              <Detail on={[Moldavia, Wallachia]}>
                Ogni nomina si paga a Istanbul e si ripaga con nuove tasse, ma i principi fanarioti
                finanziano anche scuole e riforme:{' '}
                <N href="https://ro.wikipedia.org/wiki/Constantin_Mavrocordat">
                  Constantin Mavrocordat
                </N>{' '}
                libera i servi dal vincolo personale con il signore in Valacchia nel 1746 e in
                Moldavia nel 1749. Non i rom, che restano schiavi.
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
                La <N href="https://it.wikipedia.org/wiki/Impero_russo">Russia</N> occupa Moldavia e
                Valacchia per tutta la guerra. La{' '}
                <N href="https://it.wikipedia.org/wiki/Trattato_di_Küçük_Kaynarca">
                  pace di Küçük Kaynarca
                </N>{' '}
                (1774) lascia i principati agli ottomani, ma permette alla Russia di intervenire in
                loro favore presso la Porta: da qui comincia la sua influenza sui principati.
              </Detail>
            </Event>
            <Event
              on={[Moldavia, Wallachia]}
              date="1806–1812"
              title={
                <>
                  La Russia prende la{' '}
                  <N href="https://it.wikipedia.org/wiki/Bessarabia">Bessarabia</N>
                </>
              }
            >
              <Detail on={[Moldavia, Wallachia]}>
                Nel 1806 l’esercito russo occupa i due principati. La{' '}
                <N href="https://it.wikipedia.org/wiki/Trattato_di_Bucarest_(1812)">
                  pace firmata a Bucarest
                </N>{' '}
                nel 1812 dà alla Russia la parte della Moldavia fra{' '}
                <N href="https://it.wikipedia.org/wiki/Prut">Prut</N> e{' '}
                <N href="https://it.wikipedia.org/wiki/Dnestr">Dnestr</N>: è la Bessarabia, che
                corrisponde in gran parte all’attuale Repubblica di Moldova. Il resto della Moldavia
                e la Valacchia tornano sotto la sovranità ottomana.
              </Detail>
            </Event>
          </Timeline>

          <Timeline section={RoSection.ThreeEmpiresTransylvania}>
            <Event on={[Transylvania]} date="1688–1699" title={<>Dagli ottomani agli Asburgo</>}>
              <Detail on={[Transylvania]}>
                Nel 1688 la Dieta rinuncia alla sovranità ottomana e accetta la protezione degli{' '}
                <N href="https://it.wikipedia.org/wiki/Asburgo">Asburgo</N>. Con il{' '}
                <N work>Diploma Leopoldinum</N> (1691) Vienna conferma i privilegi delle{' '}
                <N href="https://it.wikipedia.org/wiki/Unio_Trium_Nationum">Tre Nazioni</N> e delle
                quattro confessioni, lasciandone fuori i romeni ortodossi, e governa da Sibiu. Nel
                1699 la{' '}
                <N href="https://it.wikipedia.org/wiki/Pace_di_Carlowitz">pace di Carlowitz</N>{' '}
                chiude il passaggio.
              </Detail>
              <Today traces={[RoTrace.AlbaIuliaCitadel, RoTrace.SibiuBrukenthalPalace]} />
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
                Il vescovo greco-cattolico chiede alla Dieta parità per i romeni, che pagano più
                tasse e danno più soldati di ogni altra nazione. Viene deriso e ripara a Roma. Dopo
                di lui i preti formati a Roma e a Vienna, la{' '}
                <N href="https://ro.wikipedia.org/wiki/Școala_Ardeleană">Scuola transilvana</N>,
                sostengono le origini daco-romane del popolo, adattano al romeno l’
                <N href="https://it.wikipedia.org/wiki/Alfabeto_latino">alfabeto latino</N> e fanno
                di Blaj, sede della Chiesa greco-cattolica, il centro della cultura romena.
              </Detail>
            </Event>
            <Event
              on={[Transylvania]}
              date="1784–1785"
              title={
                <>
                  <N href="https://it.wikipedia.org/wiki/Rivolta_di_Horea,_Cloșca_e_Crișan">
                    Rivolta di Horea, Cloșca e Crișan
                  </N>
                </>
              }
            >
              <Detail on={[Transylvania]}>
                I servi romeni, convinti di avere l’appoggio dell’imperatore, saccheggiano castelli
                e uccidono circa cento nobili. Horea e Cloșca vengono suppliziati sulla ruota ad
                Alba Iulia nel febbraio 1785; Crișan si toglie la vita in carcere. Subito dopo{' '}
                <N href="https://it.wikipedia.org/wiki/Giuseppe_II_d%27Asburgo-Lorena">
                  Giuseppe II
                </N>{' '}
                abolisce la{' '}
                <N href="https://it.wikipedia.org/wiki/Servitù_della_gleba">servitù personale</N>.
                Nella cittadella di Alba Iulia, davanti alla terza porta, un obelisco ricorda i tre
                capi.
              </Detail>
            </Event>
            <Event
              on={[Transylvania]}
              date="1791"
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
                Gli intellettuali della Scuola transilvana chiedono a{' '}
                <N href="https://it.wikipedia.org/wiki/Leopoldo_II_d%27Asburgo-Lorena">
                  Leopoldo II
                </N>{' '}
                che i romeni, discendenti dei coloni romani, siano riconosciuti come quarta nazione,
                con diritti politici. La Dieta concede la libertà di culto agli ortodossi, ma
                respinge la parità.
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
                Per ventisei anni tiene la Valacchia in equilibrio fra ottomani, Asburgo e Russia.
                Il suo nome resta legato allo stile brâncovenesc, che unisce la tradizione bizantina
                e il barocco occidentale: logge su colonne di pietra scolpita, ornamenti vegetali,
                portici dipinti. Lo vedi al monastero di Horezu, patrimonio UNESCO, al palazzo di
                Mogoșoaia vicino a Bucarest e in molte chiese della capitale.
              </Detail>
              <Detail on={[Wallachia]}>
                Nel 1714 viene deposto e decapitato a Istanbul insieme ai quattro figli. La Chiesa
                ortodossa romena lo venera come santo martire.
              </Detail>
              <Today traces={[RoTrace.HorezuMonastery, RoTrace.StavropoleosChurch]} />
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
                Il principe di Moldavia passa dalla parte di{' '}
                <N href="https://it.wikipedia.org/wiki/Pietro_I_di_Russia">Pietro il Grande</N>{' '}
                contro gli ottomani, in cambio di un trono ereditario per la sua famiglia. In luglio
                l’esercito russo-moldavo è{' '}
                <N href="https://it.wikipedia.org/wiki/Battaglia_del_Prut">sconfitto sul Prut</N>, e
                Cantemir fugge in Russia con molti boiardi. In esilio scrive in latino la{' '}
                <N work>Descriptio Moldaviae</N>, una descrizione del suo paese.
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
                <N href="https://it.wikipedia.org/wiki/Stefano_III_il_Grande">Stefano il Grande</N>.
                L’ospodaro{' '}
                <N href="https://ro.wikipedia.org/wiki/Grigore_al_III-lea_Ghica">
                  Grigore III Ghica
                </N>{' '}
                protesta e nel 1777 viene ucciso a Iași. Con il nome di Bucovina la regione resta
                austriaca fino al 1918 e attira coloni ucraini, tedeschi, ebrei e armeni.
              </Detail>
              <Today traces={[RoTrace.StephenTheGreatTomb]} />
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
                Nella nuova provincia russa arrivano coloni bulgari,{' '}
                <N href="https://it.wikipedia.org/wiki/Gagauzi">gagauzi</N>, tedeschi ed ebrei. Lo
                Statuto del 1818 le dà una certa autonomia, con il romeno accanto al russo
                nell’amministrazione di{' '}
                <N href="https://it.wikipedia.org/wiki/Chișinău">Chișinău</N>, oggi capitale della
                Moldova.
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
                cosacchi zaporoghi si rifugiano nel delta, sotto la protezione del sultano. La loro
                ultima Sič, a Dunavăț, dura dal 1814 al 1828. I loro discendenti vivono ancora nel
                delta.
              </Detail>
            </Event>
            <Event on={[Dobruja]} date="1791–1812" title="Guerre russo-ottomane in Dobrogea">
              <Detail on={[Dobruja]}>
                Gli eserciti russi passano più volte il Danubio e prendono le fortezze della
                Dobrogea: Măcin, Isaccea, Tulcea, Hârșova. Con la{' '}
                <N href="https://it.wikipedia.org/wiki/Trattato_di_Bucarest_(1812)">
                  pace di Bucarest
                </N>{' '}
                del 1812 la regione resta ottomana, ma sull’altra riva del Danubio ora c’è la{' '}
                <N href="https://it.wikipedia.org/wiki/Bessarabia">Bessarabia</N> russa.
              </Detail>
            </Event>
          </Timeline>
        </Part>

        {/* Source ledger and outstanding independent checks: content/ro/research/history/modern-history.md. */}
        <Part section={RoSection.NationalState}>
          <Timeline on="always">
            <Event
              on={[Wallachia, Moldavia]}
              date="1821–1822"
              title="Finiscono le nomine fanariote"
            >
              <Detail on={[Wallachia, Moldavia]}>
                La rivolta di <N>Tudor Vladimirescu</N> in Valacchia e l’insurrezione greca nei
                principati vengono sconfitte dagli ottomani. Nel 1822 il sultano torna a nominare
                principi delle famiglie locali. Valacchia e Moldavia restano tributarie della Porta.
              </Detail>
            </Event>
            <Event
              on={[Wallachia, Moldavia]}
              date="1829–1832"
              title="La Russia tutela i principati"
            >
              <Detail on={[Wallachia, Moldavia]}>
                Il trattato di Adrianopoli rafforza il controllo russo, senza abolire la sovranità
                ottomana. I <N>Regolamenti organici</N>, introdotti in Valacchia nel 1831 e in
                Moldavia nel 1832, riorganizzano amministrazione e finanze, ma conservano il potere
                dei boiardi.
              </Detail>
            </Event>
            <Event
              on={[Wallachia, Moldavia, Transylvania]}
              date="1848–1849"
              title="Le rivoluzioni dividono i progetti nazionali"
            >
              <Detail on={[Wallachia, Moldavia]}>
                In Moldavia la protesta viene subito repressa; in Valacchia un governo
                rivoluzionario chiede diritti e riforma agraria. L’intervento ottomano e russo
                chiude l’esperienza.
              </Detail>
              <Detail on={[Transylvania]}>
                In Transilvania viene abolita la servitù della gleba. La rivoluzione ungherese vuole
                l’unione con l’Ungheria; l’assemblea romena di <N>Blaj</N> rivendica il
                riconoscimento politico dei romeni. Il conflitto diventa una guerra, con violenze
                contro i civili. Nel 1849 gli eserciti asburgico e russo sconfiggono la rivoluzione
                ungherese.
              </Detail>
            </Event>
            <Event
              on={[Moldavia, Wallachia]}
              date="1855–1856"
              title="Viene abolita la schiavitù dei rom"
            >
              <Detail on={[Moldavia, Wallachia]}>
                Dopo le liberazioni degli schiavi dello Stato e dei monasteri, le leggi del 1855 in
                Moldavia e del 1856 in Valacchia liberano anche quelli dei privati. I proprietari
                ricevono indennizzi; gli ex schiavi non ricevono un sostegno equivalente per vivere
                autonomamente. La libertà giuridica non cancella l’esclusione sociale.
              </Detail>
            </Event>
            <Event
              on={[Wallachia, Moldavia]}
              date="1859–1864"
              title="Cuza unisce Valacchia e Moldavia"
            >
              <Detail on={[Wallachia, Moldavia]}>
                Le grandi potenze, dopo la guerra di Crimea, permettono ai due principati di darsi
                istituzioni simili ma non di unirsi. I patrioti aggirano il divieto: il{' '}
                <D>5 gennaio 1859</D> l’assemblea di Iași elegge <N>Alexandru Ioan Cuza</N>, il{' '}
                <D>24 gennaio</D> quella di Bucarest elegge lo stesso uomo. Le potenze accettano il
                fatto compiuto, e il 24 gennaio è ancora festa nazionale. Nel 1862 governo e
                Parlamento vengono unificati: <N>Bucarest</N> diventa la capitale comune. La
                sovranità ottomana continua.
              </Detail>
              <Detail on={[Wallachia, Moldavia]}>
                Nel 1863 Cuza confisca le immense proprietà dei monasteri, circa un quarto delle
                terre del paese, in gran parte dipendenti da monasteri greci. Nel 1864 vara una
                riforma agraria che dà terra ai contadini e rende obbligatoria e gratuita
                l’istruzione primaria. Per farlo scioglie il Parlamento dei grandi proprietari e
                governa per decreto.
              </Detail>
            </Event>
            {/* TODO verificare: second independent source for the railway opening; MWNF checked. */}
            <Event on={[Dobruja]} date="1860" title="Una ferrovia attraversa la Dobrogea ottomana">
              <Detail on={[Dobruja]}>
                Una compagnia britannica apre la linea <N>Cernavodă–Constanța</N>: collega il
                Danubio al Mar Nero per il trasporto delle merci. La regione è ancora amministrata
                dagli ottomani. È la prima via delle merci fra il Danubio e il mare: il ruolo che la
                regione ha ancora oggi.
              </Detail>
            </Event>
            <Event on={[Wallachia, Moldavia]} date="1866" title="Carol I e la nuova costituzione">
              <Detail on={[Wallachia, Moldavia]}>
                Conservatori e liberali, nemici fra loro, si alleano contro Cuza: è la «coalizione
                mostruosa». Nella notte dell’<D>11 febbraio 1866</D> un gruppo di ufficiali entra
                nella sua camera da letto e lo costringe ad abdicare; morirà in esilio. Per evitare
                le lotte fra famiglie di boiardi si chiama un principe straniero, <N>Carol I</N>. La
                nuova costituzione, sul modello di quella belga, istituisce una monarchia
                costituzionale. Il voto dipende dal censo e la cittadinanza resta preclusa ai non
                cristiani: la norma colpisce soprattutto gli ebrei.
              </Detail>
              <Today traces={[RoTrace.PelesCastle]} />
            </Event>
            <Event
              on={[Transylvania]}
              date="1867"
              title="La Transilvania entra nella metà ungherese dell’impero"
            >
              <Detail on={[Transylvania]}>
                Il compromesso austro-ungarico sancisce l’integrazione della Transilvania nel Regno
                d’Ungheria. La politica di diffusione dell’ungherese nelle scuole e
                nell’amministrazione alimenta le rivendicazioni dei romeni. La regione resta
                nell’Austria-Ungheria fino al 1918.
              </Detail>
            </Event>
            <Event
              on={[Wallachia, Moldavia, Dobruja]}
              date="1877–1878"
              title="L’indipendenza e la Dobrogea settentrionale"
            >
              <Detail on={[Wallachia, Moldavia, Dobruja]}>
                Il <D>9 maggio 1877</D> la Romania proclama l’indipendenza e combatte contro gli
                ottomani insieme alla Russia: l’esercito romeno, guidato da Carol, partecipa
                all’assedio di <N>Plevna</N>, in Bulgaria, e ne esce con il prestigio della prima
                vittoria del nuovo Stato. Il congresso di Berlino la riconosce nel 1878, a
                condizione che elimini le discriminazioni religiose. La Romania riceve la Dobrogea
                settentrionale e il delta del Danubio, ma cede alla Russia la Bessarabia meridionale
                ricevuta nel 1856, oggi tra Moldova e Ucraina.
              </Detail>
              <Today
                traces={[
                  RoTrace.ConstantaOvidSquare,
                  RoTrace.ConstantaGrandMosque,
                  RoTrace.KingCarolIBridge,
                ]}
              />
            </Event>
            <Event
              on={[Wallachia, Moldavia, Dobruja]}
              date="1881"
              title="La Romania diventa un regno"
            >
              <Detail on={[Wallachia, Moldavia, Dobruja]}>
                Carol I assume il titolo di re. Lo Stato comprende Valacchia, la parte occidentale
                della Moldavia e la Dobrogea settentrionale. La Bucovina resta asburgica: il nome
                «Moldavia» indica una regione storica più vasta del territorio governato da
                Bucarest.
              </Detail>
            </Event>
            <Context on="always" kind="curiosity" period="1857" title="La città a petrolio">
              Nel 1857 la Romania è il primo paese a registrare nelle statistiche ufficiali una
              produzione di petrolio, e Bucarest si vanta di essere la prima città al mondo con
              l’illuminazione pubblica a lampade di petrolio. Intorno a <N>Ploiești</N> nasce una
              delle prime industrie petrolifere d’Europa.
            </Context>
            <Event on="always" date="1906" title="L’esposizione del giubileo">
              <Detail on="always">
                Per i quarant’anni di regno di Carol I, Bucarest apre nel nuovo parco Carol una
                grande esposizione nazionale: è la vetrina di un paese che in una generazione si è
                dato ferrovie, porti, un esercito, un’università, il ponte sul Danubio di Cernavodă
                e i palazzi della «Piccola Parigi». Il petrolio di Ploiești è fra le prime industrie
                d’Europa. Fuori dalle città, però, la maggior parte dei romeni sono contadini senza
                terra propria, che lavorano le grandi proprietà in affitto.
              </Detail>
              <Today traces={[RoTrace.RomanianAthenaeum]} />
            </Event>
          </Timeline>
        </Part>

        <Part section={RoSection.WorldWars}>
          <Timeline on="always">
            <Event
              on={[Moldavia, Wallachia]}
              date="1907"
              title="La rivolta contadina viene repressa dall’esercito"
            >
              <Detail on={[Moldavia, Wallachia]}>
                La rivolta parte dalla Moldavia e si estende alla Valacchia. I contadini contestano
                affitti e condizioni di lavoro sulle grandi proprietà; si verificano anche attacchi
                antisemiti. Il governo impiega l’esercito. La distribuzione della terra resta una
                frattura sociale dietro le facciate della modernizzazione.
              </Detail>
            </Event>
            <Event on={[Dobruja]} date="1913" title="La Romania annette la Dobrogea meridionale">
              <Detail on={[Dobruja]}>
                Dopo la seconda guerra balcanica, il trattato di Bucarest assegna alla Romania anche
                la Dobrogea meridionale, o <N>Quadrilatero</N>, oggi in Bulgaria. Questo territorio
                resta romeno fino al 1940: non coincide con la Dobrogea romena che si visita oggi.
              </Detail>
            </Event>
            <Event on="always" date="1916–1918" title="La Romania entra nella Grande guerra">
              <Detail on="always">
                Dopo due anni di neutralità, nell’agosto 1916 la Romania si schiera con l’Intesa,
                che le promette la Transilvania, e attacca l’Austria-Ungheria. La controffensiva
                tedesca, austriaca e bulgara è rapida: a dicembre cade <N>Bucarest</N>, e due terzi
                del paese sono occupati. Governo, corte, esercito e centinaia di migliaia di
                profughi si stringono in Moldavia, dove nell’inverno il tifo uccide più delle
                battaglie.
              </Detail>
              <Detail on="always">
                Nell’estate del 1917, riorganizzato con l’aiuto di una missione francese, l’esercito
                ferma l’offensiva tedesca a <N>Mărășești</N>: «Di qui non si passa». Ma con la
                rivoluzione russa l’alleato a est scompare, e nel maggio 1918 la Romania firma una
                pace separata; rientra in guerra il giorno prima dell’armistizio, a novembre.
              </Detail>
              <Detail on={[Moldavia]}>
                <N>Iași</N> ospita governo e corte; la regina Maria lavora negli ospedali.
              </Detail>
            </Event>
            <Context
              on="always"
              kind="curiosity"
              period="1916"
              title="Un Hohenzollern contro la Germania"
            >
              Re Ferdinando, nipote di Carol I, è un principe tedesco della stessa famiglia del
              Kaiser. Quando la Romania dichiara guerra alla Germania, Guglielmo II lo fa cancellare
              dal registro della casa Hohenzollern.
            </Context>
            <Context on="always" kind="curiosity" period="1916" title="Il dadaismo è anche romeno">
              Nel febbraio 1916, al Cabaret Voltaire di Zurigo, nasce il dadaismo. Fra i fondatori
              ci sono due giovani romeni: il poeta{' '}
              <N href="https://it.wikipedia.org/wiki/Tristan_Tzara">Tristan Tzara</N>, nato a
              Moinești come Samuel Rosenstock, e il pittore e architetto{' '}
              <N href="https://it.wikipedia.org/wiki/Marcel_Janco">Marcel Janco</N>, di Bucarest.
            </Context>
            <Event on="always" date="1918–1920" title="Le unioni del 1918 e i nuovi confini">
              <Detail on="always">
                Alla fine della guerra assemblee in Bessarabia, Bucovina e Transilvania votano
                l’unione con la Romania. Nasce la cosiddetta «Grande Romania», con ampie minoranze
                ungheresi, tedesche, ebraiche e ucraine. I trattati del dopoguerra definiscono i
                confini; l’Unione Sovietica non riconoscerà l’annessione della Bessarabia, oggi tra
                Moldova e Ucraina.
              </Detail>
              <Detail on={[Transylvania]}>
                Il <D>1° dicembre 1918</D> l’assemblea romena di <N>Alba Iulia</N> proclama
                l’unione. La Sala dell’Unione conserva la memoria dell’assemblea. Il trattato del
                Trianon del 1920 sancisce il passaggio della Transilvania dall’Ungheria alla
                Romania.
              </Detail>
              <Today
                traces={[
                  RoTrace.AlbaIuliaUnionHall,
                  RoTrace.ClujAvramIancuSquare,
                  RoTrace.TimisoaraUnionSquare,
                ]}
              />
              <Detail on={[Moldavia]}>
                Anche la Bucovina entra nel regno. Solo la sua parte meridionale, con
                <N> Suceava</N>, appartiene alla Romania attuale; quella settentrionale è oggi
                ucraina.
              </Detail>
            </Event>
            <Event
              on="always"
              date="1921–1923"
              title="Riforma agraria e costituzione del regno ampliato"
            >
              <Detail on="always">
                La riforma agraria ridistribuisce terre ai contadini. La costituzione del 1923
                consolida uno Stato centralizzato e proclama l’uguaglianza dei cittadini. Il
                suffragio universale maschile allarga la partecipazione, ma ingerenze del governo
                nelle elezioni e discriminazioni verso le minoranze limitano quei diritti.
              </Detail>
            </Event>
            <Event on="always" date="1927–1930" title="Un re bambino e un re che torna">
              <Detail on="always">
                Il principe ereditario Carol rinuncia al trono per vivere con l’amante,{' '}
                <N>Elena Lupescu</N>. Quando Ferdinando muore, nel 1927, re diventa il figlio di
                Carol, <N>Mihai</N>, che ha cinque anni, sotto una reggenza. Nel 1930 Carol torna in
                aereo dall’esilio, si fa proclamare re al posto del figlio e comincia a svuotare i
                partiti. Mihai sarà così re due volte.
              </Detail>
            </Event>
            <Event on="always" date="1938" title="Carol II impone la dittatura reale">
              <Detail on="always">
                Il re sospende il sistema parlamentare e scioglie i partiti. La violenza politica e
                l’antisemitismo segnano il decennio; la <N>Guardia di Ferro</N>, movimento fascista,
                mescola nazionalismo, religione e omicidi politici: nel 1933 i suoi uomini uccidono
                il primo ministro Ion Gheorghe Duca. Nel novembre 1938 il re fa uccidere il capo
                della Guardia, <N>Corneliu Zelea Codreanu</N>, «durante un tentativo di fuga»;
                l’anno dopo i legionari assassinano il primo ministro Armand Călinescu. La
                persecuzione degli ebrei precede l’alleanza con la Germania nazista.
              </Detail>
            </Event>
            <Context on="always" period="1930 – 1990" title="Tre romeni a Parigi">
              Negli anni Trenta a Bucarest si fa notare una generazione di giovani intellettuali:{' '}
              <N href="https://it.wikipedia.org/wiki/Mircea_Eliade">Mircea Eliade</N>,{' '}
              <N href="https://it.wikipedia.org/wiki/Emil_Cioran">Emil Cioran</N>,{' '}
              <N href="https://it.wikipedia.org/wiki/Eugène_Ionesco">Eugène Ionesco</N>. Eliade e
              Cioran simpatizzano per la Guardia di Ferro; Ionesco vede gli amici convertirsi e ne
              farà una commedia, <N work>Il rinoceronte</N> (1959). Dopo la guerra restano tutti in
              Occidente: Ionesco diventa uno dei padri del teatro dell’assurdo, Cioran scrive in
              francese i suoi aforismi, Eliade insegna storia delle religioni a Chicago. Il regime
              comunista li pubblica poco o nulla: in Romania tornano davvero dopo il 1989.
            </Context>
            <Event on="always" date="1940" title="La Romania perde territori e si allea con l’Asse">
              <Detail on="always">
                L’URSS occupa Bessarabia e Bucovina settentrionale, oggi tra Moldova e Ucraina.
                L’arbitrato imposto da Germania e Italia assegna la Transilvania settentrionale
                all’Ungheria; la Dobrogea meridionale torna alla Bulgaria. In tre mesi la Grande
                Romania perde un terzo del territorio. Carol II abdica in favore di Mihai e fugge;
                il generale <N>Ion Antonescu</N> prende il potere insieme alla Guardia di Ferro,
                nello «Stato nazionale legionario». La Romania aderisce all’Asse. A novembre i
                legionari massacrano nel carcere di Jilava oltre sessanta detenuti politici del
                vecchio regime.
              </Detail>
            </Event>
            <Event on="always" date="1941" title="La ribellione legionaria e il pogrom di Bucarest">
              <Detail on="always">
                Nel gennaio 1941 la Guardia di Ferro si ribella ad Antonescu. Per tre giorni i
                legionari assaltano le istituzioni e devastano i quartieri ebraici di Bucarest:
                circa centoventi ebrei vengono uccisi, alcuni nel mattatoio della città. Con il
                consenso di Hitler, l’esercito schiaccia la rivolta, e Antonescu resta solo al
                potere, con il titolo di Conducător.
              </Detail>
            </Event>
            <Event on="always" date="1941–1944" title="La guerra contro l’URSS e la Shoah">
              <Detail on="always">
                Antonescu partecipa all’invasione dell’URSS. Autorità e reparti romeni organizzano
                massacri e deportazioni di ebrei; nel 1942 deportano anche rom in Transnistria, il
                territorio allora occupato tra Dnestr e Bug, oggi tra Moldova e Ucraina. Fame,
                malattie e uccisioni provocano morti di massa. A <N>Odessa</N>, nell’ottobre 1941,
                le truppe romene uccidono decine di migliaia di ebrei per rappresaglia.
              </Detail>
              <Detail on="always">
                Secondo la commissione internazionale presieduta da Elie Wiesel, che nel 2004 chiude
                decenni di negazione ufficiale, sotto l’autorità romena muoiono fra 280.000 e
                380.000 ebrei e oltre 11.000 rom. Nell’autunno del 1942, quando le sorti della
                guerra cambiano, Antonescu rinuncia a consegnare ai nazisti gli ebrei del Regno e
                della Transilvania meridionale: circa metà degli ebrei di Romania sopravvive.
              </Detail>
              <Detail on="always">
                Al fronte la Romania manda più soldati di ogni altro alleato della Germania: a{' '}
                <N>Stalingrado</N>, nel novembre 1942, due armate romene vengono distrutte. Il
                petrolio di Ploiești alimenta la macchina da guerra tedesca, e nel 1943 e nel 1944
                gli Alleati lo bombardano.
              </Detail>
              <Detail on={[Moldavia]}>
                Nel giugno 1941 a <N>Iași</N> militari, poliziotti e civili partecipano al pogrom;
                molti sopravvissuti muoiono sui «treni della morte».
              </Detail>
              <Detail on={[Transylvania]}>
                Nella Transilvania settentrionale, amministrata dall’Ungheria, nel 1944 le autorità
                ungheresi collaborano con i nazisti alla deportazione degli ebrei ad Auschwitz, oggi
                in Polonia. Responsabilità e amministrazioni sono diverse da quelle del territorio
                governato da Antonescu.
              </Detail>
            </Event>
            <Event
              on="always"
              date="1944–1947"
              title="Dal cambio di fronte alla fine della monarchia"
            >
              <Detail on="always">
                Il <D>23 agosto 1944</D> re <N>Mihai I</N>, ventiduenne, convoca Antonescu a palazzo
                e lo fa arrestare. La Romania cambia schieramento e combatte contro la Germania fino
                alla fine della guerra, ma l’Armata Rossa entra nel paese e vi resta. Nel marzo 1945
                Mosca impone un governo guidato da <N>Petru Groza</N>; le elezioni del 1946 sono
                truccate a favore dei comunisti, e lo stesso anno Antonescu viene processato e
                fucilato. Il trattato di pace del 1947 restituisce la Transilvania settentrionale e
                conferma le altre perdite territoriali del 1940. I comunisti eliminano le
                opposizioni e il <D>30 dicembre 1947</D> costringono il re ad abdicare, con la
                minaccia di spargimenti di sangue: viene proclamata la repubblica popolare.
              </Detail>
            </Event>
            <Context on="always" kind="curiosity" period="1945" title="La medaglia di Stalin">
              Per il 23 agosto Stalin conferisce a Mihai l’Ordine della Vittoria, la massima
              onorificenza militare sovietica: è uno dei pochissimi stranieri a riceverlo. Due anni
              dopo lo stesso regime lo manda in esilio. Mihai torna in Romania solo dopo il 1989, e
              muore nel 2017.
            </Context>
          </Timeline>
        </Part>

        <Part section={RoSection.Communism}>
          <Timeline on="always">
            <Event
              on="always"
              date="1948–1962"
              title="Nazionalizzazioni, Securitate e collettivizzazione"
            >
              <Detail on="always">
                Il regime di <N>Gheorghe Gheorghiu-Dej</N> nazionalizza le imprese e crea la
                <N> Securitate</N>, la polizia politica. Dal 1949 al 1962 la collettivizzazione
                impone ai contadini di cedere terre e mezzi di lavoro. Arresti, deportazioni e
                lavoro forzato colpiscono oppositori reali o presunti.
              </Detail>
              <Detail on={[Dobruja]}>
                Tra il 1949 e il 1953 il cantiere del canale Danubio–Mar Nero usa anche detenuti
                politici. Il canale oggi visibile viene completato nel 1984, dopo la ripresa dei
                lavori negli anni Settanta.
              </Detail>
            </Event>
            <Event on="always" date="1965" title="Ceaușescu prende il potere">
              <Detail on="always">
                <N>Nicolae Ceaușescu</N> succede a Gheorghiu-Dej alla guida del partito. La nuova
                costituzione cambia il nome dello Stato in Repubblica socialista di Romania; il
                partito mantiene il monopolio politico.
              </Detail>
              <Today traces={[RoTrace.PrimaveriiPalace]} />
            </Event>
            <Event on="always" date="1966" title="Il decreto 770 limita l’aborto">
              <Detail on="always">
                Il regime restringe drasticamente l’aborto e l’accesso alla contraccezione per
                aumentare le nascite. Gli aborti clandestini causano morti evitabili e molte
                famiglie non riescono a mantenere i figli. La politica demografica invade la vita
                privata; le restrizioni vengono abrogate dopo la caduta del regime.
              </Detail>
            </Event>
            <Event
              on="always"
              date="1968"
              title="Ceaușescu condanna l’invasione della Cecoslovacchia"
            >
              <Detail on="always">
                Il <D>21 agosto 1968</D>, davanti a una folla enorme nella piazza del palazzo reale,
                Ceaușescu condanna l’intervento militare guidato dall’URSS in Cecoslovacchia. È il
                momento della sua massima popolarità, in patria e in Occidente: per anni i governi
                occidentali lo trattano come il comunista che sfida Mosca. L’autonomia diplomatica
                non abolisce però la censura e la repressione interne.
              </Detail>
            </Event>
            <Event on="always" date="1971" title="Le Tesi di luglio chiudono l’apertura">
              <Detail on="always">
                Dopo un viaggio in Cina e in Corea del Nord, Ceaușescu presenta le «Tesi di luglio»:
                la cultura torna sotto il controllo del partito, finisce la breve stagione di
                relativa libertà degli anni Sessanta. Comincia a crescere il culto della
                personalità.
              </Detail>
            </Event>
            <Event on="always" date="1974" title="Un presidente con lo scettro">
              <Detail on="always">
                Ceaușescu crea per sé la carica di presidente della Repubblica e, alla cerimonia, ne
                riceve lo scettro. Da allora il potere si concentra nella sua famiglia: la moglie{' '}
                <N>Elena</N> diventa la seconda figura del regime, presentata come scienziata di
                fama mondiale.
              </Detail>
            </Event>
            <Context on="always" kind="curiosity" period="1974" title="Il telegramma di Dalí">
              Salvador Dalí manda a Ceaușescu un telegramma di congratulazioni per lo scettro, così
              esagerato da essere una presa in giro. Il quotidiano del partito, Scînteia, lo
              pubblica in prima pagina senza accorgersene.
            </Context>
            <Context
              on="always"
              period="Anni Settanta e Ottanta"
              title="Fabbriche e quartieri di blocchi"
            >
              L’industrializzazione forzata sposta milioni di persone dalle campagne alle città.
              Acciaierie, raffinerie e fabbriche chimiche crescono anche dove mancano materie prime
              e mercati; intorno sorgono quartieri di condomini tutti uguali, che ridisegnano le
              periferie e i centri urbani.
            </Context>
            <Event on="always" date="1977" title="Il terremoto e lo sciopero dei minatori">
              <Detail on="always">
                Il <D>4 marzo 1977</D> un terremoto uccide circa 1.500 persone, quasi tutte a
                Bucarest. In agosto decine di migliaia di minatori della valle del Jiu scendono in
                sciopero e trattengono per ore un membro del governo; Ceaușescu va da loro e
                promette di accogliere le richieste; nei mesi seguenti, però, i capi della protesta
                vengono arrestati o trasferiti. Lo stesso anno lo scrittore <N>Paul Goma</N> chiede
                il rispetto dei diritti umani ed è costretto all’esilio.
              </Detail>
            </Event>
            <Event on="always" date="1981–1989" title="Il debito ripagato con la fame">
              <Detail on="always">
                Ceaușescu decide di ripagare tutto il debito estero, oltre dieci miliardi di
                dollari, il prima possibile. Carne, latte e verdure partono per l’esportazione,
                mentre in patria pane, zucchero e olio si comprano con la tessera, dopo ore di fila.
                Le case restano fredde d’inverno, la luce si spegne per ore, la televisione
                trasmette due ore al giorno, dedicate quasi tutte al capo. Nella primavera del 1989
                il regime annuncia che il debito è estinto.
              </Detail>
            </Event>
            <Event on="always" date="1984–1989" title="Bucarest demolita, villaggi da cancellare">
              <Detail on="always">
                Per costruire la Casa del Popolo e il nuovo centro civico vengono rasi al suolo
                quartieri storici di Bucarest, con chiese, monasteri e migliaia di case; alcune
                chiese sono spostate su rotaie e nascoste dietro i condomini. Nel 1988 il regime
                annuncia la «sistematizzazione» delle campagne: migliaia di villaggi andrebbero
                demoliti e gli abitanti trasferiti in centri agroindustriali. Le proteste
                all’estero, soprattutto in Ungheria, fanno conoscere il progetto, che il crollo del
                regime ferma.
              </Detail>
              <Today traces={[RoTrace.PalaceOfTheParliament]} />
            </Event>
            <Event on="always" date="1987–1989" title="Le prime crepe">
              <Detail on="always">
                Il <D>15 novembre 1987</D> gli operai della fabbrica di camion Steagul Roșu di{' '}
                <N>Brașov</N> scendono in strada contro i tagli ai salari e assaltano la sede del
                partito; la rivolta viene repressa. A Cluj la professoressa <N>Doina Cornea</N>{' '}
                scrive lettere aperte trasmesse da Radio Europa Libera, e finisce agli arresti
                domiciliari. Nel marzo 1989 sei vecchi dirigenti comunisti accusano Ceaușescu in una
                lettera pubblica, la «Lettera dei sei». Intorno, in pochi mesi, cadono i regimi di
                Polonia, Ungheria, Germania Est, Cecoslovacchia e Bulgaria: in Romania nulla sembra
                muoversi.
              </Detail>
            </Event>
            <Event on="always" date="dicembre 1989" title="Timișoara si ribella">
              <Detail on="always">
                Il <D>16 dicembre</D> i fedeli del pastore ungherese <N>László Tőkés</N>, che il
                regime vuole trasferire, si radunano davanti alla sua casa a <N>Timișoara</N>. Si
                uniscono romeni, studenti, operai: la protesta diventa una rivolta contro il regime.
                Il 17 l’esercito e la Securitate sparano sulla folla e uccidono decine di persone;
                oltre quaranta corpi vengono portati di nascosto a Bucarest e cremati, per farli
                sparire. Il 20 gli operai entrano in sciopero e la città si dichiara «libera dal
                comunismo».
              </Detail>
              <Today traces={[RoTrace.TimisoaraTokesParsonage, RoTrace.TimisoaraOperaBalcony]} />
            </Event>
            <Event on="always" date="dicembre 1989" title="Bucarest: il comizio e la fuga">
              <Detail on="always">
                Il <D>21 dicembre</D> Ceaușescu convoca un grande comizio per condannare i
                «teppisti» di Timișoara. Dalla folla partono fischi e grida, e la televisione, in
                diretta, interrompe la trasmissione: per la prima volta il paese vede il dittatore
                esitare. La sera i manifestanti occupano il centro, e la repressione fa decine di
                morti. La mattina del 22 il ministro della difesa, Vasile Milea, muore, suicida
                secondo la versione ufficiale; l’esercito passa dalla parte della folla, che invade
                la sede del Comitato centrale. Ceaușescu ed Elena fuggono in elicottero dal tetto.
                Poche ore dopo, alla televisione occupata, il <N>Fronte di salvezza nazionale</N>{' '}
                guidato da <N>Ion Iliescu</N>, un ex dirigente del partito, annuncia di aver preso
                il potere.
              </Detail>
              <Today traces={[RoTrace.CentralCommitteeBuilding]} />
            </Event>
            <Event on="always" date="dicembre 1989" title="I «terroristi» e il processo di Natale">
              <Detail on="always">
                I Ceaușescu vengono catturati il pomeriggio stesso vicino a <N>Târgoviște</N> e
                chiusi in una caserma. Intanto a Bucarest e in altre città si spara per giorni: la
                televisione parla di «terroristi» fedeli al dittatore. Dei circa 1.100 morti della
                rivoluzione, la maggior parte cade dopo la sua fuga, e quei terroristi non verranno
                mai identificati. Il <D>25 dicembre</D> un tribunale militare improvvisato processa
                i coniugi in meno di un’ora, per genocidio e distruzione dell’economia; sono
                fucilati subito dopo nel cortile della caserma. Le immagini del processo e dei corpi
                vanno in onda in televisione.
              </Detail>
            </Event>
          </Timeline>

          <Callout on="always" kind="debate" title="Perché processarli e fucilarli in poche ore?">
            <Positions>
              <Position on="always" title="Per fermare la guerra civile">
                È la versione del Fronte di salvezza nazionale: finché Ceaușescu era vivo, i suoi
                fedeli avrebbero continuato a combattere per liberarlo. Dopo la fucilazione, e la
                sua diffusione in televisione, gli scontri in effetti si spengono in pochi giorni.
              </Position>
              <Position on="always" title="Per non farlo parlare">
                Molti storici e testimoni sottolineano che i nuovi capi venivano quasi tutti dal
                partito e dagli apparati del regime. Un vero processo avrebbe chiarito chi aveva
                ordinato di sparare, prima e dopo il 22 dicembre; un processo di un’ora, senza
                difesa reale, chiudeva la questione.
              </Position>
            </Positions>
            <Note on="always">
              Le due spiegazioni non si escludono. Restano i fatti: la Romania è l’unico paese del
              blocco sovietico dove il regime cade nel sangue e il capo viene giustiziato. Quella
              dei Ceaușescu è l’ultima esecuzione del paese: la pena di morte viene abolita pochi
              giorni dopo, nel gennaio 1990. Se il dicembre 1989 sia stato una rivoluzione popolare
              o anche un colpo di Stato dentro il regime è ancora discusso; nel 2019 la procura ha
              accusato Iliescu e altri dirigenti di crimini contro l’umanità per i morti dopo il 22
              dicembre, ma il processo non arriva mai a sentenza: Iliescu muore nell’agosto 2025, e
              per i morti dopo il 22 dicembre nessuno è stato condannato.
            </Note>
          </Callout>
        </Part>

        <Part section={RoSection.DemocracyAndEurope}>
          <Timeline on="always">
            <Event
              on="always"
              date="1990–1991"
              title="Elezioni, violenza politica e nuova costituzione"
            >
              <Detail on="always">
                A marzo 1990 a <N>Târgu Mureș</N> scontri fra romeni e ungheresi fanno alcuni morti.
                A maggio le prime elezioni libere danno a <N>Ion Iliescu</N> e al Fronte di salvezza
                nazionale una vittoria schiacciante. In piazza dell’Università, a Bucarest, studenti
                e oppositori chiedono da settimane che gli ex dirigenti comunisti lascino la
                politica: Iliescu li chiama «teppisti», e a giugno migliaia di minatori arrivati
                dalla valle del Jiu li sgomberano con la violenza. Nel 1991 i minatori tornano e
                fanno cadere il governo. La costituzione del 1991 stabilisce il quadro della
                repubblica pluralista.
              </Detail>
            </Event>
            <Context
              on="always"
              kind="curiosity"
              period="1992 – 1994"
              title="Caritas, il gioco che moltiplicava per otto"
            >
              In un paese impoverito dall’inflazione, un contabile, Ioan Stoica, fonda a Brașov e
              poi sposta a Cluj un gioco che promette di restituire otto volte la somma versata in
              tre mesi. Milioni di romeni vi versano i risparmi, alcuni vendono la casa: uno schema
              piramidale che crolla nel 1994 e lascia rovinate moltissime famiglie.
            </Context>
            <Context
              on="always"
              kind="curiosity"
              period="1994"
              title="L’estate della generazione d’oro"
            >
              Ai Mondiali degli Stati Uniti la nazionale di <N>Gheorghe Hagi</N>, il «Maradona dei
              Carpazi», batte la Colombia, con un pallonetto di Hagi da vicino alla linea laterale,
              e i padroni di casa. Il <D>3 luglio</D>, al Rose Bowl di Pasadena, elimina l’Argentina
              3-2, con due gol di Ilie Dumitrescu e uno di Hagi; esce ai quarti, ai rigori, contro
              la Svezia. In un paese impoverito dalla transizione, quella notte Piața Universității
              si riempie come nel dicembre 1989. Per i romeni quella squadra è ancora la «Generația
              de aur», la generazione d’oro.
            </Context>
            <Event on="always" date="1996" title="La prima alternanza">
              <Detail on="always">
                Per la prima volta dal 1989 il potere cambia mano con il voto: vince{' '}
                <N>Emil Constantinescu</N>, candidato dell’opposizione di centrodestra, e il partito
                della minoranza ungherese entra al governo. Seguono anni di privatizzazioni e
                chiusure di fabbriche e miniere; nel 1999 una nuova marcia dei minatori su Bucarest
                viene fermata dalla polizia prima di arrivare.
              </Detail>
            </Event>
            <Event on="always" date="2000" title="Il ritorno di Iliescu">
              <Detail on="always">
                Deluso dalla crisi, il paese rielegge Iliescu. Al secondo turno contro di lui arriva
                Corneliu Vadim Tudor, del partito nazionalista Grande Romania: molti elettori votano
                Iliescu solo per fermare l’estrema destra.
              </Detail>
            </Event>
            <Context
              on="always"
              period="Dagli anni Novanta"
              title="Privatizzazioni ed emigrazione cambiano il paese"
            >
              La transizione all’economia di mercato chiude o ridimensiona molte industrie, e le
              opportunità si distribuiscono in modo diseguale. Dalla fine degli anni Novanta, e
              ancora di più dopo il 2007, milioni di romeni partono per lavorare all’estero: fra i
              tre e i cinque milioni vivono oggi fuori dal paese. In Italia i romeni sono la prima
              comunità straniera, circa un milione di persone. Le rimesse costruiscono case nei
              villaggi; molti bambini crescono con i nonni.
            </Context>
            <Context on="always" kind="curiosity" period="2002" title="L’arcobaleno di Bush">
              Nel novembre 2002, il giorno dopo l’invito ufficiale a entrare nella NATO, George W.
              Bush parla in piazza della Rivoluzione, sotto il balcone da cui Ceaușescu aveva fatto
              il suo ultimo discorso. Mentre parla, sul cielo di Bucarest compare un arcobaleno, e
              il presidente lo indica alla folla come un buon segno.
            </Context>
            <Event
              on="always"
              date="2004–2007"
              title="La Romania entra nella NATO e nell’Unione Europea"
            >
              <Detail on="always">
                Il <D>29 marzo 2004</D> la Romania aderisce alla NATO; il <D>1° gennaio 2007</D>
                entra nell’Unione Europea. Sono due passaggi distinti: il primo riguarda l’alleanza
                militare, il secondo istituzioni, mercato e cittadinanza europei. Per vigilare sulla
                giustizia e sulla corruzione, Bruxelles affianca all’adesione un meccanismo di
                controllo che resta in vigore fino al 2023. Presidente, dal 2004 al 2014, è{' '}
                <N>Traian Băsescu</N>, ex capitano di marina.
              </Detail>
            </Event>
            <Context on="always" period="Dal 2005" title="La nouvelle vague del cinema romeno">
              Nel 2005 <N work>La morte del signor Lăzărescu</N> di Cristi Puiu vince a Cannes nella
              sezione Un Certain Regard; nel 2007 Cristian Mungiu vince la Palma d’oro con{' '}
              <N work>4 mesi, 3 settimane, 2 giorni</N>, la storia di un aborto clandestino negli
              anni del decreto 770. Con Corneliu Porumboiu e Radu Jude, Orso d’oro a Berlino nel
              2021, la critica parla di nouvelle vague romena: film a basso costo, inquadrature
              lunghe, ironia sulla burocrazia e sul passato recente.
            </Context>
            <Event on="always" date="2010" title="L’austerità">
              <Detail on="always">
                Con la crisi finanziaria il governo, per ottenere un prestito dal Fondo monetario
                internazionale, taglia del 25% gli stipendi pubblici e alza l’IVA dal 19 al 24%. Per
                molte famiglie è un’altra spinta a emigrare.
              </Detail>
            </Event>
            <Context on="always" period="2013 – 2019" title="La lotta alla corruzione">
              La Direzione nazionale anticorruzione, guidata da <N>Laura Codruța Kövesi</N>, porta a
              processo ministri, parlamentari, sindaci e un ex primo ministro: per molti romeni è la
              prova che nessuno è più intoccabile. I critici denunciano gli accordi segreti fra
              procure e servizi segreti. Nel 2018 il governo ottiene la rimozione di Kövesi; l’anno
              dopo lei diventa la prima procuratrice capo europea.
            </Context>
            <Event on="always" date="2014" title="Il presidente della diaspora">
              <Detail on="always">
                Davanti ai consolati romeni di mezza Europa, anche in Italia, gli emigrati fanno ore
                di fila per votare, e molti non ci riescono. La protesta mobilita il paese: vince a
                sorpresa <N>Klaus Iohannis</N>, sindaco di Sibiu e membro della minoranza tedesca,
                contro il favorito, il primo ministro Victor Ponta.
              </Detail>
            </Event>
            <Event on="always" date="2015" title="L’incendio del Colectiv">
              <Detail on="always">
                Il <D>30 ottobre 2015</D> scoppia un incendio durante un concerto al club Colectiv
                di Bucarest: muoiono 64 persone, molte nelle settimane seguenti, in ospedale, per
                infezioni. Il locale non aveva le autorizzazioni. Decine di migliaia di persone
                scendono in piazza con lo slogan «La corruzione uccide», e il governo si dimette.
              </Detail>
            </Event>
            <Event on="always" date="2017–2019" title="Le piazze delle luci">
              <Detail on="always">
                Nel febbraio 2017 il governo approva di notte un decreto che depenalizza alcuni
                abusi d’ufficio. Fino a mezzo milione di persone protestano in tutto il paese: sono
                le manifestazioni più grandi dal 1989, e in piazza della Vittoria la folla accende
                le torce dei telefoni. Il decreto viene ritirato. Il <D>10 agosto 2018</D> una
                protesta della diaspora a Bucarest viene dispersa con i gas lacrimogeni. Nel 2019 il
                capo del partito di governo, Liviu Dragnea, entra in carcere per corruzione.
              </Detail>
            </Event>
            <Context on="always" kind="curiosity" period="2017 – 2019" title="Simona Halep">
              Nata a Constanța nel 1991, nel 2017 diventa la numero uno del tennis mondiale, vince
              il Roland Garros nel 2018 e Wimbledon nel 2019. Una squalifica per doping, ridotta in
              appello nel 2024, segna la fine della sua carriera: si ritira nel 2025. Prima di lei,
              nel 1973, Ilie Năstase era stato il primo numero uno della classifica mondiale
              maschile.
            </Context>
            <Event on="always" date="2022" title="La guerra alla frontiera">
              <Detail on="always">
                Con l’invasione russa dell’Ucraina la guerra arriva al confine nord e al delta del
                Danubio. Milioni di profughi ucraini attraversano la Romania, la NATO rafforza le
                sue truppe nel paese e il porto di <N>Constanța</N> diventa una delle vie d’uscita
                del grano ucraino. Frammenti di droni russi cadono più volte in territorio romeno.
              </Detail>
            </Event>
            <Event
              on="always"
              date="2024–2025"
              title="Schengen elimina i controlli alle frontiere interne"
            >
              <Detail on="always">
                I controlli sulle persone alle frontiere aeree e marittime interne vengono eliminati
                il <D>31 marzo 2024</D>; quelli alle frontiere terrestri interne il{' '}
                <D>1° gennaio 2025</D>. L’ingresso in Schengen completa un percorso diverso
                dall’adesione all’UE e non comporta l’adozione dell’euro.
              </Detail>
            </Event>
            <Event
              on="always"
              date="2024–2025"
              title="Le presidenziali vengono annullate e ripetute"
            >
              <Detail on="always">
                Al primo turno, a novembre 2024, arriva primo <N>Călin Georgescu</N>, un candidato
                nazionalista e filorusso quasi sconosciuto, spinto da una campagna su TikTok. I
                servizi segreti rendono pubblici documenti su una campagna coordinata e finanziata
                in modo irregolare, con tracce che portano alla Russia, e il <D>6 dicembre 2024</D>{' '}
                la Corte costituzionale annulla l’intero processo elettorale: un caso senza
                precedenti nell’Unione Europea. A Georgescu viene impedito di ricandidarsi. Alle
                nuove elezioni, nel maggio 2025, il primo turno lo vince il nazionalista George
                Simion; al ballottaggio vince il sindaco di Bucarest, <N>Nicușor Dan</N>, matematico
                e indipendente.
              </Detail>
            </Event>
          </Timeline>

          <Callout on="always" kind="debate" title="Annullare un’elezione: difesa o ferita?">
            <Positions>
              <Position on="always" title="Una democrazia che si difende">
                Per la Corte e per i partiti europeisti il voto era stato falsato da una campagna
                illegale e da un’interferenza straniera: lasciarlo valere avrebbe consegnato la
                presidenza a chi aveva aggirato le regole.
              </Position>
              <Position on="always" title="Un precedente pericoloso">
                Per i sostenitori di Georgescu, e per molti giuristi anche lontani da lui, le prove
                rese pubbliche non dimostravano che il risultato fosse stato rovesciato: annullare
                un voto già espresso rischia di dare ragione a chi dice che il sistema decide
                comunque al posto degli elettori.
              </Position>
            </Positions>
            <Note on="always">
              Nel 2025 Georgescu viene rinviato a giudizio per propaganda legionaria e per azioni
              contro l’ordine costituzionale; i processi sono in corso. Nel dicembre 2024 la
              Commissione europea ha aperto un procedimento contro TikTok per il suo ruolo nelle
              elezioni romene.
            </Note>
          </Callout>
        </Part>

        <Callout on="always" kind="remember">
          <Text on="always">
            La Romania nasce dall’unione di Valacchia e Moldavia nel 1859; la Dobrogea
            settentrionale entra nel 1878 e la Transilvania nel 1918. I confini cambiano ancora
            durante la seconda guerra mondiale. Dopo la dittatura comunista e la rivoluzione del
            1989, il paese costruisce istituzioni democratiche ed entra nella NATO e nell’Unione
            Europea. Le diverse storie regionali restano leggibili nelle lingue, nei luoghi di culto
            e nei monumenti.
          </Text>
        </Callout>
      </Chapter>

      <Chapter
        section={RoSection.People}
        lede="Chi ha fatto la storia romena, e dove lo incontri ancora."
      >
        <Card
          card={RoPerson.Decebalus}
          intro={
            <>
              Ultimo re della Dacia, regna dall’<D>87</D> al <D>106</D> da{' '}
              <N href="https://it.wikipedia.org/wiki/Sarmizegetusa_Regia">Sarmizegetusa Regia</N>.
              Tiene testa a due imperatori. Con{' '}
              <N href="https://it.wikipedia.org/wiki/Domiziano">Domiziano</N> firma nell’<D>89</D>{' '}
              una pace che gli porta denaro e ingegneri romani per le sue fortezze. Contro{' '}
              <N href="https://it.wikipedia.org/wiki/Traiano">Traiano</N> perde due guerre: nel{' '}
              <D>106</D> i romani prendono la capitale e lui, braccato sui monti, si toglie la vita
              prima di essere catturato. La sua testa viene portata a Roma.
            </>
          }
          remember="Il re che Traiano dovette vincere due volte."
        >
          <Context on="always" kind="curiosity" period="106" title="Il tesoro del Sargetia">
            Lo storico <N href="https://it.wikipedia.org/wiki/Cassio_Dione">Cassio Dione</N>{' '}
            racconta che Decebalo fa deviare il fiume Sargetia, seppellisce nel suo letto il tesoro
            reale e poi rimette l’acqua al suo posto; i prigionieri che hanno scavato vengono uccisi
            perché nessuno parli. Dopo la sconfitta un suo compagno, Bicilis, rivela il nascondiglio
            ai romani. Con il bottino della Dacia Traiano costruisce a Roma il suo Foro, con la
            colonna che racconta la guerra.
          </Context>
          <Context
            on="always"
            kind="curiosity"
            period="Scoperta nel 1965"
            title="Il cavaliere che lo raggiunse"
          >
            Nel 1965, a Grammeni, nella Macedonia greca, viene alla luce la lapide di{' '}
            <N>Tiberio Claudio Massimo</N>, cavaliere romano. L’iscrizione dice che fu lui a
            catturare Decebalo e a portarne la testa a Traiano; il rilievo lo mostra al galoppo
            verso il re caduto. È la stessa scena della colonna Traiana, raccontata dal soldato che
            l’ha vissuta.
          </Context>
        </Card>
        <Card
          card={RoPerson.VladTheImpaler}
          intro={
            <>
              Figlio di <N href="https://it.wikipedia.org/wiki/Vlad_II_Dracul">Vlad II Dracul</N>,
              da cui il nome Dracula, «figlio di Dracul». Nel <D>1442</D> il padre lo consegna come
              ostaggio agli ottomani, insieme al fratello Radu. Regna sulla Valacchia tre volte, la
              più lunga dal <D>1456</D> al <D>1462</D>. Nel giugno <D>1462</D> attacca di notte
              l’accampamento di <N href="https://it.wikipedia.org/wiki/Maometto_II">Maometto II</N>{' '}
              vicino a Târgoviște, ma deve fuggire in Transilvania, dove{' '}
              <N href="https://it.wikipedia.org/wiki/Mattia_Corvino">Mattia Corvino</N> lo fa
              imprigionare per più di dieci anni. Torna sul trono nel <D>1476</D> e muore
              combattendo poco dopo. Le stampe tedesche dell’epoca ne fanno un tiranno sanguinario:
              il soprannome Țepeș, «l’Impalatore», gli viene dato dopo la morte. In Romania è
              ricordato anche come il principe che sfida gli ottomani. Il conte vampiro di{' '}
              <N href="https://it.wikipedia.org/wiki/Bram_Stoker">Bram Stoker</N> (<D>1897</D>)
              prende da lui il nome e poco altro.
            </>
          }
          remember="Dracula è un nome di famiglia: il vampiro arriva quattro secoli dopo."
        >
          <Context on="always" kind="curiosity" period="1431" title="Il drago, non il diavolo">
            Nel 1431 l’imperatore Sigismondo accoglie il padre nell’
            <N href="https://it.wikipedia.org/wiki/Ordine_del_Drago">Ordine del Drago</N>, nato per
            difendere la cristianità dagli ottomani: da qui il soprannome Dracul, «il drago». In
            romeno la stessa parola finisce per indicare il diavolo, e il nome del figlio prende una
            sfumatura sinistra che Stoker sfrutta quattro secoli dopo.
          </Context>
          <Context on="always" period="1462" title="Radu, il fratello rimasto">
            Il fratello minore,{' '}
            <N href="https://it.wikipedia.org/wiki/Radu_III_di_Valacchia">Radu il Bello</N>, cresce
            alla corte ottomana e resta fedele al sultano. Nel 1462, quando Vlad fugge, è Radu che
            Maometto II mette sul trono di Valacchia: i due ragazzi consegnati insieme come ostaggi
            si ritrovano adulti su fronti opposti.
          </Context>
        </Card>
        <Card
          card={RoPerson.StephenTheGreat}
          intro={
            <>
              Principe della Moldavia dal <D>1457</D> al <D>1504</D>, <N>Stefano il Grande</N> è il
              volto che ritrovi nei monumenti e nei monasteri della regione. Nel gennaio <D>1475</D>{' '}
              sconfigge a <N href="https://it.wikipedia.org/wiki/Battaglia_di_Vaslui">Vaslui</N> un
              grande esercito ottomano, e papa{' '}
              <N href="https://it.wikipedia.org/wiki/Papa_Sisto_IV">Sisto IV</N> lo chiama «atleta
              di Cristo». L’anno dopo, a Războieni, perde contro{' '}
              <N href="https://it.wikipedia.org/wiki/Maometto_II">Maometto II</N>, ma le fortezze
              moldave resistono e il sultano si ritira. Negli ultimi anni accetta di pagare tributo
              alla Porta pur di conservare il principato. Fonda chiese e monasteri, e la sua memoria
              tiene insieme due immagini: il sovrano che protegge il proprio Stato e il santo
              venerato dalla Chiesa ortodossa romena. A Putna e a Suceava puoi vedere come lo stesso
              principe venga raccontato con linguaggi diversi.
            </>
          }
          remember="Un principe di Moldavia, ricordato nelle piazze come sovrano e nelle chiese come santo."
        >
          <Context
            on="always"
            kind="curiosity"
            period="Leggenda"
            title="La madre alla porta di Neamț"
          >
            Dopo una sconfitta, forse quella di Războieni, Stefano arriva ferito alla fortezza di
            Neamț, dove si trova sua madre. Lei non gli fa aprire: un principe torna a casa solo da
            vincitore. La scena non ha fonti dell’epoca, ma nell’Ottocento{' '}
            <N href="https://it.wikipedia.org/wiki/Dimitrie_Bolintineanu">Dimitrie Bolintineanu</N>{' '}
            ne fa una poesia che i bambini romeni imparano a scuola.
          </Context>
          <Context
            on="always"
            kind="curiosity"
            period="XVI secolo"
            title="I monasteri dipinti vengono dopo"
          >
            I monasteri della Bucovina con gli affreschi sulle facciate sono spesso legati al suo
            nome, ma le pitture esterne arrivano quasi tutte più tardi, sotto il figlio{' '}
            <N href="https://it.wikipedia.org/wiki/Petru_Rare%C8%99">Petru Rareș</N> e i suoi
            successori. Voroneț, per esempio, è fondato da Stefano nel 1488 e dipinto all’esterno
            solo nel 1547.
          </Context>
          <Context on="always" kind="curiosity" period="2006" title="Il più grande romeno">
            Nel 2006 la televisione pubblica romena organizza <N>Mari Români</N>, un concorso sul
            modello della BBC per scegliere il più grande romeno di tutti i tempi. Vince Stefano.
          </Context>
        </Card>
        <Card
          card={RoPerson.MichaelTheBrave}
          intro={
            <>
              Principe di Valacchia dal <D>1593</D>, combatte gli ottomani nella{' '}
              <N href="https://it.wikipedia.org/wiki/Lunga_guerra_turca">lunga guerra turca</N>,
              alleato dell’imperatore asburgico. Nel <D>1600</D> regna per pochi mesi anche su
              Transilvania e Moldavia, che conservano ciascuna le proprie istituzioni; l’anno dopo
              viene ucciso. Dall’Ottocento, a partire da{' '}
              <N href="https://it.wikipedia.org/wiki/Nicolae_Bălcescu">Nicolae Bălcescu</N>, gli
              storici romeni ne fanno il simbolo dell’unione dei romeni: per questo il suo nome è su
              piazze, strade e scuole in tutto il paese.
            </>
          }
          remember="Per pochi mesi del 1600 regna su tre principati: è l’Ottocento a farne il simbolo della loro unione."
        >
          <Context on="always" period="1593 – 1594" title="Il trono comprato">
            Come molti principi del suo tempo, Michele ottiene il trono pagandolo a Costantinopoli,
            con denaro preso in prestito da creditori levantini e ottomani. Nel novembre 1594 si
            ribella, e i creditori riuniti a Bucarest vengono uccisi. Il principe della lotta contro
            gli ottomani comincia come debitore del sistema che combatte.
          </Context>
          <Context on="always" period="Fine Cinquecento" title="La «legge di Michele»">
            Per tenersi i boiardi, che gli forniscono soldati, Michele lega i contadini al villaggio
            in cui si trovano: non possono più andarsene. La misura, ricordata come «legătura lui
            Mihai», pesa a lungo sui contadini della Valacchia; gli storici discutono se sia stata
            una vera legge o una pratica confermata da lui. Il simbolo dell’unione è anche il
            principe della servitù della gleba.
          </Context>
        </Card>
        <Card
          card={RoPerson.CarolI}
          intro={
            <>
              Principe tedesco della famiglia Hohenzollern-Sigmaringen, nel <D>1866</D> è chiamato
              sul trono dei principati uniti di Valacchia e Moldavia. Nella{' '}
              <N href="https://it.wikipedia.org/wiki/Guerra_russo-turca_(1877-1878)">
                guerra russo-turca
              </N>{' '}
              l’esercito romeno combatte a fianco della Russia: il{' '}
              <N href="https://it.wikipedia.org/wiki/Congresso_di_Berlino">congresso di Berlino</N>{' '}
              (<D>1878</D>) riconosce l’indipendenza e assegna alla Romania la Dobrogea. Nel{' '}
              <D>1881</D> diventa re e regna fino alla morte, nel <D>1914</D>. Castelli, ponti e
              piazze portano ancora il suo segno; il regime comunista lo toglie dai luoghi pubblici,
              e dopo il 1989 ci torna.
            </>
          }
          remember="Il principe tedesco con cui la Romania diventa un regno indipendente: il comunismo lo toglie dalle piazze, la Romania di oggi ce lo rimette."
        >
          <Context on="always" kind="curiosity" period="1866" title="In incognito sul Danubio">
            Austria e Prussia stanno per entrare in guerra, e un principe prussiano non può
            attraversare l’Austria apertamente. Karl viaggia in treno con un passaporto svizzero a
            nome di Karl Hettingen, poi sale su un battello del Danubio e sbarca a Turnu Severin.
            Arriva sul suo nuovo trono senza parlare romeno.
          </Context>
          <Context on="always" period="1914" title="La guerra negata">
            Dal 1883 la Romania è legata in segreto alla Triplice alleanza. Nell’agosto 1914, nel
            Consiglio della Corona riunito al castello di Peleș, Carol chiede di entrare in guerra
            con Germania e Austria-Ungheria; ministri e capi dei partiti scelgono la neutralità.
            Muore due mesi dopo. Nel 1916 la Romania entra in guerra, contro la Germania.
          </Context>
        </Card>
        <Card
          card={RoPerson.MihaiEminescu}
          intro={
            <>
              Nasce nel <D>1850</D> a Botoșani, in Moldavia, studia a Vienna e a Berlino e vive tra
              Iași e Bucarest, dove scrive per il quotidiano conservatore <N>Timpul</N>. Nel{' '}
              <D>1883</D> esce <N>Poesii</N>, l’unico volume di poesie pubblicato in vita, curato da{' '}
              <N href="https://it.wikipedia.org/wiki/Titu_Maiorescu">Titu Maiorescu</N>; lo stesso
              anno si ammala, e muore nel <D>1889</D>. La scuola romena lo insegna come «poeta
              nazionale»: il 15 gennaio, giorno della sua nascita, è la Giornata della cultura
              nazionale, il suo volto è sulla banconota da 500 lei e quasi ogni città ha una sua
              strada o una sua statua. I suoi articoli politici, nazionalisti e con passaggi
              xenofobi e antisemiti, dividono ancora gli studiosi.
            </>
          }
          remember="Il poeta che i romeni studiano a scuola e ritrovano in ogni città: un simbolo nazionale, non solo un autore."
        >
          <Context on="always" period="1883" title="Luceafărul">
            Nel 1883 esce anche{' '}
            <N href="https://it.wikipedia.org/wiki/Luceaf%C4%83rul">Luceafărul</N>, il suo poema più
            celebre. L’astro del mattino si innamora di una fanciulla e chiede di diventare mortale
            per lei; il permesso gli è negato, e lei sceglie un paggio. L’astro torna nel suo cielo,
            «nemuritor și rece», immortale e freddo: per molti romeni è il ritratto del poeta
            stesso.
          </Context>
          <Context on="always" kind="curiosity" period="1889" title="Veronica">
            Il legame più lungo della sua vita è con la poetessa{' '}
            <N href="https://it.wikipedia.org/wiki/Veronica_Micle">Veronica Micle</N>, sposata
            quando si conoscono, a Vienna nel 1872. Eminescu muore il 15 giugno 1889; lei muore meno
            di due mesi dopo, ai primi di agosto, al monastero di Văratec.
          </Context>
        </Card>
        <Card
          card={RoPerson.QueenMarie}
          intro={
            <>
              Nipote della{' '}
              <N href="https://it.wikipedia.org/wiki/Regina_Vittoria">regina Vittoria</N>, nasce in
              Inghilterra nel <D>1875</D> e a diciassette anni sposa Ferdinando, nipote ed erede di
              Carol I. Diventa regina nel <D>1914</D>. Nella Prima guerra mondiale, quando i
              tedeschi occupano Bucarest, segue governo e corte a Iași e lavora negli ospedali; nel{' '}
              <D>1919</D> va alla conferenza di pace di Parigi a difendere la causa della Grande
              Romania. Nel <D>1922</D> è incoronata con Ferdinando ad Alba Iulia. Scrive romanzi,
              fiabe e memorie, in inglese. Il regime comunista la toglie dai libri di storia; dopo
              il 1989 diventa una delle figure più amate dai romeni.
            </>
          }
          remember="La principessa inglese diventata la regina più amata dai romeni: Bran la rende famosa, Pelișor custodisce il suo cuore."
        >
          <Context on="always" kind="curiosity" period="1938 – 2015" title="Il viaggio del cuore">
            Maria chiede che il suo cuore riposi a Balcic, sul Mar Nero, nella cappella della sua
            villa. Nel 1940 Balcic passa alla Bulgaria e il cuore viene portato a Bran; negli anni
            Settanta il regime lo porta al Museo di storia di Bucarest, dove resta in deposito. Solo
            nel 2015 arriva al castello di Pelișor, accanto a Peleș.
          </Context>
        </Card>
        <Card
          card={RoPerson.ConstantinBrancusi}
          intro={
            <>
              Nasce nel <D>1876</D> a Hobița, un villaggio del Gorj ai piedi dei Carpazi, in una
              famiglia di contadini. Studia a Craiova e a Bucarest, poi si trasferisce a Parigi,
              dove vive fino alla morte, nel <D>1957</D>. Le sue sculture, forme ridotte
              all’essenziale, sono nei musei di Parigi e di New York, e il suo atelier è ricostruito
              accanto al{' '}
              <N href="https://it.wikipedia.org/wiki/Centre_Georges-Pompidou">Centre Pompidou</N>.
              In Romania l’opera da vedere è all’aperto, a Târgu Jiu. Si racconta spesso che nel{' '}
              <D>1951</D> il regime comunista abbia rifiutato la donazione del suo atelier;
              l’Accademia romena lo smentisce e la questione è ancora discussa.
            </>
          }
          remember="Figlio di contadini del Gorj, diventato scultore a Parigi: in Romania lo trovi in un parco di Târgu Jiu, non in un museo."
        >
          <Context on="always" kind="curiosity" period="1907" title="All’ombra dei grandi alberi">
            A Parigi lavora per un mese o due nell’atelier di{' '}
            <N href="https://it.wikipedia.org/wiki/Auguste_Rodin">Auguste Rodin</N>, il più celebre
            scultore del tempo, poi se ne va. La frase che gli si attribuisce: «All’ombra dei grandi
            alberi non cresce niente».
          </Context>
          <Context
            on="always"
            kind="curiosity"
            period="1926 – 1928"
            title="Un uccello tassato come metallo"
          >
            Nel 1926 alcune sue sculture arrivano a New York per una mostra. La dogana non riconosce
            in <N>Uccello nello spazio</N> un’opera d’arte, che entrerebbe senza dazio, e lo tassa
            come un oggetto di metallo. Brâncuși fa causa: nel 1928 il tribunale gli dà ragione e
            ammette che una scultura non deve imitare la natura per essere arte.
          </Context>
        </Card>
        <Card
          card={RoPerson.GeorgeEnescu}
          intro={
            <>
              Nasce nel <D>1881</D> a Liveni, in Moldavia, un villaggio che oggi porta il suo nome.
              A sette anni entra al conservatorio di Vienna, poi studia a Parigi, dove passa gran
              parte della vita come violinista, direttore d’orchestra, compositore e insegnante: fra
              i suoi allievi c’è{' '}
              <N href="https://it.wikipedia.org/wiki/Yehudi_Menuhin">Yehudi Menuhin</N>. Le due{' '}
              <N work>Rapsodie romene</N> (<D>1901</D>) portano la musica popolare nelle sale da
              concerto; la sua opera <N work>Œdipe</N> va in scena a Parigi nel <D>1936</D>. Nel{' '}
              <D>1946</D> lascia la Romania, dove si sta instaurando il regime comunista, e non
              torna più: muore a Parigi nel <D>1955</D>. Dal 1958 Bucarest gli dedica un festival
              internazionale, il Festival Enescu, che si tiene ogni due anni a settembre.
            </>
          }
          remember="Il violinista moldavo diventato europeo: in Romania lo incontri in una villa di montagna, in un palazzo di Calea Victoriei e nel portafoglio."
        >
          <Context on="always" kind="curiosity" period="1910 – 1936" title="Vent’anni per Edipo">
            Enescu lavora a <N work>Œdipe</N> per più di vent’anni, fra un concerto e l’altro: lo
            comincia intorno al 1910 e lo finisce solo nel 1931. È la sua unica opera lirica, e la
            considera il lavoro della sua vita.
          </Context>
        </Card>
        <Card
          card={RoPerson.NicolaeCeausescu}
          intro={
            <>
              Nel <D>1965</D> diventa capo del Partito comunista romeno e, dal 1974, presidente
              della Repubblica. Nel <D>1968</D> condanna l’invasione sovietica della Cecoslovacchia,
              e per anni l’Occidente lo tratta come il leader comunista che prende le distanze da
              Mosca. In patria costruisce un culto della personalità che coinvolge anche la moglie
              Elena; negli anni Ottanta, per ripagare il debito estero, impone il razionamento di
              cibo, luce e riscaldamento, mentre la{' '}
              <N href="https://it.wikipedia.org/wiki/Securitate">Securitate</N> sorveglia il paese.
              Nel dicembre <D>1989</D> la rivolta partita da Timișoara arriva a Bucarest: in quattro
              giorni fugge, viene catturato e fucilato. Se il dicembre 1989 sia stato una
              rivoluzione popolare o anche un cambio di potere dentro il regime è ancora discusso.
            </>
          }
          remember="Il dittatore che rifà Bucarest a sua misura e cade in quattro giorni, nel dicembre 1989."
        >
          <Context on="always" period="1966" title="Il decreto 770">
            Per far crescere la popolazione il regime vieta l’aborto e rende quasi introvabili i
            contraccettivi. L’anno dopo le nascite quasi raddoppiano: i nati di quegli anni sono
            ancora chiamati «decreței». Negli anni migliaia di donne muoiono per aborti clandestini,
            e molti bambini abbandonati finiscono negli orfanotrofi che il mondo scopre nel 1990.
          </Context>
          <Context on="always" period="1971" title="Il viaggio in Asia">
            Nel giugno 1971 visita la Cina e la Corea del Nord, e ne torna colpito dalle parate e
            dal culto del capo. A luglio presenta le «Tesi di luglio»: la cultura torna sotto il
            controllo del partito. Da qui comincia il culto della personalità degli anni Settanta e
            Ottanta.
          </Context>
          <Context on="always" kind="curiosity" period="1978" title="Cavaliere della regina">
            Nel 1978, in visita di Stato a Londra, riceve da Elisabetta II un’onorificenza
            dell’Ordine del Bagno. Il titolo gli viene revocato il 24 dicembre 1989, il giorno prima
            della fucilazione.
          </Context>
        </Card>
        <Card
          card={RoPerson.NadiaComaneci}
          intro={
            <>
              Nasce nel <D>1961</D> a Onești, in Moldavia; a sei anni la scelgono per la scuola di
              ginnastica di Béla e Márta Károlyi. Il 18 luglio <D>1976</D>, alle Olimpiadi di
              Montréal, a quattordici anni, ottiene il primo 10 della storia della ginnastica
              olimpica: il tabellone, che non prevede quattro cifre, mostra 1.00. Vince tre ori a
              Montréal e due a Mosca nel <D>1980</D>. Il regime ne fa un simbolo e la sorveglia; nel
              novembre <D>1989</D>, poche settimane prima della caduta di Ceaușescu, attraversa di
              notte a piedi il confine con l’Ungheria e arriva negli Stati Uniti, dove vive ancora.
            </>
          }
          remember="La bambina di Onești che a Montréal prende il primo 10: il tabellone non era pronto, i romeni non l’hanno più dimenticata."
        >
          <Context on="always" kind="curiosity" period="1976" title="Una canzone per Nadia">
            Per accompagnare le immagini dei suoi esercizi, una televisione americana usa un brano
            già scritto per una soap opera. Ribattezzato «Nadia’s Theme», diventa un successo nelle
            classifiche statunitensi.
          </Context>
        </Card>
      </Chapter>

      <Chapter
        section={RoSection.Cities}
        lede="Che cosa cercare in ogni città, e quale storia c’è dietro."
      >
        <Part section={RoSection.CitiesMoldavia}>
          <Card
            card={Ro.Iasi}
            intro={
              <>
                <N>Iași</N> è la capitale storica della Moldavia, costruita sulle colline fra il
                Prut e i Carpazi. La corte principesca, le chiese e i monasteri fanno della città un
                centro politico e religioso; nel <D>1859</D> qui viene eletto principe
                <N> Alexandru Ioan Cuza</N>, che lo stesso giorno viene scelto anche in Valacchia.
                L’unione personale apre la strada alla Romania, ma Iași non smette di essere il
                centro culturale della Moldavia. Nel <D>1916–1917</D> governo e corte si rifugiano
                qui durante la guerra; nel giugno <D>1941</D> la città è anche teatro di un pogrom
                contro gli ebrei. Oggi il viale centrale accosta il monastero dei Tre Gerarchi e il
                Palazzo della Cultura; sulla collina di Țicău, la casetta di Ion Creangă ricorda che
                Iași è anche la città degli scrittori.
              </>
            }
            remember="Iași è la capitale della Moldavia storica: la corte, i monasteri, la prima università e i suoi scrittori."
          >
            <Context on="always" period="1860" title="La prima università romena">
              Nel 1860, un anno dopo la doppia elezione, Cuza fonda a Iași la prima università
              moderna dei principati, che oggi porta il suo nome. Bucarest avrà la sua solo quattro
              anni dopo.
            </Context>
            <Context on="always" period="1863" title="Junimea">
              Cinque giovani tornati dagli studi in Germania, fra cui{' '}
              <N href="https://it.wikipedia.org/wiki/Titu_Maiorescu">Titu Maiorescu</N>, fondano a
              Iași il circolo Junimea, «la gioventù». Nelle sue serate leggono per la prima volta i
              loro testi Eminescu e Creangă. Il motto: «Entra chi vuole, resta chi può».
            </Context>
          </Card>
          <Card
            card={Ro.Suceava}
            intro={
              <>
                <N>Suceava</N> è la capitale della Moldavia finché la corte non si sposta a Iași,
                nel 1564. La cittadella sul pianoro ricorda il potere militare dei principi; il
                monastero di San Giovanni il Nuovo è la chiesa della corte. Nel <D>1775</D> la città
                passa con la Bucovina all’Impero asburgico e torna alla Romania solo nel <D>1918</D>
                : per quasi un secolo e mezzo è una città austriaca di confine, dove ai romeni si
                affiancano armeni, ebrei, tedeschi e ucraini. La statua di <N>Stefano il Grande</N>,
                sotto la fortezza, ricorda invece la capitale medievale. A una quarantina di
                chilometri cominciano i monasteri dipinti della Bucovina, come Voroneț.
              </>
            }
            remember="Suceava è la prima capitale della Moldavia: la fortezza di Stefano il Grande sopra la città, i monasteri dipinti poco lontano."
          >
            <Context on="always" period="1564" title="La capitale se ne va">
              Nel 1564 il principe Alexandru Lăpușneanu sposta la capitale a Iași, e Suceava perde
              la corte. Le cronache gli attribuiscono anche il massacro di decine di boiardi;
              nell’Ottocento Costache Negruzzi ne fa una novella che ogni studente romeno legge, con
              la frase del principe: «Se voi non mi volete, io vi voglio».
            </Context>
            <Context on="always" period="Dal XV secolo" title="Gli armeni di Suceava">
              Mercanti armeni vivono a Suceava dal Medioevo, e dal 1401 la città è sede di un
              vescovo armeno. Sulla collina a ovest del centro il monastero armeno di Zamca, cinto
              di mura, ricorda questa comunità che commercia fra il Mar Nero e la Polonia.
            </Context>
          </Card>
        </Part>
        <Part section={RoSection.CitiesWallachia}>
          <Card
            card={Ro.Bucharest}
            intro={
              <>
                <N>Bucarest</N> cresce nella pianura della <N>Dâmbovița</N>, intorno alla corte dei
                principi, di cui restano le rovine della Curtea Veche, e alle strade dei mercanti.
                Nell’Ottocento la capitale del nuovo Stato si dà viali, palazzi e un Ateneo su
                modelli francesi, e si guadagna il soprannome di «Piccola Parigi». Il regime
                comunista aggiunge quartieri di condomini e rade al suolo una parte del centro per
                la Casa del Popolo, oggi Palazzo del Parlamento; alcune chiese vengono spostate su
                rotaie e nascoste dietro i palazzi nuovi. Oggi bastano pochi passi per passare da
                una chiesa del Settecento, come Stavropoleos, a un viale largo come una piazza.
              </>
            }
            remember="Bucarest si capisce nei contrasti di scala: una chiesa fra i condomini racconta la città quanto un palazzo monumentale."
          >
            <Context
              on="always"
              kind="curiosity"
              period="1459"
              title="Il primo documento è di Dracula"
            >
              La leggenda attribuisce la fondazione a un pastore di nome Bucur. La prima menzione
              scritta della città è invece un atto del 20 settembre 1459, firmato da Vlad III nella
              «fortezza di Bucarest».
            </Context>
            <Context on="always" period="1977" title="Il terremoto">
              La sera del 4 marzo 1977 un terremoto di magnitudo superiore a 7 colpisce la Romania:
              circa 1.500 morti, quasi tutti a Bucarest, dove crollano decine di palazzi del centro.
              Negli anni Ottanta il regime userà anche i danni del sisma per giustificare le
              demolizioni.
            </Context>
          </Card>
        </Part>
        <Part section={RoSection.CitiesTransylvania}>
          <Card
            card={Ro.AlbaIulia}
            intro={
              <>
                <N>Alba Iulia</N> sta su una terrazza sopra il <N>Mureș</N>: in basso la città
                nuova, in alto la cittadella. Qui sorge <N>Apulum</N>, uno dei centri principali
                della Dacia romana; poi la città medievale, <N>Gyulafehérvár</N> per gli ungheresi,
                sede del vescovo cattolico di Transilvania e, dal Cinquecento, capitale del
                principato. Nel Settecento gli Asburgo vi costruiscono una grande fortezza a stella
                e la chiamano Alba Carolina. Nel <D>1918</D> la città diventa il luogo dell’unione
                con la Romania, e nel <D>1922</D> vi vengono incoronati Ferdinando e Maria. Dentro
                la stessa cinta stanno così la cattedrale cattolica medievale e la cattedrale
                ortodossa dell’incoronazione: nella cittadella passi da un’epoca all’altra in pochi
                metri.
              </>
            }
            remember="Ad Alba Iulia ogni potere ha costruito sulla stessa altura: il campo romano, la cattedrale dei vescovi, la fortezza asburgica, la sala dell’unione."
          >
            <Context on="always" period="1599" title="L’ingresso di Michele">
              Il 1° novembre 1599, pochi giorni dopo la vittoria di Șelimbăr, Michele il Coraggioso
              entra ad Alba Iulia come signore della Transilvania. È da qui che, l’anno dopo, regna
              per pochi mesi sui tre principati.
            </Context>
            <Context on="always" period="1785" title="La ruota di Horea">
              Dopo la rivolta contadina dei Monti Apuseni, i suoi capi Horea e Cloșca vengono
              giustiziati ad Alba Iulia il 28 febbraio 1785, sulla ruota, davanti ai contadini
              portati ad assistere. Nell’Ottocento i romeni di Transilvania ne fanno dei martiri.
            </Context>
          </Card>
          <Card
            card={Ro.Brasov}
            intro={
              <>
                <N>Brașov</N> si raccoglie sotto il monte <N>Tâmpa</N>, dove le strade che
                attraversano i Carpazi arrivano ai mercati della Transilvania. I sassoni
                costruiscono la città murata: al centro la piazza con la Casa del Consiglio, accanto
                la Chiesa Nera. Fuori dalle mura, a sud-ovest, il quartiere di <N>Șchei</N> è quello
                dei romeni, con la chiesa di San Nicola e la prima scuola romena. Mura e porte
                separano due comunità che commerciano ogni giorno fra loro: dalla piazza a Șchei
                sono dieci minuti a piedi.
              </>
            }
            remember="Brașov vive di scambi attraverso i Carpazi: la piazza li raccoglie, le porte li controllano."
          >
            <Context on="always" period="XVI secolo" title="I primi libri in romeno">
              A metà del Cinquecento il diacono Coresi stampa a Brașov alcuni dei primi libri in
              lingua romena, testi religiosi in alfabeto cirillico. Accanto alla chiesa di San
              Nicola, a Șchei, la scuola romena e la sua tipografia sono oggi un museo.
            </Context>
            <Context on="always" kind="curiosity" period="1950 – 1960" title="Orașul Stalin">
              Per dieci anni Brașov si chiama «Città di Stalin». Sul Tâmpa, dove oggi c’è la scritta
              BRAȘOV, il nome del dittatore sovietico viene tracciato con gli abeti.
            </Context>
            <Context on="always" period="1987" title="La rivolta degli operai">
              Il 15 novembre 1987 gli operai della fabbrica di camion Steagul Roșu scendono in
              strada contro i tagli ai salari e al cibo, e assaltano la sede del partito. La rivolta
              viene repressa e centinaia di persone sono arrestate: due anni prima di Timișoara.
            </Context>
          </Card>
          <Card
            card={Ro.ClujNapoca}
            intro={
              <>
                <N>Cluj</N> sorge sul luogo della <N>Napoca</N> romana, ma la città che percorri è
                quella medievale: <N>Kolozsvár</N> per gli ungheresi, <N>Klausenburg</N> per i
                sassoni, con le mura, la piazza del mercato e una grande chiesa al centro. Per
                secoli la maggioranza degli abitanti parla ungherese; vi vivono anche tedeschi,
                romeni ed ebrei. Dopo il <D>1918</D> la città passa alla Romania, dal 1940 al 1944
                torna all’Ungheria, poi di nuovo alla Romania; nel dopoguerra industrie e nuovi
                quartieri portano una maggioranza romena. Nel <D>1974</D> il regime aggiunge al nome
                «Napoca», per richiamare l’origine romana. Le piazze del centro mostrano questa
                storia a strati: monumenti di uno Stato, edifici dell’altro, targhe e nomi contesi.
                Oggi è soprattutto una città universitaria, con corsi in romeno, ungherese e
                tedesco.
              </>
            }
            remember="A Cluj ogni piazza ha due memorie: guarda chi ha costruito cosa, e per chi."
          >
            <Context on="always" period="1894" title="Il processo del Memorandum">
              Nel 1892 i capi dei romeni di Transilvania mandano all’imperatore Francesco Giuseppe
              un memorandum per chiedere diritti politici. Nel 1894 vengono processati a Cluj e
              condannati al carcere; il processo diventa un caso europeo e l’anno dopo sono
              graziati.
            </Context>
            <Context
              on="always"
              kind="curiosity"
              period="1992 – 2004"
              title="Le panchine tricolori"
            >
              Il sindaco nazionalista Gheorghe Funar fa dipingere panchine, lampioni e bidoni nei
              colori della bandiera romena, e apre uno scavo archeologico proprio davanti alla
              statua di Mattia Corvino. Per molti abitanti ungheresi è una provocazione; oggi i
              colori sono spariti.
            </Context>
            <Context on="always" kind="curiosity" period="Dal 2002" title="La città dei festival">
              Dal 2002 Cluj ospita il TIFF, il primo festival internazionale di cinema della
              Romania, e dal 2015 l’UNTOLD, uno dei più grandi festival di musica elettronica
              d’Europa, alla Cluj Arena. A Bonțida, poco lontano, il castello Bánffy fa da scenario
              a un altro festival musicale, l’Electric Castle.
            </Context>
          </Card>
          <Card
            card={Ro.Sibiu}
            intro={
              <>
                <N>Sibiu</N> è costruita su due livelli: in alto le piazze dei sassoni, in basso la
                città dei mestieri, collegate da rampe, scale e passaggi. In alto si aprono tre
                piazze una dopo l’altra: <N>Piața Mare</N>, con il palazzo barocco di Samuel von
                Brukenthal, governatore asburgico; <N>Piața Mică</N>, unita alla prima da un
                passaggio sotto la torre del Consiglio; <N>Piața Huet</N>, intorno alla chiesa
                evangelica. Dal Ponte delle Bugie guardi la strada che scende verso la città bassa:
                basta voltare un angolo per cambiare quota.
              </>
            }
            remember="Sibiu ha due piani: le piazze dei sassoni in alto, la città dei mestieri in basso, e fra le due scale e passaggi."
          >
            <Context on="always" kind="curiosity" period="Tetti" title="Gli occhi della città">
              Sui tetti delle case si aprono piccole finestre a forma di palpebra, che arieggiano le
              soffitte dove si conservavano le provviste. Gli abitanti le chiamano «gli occhi della
              città»: sembra che la città ti guardi.
            </Context>
            <Context on="always" period="2000 – 2014" title="Il sindaco sassone">
              Nel 2000 Sibiu elegge sindaco{' '}
              <N href="https://it.wikipedia.org/wiki/Klaus_Iohannis">Klaus Iohannis</N>, della
              piccola minoranza tedesca. Sotto di lui il centro viene restaurato e nel 2007 la città
              è capitale europea della cultura; nel 2014 Iohannis diventa presidente della Romania.
            </Context>
          </Card>
          <Card
            card={Ro.Sighisoara}
            intro={
              <>
                <N>Sighișoara</N> è una cittadella sulla collina con una città bassa ai suoi piedi.
                Artigiani e mercanti sassoni costruiscono case, chiese e mura, e ogni corporazione
                difende la sua torre. Si entra sotto la Torre dell’Orologio, si attraversa la piazza
                e si sale per la scala coperta fino alla scuola e alla chiesa sulla collina. Le case
                colorate non sono tutte medievali: incendi e ricostruzioni le hanno cambiate. Il
                centro, patrimonio UNESCO, è ancora abitato. La casa dove la tradizione fa nascere
                Vlad III è una delle cose da vedere, non la sola: guarda anche le torri dei
                mestieri.
              </>
            }
            remember="Sighișoara è una città costruita per abitare, lavorare e difendersi su una collina: Vlad è una storia dentro questa storia."
          >
            <Context on="always" kind="curiosity" period="Mura" title="Una torre per ogni mestiere">
              Ogni torre delle mura è affidata a una corporazione, che la costruisce, la mantiene e
              la difende: sarti, calzolai, fabbri, macellai, conciatori. Delle quattordici torri
              originarie ne restano nove, e portano ancora il nome del loro mestiere.
            </Context>
            <Context on="always" period="1970 – 1989" title="I sassoni venduti">
              Negli anni di Ceaușescu la Germania Ovest paga al regime una somma per ogni romeno di
              lingua tedesca a cui viene concesso di emigrare. Dopo il 1990 parte quasi tutta la
              comunità: nelle città e nei villaggi sassoni intorno a Sighișoara restano le chiese
              fortificate, spesso custodite da poche famiglie.
            </Context>
          </Card>
          <Card
            card={Ro.Timisoara}
            intro={
              <>
                <N>Timișoara</N> è nel <N>Banato</N>, la pianura fra Danubio, Tibisco e Carpazi: non
                fa parte del principato di Transilvania e ha una storia propria. Città del Regno
                d’Ungheria, <N>Temesvár</N>, nel 1552 la prendono gli ottomani, che la tengono per
                circa 160 anni. Nel <D>1716</D> l’esercito di Eugenio di Savoia la conquista per gli
                Asburgo: diventa capitale di una provincia a sé, e ingegneri austriaci la
                ricostruiscono quasi da zero come città fortificata barocca. Vi si stabiliscono
                coloni di lingua tedesca, accanto a romeni, ungheresi, serbi ed ebrei: piazze e
                chiese lo mostrano ancora. Dopo la Prima guerra mondiale il Banato viene diviso e
                nel 1919 la città passa alla Romania. Nel dicembre <D>1989</D> la rivolta contro
                Ceaușescu comincia qui. Nel 2023 è capitale europea della cultura.
              </>
            }
            remember="Timișoara è una città barocca di molte lingue e confessioni: qui, nel 1989, comincia la rivolta contro Ceaușescu."
          >
            <Context on="always" kind="curiosity" period="1884" title="Le prime luci elettriche">
              Nel novembre 1884 si accendono a Timișoara 731 lampade elettriche: è la prima città
              d’Europa a illuminare le sue strade con l’elettricità, un primato che rivendica
              ancora.
            </Context>
            <Context on="always" period="1990" title="Il Proclama di Timișoara">
              L’11 marzo 1990 i protagonisti della rivolta pubblicano il Proclama di Timișoara. Il
              punto 8 chiede di escludere dalle elezioni, per tre legislature, gli ex dirigenti
              comunisti e gli ufficiali della Securitate. La richiesta non passa, ma ispira le
              proteste di piazza dell’Università a Bucarest.
            </Context>
          </Card>
        </Part>
        <Part section={RoSection.CitiesDobruja}>
          <Card
            card={Ro.Constanta}
            intro={
              <>
                <N>Constanța</N> sta su una penisola fra il porto e il Mar Nero. Nel VI secolo a.C.
                coloni greci vi fondano <N>Tomis</N>; la città passa poi ai romani e, dalla fine del
                III secolo, è la capitale della provincia di Scizia Minore. Nell’<D>8 d.C.</D>{' '}
                Augusto vi esilia il poeta <N>Ovidio</N>, che vi resta fino alla morte. Per gli
                ottomani è <N>Köstence</N>, una piccola città portuale che una ferrovia costruita da
                una compagnia britannica collega al Danubio. Nel <D>1878</D> la Dobrogea
                settentrionale passa alla Romania, e Constanța diventa il porto del paese sul Mar
                Nero. Il porto moderno, voluto da Carol I, è inaugurato nel <D>1909</D>; sulla
                passeggiata a mare sorge il casinò. Intorno al 1900 nella città vivono romeni,
                greci, tatari, bulgari, turchi ed ebrei: chiese e moschee stanno a pochi passi l’una
                dall’altra. Oggi il porto di Constanța è il più grande della Romania. Appena fuori
                città, a Ovidiu, Gheorghe Hagi ha costruito la sua scuola di calcio; più a sud la
                costa finisce a Vama Veche, sul confine bulgaro.
              </>
            }
            remember="A Constanța la Romania arriva al mare: sotto la città di Carol I restano la Tomis greca e romana e la Köstence ottomana."
          >
            <Context on="always" kind="curiosity" period="1962" title="Il serpente Glykon">
              Nel 1962, durante dei lavori vicino alla vecchia stazione, viene alla luce un deposito
              di statue sepolte in età romana. Fra queste c’è Glykon, un serpente con il muso di
              agnello, orecchie e capelli umani: il dio di un culto nato nel II secolo. Lo vedi al
              Museo di storia nazionale e archeologia, in piazza Ovidio.
            </Context>
            <Context on="always" period="1949 – 1984" title="Il canale della morte">
              Nel 1949 il regime comincia a scavare un canale fra il Danubio e il Mar Nero con il
              lavoro forzato di decine di migliaia di detenuti politici, e molti vi muoiono. I
              lavori si fermano nel 1953; ripresi negli anni Settanta, finiscono nel 1984, quando il
              canale si apre sul mare ad Agigea, a sud di Constanța.
            </Context>
          </Card>
        </Part>
      </Chapter>

      <Chapter
        section={RoSection.Nature}
        lede="Fuori dalle città: come si sono formati i paesaggi, e che cosa ne hanno fatto le persone."
      >
        <Card
          card={RoLandscape.DanubeDelta}
          intro={
            <>
              Il <N>Danubio</N> finisce in Dobrogea. Poco prima di <N>Tulcea</N> si divide in tre
              bracci, <N>Chilia</N>, <N>Sulina</N> e <N>Sfântu Gheorghe</N>, e prima del Mar Nero
              costruisce con i suoi sedimenti una pianura d’acqua: canali, laghi, canneti, isole di
              sabbia. Il braccio di Chilia, il più ricco d’acqua, segna il confine con l’Ucraina; la
              maggior parte del delta è in Romania. A sud, le lagune di <N>Razim</N> e <N>Sinoe</N>,
              chiuse verso il mare da cordoni di sabbia, fanno parte dello stesso sistema. È terra
              di pescatori, e di comunità diverse: fra queste i lipoveni, Vecchi credenti russi.
              Nell’Ottocento una commissione europea raddrizza il braccio di Sulina per le navi. Nel{' '}
              <D>1983</D> il regime comunista lancia un programma per sfruttare il delta: dighe e
              drenaggi ne trasformano una parte in campi e vasche per i pesci, e dopo il 1990 alcune
              aree arginate tornano allagate. Nel <D>1990</D> il delta diventa riserva della
              biosfera, l’anno dopo patrimonio dell’umanità UNESCO. Molti villaggi si raggiungono
              solo in barca. Fra canneti e lagune vivono centinaia di specie di uccelli: il simbolo
              della riserva è il pellicano.
            </>
          }
          remember="Il delta è una terra che il Danubio costruisce ogni anno: anche le persone l’hanno scavata, arginata e poi in parte restituita all’acqua."
        >
          <Context on="always" kind="curiosity" period="Sulina" title="Il chilometro zero">
            Il Danubio si misura al contrario: i chilometri si contano dalla foce, a Sulina,
            risalendo verso la sorgente. Ogni porto del fiume, da Vienna a Belgrado, ha il suo
            numero di distanza dal Mar Nero.
          </Context>
          <Context on="always" kind="curiosity" period="Dopo il 1990" title="I cavalli di Letea">
            Con la fine delle cooperative agricole molti cavalli vengono lasciati liberi; oggi
            alcune migliaia vivono allo stato brado intorno alla foresta di Letea. Brucano anche le
            piante protette del bosco, e che cosa farne è ancora discusso.
          </Context>
        </Card>
        <Card
          card={RoLandscape.FagarasMountains}
          intro={
            <>
              I <N>Monti Făgăraș</N> sono una cresta lunga e stretta dei Carpazi Meridionali, a est
              della valle dell’<N>Olt</N>. Qui stanno le cime più alte della Romania: il{' '}
              <N>Moldoveanu</N>, a 2.544 m, e il <N>Negoiu</N>. A nord il versante scende ripido
              sulla depressione di Făgăraș, in Transilvania; a sud lunghe valli, come quella dell’
              <N>Argeș</N>, portano verso la Valacchia. Per secoli la cresta è il confine fra i due
              paesi, fino al 1918. Nell’ultima glaciazione il ghiaccio scava sotto le cime circhi e
              valli, dove oggi restano molti piccoli laghi. Dopo l’invasione sovietica della
              Cecoslovacchia, nel <D>1968</D>, Ceaușescu vuole una strada che porti rapidamente le
              truppe da un versante all’altro. L’esercito la costruisce fra il <D>1970</D> e il{' '}
              <D>1974</D>: è il <N>Transfăgărășan</N>. Le cifre ufficiali parlano di 40 soldati
              morti nei lavori; le testimonianze di chi ci ha lavorato, di centinaia.
            </>
          }
          remember="La cresta dei Făgăraș ha diviso per secoli Transilvania e Valacchia; il Transfăgărășan la attraversa come strada militare, costruita dall’esercito in quattro anni."
        >
          <Context on="always" period="1948 – 1955" title="I partigiani della montagna">
            Dopo la presa del potere comunista, un gruppo di studenti e contadini della zona si
            rifugia nei boschi dei Făgăraș e resiste armato per anni. Quasi tutti vengono catturati
            e fucilati; il loro capo, Ion Gavrilă Ogoranu, riesce a nascondersi fino al 1976.
          </Context>
          <Context on="always" kind="curiosity" period="Ogni inverno" title="L’albergo di ghiaccio">
            Quando la strada chiude per la neve, al lago di Bâlea si arriva in funivia. Ogni
            inverno, dal 2006, accanto al lago si costruisce un albergo con blocchi di ghiaccio
            tagliati dal lago stesso; a primavera si scioglie.
          </Context>
        </Card>
        <Card
          card={RoLandscape.PiatraCraiului}
          intro={
            <>
              La <N>Piatra Craiului</N> è una cresta di calcare lunga circa 25 km, stretta e
              frastagliata, fra i distretti di Brașov e di Argeș: la cima più alta, La Om, arriva a
              2.238 m. Il calcare, formatosi nel Giurassico, si spacca in pareti, gole e grotte.
              Protetta in parte già dal 1938, è parco nazionale dal <D>1990</D>. Sul versante est
              passa il corridoio di <N>Bran</N>, da secoli una via fra Transilvania e Valacchia:
              sulle sue colline stanno villaggi d’alta quota come <N>Măgura</N> e <N>Peștera</N>,
              fra prati da fieno e pascoli. Nelle foreste intorno alla cresta vivono orsi, lupi e
              linci. Sulle rocce cresce un garofano che non esiste in nessun altro luogo, simbolo
              del parco.
            </>
          }
          remember="La Piatra Craiului è una sola lama di calcare: sotto, i villaggi d’alta quota e i boschi degli orsi; sopra, un fiore che non cresce altrove."
        >
          <Context on="always" kind="curiosity" period="Nome" title="La pietra del re">
            Piatra Craiului vuol dire «la pietra del re»: crai è una parola antica, di origine
            slava, per «re» o «principe». Chi fosse il re, nessuna leggenda lo dice con certezza.
          </Context>
          <Context on="always" period="Oggi" title="Il paese degli orsi">
            Fuori dalla Russia, la Romania ha la più grande popolazione di orsi bruni d’Europa:
            diverse migliaia, ma il numero esatto è discusso. Gli incontri nei villaggi e sulle
            strade sono sempre più frequenti, e il permesso di abbatterli divide il paese.
          </Context>
        </Card>
        <Card
          card={RoLandscape.ApuseniMountains}
          intro={
            <>
              I <N>Monti Apuseni</N> chiudono la Transilvania a ovest, fra la valle del <N>Mureș</N>{' '}
              e le pianure della Crișana. Non sono alti: la cima più alta, il <N>Bihor</N>, arriva a
              1.849 m. Ma in gran parte sono di calcare, e l’acqua li ha scavati: doline,
              inghiottitoi, torrenti che spariscono e riemergono, grotte con fiumi e ghiacci
              sotterranei. Il cuore del massiccio è il Parco naturale Apuseni. Sugli altipiani
              vivono i <N>moți</N>, in villaggi di case sparse che salgono fino a circa 1.400 m: per
              secoli vivono del bosco, del legno lavorato e delle miniere. A <N>Roșia Montană</N>{' '}
              l’oro si estrae dall’epoca romana: le gallerie antiche sono patrimonio UNESCO dal
              2021. Da queste montagne partono la rivolta di Horea, nel <D>1784</D>, e nel{' '}
              <D>1848</D> la rivolta romena guidata da Avram Iancu. Sul margine orientale, a{' '}
              <N>Turda</N>, la ricchezza sotterranea è il sale: lo si scava dal Medioevo.
            </>
          }
          remember="Negli Apuseni il paesaggio è sotto i piedi: grotte e ghiacci nel calcare, e sopra le case sparse dei moți, che da qui sono scesi in due rivolte."
        >
          <Context on="always" kind="curiosity" period="1872" title="Il flauto di Avram Iancu">
            Dopo il 1848 il capo dei moți non accetta onori né compromessi con Vienna. Negli ultimi
            anni vaga di villaggio in villaggio suonando il flauto da pastore, e muore nel 1872 a
            Baia de Criș. È sepolto a Țebea, sotto una vecchia quercia.
          </Context>
          <Context on="always" period="2013" title="Salvate Roșia Montană">
            Una società canadese vuole aprire a Roșia Montană una grande miniera d’oro a cielo
            aperto, con l’uso di cianuro. Nell’autunno 2013 decine di migliaia di persone protestano
            in tutto il paese: sono le più grandi manifestazioni dopo il 1989. Il progetto si ferma,
            e nel 2021 le gallerie romane entrano nel patrimonio UNESCO.
          </Context>
        </Card>
        <Card
          card={RoLandscape.IronGates}
          intro={
            <>
              Fra il Banato e l’Oltenia il <N>Danubio</N> attraversa i Carpazi in una serie di gole
              lunga oltre 130 km, che segna il confine con la Serbia. Nei <N>Cazane</N>, i
              «calderoni», il fiume si stringe fino a circa 150 m fra pareti di calcare. Per i
              Romani il Danubio è la frontiera della Mesia: prima della guerra contro Decebalo
              Traiano fa scavare nella roccia una strada lungo la riva oggi serba e, nel <D>105</D>,
              costruire a Drobeta un ponte sul fiume. Nei secoli successivi la gola separa imperi:
              l’isola di <N>Ada Kaleh</N>, vicino a Orșova, resta ottomana fino al Novecento e passa
              alla Romania solo nel 1923. Nel 1964 Romania e Iugoslavia cominciano insieme la diga
              di Porțile de Fier I, che entra in funzione nel <D>1972</D>: il lago sommerge Ada
              Kaleh, la vecchia Orșova e altri villaggi. Dal 2001 la riva romena è un parco
              naturale.
            </>
          }
          remember="Alle Porte di Ferro il Danubio è sempre stato un confine: lo è per Traiano, per gli imperi, e oggi corre su un lago che ha sommerso un’isola e una città."
        >
          <Context on="always" kind="curiosity" period="1878" title="L’isola dimenticata">
            Al congresso di Berlino nessuno si ricorda di Ada Kaleh: l’isola resta formalmente
            ottomana, in mezzo a un Danubio ormai austro-ungarico e serbo. I suoi abitanti turchi
            vivono di tabacco, rahat e commercio esente da dazi fino a quando, dopo la Prima guerra
            mondiale, l’isola passa alla Romania.
          </Context>
          <Context on="always" kind="curiosity" period="1967 – 1969" title="La tavola salvata">
            Sulla riva serba un’iscrizione scolpita nella roccia, la Tabula Traiana, ricorda la
            strada costruita per Traiano. Quando il lago della diga sta per sommergerla, la tagliano
            e la sollevano di oltre venti metri: dalla riva romena la vedi in barca.
          </Context>
        </Card>
        <Card
          card={RoLandscape.Retezat}
          intro={
            <>
              Il <N>Retezat</N> è un massiccio dei Carpazi Meridionali fra la valle del <N>Jiu</N> e
              la depressione di <N>Hațeg</N>, nel distretto di Hunedoara. I ghiacciai dell’ultima
              glaciazione lo hanno scavato in circhi e valli: oltre sessanta cime superano i 2.300
              m, e nelle conche restano circa ottanta laghi glaciali, più di cinquanta dei quali non
              si asciugano mai. Nel <D>1935</D>, dopo una campagna dei naturalisti Alexandru Borza
              ed Emil Racoviță, il governo vi istituisce il primo parco nazionale della Romania. Nel{' '}
              <D>1979</D> l’UNESCO lo include fra le riserve della biosfera. Al centro c’è la
              riserva scientifica di <N>Gemenele</N>, circa 1.800 ettari di foresta antica dove si
              entra solo per ricerca. Nei boschi vivono orsi, lupi e linci. Nessuna strada
              attraversa il massiccio: si arriva in auto ai margini, poi si cammina.
            </>
          }
          remember="Il Retezat è la montagna che la Romania ha protetto per prima: circhi e laghi lasciati dai ghiacci, dove si arriva solo a piedi."
        >
          <Context
            on="always"
            kind="curiosity"
            period="1895 – 1914"
            title="I dinosauri nani di Hațeg"
          >
            Nella depressione di Hațeg il barone transilvano Franz Nopcsa studia ossa di dinosauri
            molto più piccoli dei loro parenti. Ne deduce che vivevano su un’isola, dove le specie
            tendono a rimpicciolirsi: un’idea accettata solo molto più tardi. Nopcsa è anche
            esploratore dell’Albania, e nel 1913 si propone come suo re.
          </Context>
          <Context on="always" period="1990 – 1991" title="Le mineriade">
            Ai piedi del Retezat c’è la valle del Jiu, la valle dei minatori. Nel giugno 1990
            migliaia di loro arrivano in treno a Bucarest e, con la copertura del governo,
            sgomberano con la violenza i manifestanti di piazza dell’Università. Tornano nel 1991 e
            fanno cadere il governo.
          </Context>
        </Card>
        <Card
          card={RoLandscape.VaserValleyRodna}
          intro={
            <>
              Nel nord della Romania, al confine con l’Ucraina, il <N>Maramureș</N> è chiuso da
              montagne coperte di foreste. La valle del <N>Vaser</N> sale da Vișeu de Sus per decine
              di chilometri dentro il bosco. Per secoli il legno è la ricchezza della regione: lo
              mostrano le chiese di legno del Maramureș, patrimonio UNESCO, e a Săpânța le croci
              scolpite e dipinte del Cimitero allegro. Per portare a valle i tronchi si usa l’acqua,
              liberata a ondate da dighe di legno lungo il fiume; dopo le alluvioni del <D>1929</D>,
              che le danneggiano, si costruisce una ferrovia forestale, la <N>Mocănița</N>, ancora
              in servizio. A sud, oltre la valle di Borșa, si alzano i <N>Monti Rodnei</N>, la
              catena più alta dei Carpazi Orientali: creste di oltre 2.000 m, circhi e laghi
              lasciati dai ghiacciai. Oggi sono un parco nazionale.
            </>
          }
          remember="Nel Maramureș la foresta è un lavoro prima che un paesaggio: la Mocănița nasce per portare a valle i tronchi, sotto le creste dei Rodnei."
        >
          <Context on="always" period="1950 – 1955" title="Il carcere di Sighet">
            A Sighetu Marmației, capoluogo storico del Maramureș, il regime rinchiude ministri,
            vescovi e intellettuali della Romania di prima della guerra; molti vi muoiono, fra cui
            Iuliu Maniu. Oggi il carcere è il Memoriale delle vittime del comunismo. Nella stessa
            città nasce nel 1928 <N href="https://it.wikipedia.org/wiki/Elie_Wiesel">Elie Wiesel</N>
            , deportato ad Auschwitz con gli ebrei del Maramureș nel 1944.
          </Context>
          <Context
            on="always"
            kind="curiosity"
            period="1997 – 2003"
            title="Il campanile di legno più alto"
          >
            Le chiese di legno del Maramureș sono alte e strette, con campanili a punta. A
            Săpânța-Peri, vicino al Cimitero allegro, se ne costruisce una nuova, tutta in legno:
            con i suoi 78 m è fra le chiese di legno più alte del mondo.
          </Context>
        </Card>
        <Card
          card={RoLandscape.BicazCeahlau}
          intro={
            <>
              Dove la Moldavia incontra la Transilvania, il torrente <N>Bicaz</N> ha scavato nel
              calcare dei monti Hășmaș una gola di circa 8 km. Per la gola passa la strada fra il
              distretto di Neamț, in Moldavia, e quello di Harghita, nella Terra dei Siculi.
              All’uscita ovest c’è un lago nato da una frana nell’Ottocento. A nord-est, sopra la
              valle della <N>Bistrița</N> e il lago artificiale di Bicaz, si alza isolato il{' '}
              <N>Ceahlău</N>. È una montagna di eremiti e di leggende: per la tradizione popolare le
              rocce di Dochia sono una donna trasformata in pietra con il suo gregge. All’inizio del
              Settecento{' '}
              <N href="https://it.wikipedia.org/wiki/Dimitrie_Cantemir">Dimitrie Cantemir</N>, nella{' '}
              <N work>Descriptio Moldaviae</N>, scrive che se i poeti antichi l’avessero conosciuto
              sarebbe famoso quanto l’Olimpo. Gole e Ceahlău sono oggi due parchi nazionali.
            </>
          }
          remember="Le gole di Bicaz sono una porta fra Moldavia e Transilvania; il Ceahlău è la montagna che i moldavi hanno riempito di eremiti, leggende e pellegrinaggi."
        >
          <Context on="always" period="1950 – 1960" title="La diga di Bicaz">
            La diga che forma il lago di Bicaz è una delle prime grandi opere del regime comunista:
            costruita in dieci anni, anche con il lavoro di detenuti, sommerge villaggi le cui
            famiglie vengono trasferite. Alta 127 m, diventa un simbolo dell’industrializzazione
            socialista.
          </Context>
          <Context on="always" kind="curiosity" period="6 agosto" title="L’ombra della piramide">
            Il 6 agosto, festa della Trasfigurazione, i pellegrini salgono di notte al monastero del
            Ceahlău. Si racconta che all’alba di quel giorno l’ombra della montagna si disegni sulle
            nuvole e sulle valli come una piramide perfetta.
          </Context>
        </Card>
        <Card
          card={RoLandscape.Bucegi}
          intro={
            <>
              Sopra la valle della <N>Prahova</N>, dove passano la strada e la ferrovia fra Bucarest
              e Brașov, i <N>Bucegi</N> alzano pareti di calcare e conglomerato alte più di mille
              metri. In fondovalle ci sono le località di villeggiatura nate con la ferrovia e con
              la corte: Sinaia, dove Carol I costruisce il castello di Peleș, e Bușteni. In alto si
              stende un altopiano ondulato, con le rocce delle Babele e della Sfinge e la cima più
              alta, l’<N>Omu</N>, a 2.505 m. È la montagna più vicina a Bucarest e la più
              frequentata: d’estate si sale in funivia, d’inverno si scia. Dal 1990 è un parco
              naturale.
            </>
          }
          remember="I Bucegi sono la montagna della Prahova: castelli reali in basso, rocce scolpite dal vento e una croce illuminata in alto."
        >
          <Context
            on="always"
            kind="curiosity"
            period="Leggenda"
            title="La montagna sacra dei daci?"
          >
            Lo storico greco <N href="https://it.wikipedia.org/wiki/Strabone">Strabone</N> parla del
            Kogaionon, la montagna sacra dove viveva Zalmoxis, il dio dei geti. Una tradizione lo
            identifica con i Bucegi: nessuna prova lo conferma, ma l’idea alimenta ancora le
            leggende sulla Sfinge.
          </Context>
        </Card>
      </Chapter>

      <Chapter
        section={RoSection.Food}
        lede="Che cosa ordinare, e come riconoscerlo nel menù: prima ciò che si mangia ovunque, poi le specialità di ogni regione."
      >
        <Part section={RoSection.FoodCommon}>
          <Card
            card={RoFood.Mamaliga}
            intro={
              <>
                La <N>mămăligă</N> è una polenta di farina di mais, cotta in acqua e sale in un
                paiolo di ghisa, il ceaun. Prima del mais si faceva con il miglio; il mais si
                diffonde nei principati nel Seicento e nelle carestie del Seicento e del Settecento
                diventa il cibo di base delle campagne. Densa come un pane, accompagna quasi tutto:
                formaggio e smântână (panna acida), stufati, pesce fritto con il mujdei, una salsa
                d’aglio. Si taglia con un filo, perché al coltello si attacca. Il <N>bulz</N> è
                mămăligă ripiena di formaggio e passata al forno.
              </>
            }
            remember="La mămăligă sta accanto a quasi tutto: da tre secoli è il pane delle campagne romene."
          >
            <Context
              on="always"
              kind="curiosity"
              period="Modo di dire"
              title="La mămăligă non esplode"
            >
              «Mămăliga nu explodează», la mămăligă non esplode: per decenni i romeni lo dicono di
              sé stessi, di un popolo che sopporta senza ribellarsi. Dopo il dicembre 1989 si dirà
              che, alla fine, la mămăligă è esplosa.
            </Context>
          </Card>
          <Card
            card={RoFood.Sarmale}
            intro={
              <>
                Le <N>sarmale</N> sono involtini di foglie di cavolo, di solito in salamoia, o di
                vite, ripieni di carne di maiale tritata, riso e cipolla, e cotti a lungo in
                pentola. Il nome viene dal turco sarma, «involto»: piatti simili si mangiano in
                tutti i paesi che sono stati ottomani. In Romania sono il piatto delle feste, a
                Natale e a Pasqua, e arrivano in tavola con mămăligă e smântână.
              </>
            }
            remember="Le sarmale sono il piatto delle feste: un involtino di origine ottomana diventato la cucina di casa."
          >
            <Context
              on="always"
              kind="variants"
              period="Moldavia, Transilvania"
              title="Piccole o grandi, vite o cavolo"
            >
              In Moldavia sono piccole, a volte quanto un dito, e un tempo si chiamavano găluște;
              d’estate si avvolgono volentieri nelle foglie di vite. In Transilvania sono più
              grandi, di cavolo acido, cotte a strati con carne affumicata e crauti, a volte con
              aneto o pomodoro. Ovunque, nei giorni di digiuno ortodosso, il ripieno è di riso e
              funghi, senza carne.
            </Context>
          </Card>
          <Card
            card={RoFood.CiorbaBors}
            intro={
              <>
                La <N>ciorbă</N> è una zuppa acidula, spesso il primo piatto del pranzo. L’acidità
                viene dal <N>borș</N>, crusca di grano fermentata in acqua, oppure da limone, aceto
                o succo di crauti; in Moldavia la parola borș indica anche la zuppa stessa. Si serve
                con smântână e peperoncino a parte, e la profuma il levistico (leuștean). Il nome
                viene dal turco çorba. Ogni regione ha le sue: quella di trippa, quella di pollo di
                Rădăuți, il borș dei lipoveni con il pesce del delta.
              </>
            }
            remember="La ciorbă è la zuppa acidula che apre il pranzo: chiedi con che cosa è acidulata, e ogni regione risponde a modo suo."
          >
            <Context
              on="always"
              kind="variants"
              period="Moldavia, Valacchia, Transilvania"
              title="Borș, zeamă o ciorbă"
            >
              In Moldavia una zuppa acida è un borș, e quella di pollo con tagliolini fatti in casa
              è la zeamă, acidulata con il borș. In Valacchia è una ciorbă, e il gusto è quello del
              levistico. In Transilvania, per l’influenza ungherese, la zuppa si lega spesso con un
              soffritto di farina e prende il dragoncello; è questa erba, poco usata nel resto del
              paese, a far riconoscere una zuppa transilvana.
            </Context>
          </Card>
          <Card
            card={RoFood.Cozonac}
            intro={
              <>
                Il <N>cozonac</N> è un pane dolce lievitato, cotto in uno stampo lungo, con un
                ripieno a spirale di noci e cacao e a volte rahat, il lokum turco. Si prepara per
                Pasqua e per Natale, e ogni famiglia ha la sua ricetta. Pani dolci simili si fanno
                in molti paesi vicini.
              </>
            }
            remember="Il cozonac è il dolce delle feste: tagliato a fette, mostra la sua spirale di noci."
          />
          <Card
            card={RoFood.Papanasi}
            intro={
              <>
                I <N>papanași</N> sono ciambelle di formaggio fresco, uova e farina, fritte o
                bollite, con sopra una pallina della stessa pasta. Arrivano caldi, coperti di
                smântână e di marmellata, di solito di frutti di bosco o di amarene. Sono il dolce
                che quasi tutti ordinano a fine pasto, in città come in montagna.
              </>
            }
            remember="I papanași si ordinano alla fine, anche quando non c’è più posto: ciambella calda, smântână e marmellata."
          />
          <Card
            card={RoFood.Tuica}
            intro={
              <>
                La <N>țuică</N> è l’acquavite di prugne: le prugne fermentano per settimane in
                botte, poi si distillano in un alambicco di rame. Distillata una volta ha di solito
                fra 24 e 40 gradi; distillata due volte è più forte e prende altri nomi, come
                pălincă in Transilvania e horincă nel Maramureș. Si beve in un bicchierino prima del
                pasto, è il brindisi delle feste e nelle campagne si offre all’ospite.
              </>
            }
            remember="La țuică è il benvenuto: un bicchierino di prugne prima di mangiare, offerto a chi arriva."
          >
            <Context
              on="always"
              kind="curiosity"
              period="Ogni autunno"
              title="Le prugne vanno nel bicchiere"
            >
              La Romania è fra i maggiori produttori di prugne d’Europa, e gran parte del raccolto
              non si mangia: finisce in botte e poi nell’alambicco. In autunno, nei villaggi, le
              famiglie distillano per sé con l’alambicco di casa o con quello del vicino.
            </Context>
          </Card>
        </Part>
        <Part section={RoSection.FoodTransylvania}>
          <Card
            card={RoFood.SibiuSalami}
            intro={
              <>
                Il <N>salam de Sibiu</N> è un salame crudo di carne di maiale, stagionato a lungo e
                coperto da una muffa nobile bianca che gli dà il suo aroma. La produzione comincia
                all’inizio del Novecento con salumieri italiani, nella zona di Sibiu e nella valle
                della Prahova: sulle date e sul luogo preciso le fonti non sono d’accordo. Dal 2016
                è un’indicazione geografica protetta dell’Unione europea.
              </>
            }
            remember="Il salam de Sibiu porta il nome di una città transilvana e la mano di salumieri italiani: lo riconosci dalla muffa bianca."
          />
          <Card
            card={RoFood.Kurtoskalacs}
            intro={
              <>
                Il <N>kürtőskalács</N>, «colac secuiesc» in romeno, è un dolce cavo a spirale: un
                nastro di pasta lievitata avvolto su un cilindro di legno, cotto girando sulla brace
                e coperto di zucchero che caramella. È il dolce dei siculi, gli ungheresi della
                Transilvania orientale; la ricetta più antica che si conosce è in un ricettario
                transilvano del 1784. Dolci simili si fanno fra i sassoni, che lo chiamano
                Baumstriezel, in Ungheria, in Slovacchia e in Cechia, e il nome è conteso fra più
                paesi.
              </>
            }
            remember="Il kürtőskalács si mangia caldo, appena tolto dal suo cilindro: è il dolce della Transilvania ungherese."
          />
          <Card
            card={RoFood.Palinca}
            intro={
              <>
                La <N>pălincă</N> è l’acquavite forte della Transilvania: frutta fermentata, di
                solito prugne ma anche pere, mele, albicocche o mele cotogne, distillata due volte
                fino a circa 50 gradi. È un’indicazione geografica dell’Unione europea: fra 40 e 52
                gradi, prodotta in tredici distretti dell’arco dei Carpazi, dal Maramureș al Bihor.
                In Ungheria si fa la pálinka, che per la legge europea è un’altra bevanda.
              </>
            }
            remember="La pălincă è la țuică della Transilvania, distillata due volte: più forte, e di molti frutti."
          />
          <Card
            card={RoFood.BranzaDeBurduf}
            intro={
              <>
                La <N>brânză de burduf</N> è il formaggio dei pastori dei Carpazi. Il caș, la
                cagliata di latte di pecora, si lascia maturare qualche giorno, poi si sbriciola, si
                impasta con il sale e si pressa in un sacco di pelle o di stomaco di pecora, il
                burduf, oppure in cilindri di corteccia d’abete. Il gusto è forte e salato; nella
                corteccia prende un profumo di resina. Nel corridoio fra Bran e Rucăr il cilindro di
                corteccia si vende lungo la strada.
              </>
            }
            remember="La brânză de burduf è il formaggio dei pastori impastato a mano: nella corteccia d’abete prende il profumo del bosco."
          />
        </Part>
        <Part section={RoSection.FoodWallachia}>
          <Card
            card={RoFood.Mici}
            intro={
              <>
                I <N>mici</N>, o mititei, sono piccoli cilindri di carne tritata e speziata, senza
                budello, cotti alla griglia. La leggenda li fa nascere a Bucarest alla fine
                dell’Ottocento, in una locanda di strada Covaci, una sera in cui finiscono i budelli
                per le salsicce; ma ricette di salsicce senza budello esistono già prima, e piatti
                simili si mangiano in tutti i Balcani che sono stati ottomani. Una ricetta del 1872
                li vuole di solo manzo: il maiale arriva più tardi. Sono il piatto del Primo maggio,
                quando si accendono le griglie all’aperto.
              </>
            }
            remember="I mici sono la griglia romena: niente budello, molta senape, e una leggenda di Bucarest che le fonti non confermano."
          />
          <Card
            card={RoFood.CiorbaBurta}
            intro={
              <>
                La <N>ciorbă de burtă</N> è una zuppa di trippa di manzo, legata con tuorli d’uovo e
                smântână e acidulata con aceto o limone. Arriva in tavola chiara e densa, con aglio,
                aceto e peperoncino a parte. Il modello è turco, la işkembe çorbası; zuppe di trippa
                si mangiano dalla Grecia ai Balcani, e chi l’abbia inventata è oggetto di contese
                fra paesi.
              </>
            }
            remember="La ciorbă de burtă è la zuppa di trippa ottomana con panna e uova: ognuno la corregge a tavola con aglio e aceto."
          >
            <Context
              on="always"
              kind="curiosity"
              period="Il giorno dopo"
              title="La zuppa del mattino dopo"
            >
              Come la sua cugina turca, la ciorbă de burtă ha fama di rimedio per i postumi di una
              sbornia: dopo una notte di nozze o di festa, la si cerca la mattina in un locale
              aperto presto.
            </Context>
          </Card>
          <Card
            card={RoFood.Covrigi}
            intro={
              <>
                I <N>covrigi</N> sono ciambelle di pane a forma di anello o di nodo, cosparse di
                sale grosso o di semi, vendute calde nelle simigerii, i piccoli forni di strada.{' '}
                <N>Buzău</N> è la città dei covrigi: la tradizione locale ha più di duecento anni, e
                una leggenda dice che li abbiano portati mercanti greci, ma la loro origine è
                incerta. Dopo il 1990 i forni si moltiplicano e «covrigi de Buzău» diventa un
                marchio.
              </>
            }
            remember="I covrigi sono il pane da passeggio: caldi, salati, comprati al forno sotto casa."
          />
        </Part>
        <Part section={RoSection.FoodMoldavia}>
          <Card
            card={RoFood.Tochitura}
            intro={
              <>
                La <N>tochitură</N> è uno spezzatino di carne di maiale e salsiccia affumicata,
                cotti lentamente in un paiolo nel loro stesso grasso: il nome viene probabilmente da
                a topi, «fondere». Quella moldava arriva in tavola con mămăligă, un uovo al tegamino
                e formaggio salato di pecora.
              </>
            }
            remember="La tochitură è il piatto unico della Moldavia: maiale, mămăligă, uovo e formaggio nello stesso piatto."
          />
          <Card
            card={RoFood.PoaleInBrau}
            intro={
              <>
                Le <N>poale-n brâu</N>, «gonne nella cintura», sono focaccine di pasta lievitata
                ripiegate dai bordi verso il centro sopra un ripieno di formaggio dolce, spesso con
                uvetta; esiste anche una versione salata, con formaggio salato e aneto. Il nome
                viene dal modo di chiuderle, con i lembi rimboccati come una gonna nella cintura.
                Ion Creangă le ricorda nei suoi <N work>Amintiri din copilărie</N>, i ricordi
                d’infanzia di un villaggio moldavo dell’Ottocento.
              </>
            }
            remember="Le poale-n brâu sono il dolce moldavo di formaggio: lo riconosci dai lembi ripiegati verso il centro."
          />
          <Card
            card={RoFood.Cotnari}
            intro={
              <>
                <N>Cotnari</N>, nel distretto di Iași, è una zona vinicola di soli vitigni romeni:
                la grasă de Cotnari e la frâncușă crescono soltanto qui, accanto alla tămâioasă
                românească e alla fetească albă. La frâncușă dà un bianco secco; grasă, tămâioasă e
                fetească albă i bianchi dolci per cui Cotnari è nota. All’inizio del Settecento
                Dimitrie Cantemir ne loda già il vino.
              </>
            }
            remember="A Cotnari si bevono solo uve romene: chiedi una grasă, il bianco dolce della Moldavia."
          />
        </Part>
        <Part section={RoSection.FoodDobruja}>
          <Card
            card={RoFood.BorsLipovenesc}
            intro={
              <>
                Il <N>borș lipovenesc</N> è la zuppa di pesce dei lipoveni del delta: si cuoce a
                fuoco lento, spesso in grandi paioli sul fuoco di legna, con almeno quattro pesci
                del Danubio diversi, come abramide, luccio, siluro e carassio, e poche verdure.
                Nonostante il nome, non sempre è acidulato con il borș: molti pescatori usano solo
                sale e aceto. Ogni anno a Jurilovca un festival ne cucina decine di migliaia di
                porzioni.
              </>
            }
            remember="Il borș dei lipoveni si fa con il pesce del giorno, e più pesci ci sono, meglio è."
          />
          <Card
            card={RoFood.Suberek}
            intro={
              <>
                Il <N>șuberek</N> è una mezzaluna di pasta croccante, fritta, ripiena di carne
                tritata con cipolla o di formaggio. È il piatto dei tatari di Dobrogea, quello con
                cui le famiglie accolgono gli ospiti, e viene dalla cucina ottomana.
              </>
            }
            remember="Il șuberek è il benvenuto dei tatari di Dobrogea: una mezzaluna fritta, da mangiare calda."
          />
          <Card
            card={RoFood.Murfatlar}
            intro={
              <>
                <N>Murfatlar</N> è una zona vinicola dell’altopiano della Dobrogea, fra il Danubio e
                il Mar Nero: suoli calcarei e poca acqua. Dall’inizio del Novecento vi si studiano
                viti adatte alla siccità. È conosciuta per i vini dolci, da uve stramature,
                soprattutto chardonnay e pinot gris.
              </>
            }
            remember="Murfatlar è il vino di una terra secca vicino al mare: dolce, da uve lasciate maturare a lungo."
          />
        </Part>
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
