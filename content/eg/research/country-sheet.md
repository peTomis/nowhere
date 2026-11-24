# Egypt — country sheet (draft)

Part A of `docs/prompt-for-new-guide.md`, to be confirmed by the user before any structure or
text is written. Dates here are working values from the reference histories (§9) and memory:
each one is checked again, with two sources, when the part that uses it is drafted. Items marked
**Decision** need the user's answer; the recommendation comes first.

Slug `egypt`, id `eg`, ISO numeric `818`, `at` ≈ `[30.8, 26.8]` (to take from Wikidata).

---

## 1. Territory

The guide covers the territory of the Arab Republic of Egypt today.

**Historically Egyptian (or ruled from Egypt), today elsewhere — mentioned, never given traces:**

- **Nubia south of the 22nd parallel** (Wadi Halfa, the Second Cataract, Kerma, Napata, Meroe):
  Sudan. Egyptian forts and New Kingdom temples stood there; the line itself is the 1899
  Anglo-Egyptian condominium border.
- **Sudan as a whole**: conquered from Egypt in 1820–1822 (Muhammad Ali), lost to the Mahdist
  state in 1885, Anglo-Egyptian condominium 1899–1956.
- **Jaghbub (Giarabub)**: transferred from Egypt to Italian Libya by the treaty of 6 December 1925
  (Egypt received land near Sollum in exchange). An Italian thread worth a line.
- **Gaza**: under Egyptian administration 1948–1967.
- **Syria**: united with Egypt in the United Arab Republic, 1958–1961.
- **Ptolemaic and Fatimid/Mamluk holdings** (Cyprus, Cyrenaica, the Levant, the Hejaz): context
  only.
- **Tiran and Sanafir** (Strait of Tiran): the 2016 agreement to hand them to Saudi Arabia was
  ratified by Egypt's parliament in 2017, blocked by court rulings, and as of 2025 sources is still
  not implemented. Outside the trip anyway (military zone); say nothing until it is settled.
  _To verify before publishing._
- **Hala'ib triangle** (administered by Egypt, claimed by Sudan): mention as disputed, no traces.

**Inside Egypt today, with a history of their own (not "Egypt" for long stretches):**

- **Sinai**: Nabataean, then Roman _Arabia Petraea_ (not the province of _Aegyptus_), a
  pilgrimage and Hajj route; occupied by Israel 1956–1957 and 1967–1982, Taba returned 1989.
- **The Western Desert oases**: Siwa is Amazigh (Berber) and was annexed only in 1820, with real
  control coming slowly; Kharga and Dakhla were Egyptian administrative outposts since the Old
  Kingdom but with their own rhythm.
- **Lower Nubia** (Aswan to the Sudanese border): Egyptian only in some periods (Middle and New
  Kingdom); Kushite, Meroitic, then the Christian kingdoms of Nobadia and Makuria, under the
  _baqt_ treaty with Muslim Egypt for some six centuries; flooded by the High Dam in the 1960s.
- **The Red Sea coast and Eastern Desert**: quarries, mines and ports, never farmland; Beja
  peoples (Ababda, Bishari).

## 2. Regions of the trip filter

**Confirmed by the user on 2026-11-24**, with the four placements below. Six regions, built on the ancient "Two Lands" plus the four
lands around the valley, which is also how trips to Egypt actually split (Cairo + Nile cruise +
Abu Simbel; Sharm el-Sheikh; Marsa Alam/Hurghada; Siwa and the desert).

| Region (id)                                 | Covers                                                                                                                                            | Own history                                                           | Status over time                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Basso Egitto** `eg.lower-egypt`           | Delta, Alexandria, Cairo/Memphis/Giza/Saqqara, Fayyum, Suez Canal                                                                                 | Predynastic Buto–Maadi culture; whenever the country splits           | Core of every Egyptian state. Hyksos kingdom at Avaris (XV dyn., c. 1650–1550 BC); Libyan dynasties of Tanis, Bubastis, Sais; capital of the Ptolemies (Alexandria) and of every Islamic regime (Fustat, al-Qata'i, Cairo).                                                                                          |
| **Alto Egitto** `eg.upper-egypt`            | The valley from south of Memphis to Aswan and the First Cataract: Amarna, Abydos, Dendera, Luxor, Edfu, Kom Ombo, Aswan                           | Naqada cultures, unification from the south; Thebes                   | Theban kingdoms in the intermediate periods (XI and XVII dyn.); a quasi-autonomous Theban domain of the High Priests of Amun (XXI dyn.); native revolts and pharaohs against the Ptolemies (205–186 BC); Roman/Byzantine _Thebaid_; the Hawwara emirs who governed it under the Mamluks and Ottomans (XIV–XVIII c.). |
| **Nubia** `eg.nubia`                        | South of the First Cataract: Philae, Kalabsha, the temples of Lake Nasser, Abu Simbel                                                             | A-Group, C-Group; Kush; Nobadia and Makuria                           | Egyptian province under a viceroy ("King's Son of Kush") in the New Kingdom; Kush rules Egypt as the XXV dynasty (c. 747–656 BC); Ptolemaic/Roman frontier (Dodekaschoinos); Christian kingdoms with the _baqt_ (652 to the XIV c.); Ottoman garrison at Qasr Ibrim; Egyptian from 1820.                             |
| **Sinai** `eg.sinai`                        | The peninsula: Mount Sinai, Saint Catherine, Sharm el-Sheikh, Dahab, Ras Mohammed (inland north of the St Catherine–Nuweiba road: no traces, §13) | Mines of the pharaohs; Nabataeans; monks and pilgrims; Bedouin tribes | Mining expeditions, not a province; Roman _Arabia Petraea_; Egyptian under the Islamic regimes; Israeli occupation 1967–1982.                                                                                                                                                                                        |
| **Mar Rosso** `eg.red-sea`                  | Eastern Desert and coast: Hurghada, El Gouna, Safaga, El Quseir, Marsa Alam, the monasteries of St Anthony and St Paul                            | Quarries and Punt expeditions; Roman ports to India; the first monks  | Never a province of its own: quarries, mines and ports run from the valley; Beja peoples; Quseir as Hajj port (Ottoman fort).                                                                                                                                                                                        |
| **Deserto occidentale** `eg.western-desert` | Oases (Siwa, Bahariya, Farafra, Dakhla, Kharga), White Desert, north coast west of Alexandria (El Alamein, Marsa Matruh)                          | Siwa's oracle of Amun; Persian and Roman oases; Senussi order; WWII   | Oases as Egyptian outposts (Kharga, Dakhla); Siwa independent until 1820; Senussi campaign 1915–1917; El Alamein 1942; the "New Valley" project from 1958.                                                                                                                                                           |

Discretionary choices (confirmed; the alternatives were weighed and rejected — a "Cairo" region is
not historical; Philae in Alto Egitto leaves Nubia with 7–8 traces; Aswan in Nubia would label
Egypt's frontier fortress of Elephantine as Nubian):

- **Cairo is in Basso Egitto**, as Memphis was (1st nome of Lower Egypt). A Cairo-only reader
  selects Basso Egitto and also sees the Delta and Alexandria; acceptable, since the alternative
  (a "Cairo" region) is not a historical region.
- **Fayyum in Basso Egitto**, although the ancient nome lists count it with Upper Egypt
  (_to verify_): it is a day trip from Cairo, and the filter follows the trip.
- **Aswan town in Alto Egitto, Philae in Nubia.** Syene/Aswan was the southern town of Egypt; the
  Aswan city card will list Philae as a trace with `on` Nubia (allowed: a card's `on` is the union
  of its traces' regions).
- **Middle Egypt (Minya, Amarna, Asyut) inside Alto Egitto**: "Middle Egypt" is a modern
  Egyptological label, not a historical region.
- **Red Sea and Sinai kept apart**: separate trips (Sharm vs Hurghada/Marsa Alam), separate
  histories.

Alternative, if six is too many: merge Sinai and Mar Rosso into "Sinai e Mar Rosso" (five
regions). Not recommended.

Region quota (B13): every region ≥10% of the album, i.e. 14 traces with the cap of §11. **Nubia,
Sinai and Mar Rosso are declared small regions** (10–12 traces each): their heritage is a few
sites far apart, and a trip there is mostly sea, mountain or one temple; filling them to 14 would
take filler. Basso and Alto Egitto carry two thirds of the album, as the Nile valley carries two
thirds of what there is to see.

## 3. Period and parts of the Timeline storica

From the Neolithic to today. One absolute chronology for the whole guide: **Ian Shaw (ed.), _The
Oxford History of Ancient Egypt_** (the most used in Italian museums too); BC dates before 664 BC
are conventional and the text says so once, in the first part.

Proposed parts (contiguous, no overlaps; intermediate periods inside the part that ends them):

1. Prima dei faraoni (– 3000 a.C.) — Nabta Playa, Naqada, Buto–Maadi
2. Le prime dinastie e l’Antico Regno (3000 – 2160 a.C.)
3. Medio Regno e Hyksos (2160 – 1550 a.C.) — First Intermediate Period, Middle Kingdom, Second Intermediate Period
4. Nuovo Regno (1550 – 1069 a.C.)
5. Libi, Nubiani, Persiani (1069 – 332 a.C.) — Third Intermediate and Late Periods
6. I Tolomei (332 – 30 a.C.)
7. Roma e Bisanzio (30 a.C. – 641 d.C.) — Christianity, Coptic Church, monasticism
8. Dalla conquista araba ai Fatimidi (641 – 1171)
9. Ayyubidi e mamelucchi (1171 – 1517)
10. Egitto ottomano (1517 – 1805) — includes the French expedition (1798–1801)
11. Muhammad Ali e i chedivè (1805 – 1882)
12. Occupazione britannica e regno (1882 – 1952)
13. La repubblica (1952 – oggi)

Thirteen parts (Romania has eleven) for five thousand years. Could merge 1+2 and 8+9 if the index
feels long.

## 4. Peoples

**Capitalised ("ancient", B5):** Egizi (the people of pharaonic Egypt), Nubiani of the
antiquity only where the text means the ancient cultures — better to name them: Kushiti,
Meroitici, Nobati, Blemmi; Libi (ancient Libyans: Tjehenu, Meshwesh, Libu), Hyksos, Ittiti,
Popoli del Mare, Assiri, Persiani (Achaemenids), Macedoni, Greci (of antiquity), Romani, Nabatei.

**Lowercase (living peoples and later groups):** egiziani, copti, arabi, nubiani (today), beduini,
berberi/amazigh (Siwa), beja (ababda, bisharin), turchi/ottomani, mamelucchi, curdi, albanesi,
francesi, inglesi/britannici, italiani, greci (modern community of Alexandria), ebrei, armeni,
siriani-libanesi ("shawam").

**Ethnonyms are not synonyms**: "arabi" is not "musulmani", "copti" is not "egiziani cristiani"
interchangeably in all periods, "mamelucchi" is a military-slave elite, not a people,
"turchi" is not "ottomani".

## 5. Names and transliteration

**Confirmed by the user on 2026-11-24.** Places in the country: `el-` as on signage; historical persons: `al-`.

- **Pharaohs, gods, ancient places**: the Italian Egyptological forms used by the Museo Egizio di
  Torino, which an Italian reader will also meet at home. Popular Greek-derived forms where they
  are the Italian norm: Cheope, Chefren, Micerino, Djoser, Tutankhamon, Akhenaton, Amenhotep III,
  Tutmosi III, Ramesse II, Seti I, Nefertari, Hatshepsut; Menfi, Tebe, Abido, Elefantina, File
  (Philae), Eliopoli.
  - Checked on 2026-11-24 on the museum's Italian catalogue
    (https://collezioni.museoegizio.it/it-IT/material/Cat_1381 and the king filter of
    https://collezioni.museoegizio.it/it-IT/search/): "Ramesse II", "Amenhotep II", "Tutmosi
    III", "Akhenaton", "Seti I", "Nefertari". So **Amenhotep, not Amenofi; Tutmosi, not
    Thutmosi; Ramesse, not Ramses**. The catalogue itself is not fully consistent ("Sethi I" once,
    "Amenothep IV" once): the guide uses the majority form. Tutankhamon is not in the lists read;
    "Tutankhamon" is the common Italian form, to confirm on another Torino page.
  - Greek-derived Old Kingdom forms (Cheope, Chefren, Micerino) are a deliberate exception: they
    are what Italian readers know; the Egyptian name (Khufu, Khafra, Menkaura) once, in brackets,
    in the card or first event.
- **Greek and Roman names**: Italian (Tolomeo, Berenice, Arsinoe, Cleopatra, Marco Antonio,
  Ottaviano).
- **Arabic, medieval and early modern persons**: IJMES transliteration **without diacritics**,
  `al-` not assimilated, ʿayn and hamza dropped (Amr ibn al-As, Ahmad ibn Tulun, al-Hakim,
  Shajar al-Durr, Qaitbay, al-Maqrizi). Rulers of great powers and consolidated epithets in
  Italian (Saladino); "Baybars", not "Baibars" (the form of recent historiography).
- **Modern Egyptians**: the Latin spelling they used themselves or the established one (Naguib
  Mahfouz, Umm Kulthum, Gamal Abd el-Nasser → "Nasser" after the first occurrence, Anwar
  al-Sadat → "Sadat", Mohamed Salah). Egyptian Arabic g for jim only in these established names.
- **Places**: Italian exonyms where consolidated (Il Cairo, Alessandria, Assuan, Porto Said,
  Rosetta, Damietta, Suez), as "Bucarest" in the Romania guide; otherwise the form on Egyptian
  Latin-script signage, with `el-` (Khan el-Khalili, Deir el-Bahari, Sharm el-Sheikh, Kom
  el-Shoqafa). The Arabic form in brackets only when the reader needs it (Rashid for Rosetta).
- **Coptic**: Italian forms for saints and patriarchs (Antonio, Pacomio, Shenute, Cirillo).

## 6. Ethnonym and adjective

**Decision.** The Italian distinction is the key one: **egizio** for ancient Egypt (pharaonic
through Roman times: arte egizia, lingua egizia, gli Egizi) and **egiziano** for Egypt from the
Arab conquest to today (cucina egiziana, gli egiziani). Never "egiziani" for the pharaohs' subjects
and never "egizio" for modern Egypt. For Ptolemaic and Roman Egypt, "egizi" for the native
population vs "Greci/Macedoni" and "Romani". The country before 641 is "l’Egitto" (the name is
ancient, so no anachronism), but not "lo Stato egiziano" in a national sense.

## 7. Open historiographical debates (Callout `debate`)

1. **Who built the pyramids**: slaves (Herodotus, Hollywood, the Exodus tradition) vs paid and
   conscripted workers (workers' town and cemeteries at Giza, Lehner and Hawass; the Wadi
   al-Jarf papyri). Fringe theories (aliens, Atlantis) are not a debate: one line saying so.
2. **The pharaoh of the Exodus**: religious tradition vs the absence of archaeological evidence;
   Ramesse II's identification is a modern reading. Mount Sinai = Jebel Musa is a IV-century
   monastic tradition.
3. **Akhenaton's religion**: monotheism, henotheism or royal cult.
4. **Who the ancient Egyptians were**: Afrocentric and Eurocentric readings, the 2023 Netflix
   _Queen Cleopatra_ controversy, the 2017 Abusir el-Meleq genome study and its limits.
5. **Cleopatra**: Roman propaganda vs the Ptolemaic queen; her mother and grandmother unknown.
6. **The Library of Alexandria**: the story of its burning by Amr ibn al-As (first told
   centuries later) vs gradual decline; Caesar's fire of 48 BC.
7. **The Arab conquest and Islamisation**: liberation from Byzantine pressure on the Coptic
   Church vs conquest; when Muslims became the majority (estimates range from the IX to the XIV
   century).
8. **Muhammad Ali, "founder of modern Egypt"**: the national narrative vs an Ottoman-Albanian
   dynast building an army and a family state (Khaled Fahmy).
9. **1798 as the start of modernity**: the "Napoleon wakes up Egypt" narrative vs the
   XVIII-century Ottoman-Egyptian economy and scholarship (Peter Gran, Jane Hathaway).
10. **1952**: revolution or coup; Nasser's legacy.
11. **1973**: the October War as victory (Egypt: the Crossing, the Panorama in Cairo) vs Israeli
    military outcome; both have ground.
12. **The Nubian displacement** (1963–1964): Abu Simbel as a UNESCO triumph vs the lost villages
    and the Nubians' claim to return.
13. **Restitution**: Rosetta Stone, Nefertiti bust, Dendera zodiac; the colonial history of
    Egyptology (Mariette, Maspero, Carter) and Egyptian Egyptology (Ahmed Kamal, Selim Hassan).
14. **2011 to today**. Confirmed by the user on 2026-11-24: the timeline reaches today with
    verifiable facts only (the new Suez Canal 2015, the New Administrative Capital, the GEM 2025,
    the economic crisis and the devaluation of the pound, tourism crises and recovery). Government
    and human rights: a `debate` Callout attributing each reading (the government; Amnesty
    International and Human Rights Watch). Giulio Regeni (2016) as a documented fact, with the
    trial in Italy, no comment. Two cautions:
    - **Album traces stay apolitical**: no trace at sites of repression. A trace is a collectible
      with points; collecting a place of recent suffering would gamify it. Such places usually fail
      the six tests anyway: no memorial exists while the government that did it is in power, the
      sites are not visible or are deliberately erased, and photographing security sites is
      forbidden. Where a past is closed and remembered in a museum or memorial, it can be a trace
      as any other.
    - **No safety or behaviour advice in the text**: it changes faster than the guide (and offline
      copies keep it stale), it cannot meet the two-sources rule, and prescriptions about how to
      behave slide into the collective judgements B7 forbids. Customs appear as facts (Ramadan,
      Friday prayer), not as instructions. The access conditions of a trace (dress to enter a
      mosque, photo rules, permits, escorts) are facts and do go in its "Come trovarla" (§13).

## 8. National narratives to watch for

- **Seven thousand years of continuity** ("Egypt, mother of the world"; Pharaonism of the
  1920s–1930s, Mokhtar's _Nahdat Misr_): one people from the pharaohs to today.
- **The eternal united state**: the Two Lands always tending to unity; disunity as decline. The
  intermediate periods are not "dark ages".
- **Foreign domination**: Hyksos, Persians, Greeks, Romans, Arabs, Ottomans, British as a
  sequence of occupiers of one constant nation. Write who rules, how and with whom.
- **The European orientalist reading**: "timeless" Egypt, decline after the pharaohs, Islamic
  centuries as stagnation, Egyptology as rescue.
- **The pan-Arab and the Islamic readings**: history starting in 641, or the pharaohs as
  _jahiliyya_.
- **The military narrative** of 1956, 1967 and 1973.
- **The Coptic narrative** of the Copts as the "true descendants of the pharaohs" (contested,
  and divisive).

## 9. Reference sources

General histories (academic, not from one national historiography):

- Ian Shaw (ed.), _The Oxford History of Ancient Egypt_, OUP 2000 (chronology of the guide).
- Toby Wilkinson, _The Rise and Fall of Ancient Egypt_, Bloomsbury 2010.
- Roger S. Bagnall and Dominic W. Rathbone (eds.), _Egypt from Alexander to the Copts_, British
  Museum Press 2004 (also a site guide).
- Carl F. Petry (ed.), _The Cambridge History of Egypt_, vol. 1, _Islamic Egypt, 640–1517_, CUP 1998.
- M. W. Daly (ed.), _The Cambridge History of Egypt_, vol. 2, _Modern Egypt, from 1517 to the end
  of the twentieth century_, CUP 1998.
- Afaf Lutfi al-Sayyid Marsot, _A History of Egypt from the Arab Conquest to the Present_, CUP 2007.
- Derek A. Welsby, _The Medieval Kingdoms of Nubia_, British Museum Press 2002 (Nubia).
- For sites: UNESCO World Heritage files, the Ministry of Tourism and Antiquities / Supreme Council
  of Antiquities, the Theban Mapping Project, the Museo Egizio di Torino for Italian forms.

None of these is opened yet: per C1 they count as sources only once read, and the research notes
will cite the pages used.

## 10. Person and city cards

**Persons — 13, confirmed by the user on 2026-11-24**, with the traces the reader meets and the
myth to clear. Order: by epoch (6 ancient, 3 late antique and medieval, 4 modern). Imhotep and
Alexander were in the first draft and are out, to keep the antiquity from dominating this chapter
too: Djoser's Step Pyramid becomes a timeline "Oggi" trace; Alexander is told by the Siwa and
Alexandria city cards.

| Person                     | Region(s)                 | Traces the reader meets                                                                             | What the card explains                                             |
| -------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Cheope                     | Basso                     | Great Pyramid, solar boat (GEM), the 7 cm ivory statuette (Egyptian Museum)                         | the slaves myth; Herodotus' tyrant; his only known statue is tiny  |
| Hatshepsut                 | Alto                      | Deir el-Bahari, the Punt reliefs, her obelisk at Karnak                                             | a woman as king; the erasure of her images, and why                |
| Akhenaton e Nefertiti      | Alto, Basso               | Amarna and its boundary stelae, the colossi (GEM/Egyptian Museum)                                   | the religion debate; the Berlin bust                               |
| Tutankhamon                | Alto, Basso               | KV62 with the mummy, the GEM treasure and mask, Carter's House                                      | a minor king made famous by his tomb; the curse; who found it      |
| Ramesse II (con Nefertari) | Nubia, Alto, Basso        | Abu Simbel, Ramesseum, Kadesh reliefs, Nefertari's tomb QV66 (Schiaparelli, 1904), the GEM colossus | the self-made image; Kadesh as propaganda; the Exodus pharaoh myth |
| Cleopatra VII              | Alto, Basso, Deserto occ. | Dendera rear wall with Caesarion, Alexandria, "Cleopatra's spring" at Siwa                          | Roman propaganda vs Ptolemaic queen; identity debate               |
| Sant’Antonio abate         | Mar Rosso                 | Monastery of St Anthony and its frescoes, his cave                                                  | the father of monasticism, and why Italy knows him for the pig     |
| Saladino                   | Basso, Sinai              | Citadel of Cairo, the walls, the Eagle on the flag, Pharaoh's Island                                | a Kurd in Cairo; the European chivalric myth; Nasser's Saladin     |
| Shajar al-Durr             | Basso                     | Her mausoleum (Cairo)                                                                               | a woman sultan; how the Mamluks came to power                      |
| Muhammad Ali               | Basso                     | Alabaster Mosque, his equestrian statue in Alexandria, Shubra palace                                | the "founder of modern Egypt" narrative                            |
| Umm Kulthum                | Basso                     | Museum on Roda, statue in Zamalek, the cafés that play her concerts                                 | why Thursday nights stopped for her across the Arab world          |
| Nasser                     | Basso, Alto, Nubia        | High Dam and the Arab-Soviet Friendship monument, his house museum (Manshiyat al-Bakri)             | revolution or coup (§7.10); the dam and the Nubians (§7.12)        |
| Naguib Mahfouz             | Basso                     | Khan el-Khalili and its café, his museum at Tekkiyat Abu al-Dahab                                   | the only Arab Nobel for literature; his Cairo is the reader's      |

Alternates, not used (for a later swap): **Sadat** (Unknown Soldier memorial, October Panorama),
**Giovanni Battista Belzoni** (Paduan: his name painted in Chefren's pyramid, KV17, Abu Simbel —
the strongest Italian thread, but rarely met), **Saad Zaghloul** (mausoleum, Mokhtar's statues),
**Mosè / Santa Caterina** (Mount Sinai, the monastery), **Ismail Pasha** (Khedivial Cairo, the
Canal, _Aida_), **Imhotep**, **Alessandro Magno**. Mohamed Salah: no stable traces found.

**Cities — 7, confirmed by the user on 2026-11-24:** Il Cairo (Basso), Alessandria (Basso),
Luxor (Alto), Assuan (Alto + Nubia via Philae), Siwa (Deserto occ.), **Rosetta** (Basso — Ottoman
houses, the fort of the Stone, the Nile's western mouth), **Sharm el-Sheikh** (Sinai).

Porto Said was confirmed first and replaced by Rosetta (user, 2026-11-24): photographing the Suez
Canal is illegal (FCDO), and every trace of the city is on the Canal. The Canal stays in the
timeline (1869, 1956), without traces.

Sharm is in at the user's suggestion: a tourist town is not excluded by B10, and Sharm has a
history to read — the point that controls the Strait of Tiran (its closure in 1967), the Israeli
settlement of Ofira and the first diving centres (1967–1982), a resort city built in a few decades
after the return, the "city of summits" (COP27 in 2022, the Gaza summit of 2025), the 2005 attacks
and the 2015 crash that emptied it. It is where many Italian readers actually are, and it serves
the "Egypt today" side of the variety targets (§11). Conditions: no promotional tone, a case told
without praise or scorn (who built it, who works there: valley Egyptians and Bedouin); traces that
pass the six tests (the Old Market and al-Sahaba mosque, the Coptic cathedral, Naama Bay); Ras
Mohammed stays in its landscape card. _All dates to verify._

Hurghada stays out (less to tell, and a second resort card would be a double). Alternates:
El Quseir (gives Mar Rosso a city: Ottoman fort, Hajj port,
phosphates — an Italian company? _to verify_). Temples outside cities (Abydos, Dendera, Edfu, Kom
Ombo, Saqqara, Dahshur) go into person cards or timeline "Oggi" traces.

**Italian threads** (not a quota, but the reader is Italian and will meet them): Museo Egizio
di Torino forms, Belzoni, Schiaparelli and Nefertari, Rosellini, the Italian war memorial at El
Alamein, Verdi's _Aida_ (Khedivial Opera, 1871), Ungaretti and Marinetti born in Alexandria, Mario
Rossi's mosques (Abu al-Abbas al-Mursi), Jawhar "al-Siqilli" founder of Cairo, St Mark's relics
taken to Venice (828).

## 11. List of places (album)

**Band: Grande, at its low end — cap 140–145 own traces** (from 04; Romania has 120). Agreed
with the user on 2026-11-24. Egypt has more to see than Romania (Luxor alone or Cairo alone could
fill 25 first-rate traces each), is visited by several times more travellers, and takes three or
four trips (Cairo and the Nile; Sinai or the Red Sea; the desert; Alexandria and the Delta). It is
not Italy: the heritage is concentrated in the valley, and three regions out of six are sparse.

| Region              | Traces | Notes                                                          |
| ------------------- | ------ | -------------------------------------------------------------- |
| Basso Egitto        | 48–52  | Cairo, Giza/Saqqara/Dahshur, Alexandria, Delta, Canal, Fayyum  |
| Alto Egitto         | 42–46  | Luxor east and west bank, Amarna, Abydos, Dendera, Edfu, Aswan |
| Nubia               | 10–12  | Abu Simbel, Philae, Kalabsha, Lake Nasser, Nubian villages     |
| Deserto occidentale | 14–16  | Siwa, White Desert, Kharga/Dakhla, El Alamein                  |
| Sinai               | 10–12  | half nature (reef, mountain)                                   |
| Mar Rosso           | 10–12  | half nature (reef, dugongs, wadis); monasteries, Quseir        |

### Variety: the main risk of this album

In a country this rich in antiquities, the album could easily become 140 temples, tombs and
statues. The user's standing instruction for Egypt: **keep the variety, don't let cultural heritage
take over.** On top of the B13 quotas, this guide sets its own targets (at 140 traces):

| Theme (subject of the photo)                              | Target           | B13 limit   |
| --------------------------------------------------------- | ---------------- | ----------- |
| Antiquity, prehistory to Roman: monuments **and** objects | **≤ 40%** (≤ 56) | —           |
| Coptic, Islamic and modern built heritage                 | ~15% (~20)       | built ≤ 50% |
| Nature: sea, desert, mountain, river, fossils, animals    | ~20% (25–30)     | ≤ 30%       |
| Food and drink                                            | ~11% (14–16)     | ≤ 15%       |
| Living culture, pop, Egypt today                          | **≥ 12%** (≥ 17) | —           |

The antiquity ceiling is the binding one: every trace that tries to go over it pushes another one
out, starting from the antiquities that hold least.

**Antiquity without doubles.** "The same photo with the same story" is the risk here (B13,
doubles). Each temple, tomb or colossus must carry an idea the others don't. Working assignment:
Karnak = a state temple grown over two thousand years; Luxor temple = the processional temple,
with the mosque on top; Abydos = the king list; Dendera = Hathor's temple, the roof chapels and the
zodiac (a cast); Edfu = the complete Ptolemaic temple; Kom Ombo = the double temple and the
crocodiles; Philae = the last hieroglyphic inscription (394); Abu Simbel = the temple moved. Valley
of the Kings: at most two tombs (KV62 in Tutankhamon's card, one other with its own story). Pyramids:
Djoser (the first in stone), Khufu (the Great Pyramid), the Red Pyramid at Dahshur (one you can
enter without crowds) — no fourth unless it tells something new.

**Candidates outside the monuments** (to be checked against the six tests; places that change are
verified before they go in):

- **Living culture and faith**: the tanoura and Sufi music at Wekalet al-Ghuri; a café playing Umm
  Kulthum; the Cave Church of St Simon in Mokattam (Manshiyat Naser, the zabbaleen); the Hanging
  Church; a Coptic monastery still inhabited; the Khayamiya (tentmakers' street); the Fustat
  potters; Nubian painted houses (Gharb Soheil); Siwan embroidery.
- **Literature, music, cinema**: Mahfouz's Khan el-Khalili and museum; the Cavafy Museum in
  Alexandria; the Bibliotheca Alexandrina; Umm Kulthum's museum; the downtown cinemas of the
  golden age of Egyptian film (find a stable one); _Aida_ and the vanished Khedivial Opera (via a
  trace that still exists).
- **Egypt today and engineering**: the Cairo Tower; Baron Empain's palace in Heliopolis; the
  Aswan High Dam (the Suez Canal cannot be photographed: no traces); the Nilometer of Roda; Alexandria's trams; the GEM building itself.
- **Pop institutions**: El Fishawy café (Khan el-Khalili); Groppi and Café Riche (downtown Cairo);
  Brazilian Coffee Stores, Trianon or Pastroudis (Alexandria); a historic koshari shop; the Old
  Cataract hotel in Aswan (Agatha Christie); the Winter Palace in Luxor; Sharm's Old Market.
  Restaurants are not named in food cards (B12); a café or shop enters only as an institution
  (B13, what stays out).
- **Objects in your pocket**: the coins and the polymer banknotes (2022–2023) — which designs are
  in circulation _to verify_.
- **Sport**: Egypt's real passion is football; no stable trace found yet (a stadium is not a
  photo with a story by itself). Look for one; leave it out rather than force it.
- **Nature**: the Red Sea reef by snorkel (Ras Mohammed, Abu Dabbab with turtles and dugongs),
  Mount Sinai at dawn, the White Desert and Crystal Mountain, the Great Sand
  Sea at Siwa, the salt lakes, Wadi al-Hitan (whale fossils), Wadi el-Rayan, the First Cataract by
  felucca, the Aswan Botanical Garden, birds on Lake Qarun.

**Gestures** (≥ 1/5, i.e. ≥ 28): snorkel, climb (Mount Sinai), enter (a pyramid, a tomb, a cave
church), sail (felucca), cross (the Canal ferry), float (Siwa salt lakes), swim (Cleopatra's
spring), taste (the food traces), listen (tanoura, Umm Kulthum), find (a coin, a graffito: Belzoni's
name in Chefren's pyramid).

Next step after this sheet: the full table of §B13 (id, region, card, `where`, value, theme,
gesture, why it holds) in `research/album/trace-list.md`, with a count per theme against the
targets above.

## 12. Readers' photos

Already decided for the whole site: photos on R2 tied to the account, GPS stripped in the browser
(docs/data-model.md §11.1). Nothing to choose.

## 13. Travellers' safety

Standing rule from the user (2026-11-24): **the guide must never create problems for whoever
travels in Egypt.** It applies to every trace, gesture and sentence:

- **Photography bans.** In Egypt photographing military, police and government buildings,
  checkpoints and some infrastructure is forbidden. No trace asks for such a photo. For traces next
  to sensitive infrastructure (the Aswan High Dam), "Come trovarla"
  says from where photos are allowed, checked shortly before publishing.
- **Restricted areas.** No trace in areas the Farnesina (_Viaggiare Sicuri_) advises against —
  North Sinai, the borders with Libya and Sudan, the deep desert (Gilf Kebir) — checked when the
  list is compiled and again before publishing. Siwa is close to the Libyan border: its status is
  the first thing to check. Permits, convoys and licensed operators (desert, Middle Egypt,
  Mount Sinai with a Bedouin guide) are stated in "Come trovarla".
- **Gestures.** Only legal and safe ones: no climbing monuments, no taking stones, sand, coral,
  shells or fossils, no "antiques" to buy, no drones (they need a permit and are confiscated at
  customs), snorkel only where diving is dangerous (the Blue Hole), no hot-air balloons.
- **Politics.** No trace at sites of repression or protest (Tahrir as a political place, Rabaa);
  recent history in an encyclopedic register, every judgement attributed; no political symbols or
  protest images in the guide (the Rabaa four-finger sign is prosecuted in Egypt).
- **People.** Traces are places, objects and dishes, never people: the reader is never asked to
  photograph someone.

---

## Still to choose with the user

1. ~~Regions~~: the six of §2 with the four placements (confirmed 2026-11-24).
2. ~~Album band and cap~~: Grande, low end, 140–145; variety targets in §11 (confirmed
   2026-11-24).
3. ~~Name forms~~: Museo Egizio forms (Cheope, Chefren, Micerino excepted), Arabic without
   diacritics, `al-` for persons and `el-` for places (confirmed 2026-11-24).
4. ~~Persons and cities~~: 13 persons and 7 cities of §10 (confirmed 2026-11-24).
5. ~~After 2013~~: to today, facts only, debate Callout, apolitical traces (confirmed 2026-11-24).
6. Cover ink and cover photo (later, with the structure).
