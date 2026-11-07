# Regole per la guida tascabile della Romania

Stai lavorando alla guida tascabile di viaggio della Romania, scritta in italiano come componente React/TSX costruito con `guideKit`. Queste regole valgono per ogni modifica: aggiunta di schede, correzioni, nuovi capitoli, revisioni. Se una richiesta è in conflitto con una regola, segnalalo prima di procedere.

## 1. Lettore e criterio di selezione

- **Il lettore** è un viaggiatore italiano colto, non uno storico. Legge la guida prima o durante il viaggio.
- **Il criterio geografico** è il territorio della Romania attuale: Transilvania, Valacchia, Moldavia, Dobrogea. Bessarabia, Bucovina settentrionale, Silistra e gli altri luoghi oggi fuori dalla Romania compaiono solo quando servono a capire la storia di una regione romena.
- **Il test per ogni scheda**: aiuta a capire un luogo, un monumento o qualcosa che il lettore sentirà raccontare in Romania? Se no, va tagliata o accorpata.
- **Niente teleologia.** Non presentare territori come "non ancora romeni" o "in attesa di ricongiungersi", e non usare "Romania" o "romeno" per epoche in cui lo Stato non esisteva. Va scritto "Valacchia e Moldavia", non "la Romania", fino al 1859.
- **Dibattiti aperti.** Sulle questioni contese (continuità daco-romana, ruolo di Vlad III, comunismo) presenta le posizioni senza schierarti, con il componente `Callout kind="debate"`.

## 2. Fonti e verifica

- **Ogni dato puntuale** (date, numeri, chi fa cosa) deve avere almeno due fonti indipendenti. Wikipedia serve per un controllo rapido, non come seconda fonte. Riferimenti solidi: Keith Hitchins, _A Concise History of Romania_ (Cambridge University Press, 2014), e Lucian Boia, _Romania: Borderland of Europe_.
- **Le voci italiane di Wikipedia sulla storia romena** ("Romania medievale", "Storia della Romania" e simili) sono traduzioni poco curate. Ricontrolla sempre:
  - gli etnonimi usati come sinonimi: "daci" al posto di "romeni", "traci" al posto di "bizantini", "asiatici", "musulmani", "ellenici";
  - le frasi con negazioni o con "bensì";
  - le frasi in cui chi fa cosa sembra strano;
  - le frasi vicine con date diverse, che nella sintesi tendono a fondersi in una sola.
- **Se un dato non è verificabile** non inventarlo e non ammorbidirlo. Lascia un commento `{/* TODO verificare: … */}` nel punto esatto, spiegando il dubbio.
- **Quando correggi una fonte**, segnala l'errore: cosa dice la fonte, cosa è corretto e perché.

## 3. Nomi propri

- **Regola**: forma originale per i principi romeni e ungheresi (Matei Basarab, Gábor Bethlen, György I Rákóczi, Constantin Mavrocordat, Gheorghe Ștefan, Mihály I Apafi).
- **Restano in italiano:**
  - gli epiteti consolidati: Stefano il Grande, Michele il Coraggioso, Mircea il Vecchio, Vlad l’Impalatore;
  - i sovrani delle grandi potenze e i re d’Ungheria (Solimano, Rodolfo II, Ferdinando I, Giovanni I d’Ungheria, Leopoldo I, Caterina II, Pietro il Grande, Maria Teresa, Giuseppe II);
  - i personaggi antichi (Burebista, Decebalo, Traiano, Aureliano);
  - i personaggi non romeni e non ungheresi già noti in italiano (Giorgio Martinuzzi, Giorgio Basta, Antonio Carafa).
- **Epiteti romeni non consolidati in italiano**: nome originale, con la traduzione tra parentesi alla prima occorrenza nella scheda, per esempio Ioan Vodă cel Cumplit («il Terribile»).
- **Un personaggio, una forma.** La stessa persona non deve comparire con due nomi o due numerazioni diverse, né con due `href` diversi.

## 4. Etnonimi e lingua

- **Maiuscola** solo per i popoli dell’antichità e delle migrazioni (Parte I del capitolo 2): Traci, Geti, Daci, Celti, Greci, Romani, Goti, Unni, Gepidi, Avari, Bulgari, Ungari, Peceneghi, Siculi.
- **Minuscola** per tutti gli etnonimi successivi: romeni, ungheresi, sassoni, siculi, ottomani, turchi, greci, polacchi, russi, tatari, cosacchi, lipoveni.
- **Restano maiuscoli i nomi propri**: Tre Nazioni, Unione delle Tre Nazioni, Terra dei Siculi, Asburgo, Porta, Sublime Porta.
- **Sempre «romeno»**, mai «rumeno», anche nelle etichette dei link.

## 5. Toponimi

- **Luoghi in Romania**: forma romena attuale (Cluj, Sibiu, Iași, Oradea). La forma storica va tra parentesi solo se il testo la richiede, per esempio Gran Varadino (oggi Oradea).
- **Luoghi fuori dalla Romania**: una sola forma per luogo, con il Paese attuale tra parentesi **in ogni scheda** dove compaiono, una volta per scheda. Con il filtro per regione non esiste una "prima occorrenza" fissa. Esempi: Hotin (oggi Chotyn, in Ucraina), Tighina (oggi in Moldova), Chilia (oggi Kilija, in Ucraina), Cetatea Albă (oggi Bilhorod-Dnistrovs’kyj, in Ucraina), Silistra (oggi in Bulgaria), Debrecen (oggi in Ungheria).
- **Elenchi di più luoghi fuori dalla Romania**: niente Paese dopo ciascuno. Chiudi la frase con un riepilogo, per esempio «, tutte oggi tra Ucraina e Moldova».

## 6. Scrittura

- **Frasi brevi e concrete**, con un'informazione principale per frase. Date e numeri precisi invece di formule vaghe come «danni importanti» o «una serie di vittorie».
- **Niente editoriali** («per ovvie ragioni», «purtroppo», «finalmente») e niente superlativi non verificati («il più grande», «il primo»).
- **Titoli delle schede**: una forma sola. Un nome proprio, per esempio «Trattato di Spira», oppure una frase breve all’indicativo presente con soggetto, per esempio «Gli ungari entrano nel bacino dei Carpazi». Niente titoli vaghi come «Un anno turbolento».
- **Testo delle schede al presente storico.**
- **Collegamenti al viaggio.** Quando una scheda nomina un luogo visitabile, una frase deve dire cosa si vede oggi, per esempio «… che vedi al monastero di Horezu».
- **Personaggi.** I personaggi più rilevanti (Vlad III, Stefano il Grande, Ceaușescu e pochi altri) avranno schede personaggio dedicate, prima di "Regioni e città". Nelle timeline vanno citati solo per l’evento della scheda, senza biografia.

## 7. Tipografia

- **Apostrofo tipografico** `’` in tutto il testo visibile, mai `'`. L’apostrofo dritto resta solo nel codice e negli `href`.
- **Virgolette basse** « » per citazioni e soprannomi.
- **Intervalli di date**: trattino lungo `–`, senza spazi nelle date delle schede (`1512–1521`) e con spazi negli `headings` e nell’indice (`290 – 895`).
- **Date approssimative**: `1310 ca.`, `XIV sec.`, `I sec. a.C.`. Secoli in numeri romani.
- **Accenti**: «élite», «È». Diacritici romeni corretti, con la virgola sotto: ș e ț, non ş e ţ con la cediglia.

## 8. Regole del codice

### Struttura

- Gerarchia: `Chapter` → `Part` → `Timeline` → `Event` / `Context` / `Callout`. Dentro un `Event` vanno `Detail`, `Source`, `Glossary`.
- `Event` è per un fatto datato. `Context` è per fenomeni senza data puntuale (società, economia, clima, migrazioni) e usa `period`. `Callout kind="debate"` è per le questioni contese. `Source` è per i limiti di una fonte. `Glossary` è per i termini tecnici, solo alla prima occorrenza.
- `<N>` è per i nomi propri, con `href` quando esiste una voce. `<N work>` è per i titoli di opere. `<D>` è per una data dentro un dettaglio. `<Aside>` è per incisi.

### Filtri del viaggio (`on`)

- `on="always"` va usato solo per fatti che riguardano tutto il territorio. Un evento di una sola regione ha `on={[Regione]}`.
- **L’`on` di ogni figlio deve essere contenuto nell’`on` del genitore.** Lo stesso vale per la voce dell’indice (`toc`) corrispondente.
- Una scheda condivisa tra due regioni va estratta in un componente (come `BoyarsContext` e `MocaniContext`). Si mostra nella sezione della prima regione, e nella seconda dentro `<Unless on={[PrimaRegione]}>`, così non compare mai due volte.

### Intestazioni e indice

- Le etichette e le date delle sezioni stanno in `headings` e vanno riusate nei titoli e nel `toc`. Niente date scritte a mano nel `toc`.
- Le date di una sezione devono coincidere con il primo e l’ultimo evento che contiene.
- Gli intervalli di `Part` contigue non devono sovrapporsi.

### Cosa non toccare

- I valori dell’enum `Romania`: sono salvati nel `localStorage` dei lettori.
- Gli `id` di capitoli, parti e sezioni: sono usati dall’indice.
- Gli `href` esistenti, salvo richiesta esplicita. I link vengono verificati a parte.

### Formattazione

- JSX elimina gli a capo tra testo ed elemento: usa `{' '}` dove serve uno spazio prima o dopo un `<N>`.
- Formatta con Prettier, con la configurazione del progetto.

## 9. Come consegnare le modifiche

- Per ogni modifica indica la scheda (anno e titolo), il testo attuale, il testo nuovo e il motivo, se non è ovvio.
- Separa gli **errori di fatto** dalle **migliorie di forma**.
- Segnala esplicitamente:
  - le contraddizioni con schede esistenti;
  - i dati non verificati;
  - le scelte discrezionali, cioè i casi in cui una regola non basta e hai deciso tu.
- Non riscrivere schede che non hanno problemi.

## 10. Controlli prima di consegnare

1. Il progetto compila e il lint passa.
2. Nessun apostrofo dritto nel testo visibile, nessun trattino corto nelle date, nessun «rumeno».
3. Nessuna forma di nome, etnonimo o toponimo contraria alle sezioni 3–5.
4. Gli `on` dei figli sono coerenti con quelli dei genitori e con l’indice.
5. Le date nei `headings` coincidono con il contenuto delle sezioni.
6. I filtri del viaggio funzionano con ciascuna regione da sola, con tutte, e con le coppie che usano `Unless`. Nessuna scheda è duplicata o mancante.
7. Elenca i `TODO verificare` aperti.
