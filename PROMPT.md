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
10. **Personaggi con scheda dedicata.** Elenca i pochi personaggi davvero centrali per il viaggiatore. Nelle timeline compariranno solo per l’evento della scheda.

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

### B8. Tipografia

- **Apostrofo tipografico** `’` nel testo visibile. L’apostrofo dritto resta solo nel codice e negli `href`.
- **Virgolette basse** « » per citazioni e soprannomi.
- **Intervalli di date**: trattino lungo `–`, senza spazi nelle schede (`1512–1521`) e con spazi negli `headings` e nell’indice (`290 – 895`).
- **Date approssimative**: `1310 ca.`, `XIV sec.`, `I sec. a.C.`.
- **Diacritici corretti** della lingua locale: per il romeno ș e ț con la virgola sotto, non ş e ţ con la cediglia.

---

## Parte C — Fonti e verifica

### C1. Regole

- **Ogni dato puntuale** (date, numeri, chi fa cosa, dove) deve avere almeno due fonti indipendenti. Wikipedia serve per un controllo rapido, non come seconda fonte.
- **Le voci di Wikipedia in italiano sulla storia dei Paesi dell’Est** sono spesso traduzioni condensate dall’inglese e mai riviste. Controllane i dati sulla voce inglese e sulle fonti di riferimento.
- **Se un dato non è verificabile** non inventarlo e non ammorbidirlo: lascia `{/* TODO verificare: … */}` nel punto esatto, spiegando il dubbio.
- **Quando correggi una fonte**, segnala l’errore: cosa dice la fonte, cosa è corretto e perché.
- **Se un dato che avevi proposto tu era sbagliato**, dillo esplicitamente e correggilo.

### C2. Errori ricorrenti da cercare attivamente

Sono gli errori trovati nella guida della Romania. Vanno cercati in ogni nuova guida.

**Nel passaggio da fonte a scheda:**

1. **Due frasi vicine fuse in una.** La fonte scrive "nel 568 gli Avari…; nel frattempo, nel 670, i Bulgari…" e la scheda diventa "568: la regione diventa bulgara". Controlla che ogni data della scheda appartenga davvero all’evento della scheda.
2. **Distinzioni regionali appiattite.** La fonte dà date diverse per due regioni (vassallaggio della Valacchia nel 1417, della Moldavia nel 1456) e la scheda le unisce.
3. **Senso invertito.** "Banato e Crișana restavano sotto il re", ma la scheda dice che facevano parte del voivodato.
4. **Data simbolica usata come data dell’evento.** L’anno di un’incoronazione o di una fondazione tradizionale al posto del processo reale (conquista graduale, indipendenza ottenuta dopo).
5. **Causa e conseguenza scambiate.** "La battaglia causa la servitù", mentre a causarla fu la repressione successiva.

**Nella fonte stessa:**

6. **Etnonimi sbagliati** usati come sinonimi.
7. **Negazioni e "bensì"** che rovesciano il senso.
8. **Chi fa cosa scambiato**: due personaggi omonimi, il principe di un paese attribuito all’altro, un sovrano al posto di un altro.
9. **Luoghi scambiati**, per esempio la capitale con il luogo di sepoltura, o una capitale antica con la capitale della provincia romana.
10. **Battaglie e trattati con date o nomi sbagliati**, per esempio Lesnaja al posto di Poltava, o territori assegnati al trattato sbagliato.
11. **Nomi rimasti nella lingua della traduzione**, segno che il testo non è stato rivisto.

**Nella struttura della guida:**

12. **Eventi regionali taggati per tutti** (`on="always"`), oppure eventi comuni taggati per una sola regione.
13. **Regioni senza contenuti per secoli** in una parte.
14. **Date di sezione che non coincidono** con il contenuto.
15. **Sezioni contigue sovrapposte**, con lo stesso evento in due parti.
16. **Testi d’apertura non aggiornati**, per esempio un sottotitolo che parla di «tre principati» quando le regioni sono quattro.

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

### D3. Intestazioni e indice

- Etichette e date delle sezioni stanno in un oggetto `headings` e vanno riusate nei titoli e nel `toc`. Niente date scritte a mano nel `toc`.
- Le date di una sezione coincidono con il primo e l’ultimo evento che contiene.

### D4. Cosa non rinominare dopo la pubblicazione

- I valori dell’enum delle regioni e delle città: sono salvati nel `localStorage` dei lettori.
- Gli `id` di capitoli, parti e sezioni: sono usati dall’indice.
- Gli `href` si verificano con uno script dedicato, non a mano.

### D5. Formattazione

- JSX elimina gli a capo tra testo ed elemento: usa `{' '}` dove serve uno spazio prima o dopo un `<N>`. Un a capo dimenticato produce errori come "contro iTurchi".
- Formatta con Prettier, con la configurazione del progetto.

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
7. Elenca i `TODO verificare` aperti.
