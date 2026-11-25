import { guideKit } from '@/components/guide/content'
import type { GuideContent } from '@/content/types'
import { Eg, EgFood, EgSection, structure } from '../structure'
import { sources } from '../sources'
import { names } from './names'

const { Card, Chapter, Context, Emblem, N, Part, Text } = guideKit(structure, names)

export const egypt: GuideContent<Eg, EgSection> = {
  lang: 'it',
  structure,
  names,
  sources,
  body: <Body />,
}

function Body() {
  return (
    <>
      <Chapter
        section={EgSection.Emblems}
        lede="La bandiera tricolore e l’aquila d’oro: da dove vengono e che cosa raccontano."
      >
        <Part section={EgSection.Flag}>
          <Emblem kind="flag" on="always" />
          <Text on="always">
            La bandiera egiziana ha tre bande orizzontali di uguale larghezza: rossa in alto, bianca
            al centro e nera in basso. Nella banda bianca c’è l’aquila del Saladino, color oro. È la
            Costituzione a descriverla così, e a fare dell’oltraggio alla bandiera un reato.
          </Text>
          <Text on="always">
            I tre colori vengono dalla bandiera della{' '}
            <N href="https://it.wikipedia.org/wiki/Rivoluzione_egiziana_del_1952">
              rivoluzione del 1952
            </N>
            , che mise fine alla monarchia. La spiegazione ufficiale legge la bandiera come una
            storia: il rosso è il periodo prima della rivoluzione, la lotta contro l’occupazione
            britannica; il bianco è la rivoluzione, che rovesciò il re senza spargimento di sangue;
            il nero è la fine dell’oppressione della monarchia e del colonialismo.
          </Text>
          <Text on="always">
            Il simbolo al centro è cambiato più volte. Il regno d’Egitto aveva una bandiera verde
            con una mezzaluna bianca e tre stelle. Nel 1958, con l’unione con la Siria nella{' '}
            <N href="https://it.wikipedia.org/wiki/Repubblica_Araba_Unita">
              Repubblica araba unita
            </N>
            , la banda bianca porta due stelle verdi; nel 1972 le stelle lasciano il posto a un
            falco d’oro. Il 4 ottobre 1984 torna l’aquila.
          </Text>
        </Part>

        <Part section={EgSection.CoatOfArms}>
          <Emblem kind="coat-of-arms" on="always" />
          <Text on="always">
            Lo stemma è la stessa aquila d’oro. Sul petto porta uno scudo con i colori della
            bandiera; negli artigli tiene un cartiglio con il nome dello Stato in arabo, Jumhuriyat
            Misr al-Arabiya, «Repubblica araba d’Egitto».
          </Text>
          <Text on="always">
            Prende il nome dal <N href="https://it.wikipedia.org/wiki/Saladino">Saladino</N>, il
            sultano che nel XII secolo governò l’Egitto e la Siria e fece costruire la{' '}
            <N href="https://it.wikipedia.org/wiki/Cittadella_del_Cairo">Cittadella</N> del Cairo.
            Come simbolo dello Stato, però, l’aquila è moderna: compare con la rivoluzione del 1952,
            e dal 1984 è di nuovo lo stemma dell’Egitto.
          </Text>
        </Part>
      </Chapter>

      <Chapter
        section={EgSection.Food}
        lede="Che cosa ordinare, e come riconoscerlo nel menù: prima ciò che si mangia ovunque, poi le specialità di ogni regione."
      >
        <Part section={EgSection.FoodCommon}>
          <Card
            card={EgFood.Koshari}
            intro={
              <>
                Il <N>koshari</N> è un piatto unico di riso, lenticchie, pasta corta e ceci, con una
                salsa di pomodoro, una d’aceto e aglio e cipolla fritta croccante sopra. È un piatto
                senza carne, che costa poco e sazia. Sull’origine si raccontano due storie, che le
                fonti non datano allo stesso modo. Il nome ricorda il khichri indiano, riso e
                lenticchie, che sarebbe arrivato con i soldati indiani al seguito dei britannici; la
                pasta sarebbe un apporto degli italiani d’Egitto. Nessuna delle due è documentata.
              </>
            }
            remember="Il koshari mette nella stessa ciotola riso, lenticchie e pasta: un piatto povero dalle origini contese, oggi il più egiziano di tutti."
          />
          <Card
            card={EgFood.FulMedames}
            intro={
              <>
                Il <N>ful medames</N> è una crema di fave secche cotte lentamente per tutta la notte
                in una pentola panciuta dal collo stretto, la qidra, e condite al momento con olio,
                limone, sale e cumino; a volte con tahina, pomodoro o uovo sodo. È la colazione
                egiziana: la mattina lo servono carretti e banchi di strada, da raccogliere con il
                pane. Le fave si mangiano in Egitto fin dall’antichità; da quando si cucinino in
                questo modo, le fonti non lo dicono.
              </>
            }
            remember="Il ful è la colazione d’Egitto: fave cotte tutta la notte, condite davanti a te e raccolte con il pane."
          />
          <Card
            card={EgFood.Taameya}
            intro={
              <>
                La <N>ta’ameya</N> è il falafel egiziano, fatto con le fave secche e non con i ceci:
                un impasto di fave, erbe fresche e spezie, fritto in piccole palle croccanti. Si
                mangia insieme al ful, e la coppia ha un nome solo, «ful wi ta’ameya». Nel Levante,
                dove la ricetta probabilmente arriva dall’Egitto, le fave lasciano il posto ai ceci.
              </>
            }
            remember="La ta’ameya è il falafel di fave, e si mangia insieme al ful."
          />
          <Card
            card={EgFood.Molokhia}
            intro={
              <>
                La <N>molokhia</N> è una zuppa densa e verde di foglie di Corchorus olitorius, la
                pianta da cui altrove si ricava la iuta, tritate finissime e cotte nel brodo, di
                solito di pollo o di coniglio. La consistenza è vischiosa, e divide i viaggiatori.
                Alla fine si aggiunge la ta’leya: aglio e coriandolo fritti nel burro chiarificato.
                È la cucina di casa: si serve con il riso o con il pane.
              </>
            }
            remember="La molokhia è la zuppa verde di casa: foglie tritate e brodo, da mangiare con il riso."
          >
            <Context
              on="always"
              kind="curiosity"
              period="Inizio XI sec."
              title="Il califfo che la proibì"
            >
              Lo storico al-Maqrizi, nel Quattrocento, riporta un decreto del califfo fatimide{' '}
              <N>al-Hakim</N> che vieta la molokhia. Lo storico Paul Walker, che ha studiato quei
              decreti, ne vede il motivo nella politica: era il piatto preferito di Mu’awiya, il
              primo califfo omayyade, nemico degli sciiti, e i Fatimidi erano sciiti.
            </Context>
          </Card>
          <Card
            card={EgFood.Feteer}
            intro={
              <>
                Il <N>feteer meshaltet</N> è una sfoglia di molti strati sottili di pasta e samna,
                il burro chiarificato. La pasta si tira lanciandola e girandola in aria finché è
                sottilissima, poi si ripiega più volte e si cuoce in forno. Si mangia con miele,
                melassa o formaggio. Con un ripieno, dolce o salato, diventa semplicemente feteer.
                Si prepara per le feste e i matrimoni e si offre agli ospiti.
              </>
            }
            remember="Il feteer meshaltet è sfoglia e burro chiarificato: si mangia caldo, con il miele."
          />
          <Card
            card={EgFood.OmAli}
            intro={
              <>
                L’<N>om ali</N> è un dolce al forno di pasta sfoglia spezzata, bagnata di latte
                zuccherato e coperta di frutta secca e uvetta, servito caldo. Il nome vuol dire «la
                madre di Ali». Una leggenda lo lega alla prima moglie del sultano mamelucco Aybak:
                dopo l’uccisione della sua rivale, la sultana <N>Shajar al-Durr</N>, avrebbe fatto
                preparare il dolce per festeggiare. Altre versioni parlano di una cuoca di villaggio
                che lo improvvisa per un sultano a caccia. Nessun documento dell’epoca conferma una
                di queste storie.
              </>
            }
            remember="L’om ali è il dolce caldo di fine pasto: la sua storia di vendetta mamelucca è una leggenda."
          />
          <Card
            card={EgFood.Tea}
            intro={
              <>
                Lo <N>shai</N>, il tè nero, si beve tutto il giorno, zuccherato, in un piccolo
                bicchiere di vetro, spesso con foglie di menta. Il luogo per berlo è l’ahwa, il
                caffè di strada: tavolini sul marciapiede, il narghilè, il backgammon e il domino.
                La clientela è in gran parte maschile, ma alcune ahwa, soprattutto nel centro del
                Cairo, sono frequentate anche da donne, e i viaggiatori sono accolti.
              </>
            }
            remember="Il tè si beve nell’ahwa, in un bicchiere di vetro e dolce: è il posto dove l’Egitto si siede."
          >
            <Context on="always" kind="variants" period="Sinai" title="Il tè sul fuoco">
              Nel Sinai i beduini lo fanno bollire sul fuoco, molto dolce: è il tè dell’ospitalità,
              che si offre a chi arriva al campo o s’incontra lungo il sentiero.
            </Context>
          </Card>
          <Card
            card={EgFood.SugarcaneJuice}
            intro={
              <>
                L’<N>asab</N> è il succo di canna da zucchero spremuto al momento: le canne passano
                nella pressa del chiosco e il succo si beve subito, o si porta via in una bottiglia
                o in un sacchetto. La canna si coltiva soprattutto nell’Alto Egitto, da Minya in
                giù.
              </>
            }
            remember="L’asab è la canna dell’Alto Egitto spremuta davanti a te: dolce, fresco, e si beve in piedi."
          />
          <Card
            card={EgFood.Stella}
            intro={
              <>
                La <N>Stella</N> è la birra egiziana, una lager chiara. Nasce dalla Crown Brewery,
                aperta ad Alessandria nel 1897 da investitori belgi, e dalla Pyramid Brewery che gli
                stessi aprono al Cairo l’anno dopo. Nel 1963 le due fabbriche sono nazionalizzate e
                riunite nella Al Ahram Beverages, che nel 1997 torna privata e all’inizio degli anni
                Duemila è comprata da Heineken. In un paese a maggioranza musulmana, l’alcol si
                vende e si beve solo nei locali e nei negozi con licenza.
              </>
            }
            remember="La Stella ha più di un secolo: una birra nata ad Alessandria, che si beve solo dove l’alcol è permesso."
          />
        </Part>
        <Part section={EgSection.FoodLowerEgypt}>
          <Card
            card={EgFood.Sayadeya}
            intro={
              <>
                La <N>sayadeya</N> è il piatto dei pescatori, come dice il nome (sayyad,
                «pescatore»): pesce, spesso cefalo o orata, servito con un riso cotto con molta
                cipolla caramellata e spezie come cumino e cannella, che lo colorano di bruno. È la
                specialità di Alessandria. Piatti con lo stesso nome si cucinano lungo le coste del
                Levante, dal Libano a Gaza.
              </>
            }
            remember="La sayadeya è il pesce di Alessandria sul riso scuro di cipolla: il pranzo dei pescatori."
          />
        </Part>
        <Part section={EgSection.FoodUpperEgypt}>
          <Card
            card={EgFood.EishShamsi}
            intro={
              <>
                L’<N>eish shamsi</N>, il «pane del sole», è il pane dell’Alto Egitto. Si fa con un
                lievito madre conservato dall’ultima infornata; le pagnotte tonde lievitano al sole
                davanti alle case, poi si cuociono nel forno di fango. Pani simili compaiono nelle
                pitture delle tombe antiche. Slow Food lo segnala fra i cibi che rischiano di
                scomparire, perché sempre meno famiglie lo fanno in casa e in città le panetterie lo
                vendono di rado.
              </>
            }
            remember="L’eish shamsi lievita al sole: è il pane dell’Alto Egitto, fatto come si faceva nelle case dei villaggi."
          />
          <Card
            card={EgFood.Karkade}
            intro={
              <>
                Il <N>karkadè</N> è un infuso rosso scuro di calici secchi di ibisco, zuccherato,
                caldo d’inverno e ghiacciato d’estate. L’ibisco si coltiva nell’Alto Egitto, intorno
                ad Assuan e a Qena, e nel Fayyum. In tutto l’Egitto molte famiglie lo bevono per
                rompere il digiuno del Ramadan.
              </>
            }
            remember="Il karkadè è l’ibisco dell’Alto Egitto: rosso, dolce e un po’ aspro, caldo o ghiacciato."
          />
        </Part>
        <Part section={EgSection.FoodWesternDesert}>
          <Card
            card={EgFood.SiwaDates}
            intro={
              <>
                I <N>datteri di Siwa</N> sono la ricchezza dell’oasi. La varietà più importante è la
                siwi; i datteri si raccolgono a mano, salendo sulle palme, a partire dall’autunno, e
                si vendono freschi, secchi o in pasta. Dal 2016 il sistema di coltivazione di Siwa è
                riconosciuto dalla FAO come patrimonio agricolo mondiale.
              </>
            }
            remember="I datteri di Siwa si mangiano freschi in autunno e secchi tutto l’anno: sono l’oasi stessa."
          />
        </Part>
        <Part section={EgSection.FoodRedSea}>
          <Card
            card={EgFood.Jabana}
            intro={
              <>
                La <N>jabana</N> è il caffè degli ababda, la tribù del deserto fra il Nilo e il Mar
                Rosso: un caffè nero speziato con lo zenzero. I chicchi verdi si tostano sulla
                brace, si pestano con lo zenzero e si fanno bollire nella jabana, il bricco che dà
                il nome alla bevanda, un tempo di terracotta. Si serve in tazzine piccolissime, in
                più giri: di solito almeno tre.
              </>
            }
            remember="La jabana è il caffè degli ababda: zenzero, brace e tazzine piccolissime, almeno tre."
          />
        </Part>
      </Chapter>
    </>
  )
}
