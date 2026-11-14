# Regole per le guide tascabili di un Paese

Stai lavorando a una guida tascabile di viaggio dedicata a un Paese, scritta in italiano come componente React/TSX costruito con `guideKit`. La guida racconta la storia del Paese divisa per regioni storiche, con un filtro che mostra solo le regioni del viaggio del lettore.

Queste regole valgono per ogni Paese e per ogni fase: impostazione, scrittura, correzione, revisione. Se una richiesta è in conflitto con una regola, segnalalo prima di procedere.

---

## Parte A — Prima di scrivere: la scheda del Paese

Prima di scrivere qualsiasi contenuto, compila con l’utente questa scheda e fattela confermare. Quasi tutti gli errori di coerenza nascono dal non averla decisa all’inizio.

1. **Territorio.** La guida copre il territorio dello Stato attuale. Elenca i luoghi che storicamente ne facevano parte ma oggi sono altrove, e i luoghi oggi inclusi che storicamente avevano un’altra storia. Esempi: per la Romania, Bessarabia e Silistra da una parte, Dobrogea dall’altra.
2. **Regioni del filtro.** Scegli quattro-sei regioni storiche che corrispondano a ciò che il viaggiatore visita. Per ogni regione indica:
   - il periodo in cui ha una storia propria;
   - gli Stati o imperi di cui ha fatto parte, con le date;
   - se era uno Stato autonomo, un vassallo o una provincia diretta. È la distinzione che più spesso si confonde.
3. **Periodo coperto** e suddivisione in capitoli e parti, con date che non si sovrappongono.
4. **Popoli.** Elenca i popoli che compaiono nella storia del Paese e decidi quali sono "antichi", con la maiuscola. Vedi la sezione B4.
5. **Lingua dei nomi.** Per ogni lingua presente (per esempio bulgaro, turco ottomano, greco, romeno), stabilisci la forma originale da usare e la traslitterazione. Per i Paesi con alfabeto cirillico o greco, scegli un sistema di traslitterazione e applicalo sempre.
6. **Etnonimo e aggettivo del Paese.** Quando esistono varianti italiane (romeno/rumeno, bielorusso/belarusso, kirghiso/chirghiso), scegline una e usala ovunque, anche nelle etichette dei link.
7. **Dibattiti storiografici aperti.** Elenca le questioni contese: origini etniche, confini rivendicati, figure divisive, periodi di occupazione o di regime. Per la Romania erano la continuità daco-romana, Vlad III e il comunismo. Ognuna va trattata come dibattito, non come fatto.
8. **Narrazioni nazionali da cui guardarsi.** Indica le letture teleologiche tipiche del Paese, per esempio "terra nazionale in attesa di ricongiungersi" o "popolo che resiste da sempre allo straniero". Vanno riconosciute nelle fonti e non riprodotte.
9. **Fonti di riferimento.** Indica almeno due storie generali affidabili, accademiche e preferibilmente non scritte dalla storiografia nazionale di un solo Paese coinvolto. Wikipedia non conta come fonte di riferimento.
10. **Personaggi e città con scheda dedicata.** Elenca i pochi personaggi che il viaggiatore incontrerà davvero sul posto: in statue, castelli, monasteri, piazze, banconote, feste. Non c’è un numero fisso: conta il totale delle tracce dell’album (sezione B13), con almeno un personaggio per regione dove possibile. Non fermarti a sovrani e capi politici: cerca anche figure della musica, dello sport, dell’arte, della scienza e del cinema, e non dimenticare le donne, che le storie nazionali tendono a lasciare fuori. Non c’è una quota: un personaggio entra per i criteri della sezione B9, mai per riequilibrare l’elenco al posto di una figura più interessante. Per ognuno indica le tracce visibili e il mito o dibattito da chiarire. Elenca anche le città con scheda. I criteri sono nelle sezioni B9 e B10. Nelle timeline i personaggi compariranno solo per l’evento della scheda.
11. **Elenco dei luoghi.** Scegli con l’utente la fascia dell’album e il suo tetto (sezione B13). Prima di scrivere le schede, compila l’elenco unico dei luoghi (le «tracce») con il loro `id`: monumenti, edifici, siti, oggetti, piatti. L’elenco rispetta i criteri e le quote della sezione B13. Copertina, bandiera e stemma (caselle 01–03) non ci vanno: sono in ogni album di serie (sezione B9). Personaggi e città li richiameranno da questo elenco, senza duplicarli. Vedi la sezione D6.
12. **Archiviazione delle foto del lettore.** Decidi con l’utente se le foto restano solo sul dispositivo o devono essere ritrovabili su altri dispositivi. La scelta condiziona il modello dei dati e va presa prima di scrivere il codice della collezione. Vedi la sezione D6.

---

## Parte B — Regole editoriali

### B1. Lettore e selezione

- **Il lettore** è un viaggiatore italiano colto, non uno storico.
- **Il test per ogni scheda**: aiuta a capire un luogo, un monumento o qualcosa che il lettore sentirà raccontare sul posto? Se no, va tagliata o accorpata. Dettagli dinastici, trattati minori e campagne militari lontane dal territorio di solito non passano il test.
- **Collegamenti al viaggio.** Quando una scheda nomina un luogo visitabile, una frase deve dire cosa si vede oggi.
- **Copertura completa.** Ogni regione del filtro deve avere contenuti in ogni parte in cui ha una storia. Un lettore che seleziona una sola regione non deve trovare buchi di secoli. Verifica ogni regione da sola.

### B2. Niente teleologia, niente anacronismi

- Non usare il nome dello Stato attuale o il suo etnonimo per epoche in cui non esisteva. Scrivi le entità dell’epoca: "Valacchia e Moldavia", non "la Romania", prima dell’unione.
- Non presentare territori come "non ancora" parte del Paese.
- Non applicare categorie posteriori, per esempio "ortodosso" prima dello scisma del 1054, oppure "nazionale" o "patriottico" prima dell’Ottocento.
- Le formule del tipo "completa la conquista del Paese" sono quasi sempre anacronistiche: indica chi conquista cosa, in quel momento.

### B3. Dibattiti aperti

- Usa il componente `Callout kind="debate"`, che mette le posizioni l’una accanto all’altra e attribuisce ciascuna a chi la sostiene.
- Una nota finale dice cosa sappiamo e cosa no, e cosa il viaggiatore troverà nei musei locali, senza commenti come «per ovvie ragioni».
- Nelle schede normali non prendere posizione implicitamente. Esempio: "dal latino parlato nella regione" dà per scontata la continuità; "nelle province danubiane" no.

### B4. Nomi propri

- **Regola generale**: forma originale per i sovrani e i personaggi locali, nella traslitterazione scelta nella sezione A5.
- **Restano in italiano:**
  - gli epiteti consolidati in italiano, per esempio Stefano il Grande o Michele il Coraggioso;
  - i sovrani delle grandi potenze (imperatori, sultani, zar, re delle grandi monarchie);
  - i personaggi antichi;
  - i personaggi stranieri già noti in italiano.
- **Epiteti locali non consolidati in italiano**: nome originale, con la traduzione tra parentesi alla prima occorrenza nella scheda.
- **Un personaggio, una forma.** La stessa persona non deve comparire con due nomi, due numerazioni o due `href` diversi.

### B5. Etnonimi

- **Maiuscola** solo per i popoli antichi e delle migrazioni, decisi nella sezione A4.
- **Minuscola** per tutti gli altri.
- **Restano maiuscoli** i nomi propri di istituzioni e luoghi (per esempio Sublime Porta, Tre Nazioni, Terra dei Siculi).
- **Gli etnonimi non sono sinonimi.** Non sostituire un popolo con un altro per variare lo stile: Daci per romeni, Traci per bizantini, "asiatici", "musulmani", "ellenici". È l’errore più frequente nelle traduzioni.

### B6. Toponimi

- **Luoghi nel Paese**: forma locale attuale. La forma storica va tra parentesi solo se serve al testo.
- **Luoghi fuori dal Paese**: una sola forma, con il Paese attuale tra parentesi **in ogni scheda** dove compaiono, una volta per scheda. Con il filtro per regione non esiste una prima occorrenza fissa.
- **Elenchi di più luoghi esteri**: un riepilogo a fine frase, per esempio «, tutte oggi tra Ucraina e Moldova».
- **Città scomparse o rinominate**: indica cosa c’è oggi, per esempio Buda (oggi parte di Budapest).

### B7. Scrittura

- **Frasi brevi e concrete**, con un’informazione principale per frase.
- **Date e numeri precisi**, non formule vaghe come «danni importanti» o «una serie di vittorie».
- **Testo al presente storico.**
- **Titoli delle schede**: un nome proprio, per esempio «Trattato di Spira», oppure una frase breve con soggetto, per esempio «Gli ungari entrano nel bacino dei Carpazi». Niente titoli vaghi come «Un anno turbolento».
- **Niente editoriali, niente superlativi e primati non verificati.** Formule come «il primo», «il più grande», «la prima opera» vanno verificate o tolte: sono spesso false o discusse.
- **Coerenza tra titolo e testo.** Il titolo non deve affermare ciò che il testo smentisce, per esempio «La conquista ottomana» sopra «ma il regno resta suo».
- **Niente giudizi complessivi su periodi, regimi o popoli** («epoca buia», «età d’oro», «dominazione straniera», «periodo di decadenza»). Al loro posto vanno i fatti documentati che stanno dietro il giudizio: per esempio il costo dell’investitura, la durata dei regni, la pressione fiscale.
  - Se il giudizio stesso è un dato storico rilevante, attribuiscilo a chi lo ha formulato e quando, per esempio «la storiografia romena dell’Ottocento», e affiancalo ai fatti che lo mettono in discussione.
  - «È considerato», «viene ricordato come», «è noto come» non sono attribuzioni: dicono che qualcuno lo pensa, ma non chi.
  - Non spiegare fenomeni collettivi con un vizio o una virtù morale, come «l’avidità dei principi» o «il coraggio del popolo». Descrivi i meccanismi.

### B8. Tipografia

- **Apostrofo tipografico** `’` nel testo visibile. L’apostrofo dritto resta solo nel codice e negli `href`.
- **Virgolette basse** « » per citazioni e soprannomi.
- **Intervalli di date**: trattino lungo `–`, senza spazi nelle schede (`1512–1521`) e con spazi negli `headings` e nell’indice (`290 – 895`).
- **Date approssimative**: `1310 ca.`, `XIV sec.`, `I sec. a.C.`.
- **Diacritici corretti** della lingua locale: per il romeno ș e ț con la virgola sotto, non ş e ţ con la cediglia.

### B9. Schede personaggio

Le schede personaggio non sono biografie. Il loro scopo è far capire al viaggiatore **perché quel personaggio è ovunque intorno a lui** e che cosa significa per chi vive nel Paese oggi. La scheda è costruita intorno alle **tracce**, cioè le cose che il lettore può vedere: ogni traccia è un’immagine da «collezionare». Una traccia risulta vista **solo quando il lettore carica una sua foto**. La nota libera è facoltativa.

#### Chi merita una scheda

Un personaggio entra solo se soddisfa entrambe le condizioni:

1. **Il viaggiatore lo incontrerà**: monumenti, luoghi legati a lui, nomi di città, piazze e strade, banconote, festività, souvenir, film.
2. **C’è qualcosa da spiegare che la timeline non può dire in due righe**: un mito, un uso politico, un dibattito tra due Paesi, una distanza tra figura storica e immagine popolare.

Un personaggio importante ma senza tracce visibili resta nella timeline. Un personaggio molto visibile ma senza nulla da spiegare si risolve con una riga nella scheda della città.

#### Struttura della scheda

1. **Introduzione.** Da quattro a sei righe, non gamificate. Dice chi era il personaggio e perché lo si incontra ovunque. È l’unico testo che non dipende da una visita. Non parla di collezione, punteggi o completamento.
2. **Tracce.** Da due a cinque, ognuna con un’immagine e un breve testo. Ogni traccia:
   - porta **una sola idea** sul personaggio, legata a ciò che si vede in quel luogo;
   - è **leggibile da sola**, perché il lettore potrebbe visitarne soltanto una;
   - non ripete ciò che dicono le altre tracce o l’introduzione;
   - ha un’indicazione **«Come trovarla»**: dove si trova esattamente (nome del museo, sala, lato della piazza, orari o accesso se rilevanti). È **obbligatoria per le tracce insolite**, che altrimenti sarebbero introvabili, e consigliata per tutte. Le informazioni pratiche che cambiano nel tempo (orari, biglietti) vanno verificate prima della pubblicazione o omesse.
   - se sta dentro un museo, una chiesa, un parco o una piazza più conosciuti di lei (la copia della Colonna Traiana nel Museo nazionale di storia), lo dice già la riga del luogo, sotto il nome: il campo `within` («Museo nazionale di storia della Romania, Bucarest, Valacchia»). Nelle schede città, dove la città non si ripete, resta solo `within`. Se il nome del sito contiene già la località (il monastero di Putna), `place` tiene solo la regione;
3. **Da ricordare.** Una sola frase in chiusura: l’idea che il lettore deve portarsi a casa. Se non riesci a scriverla, la scheda non ha ancora un fuoco.

#### Come distribuire il contenuto tra le tracce

Gli argomenti da coprire sono quattro: chi era, che cosa ha fatto, perché conta oggi, storia e mito. Non vanno in fila: si distribuiscono tra le tracce, ciascuno dove il luogo lo rende più evidente. Chi vede tutte le tracce ha il quadro completo; chi ne vede una ha capito comunque qualcosa.

Esempio, Vlad III:

- la casa natale di Sighișoara porta «chi era»;
- le rovine di Poenari portano «che cosa ha fatto davvero»;
- Bran porta «storia e mito», perché è il luogo dove il mito è più lontano dai fatti.

Se un dibattito tra due letture o due Paesi è centrale, collocalo nella traccia dove si vede meglio e usa la struttura della sezione B3.

#### Tipi di traccia

Segna ogni traccia con uno di due tipi, così il lettore sa cosa aspettarsi:

- **Sul percorso**: si incontra visitando le città principali o è ovunque, per esempio una banconota o una statua in una piazza centrale.
- **Se passi di lì**: richiede una deviazione o un viaggio apposta.

#### Numero, valore e completamento

**Il modello è l’album di figurine.** Ogni Paese ha un album con un numero fisso di caselle, una per traccia. Al posto delle figurine, il lettore incolla le sue foto. L’album si progetta **completo prima della pubblicazione**, come un album stampato: tutte le caselle esistono dal primo giorno, anche vuote. Le aggiunte successive sono eccezioni (sezione «Aggiunte all’album»).

- **Dimensione e varietà.** Il numero di caselle dipende dal Paese: un Paese piccolo o poco visitato ha un album più piccolo, e più facile da completare, di uno grande. Fascia, criteri e quote sono nella sezione B13. Le banconote in circolazione sono tracce valide «in tutto il paese».
- **Le prime tre caselle sono sempre le stesse.** In ogni Paese la 01 è la **copertina** (la foto che per il lettore è quel Paese: diventa la copertina del Paese sulla mappa), la 02 la **bandiera** e la 03 lo **stemma**, viste dal vivo durante il viaggio. Le aggiunge il kit da solo, con la copertina e gli emblemi della guida come immagini di repertorio (nel capitolo sugli emblemi stemma e bandiera compaiono come tracce, con `<Emblem kind="flag" on="always" />`, al posto delle figure) e i testi uguali per tutte le guide: non vanno nell’elenco dei luoghi e non si scrivono. Valgono 1 punto ciascuna. Le tracce della guida partono dalla 04.
- **Numero progressivo.** Ogni traccia ha un numero all’interno del Paese (04, 05, 06…, dopo le tre caselle fisse), unico e **stabile**. Nell’album iniziale i numeri seguono l’ordine delle pagine (per esempio regione per regione). Dopo la pubblicazione non si cambiano più: una traccia aggiunta prende il numero successivo all’ultimo, una traccia eliminata lascia un buco. Non si rinumera mai.
- **Valore.** Ogni traccia vale **bronzo (1 punto)**, **argento (2 punti)** oppure **oro (3 punti)**. Il valore dipende da due criteri: **quanto è impegnativo raggiungerla** e **quanto è insolita**. Non dipende da quanto è importante: altrimenti il lettore sarebbe spinto a saltare le tracce «minori», che spesso sono proprio quelle che spiegano meglio un luogo.
  - **Raggiungibilità**: coincide con il tipo. «Sul percorso» non aggiunge nulla, «Se passi di lì» aggiunge un livello.
  - **Originalità**: una traccia è insolita se non compare nei percorsi turistici abituali e bisogna sapere che esiste per trovarla. Esempi: un ritratto in un piccolo museo, un dettaglio su una facciata, un oggetto in una collezione locale. Aggiunge un livello.
  - **Calcolo**: si parte da bronzo e si aggiunge un livello per ciascun criterio soddisfatto, fino a oro.

  |                    | Nota    | Insolita |
  | ------------------ | ------- | -------- |
  | **Sul percorso**   | Bronzo  | Argento  |
  | **Se passi di lì** | Argento | Oro      |

  Esempi: il castello di Bran, famoso e facile da raggiungere, è bronzo. Le rovine di Poenari, note ma fuori strada, sono argento. Un ritratto conservato in un piccolo museo fuori dalle rotte è oro.

- **L’originalità riguarda la traccia, non la foto.** La redazione la stabilisce una volta, per tutti. Non si valuta mai la foto del lettore.
- **Completamento del Paese.** È la somma dei punti delle tracce viste diviso il totale dei punti del Paese. Le soglie dei livelli bronzo, argento e oro sono valori di configurazione unici per tutte le guide, così da essere confrontabili.
- **Aggiunte all’album.** Sono rare e riservate a casi particolari: un luogo nuovo legato a fatti recenti (un monumento inaugurato, un museo aperto), una traccia importante dimenticata, un capitolo nuovo della guida. Una traccia aggiunta:
  - prende il numero successivo all’ultimo;
  - è segnalata come «nuova» per un certo periodo nella vista d’insieme.
- **Livelli raggiunti non si perdono.** Ogni aggiunta fa crescere il totale e abbassa la percentuale dei lettori. Il livello già raggiunto resta: si salva con la data in cui è stato ottenuto, e la barra mostra la percentuale attuale accanto al livello ottenuto.
- **Una guida pubblicata a metà fa crescere l’album.** Se la guida esce prima di essere completa (per esempio con la timeline ferma a un certo secolo), le tracce dei capitoli successivi saranno aggiunte. Ti conviene completare l’elenco dei luoghi (sezione A11) di tutta la guida prima di pubblicare l’album, anche se alcuni testi non sono ancora scritti.
- **Il gioco resta fuori dal racconto.** Punti, percentuali e livelli compaiono solo nella barra di completamento, nel segno di valore della traccia e nella vista d’insieme. Introduzione, testi delle tracce e «Da ricordare» non parlano mai di punti, livelli o completamento.
- **Niente confronti.** Nessuna classifica e nessun confronto di punteggi con altri utenti.

#### Limiti

- **Date: al massimo tre o quattro in tutta la scheda**, solo quelle che il lettore deve collegare a ciò che vede. Il resto si scrive senza date («all’inizio del regno», «pochi anni dopo», «nell’Ottocento») oppure si omette.
- **Niente elenchi** di battaglie, mogli, figli, successori, trattati. Un solo episodio raccontato bene vale più di cinque citati.
- **Niente genealogie**, salvo quando spiegano qualcosa che si vede, per esempio il nome di una dinastia su un castello.
- **Nomi propri:** oltre al personaggio, solo quelli indispensabili. Un lettore che visita più Paesi non deve trattenere decine di nomi.
- **Lunghezza:** introduzione e tracce si leggono in tutto in due o tre minuti. Ogni traccia, da sola, in meno di un minuto.
- **Nessuna ripetizione della timeline.** La timeline dice che cosa è successo, la scheda dice che cosa significa. Se un fatto è già nella timeline, la scheda lo richiama in una frase.

#### Immagini prima della visita

- Prima che il lettore aggiunga la sua foto, la traccia mostra la **foto di repertorio del luogo in scala di grigi, con opacità molto bassa, bordo tratteggiato e il numero progressivo**. Quando il lettore carica la sua foto, questa prende il posto di quella di repertorio.
- Ogni traccia deve quindi avere una foto di repertorio, con licenza libera. Se non se ne trova una utilizzabile, si usa un segnaposto neutro con lo stesso trattamento, e si segna con un `TODO immagine`.
- La scala di grigi non elimina i diritti d’autore: vale la stessa verifica delle immagini a colori.
- Per le foto di monumenti, opere e architetture recenti verifica i diritti: in alcuni Paesi la libertà di panorama è limitata. In caso di dubbio usa un’illustrazione o un segnaposto. Indica sempre autore e licenza delle immagini non originali.

#### Tono e verifica

- Le regole delle sezioni B2, B3 e B7 valgono ancora di più: i personaggi sono il terreno preferito dei miti nazionali. Non celebrare e non demolire. Mostra come e perché il personaggio è diventato quello che il lettore vede.
- I dati delle schede (date, luoghi, attribuzioni di monumenti e opere) seguono la regola delle due fonti. Vale anche per le informazioni sulle tracce: dov’è la statua, quando è stata eretta, chi l’ha voluta.
- Le tracce che cambiano nel tempo, come una banconota sostituita, una statua spostata o un museo chiuso, vanno verificate con una ricerca recente prima della consegna. In una collezione l’errore pesa di più: il lettore cerca una cosa che non trova.

#### Filtri

- L’`on` della scheda corrisponde alle regioni dove si trovano le sue tracce, non solo alla regione dove il personaggio ha regnato.
- Ogni traccia ha l’`on` della regione in cui si trova. Con una sola regione selezionata, la scheda mostra comunque l’introduzione e la frase finale, e le tracce di quella regione per prime.
- La guida ha due viste: **completa** (testi) e **d’insieme** (solo foto, numeri e titoli di tutte le tracce, in ordine di numero). Entrambe rispettano il filtro delle regioni. Ogni traccia deve quindi avere un titolo comprensibile anche senza il testo che l’accompagna.

### B10. Schede città

Le città seguono lo stesso modello dei personaggi, con un’introduzione più ampia: una città non è solo una lista di monumenti.

1. **Introduzione.** Da sei a dieci righe, non gamificate: che cos’è la città, chi l’ha costruita e abitata, perché ha questa forma. È il testo che dà senso a tutte le tracce.
2. **Tracce.** I luoghi da vedere, ognuno con un’immagine e una sola idea, leggibile da solo. Valgono i tipi «sul percorso» e «se passi di lì», ma riferiti alla città: «se passi di lì» indica un luogo fuori dal centro o con accesso limitato.
3. **Da ricordare.** Una frase in chiusura.

Le regole su date, nomi, immagini, verifica, numerazione e valore della sezione B9 valgono anche qui. La numerazione è unica per tutto il Paese, non per città. Quando una traccia è anche la traccia di un personaggio, per esempio la casa natale di un principe, è lo stesso luogo, non una copia (sezione D6). Il testo della città descrive il luogo, il testo del personaggio spiega perché quel luogo conta per lui.

### B11. Schede paesaggio

Il capitolo Natura è fatto di schede paesaggio: un parco, una catena montuosa, un delta, una gola. Seguono il modello delle città, ma il fuoco è la lettura del paesaggio: come si è formato e che cosa ci hanno fatto le persone.

1. **Introduzione.** Da sei a dieci righe, non gamificate: dove si trova, che tipo di paesaggio è (la geologia o il clima che lo spiegano), chi lo abita e lo usa, che cosa vi è cambiato nel Novecento. È il testo che dà senso a tutte le tracce.
2. **Tracce.** Da due a cinque punti precisi da fotografare: un lago, una cima, una grotta, una diga, un villaggio, una ferrovia. Ognuna porta una sola idea ed è leggibile da sola. Quasi tutte sono «se passi di lì»: il «Come trovarla» dice da dove si parte (villaggio, parcheggio, rifugio), con che mezzo e in quali mesi si raggiunge. Strade e sentieri d’alta quota chiusi d’inverno, grotte con visita guidata e permessi vanno indicati.
3. **Da ricordare.** Una frase in chiusura.

Le regole delle sezioni B9 e B10 valgono anche qui. In più:

- **Numeri della natura con due fonti**: altitudini, superfici, numero di laghi o di specie, anni di istituzione di parchi e riserve. Le cifre arrotondate dei siti turistici («oltre 80 laghi») vanno controllate sulle fonti dell’ente parco o dell’UNESCO.
- **Niente primati non verificati**: «la più grande», «l’ultima foresta vergine», «il canyon più profondo».
- **La regione del filtro** è quella del luogo; un paesaggio a cavallo di due regioni ha nel suo `on` tutte e due.

### B12. Schede specialità

Il capitolo Gastronomia è fatto di schede specialità: un piatto, un dolce, una bevanda, un vino. Lo scopo è far riconoscere al lettore che cosa ordinare e che cosa ha nel piatto.

1. **Introduzione.** Da tre a sei righe: che cos’è, di che cosa è fatto, quando e dove si mangia, da dove viene. Le origini contese (turca, ungherese, tedesca, ebraica…) si dicono come tali, senza attribuire il piatto a un solo popolo.
2. **Tracce.** La specialità stessa è una traccia: il lettore la fotografa dove la mangia. Una specialità di tutto il paese ha `where: 'anywhere'` e nessuna regione; una specialità regionale ha `where: 'region'` e la sua regione. Il «Come trovarla» dice in quali locali o negozi si trova, in quale stagione, con quale nome nel menù. Niente nomi di ristoranti: cambiano.
3. **Varianti.** Una specialità comune elenca fra le sue tracce le varianti regionali, che hanno anche una scheda nella parte della loro regione: la stessa traccia, non una copia (D6).
4. **Da ricordare.** Una frase in chiusura.

Valore: «comune» quando si trova in ogni ristorante tradizionale della regione, «rara» quando bisogna cercarla (un villaggio, una stagione, una produzione piccola).

### B13. Scelta delle tracce

L’album è la parte più costosa da mantenere. Ogni casella è un luogo da verificare, localizzare, illustrare con una foto di repertorio e tenere aggiornato, ed è una promessa al lettore: se la cerca, la trova. Per questo l’album deve essere **sostenibile** (ogni traccia regge da sola) ed **eterogeneo** (non dieci volte la stessa cosa). Si progetta con l’elenco dei luoghi (A11), prima di scrivere le schede.

#### Quante tracce

Il numero dipende da quanto Paese c’è da vedere, non dalla sua importanza storica. La fascia si sceglie nella scheda del Paese (A11) e si fa confermare dall’utente.

| Fascia  | Si visita in…                     | Esempi                                  | Tracce della guida |
| ------- | --------------------------------- | --------------------------------------- | ------------------ |
| Micro   | un fine settimana                 | Lussemburgo, Malta, Andorra             | 20–35              |
| Piccola | un viaggio di una settimana       | Slovenia, Belgio, Montenegro, Albania   | 40–70              |
| Media   | due o tre viaggi                  | Romania, Portogallo, Bulgaria, Ungheria | 80–120             |
| Grande  | molti viaggi, regione per regione | Italia, Francia, Spagna, Germania       | 150–220            |

Le tracce della guida sono quelle dalla 04 in poi: copertina, bandiera e stemma non contano. Per collocare il Paese nella fascia contano le regioni del filtro, le città con scheda e la densità del patrimonio: un Paese molto visitato e denso di patrimonio sta nella metà alta della sua fascia (l’Italia verso 220), un Paese poco visitato nella metà bassa.

- **Il numero è un tetto, non un obiettivo.** Un album più corto e tutto solido vale più di uno pieno di riempitivi.
- **Una dentro, una fuori.** Raggiunto il tetto, durante la progettazione ogni traccia nuova ne fa uscire un’altra, registrata con tutti i suoi testi in `content/<cc>/research/album/excluded-traces.md`.
- **Dopo la pubblicazione** valgono le «Aggiunte all’album» (B9). Se le aggiunte superano il 10% del tetto, si rivede la fascia con l’utente.

#### Quando una traccia regge

Una traccia entra solo se soddisfa **tutte** queste condizioni:

1. **Si vede e si fotografa.** È un luogo, un edificio, un’opera, un oggetto, un piatto. Non un concetto, un evento o una persona: quelli stanno nel testo.
2. **Si trova.** «Come trovarla» indica il punto preciso. Le coordinate vengono da Wikidata o OpenStreetMap (tranne per le tracce `region` e `anywhere`). Un viaggiatore qualsiasi ci arriva: se servono una guida, un permesso o una stagione, lo dice «Come trovarla».
3. **È stabile.** È aperta e visibile da almeno un anno, o ha davanti una vita lunga. Niente installazioni temporanee, cantieri senza data, luoghi chiusi a tempo indeterminato. Un luogo appena inaugurato entra solo se è legato a una scheda e la sua posizione è certa.
4. **Si verifica.** I suoi dati hanno due fonti (C1) e ha una foto di repertorio con licenza, oppure un `TODO immagine`. Una traccia con un `TODO verificare` sul _dove_ (non su un dettaglio del testo) non si pubblica.
5. **Porta un’idea propria.** Dice qualcosa che nessun’altra traccia, introduzione o timeline dice già.
6. **Vale la sosta.** Un viaggiatore che passa di lì si fermerebbe anche senza l’album. Se serve l’album per giustificarla, è un riempitivo.

#### Composizione

Le quote sono indicative e si controllano sull’elenco dei luoghi. Conta la foto, cioè quello che il lettore inquadra, non la scheda o il capitolo in cui la traccia compare: un piatto è un piatto anche nella scheda di un personaggio, e una traccia può stare anche solo in un «Oggi» della timeline.

- **Soggetti delle foto.** Piatti e bevande non oltre il 15%. Natura (cime, laghi, gole, grotte, foreste, animali) non oltre il 30%, senza un minimo: quanta ne serve a raccontare i posti dove i viaggiatori vanno davvero, cioè lungo una strada, una funivia o un sentiero breve, non in cima a un’escursione apposta (vedi «Difficoltà»). Edifici e luoghi costruiti (chiese, castelli, palazzi, ponti, piazze) non oltre metà dell’album; locali, negozi e mercati contano a parte, con le foto «pop» (vedi «Varietà»): una birreria non è una chiesa. Il resto sono opere e oggetti: statue, mosaici, dipinti, un libro, una banconota.
- **Regioni.** Ogni regione del filtro deve avere abbastanza tracce per un viaggio fatto solo lì: almeno il 10% dell’album, o 8 tracce se l’album è più piccolo. Una regione piccola o poco visitata può stare sotto, se la scheda del Paese lo dichiara.
- **Difficoltà.** Almeno metà delle tracce sono bronzo, raggiungibili in un viaggio normale. L’oro non supera il 10%. Le tracce che chiedono una giornata di cammino o di viaggio apposta (una cima, un’isola, un monastero isolato) non superano il 5%, e al massimo una per massiccio.
- **Varietà.** L’album è un portfolio: chi lo sfoglia trova foto di natura diversa, non dieci volte lo stesso genere di luogo. Oltre a storia, architettura e natura, dà spazio alle passioni per cui il Paese è davvero noto o che il viaggiatore incontra sul posto (musica, letteratura, cinema, sport, scienza e tecnica, arti popolari, feste, fede vissuta, il Paese di oggi: quali e quante dipende dal Paese, non c’è una lista da spuntare). Fra queste, finché il tetto lo permette, anche foto «pop»: un locale storico, un negozio famoso, un mercato, un oggetto che tutti nel Paese riconoscono, cioè i posti dove il viaggiatore va comunque e che raccontano il Paese com’è oggi, non solo i monumenti. La varietà non giustifica un riempitivo: ogni traccia supera comunque le sei condizioni, e una traccia scelta solo per coprire un tema si toglie.
- **Gesti.** Almeno un quinto delle tracce chiede qualcosa di diverso dal guardare un edificio: assaggiare, ascoltare, salire, entrare in una grotta o in una miniera, scovare un dettaglio, trovare un oggetto in tasca.
- **Doppioni.** Non c’è un numero massimo per tipologia: si valuta caso per caso, in base al Paese. L’Italia può avere molte chiese, la Romania molti monasteri, perché sono ciò che il viaggiatore incontra davvero. La tipologia è stretta, cioè la stessa foto con la stessa storia (cinque statue equestri, tre laghi glaciali dello stesso massiccio, quattro vini fotografati come un bicchiere), non la categoria generica («chiese», «castelli»). Ogni traccia in più della stessa tipologia deve raccontare una cosa diversa dalle altre; se non lo fa, è un doppione e si toglie.

#### Che cosa resta fuori

- Musei generici (il museo di storia regionale) senza un oggetto preciso da cercare: se il museo vale, la traccia è l’oggetto.
- Luoghi chiusi al pubblico, privati o visibili solo durante un evento, salvo che si vedano bene da fuori.
- Una seconda traccia per una storia che ne ha già una: la scheda la racconta nel testo.
- Luoghi fuori dal territorio dello Stato (A1), anche se la storia ci porta.
- Cose che cambiano spesso: locali e negozi senza una storia lunga, opere di street art, eventi a data variabile. Un locale o un negozio entra quando è un’istituzione: aperto da anni nello stesso posto, noto anche a chi non ci entra, riconoscibile da fuori (un’insegna, una facciata, una sala).

#### Come si lavora

1. Nella scheda del Paese si sceglie la fascia e il tetto.
2. L’elenco dei luoghi (A11) è una tabella con, per ogni traccia: `id`, regione, capitolo e scheda, `where`, valore, tema, gesto, e la frase che dice perché regge.
3. Prima di scrivere le schede si controllano le quote. Le tracce che non le rispettano si tolgono, partendo da quelle che reggono meno.
4. Le tracce scartate vanno in `excluded-traces.md` con il motivo, così una revisione futura sa perché non ci sono.

---

## Parte C — Fonti e verifica

### C1. Regole

- **Ogni dato puntuale** (date, numeri, chi fa cosa, dove) deve avere almeno due fonti indipendenti. Wikipedia serve per un controllo rapido, non come seconda fonte.
- **Le voci di Wikipedia in italiano sulla storia dei Paesi dell’Est** sono spesso traduzioni condensate dall’inglese e mai riviste. Controllane i dati sulla voce inglese e sulle fonti di riferimento.
- **Se un dato non è verificabile** non inventarlo e non ammorbidirlo: lascia `{/* TODO verificare: … */}` nel punto esatto, spiegando il dubbio.
- **Quando correggi una fonte**, segnala l’errore: cosa dice la fonte, cosa è corretto e perché.
- **Se un dato che avevi proposto tu era sbagliato**, dillo esplicitamente e correggilo.
- **Un riferimento conta come fonte solo dopo averlo aperto e letto.** I modelli linguistici, compreso quello che sta lavorando, possono citare documenti inesistenti o attribuire a un documento ciò che non dice. Vale anche per le revisioni fatte da altri modelli. Segnala i link che non si aprono o che non confermano il dato.
- **Due pagine che riprendono la stessa ricostruzione contano come una fonte sola**, per esempio una voce di Wikipedia e il sito che la copia.

### C2. Errori ricorrenti da cercare attivamente

Sono gli errori trovati nella guida della Romania. Vanno cercati in ogni nuova guida.

**Nel passaggio da fonte a scheda:**

1. **Due frasi vicine fuse in una.** La fonte scrive "nel 568 gli Avari…; nel frattempo, nel 670, i Bulgari…" e la scheda diventa "568: la regione diventa bulgara". Controlla che ogni data della scheda appartenga davvero all’evento della scheda.
2. **Distinzioni regionali appiattite.** La fonte dà date diverse per due regioni (vassallaggio della Valacchia nel 1417, della Moldavia nel 1456) e la scheda le unisce.
3. **Senso invertito.** "Banato e Crișana restavano sotto il re", ma la scheda dice che facevano parte del voivodato.
4. **Data simbolica usata come data dell’evento.** L’anno di un’incoronazione o di una fondazione tradizionale al posto del processo reale (conquista graduale, indipendenza ottenuta dopo).
5. **Causa e conseguenza scambiate.** "La battaglia causa la servitù", mentre a causarla fu la repressione successiva.
6. **Un processo compresso in un solo evento.** "Da qui nascono castelli e chiese fortificate" attribuisce a un’invasione strutture costruite nell’arco di tre secoli. Un titolo come "La Transilvania entra nel regno" condensa in un anno una conquista graduale. Data l’azione, poi descrivi il processo nel testo.
7. **La fine di uno stato di cose attribuita all’evento sbagliato.** Esempio: "alla morte di Michele, nel 1601, l’unione si dissolve", mentre l’unione era già finita mesi prima. Controlla quando un dominio, un’alleanza o un’unione finisce davvero.
8. **Più documenti fusi in uno.** Esempio: due petizioni distinte (1791 e 1792), con autori diversi, raccontate come una sola.
9. **Condizioni previste presentate come realtà.** Un trattato che prevede frontiere o titoli in caso di vittoria non va scritto come se li assegnasse. Esempio: "il Budžak resterà moldavo", quando il principe non lo amministrava.
10. **Statistiche senza unità contata.** Un calo dell’80% di cosa: abitanti, nuclei fiscali, villaggi? In quale territorio e periodo? Un calo di contribuenti può riflettere fughe ed esenzioni, oltre alle morti.
11. **Una formulazione che contraddice il riepilogo.** Esempio: "l’Oltenia torna agli ottomani", mentre torna alla Valacchia, principato tributario e non provincia. Chiediti sempre chi amministra.

**Nella fonte stessa:**

12. **Etnonimi sbagliati** usati come sinonimi.
13. **Negazioni e "bensì"** che rovesciano il senso.
14. **Chi fa cosa scambiato**: due personaggi omonimi, il principe di un paese attribuito all’altro, un sovrano al posto di un altro.
15. **Luoghi scambiati**, per esempio la capitale con il luogo di sepoltura, o una capitale antica con la capitale della provincia romana.
16. **Battaglie e trattati con date o nomi sbagliati**, per esempio Lesnaja al posto di Poltava, o territori assegnati al trattato sbagliato.
17. **Nomi rimasti nella lingua della traduzione**, segno che il testo non è stato rivisto.
18. **Giudizi complessivi riprodotti dalla fonte**, presentati come opinione comune. Esempio: "la fine del Settecento è considerata uno dei periodi più bui", senza dire chi lo considera e con una spiegazione morale ("i principi pensano ad arricchirsi"). Vedi B7.

**Nella struttura della guida:**

19. **Eventi regionali taggati per tutti** (`on="always"`), oppure eventi comuni taggati per una sola regione.
20. **Regioni senza contenuti per secoli** in una parte.
21. **Date di sezione che non coincidono** con il contenuto.
22. **Sezioni contigue sovrapposte**, con lo stesso evento in due parti.
23. **Testi d’apertura non aggiornati**, per esempio un sottotitolo che parla di «tre principati» quando le regioni sono quattro.
24. **Fatto di una regione dentro la scheda di un’altra.** Esempio: la riforma valacca del 1746 compare solo come frase finale della scheda moldava del 1749, con `on={[Moldavia]}`. Il codice è formalmente corretto, ma chi seleziona solo la Valacchia non la vede mai.
25. **Vista filtrata squilibrata.** Una regione vede il giudizio o il fatto negativo (per esempio la scheda sul periodo fanariota), ma non quello che lo bilancia, perché sta in una scheda taggata per un’altra regione. Il quadro è equilibrato con tutte le regioni selezionate, ma non con una sola.
26. **Una regione che sparisce prima della fine della parte.** La sezione regionale si ferma decenni prima, e la regione ricompare solo negli eventi comuni. Esempio: la Valacchia ferma al 1739 in una parte che arriva al 1818.
27. **Lo stesso luogo duplicato in più schede**, con testi o date diversi. Il lettore lo fotografa in una scheda e lo trova «non visto» in un’altra. Ogni luogo esiste una volta sola (sezione D6).

---

## Parte D — Regole del codice

### D1. Struttura

- Gerarchia: `Chapter` → `Part` → `Timeline` → `Event` / `Context` / `Callout`. Dentro un `Event` vanno `Detail`, `Source`, `Glossary`.
- `Event` è per un fatto datato. `Context` è per fenomeni senza data puntuale (società, economia, clima, migrazioni) e usa `period`. `Callout kind="debate"` è per le questioni contese. `Source` è per i limiti di una fonte. `Glossary` è per i termini tecnici, alla prima occorrenza.
- `<N>` è per i nomi propri, con `href` quando esiste una voce. `<N work>` è per i titoli di opere. `<D>` è per una data dentro un dettaglio. `<Aside>` è per incisi.

### D2. Filtri del viaggio

- `on="always"` va usato solo per i fatti che riguardano tutto il territorio. Un evento di una sola regione ha `on={[Regione]}`.
- **L’`on` di ogni figlio deve essere contenuto nell’`on` del genitore**, e anche nella voce dell’indice (`toc`) corrispondente. Se il genitore è più ristretto, i figli spariscono senza errori visibili.
- Una scheda condivisa tra due regioni va estratta in un componente. Si mostra nella sezione della prima regione, e nella seconda dentro `<Unless on={[PrimaRegione]}>`, così non compare mai due volte.
- **L’`on` deve corrispondere al contenuto, non solo al titolo.** Per ogni scheda, elenca le regioni di cui il testo afferma qualcosa: ognuna deve essere nell’`on`. Se una frase riguarda una regione esclusa, scegli una di queste soluzioni:
  - spostala in un `Detail` con il suo `on`;
  - spostala in una scheda propria nella sezione di quella regione;
  - rendi la scheda condivisa con il meccanismo sopra.

  Non basta che il codice sia coerente: un `on` corretto rispetto al titolo può nascondere un fatto a chi ha selezionato un’altra regione.

- **Ogni vista filtrata deve reggersi da sola.** Con una sola regione selezionata, il lettore deve trovare:
  - una storia continua, senza buchi di secoli;
  - i fatti che bilanciano ogni valutazione che vede, per esempio le riforme accanto al giudizio sul periodo.

  L’equilibrio si controlla regione per regione, non solo con tutte le regioni selezionate.

### D3. Intestazioni e indice

- Etichette e date delle sezioni stanno in un oggetto `headings` e vanno riusate nei titoli e nel `toc`. Niente date scritte a mano nel `toc`.
- Le date di una sezione coincidono con il primo e l’ultimo evento che contiene.

### D4. Convenzione degli `id` e cosa non rinominare

Gli `id` sono interni e indipendenti dalla lingua: il lettore vede solo i testi tradotti.

- **Paesi**: codice ISO 3166-1 alfa-2 in minuscolo (`ro`, `bg`).
- **Tutto il resto**: slug in inglese, ASCII, minuscolo, con trattini, senza diacritici, preceduto dal codice del Paese. Esempi: `ro.transylvania`, `ro.bucharest`, `ro.place.biertan-fortified-church`, `ro.person.vlad-iii`.
- **Sezioni**: `id` semantici, non posizionali come `p-4` o `s-4-2`, che cambiano significato quando si inserisce un capitolo.
- Gli `id` non cambiano quando cambia un titolo o una traduzione.

Dopo la pubblicazione non si rinominano:

- gli `id` di regioni, città e luoghi: sono salvati nei dati dei lettori;
- gli `id` di capitoli, parti e sezioni: sono usati dall’indice e dai link condivisi.

Se una rinomina è inevitabile, serve una mappa dai vecchi `id` ai nuovi e una migrazione dei dati salvati.

Gli `href` si verificano con uno script dedicato, non a mano.

### D5. Formattazione

- JSX elimina gli a capo tra testo ed elemento: usa `{' '}` dove serve uno spazio prima o dopo un `<N>`. Un a capo dimenticato produce errori come "contro iTurchi".
- Formatta con Prettier, con la configurazione del progetto.

### D6. Luoghi e collezione

- **Ogni traccia è un luogo con un `id` proprio**, definito una sola volta nell’elenco dei luoghi (sezione A11). Personaggi e città richiamano i luoghi per `id`. Non duplicare testo, coordinate o immagini dentro le singole schede.
- **Il testo è legato al contesto, il luogo no.** Lo stesso luogo può avere un testo nella scheda della città e un altro nella scheda del personaggio. La foto del lettore appartiene al luogo: caricata una volta, il luogo risulta visto ovunque compaia.
- **«Visto» si deduce dalla foto.** Un luogo è visto se ha almeno una foto valida del lettore. Non esiste un segno «visto» separato. Cancellare l’ultima foto riporta il luogo a «non visto».
- **Numero e valore appartengono al luogo**, non alla scheda: un luogo ha lo stesso numero e lo stesso valore in ogni scheda che lo richiama.
- **Punti e percentuali si calcolano**, non si salvano. Si salvano solo i livelli raggiunti, con la data, perché non devono andare persi quando il totale cambia.
- **Gli `id` dei luoghi non si rinominano dopo la pubblicazione**, come quelli delle regioni: lo stato della collezione del lettore è salvato con quegli `id`.
- **Le foto non vanno nel `localStorage`.** Il suo limite di pochi megabyte si riempie con poche immagini. Secondo la scelta presa nella sezione A12:
  - se le foto restano sul dispositivo, usa IndexedDB e ridimensiona le immagini prima di salvarle;
  - se devono essere ritrovabili su più dispositivi, serve un archivio esterno legato a un account.
- **Gestisci gli errori di salvataggio** e mostra al lettore se una foto non è stata salvata. Una foto persa in silenzio è peggio di una non salvata.
- **Privacy.** Le foto del lettore possono contenere dati di posizione (EXIF). Se escono dal dispositivo, rimuovili o chiedi il consenso.

---

## Parte E — Processo di lavoro

1. **Scheda del Paese** (parte A), confermata dall’utente.
2. **Struttura**: capitoli, parti, regioni, date in `headings`, indice. Ancora senza contenuti.
3. **Bozza** di una parte alla volta, dalla fonte principale.
4. **Verifica** della parte con le fonti di riferimento e con l’elenco C2. Gli errori trovati vanno elencati prima di correggerli.
5. **Revisione di coerenza** con le parti B e D: nomi, etnonimi, toponimi, tipografia, filtri.
6. **Controlli finali** (parte F).
7. Solo dopo, si passa alla parte successiva.

### Come consegnare le modifiche

- Per ogni modifica indica la scheda (anno e titolo), il testo attuale, il testo nuovo e il motivo, se non è ovvio.
- Separa gli **errori di fatto** dalle **migliorie di forma**.
- Segnala:
  - le contraddizioni con schede esistenti;
  - i dati non verificati;
  - le scelte discrezionali, cioè i casi in cui una regola non basta e hai deciso tu.
- Non riscrivere schede che non hanno problemi.
- Per modifiche estese a un file lungo, preferisci un elenco di istruzioni puntuali da applicare con Claude Code, piuttosto che riscrivere il file intero.

---

## Parte F — Controlli prima di consegnare

1. Il progetto compila e il lint passa.
2. Nessun apostrofo dritto nel testo visibile, nessun trattino corto nelle date, nessuna variante dell’etnonimo diversa da quella scelta nella sezione A6.
3. Nessuna forma di nome, etnonimo o toponimo contraria alle sezioni B4–B6. Cerca nel testo le forme vecchie note.
4. Gli `on` dei figli sono coerenti con quelli dei genitori e con l’indice.
5. Le date nei `headings` coincidono con il contenuto. Le sezioni contigue non si sovrappongono.
6. I filtri del viaggio funzionano:
   - ogni regione da sola, senza buchi cronologici;
   - tutte le regioni insieme;
   - le coppie che usano `Unless`, senza schede duplicate o mancanti.
7. Per ogni scheda, le regioni di cui il testo afferma qualcosa sono tutte nel suo `on` (sezione D2).
8. Con ogni regione selezionata da sola, rileggi le schede che contengono una valutazione e controlla che i fatti che la bilanciano siano visibili nella stessa vista.
9. Nessun giudizio complessivo su periodi, regimi o popoli senza attribuzione (sezione B7). Cerca nel testo «buio», «età dell’oro», «decadenza», «è considerato», «viene ricordato».
10. Ogni link usato come fonte è stato aperto e conferma il dato. Elenca quelli che non si aprono o non lo confermano.
11. Ogni scheda personaggio e città segue le sezioni B9 e B10: introduzione non gamificata, tracce con una sola idea ciascuna e leggibili da sole, al massimo tre o quattro date, nessuna ripetizione della timeline, frase «Da ricordare» in chiusura.
12. Ogni traccia è un luogo dell’elenco unico, richiamato per `id`. Nessun luogo è duplicato. Ogni traccia ha un tipo («sul percorso» o «se passi di lì»), un’indicazione di originalità («nota» o «insolita»), un valore coerente con la tabella della sezione B9, un numero progressivo unico nel Paese mai riassegnato (dalla 04: le caselle 01–03 sono copertina, bandiera e stemma), e una foto di repertorio con diritti verificati oppure un `TODO immagine`.
13. Caricare la foto di un luogo lo segna come visto in tutte le schede e nella vista d’insieme. Cancellarla lo riporta a non visto. Le foto non sono nel `localStorage`.
14. Testi delle schede senza riferimenti a punti, livelli o completamento.
15. Le tracce soggette a cambiamenti (banconote, statue, musei) sono state verificate con una ricerca recente.
16. L’album rispetta la sezione B13: tracce entro il tetto della fascia, ognuna che soddisfa le sei condizioni, quote di soggetti, regioni, difficoltà, varietà, gesti e doppioni. Elenca gli scostamenti e il motivo.
17. Elenca i `TODO verificare` e i `TODO immagine` aperti.
