import type { GuideSources } from '@/content/types'
import { Ro, RoLandscape, RoPerson, RoSection } from './structure'

/*
 * The Romania guide's bibliography, shown in its "Fonti" view: the pages read while writing the
 * guide, grouped by entry of the index (a chapter, a part, a person, city or landscape card).
 * `title` and `site` as the page gives them, in its own language; where the page could not be
 * read again (PDFs, pages that block scripts) the title is the one of the research notes or of
 * the address. The same for every locale.
 *
 * Built from the research notes in research/, which keep what each page was used for and what
 * is still to verify: when a note gains a page, add it here too. Not covered yet: the history
 * before 1821.
 */
export const sources: GuideSources = {
  [RoSection.History]: [
    {
      title: 'Romania: A Country Study',
      site: 'Library of Congress',
      url: 'https://countrystudies.us/romania/',
    },
    {
      title: 'Area Handbook for Romania (1972)',
      site: 'Project Gutenberg',
      url: 'https://www.gutenberg.org/files/32700/32700-h/32700-h.htm',
    },
  ],
  [RoSection.NationalState]: [
    {
      title: 'The Roma Movement in Romania',
      site: 'RomArchive',
      url: 'https://www.romarchive.eu/rom/roma-civil-rights-movement/roma-movement-romania/',
    },
    {
      title: 'The Cernavodă–Constanța railway (National Museum of Romanian History)',
      site: 'Museum With No Frontiers',
      url: 'https://sharinghistory.museumwnf.org/database_item.php?id=object%3BAWE%3Brm%3B3%3Ben',
    },
  ],
  [RoSection.WorldWars]: [
    {
      title: 'Romania',
      site: 'USHMM',
      url: 'https://encyclopedia.ushmm.org/content/en/article/romania',
    },
  ],
  [RoSection.Communism]: [
    {
      title: 'Dennis Deletant, Romania, 1948–1989: A Historical Overview',
      site: 'Parallel History Project, ETH Zürich',
      url: 'https://phpisn.ethz.ch/lory1.ethz.ch/collections/coll_romania/introduction0445.html?navinfo=15342',
    },
    {
      title: '3. Represiunea comunistă',
      site: 'Memorialul Sighet',
      url: 'https://turmemorialsighet.ro/3-represiunea-comunista/',
    },
  ],
  [RoSection.DemocracyAndEurope]: [
    {
      title: 'Seven new members join NATO',
      site: 'NATO',
      url: 'https://www.nato.int/en/news-and-events/articles/news/2004/03/29/seven-new-members-join-nato',
    },
    {
      title: 'Romania – EU country',
      site: 'European Union',
      url: 'https://european-union.europa.eu/principles-countries-history/eu-countries/romania_en',
    },
    {
      title: 'Bulgaria and Romania join the Schengen Area',
      site: 'European Commission',
      url: 'https://home-affairs.ec.europa.eu/news/bulgaria-and-romania-join-schengen-area-2025-01-03_en',
    },
    {
      title: 'Romania’s 2025 presidential election',
      site: 'House of Commons Library',
      url: 'https://commonslibrary.parliament.uk/research-briefings/cbp-10355/',
    },
  ],
  [RoPerson.Decebalus]: [
    {
      title: 'Decebalus',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Decebalus',
    },
    {
      title: 'Cassius Dio, Roman History, Book 67',
      site: 'LacusCurtius',
      url: 'https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/67*.html',
    },
    {
      title: 'Cassius Dio, Roman History, Book 68',
      site: 'LacusCurtius',
      url: 'https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/68*.html',
    },
    {
      title: 'Tiberius Claudius Maximus',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Tiberius_Claudius_Maximus',
    },
  ],
  [RoPerson.VladTheImpaler]: [
    {
      title: 'Vlad the Impaler',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Vlad_the_Impaler',
    },
    {
      title: 'Order of the Dragon',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Order_of_the_Dragon',
    },
    {
      title: 'Radu cel Frumos',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Radu_cel_Frumos',
    },
  ],
  [RoPerson.StephenTheGreat]: [
    {
      title: 'Stephen the Great',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Stephen_the_Great',
    },
    {
      title: 'Mari Români',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Mari_Rom%C3%A2ni',
    },
  ],
  [RoPerson.MichaelTheBrave]: [
    {
      title: 'Michael the Brave',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Michael_the_Brave',
    },
  ],
  [RoPerson.CarolI]: [
    {
      title: 'Carol I of Romania',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Carol_I_of_Romania',
    },
    {
      title: 'Election to the Romanian throne, 1866',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Election_to_the_Romanian_throne,_1866',
    },
    {
      title: 'Intrarea României în Primul Război Mondial',
      site: 'Wikipedia',
      url: 'https://ro.wikipedia.org/wiki/Intrarea_Rom%C3%A2niei_%C3%AEn_Primul_R%C4%83zboi_Mondial',
    },
  ],
  [RoPerson.ConstantinBrancusi]: [
    {
      title: 'Constantin Brâncuși',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Constantin_Br%C3%A2ncu%C8%99i',
    },
    {
      title: 'L’Atelier Brancusi',
      site: 'Centre Pompidou',
      url: 'https://www.centrepompidou.fr/fr/collection/latelier-brancusi',
    },
    {
      title: 'Bird in Space',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Bird_in_Space',
    },
    {
      title:
        'Academia: Constantin Brâncuşi nu a avut niciodată intenţia să lase moştenirea sa artistică unui stat',
      site: 'Agerpres',
      url: 'https://agerpres.ro/cultura-media/2026/01/22/academia-constantin-brancusi-nu-a-avut-niciodata-intentia-sa-lase-mostenirea-sa-artistica-unui-stat---1521221',
    },
  ],
  [RoPerson.NicolaeCeausescu]: [
    {
      title: 'Nicolae Ceaușescu',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Nicolae_Ceau%C8%99escu',
    },
    {
      title: 'Decree 770',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Decree_770',
    },
    {
      title: 'July Theses',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/July_Theses',
    },
    {
      title: 'Romania: Human Rights (HL Deb 10 April 1989)',
      site: 'Hansard',
      url: 'https://api.parliament.uk/historic-hansard/lords/1989/apr/10/romania-human-rights',
    },
  ],
  [RoPerson.MihaiEminescu]: [
    {
      title: 'Bancnota de 500 lei',
      site: 'Banca Națională a României',
      url: 'https://bnro.ro/apage.aspx?pid=8866',
    },
    {
      title: 'Five hundred lei',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Five_hundred_lei',
    },
  ],
  [RoPerson.QueenMarie]: [
    {
      title: 'Istoricul Castelului Pelișor',
      site: 'Muzeul Național Peleș',
      url: 'https://peles.ro/en/despre/istoricul-castelului-pelisor/',
    },
    {
      title:
        'Casa Regală: Caseta de argint cu inima Reginei Maria, transferată la Castelul Pelişor, pe 3 noiembrie',
      site: 'Antena 3',
      url: 'https://www.antena3.ro/actualitate/cultura/casa-regala-caseta-de-argint-cu-inima-reginei-maria-transferata-la-castelul-pelisor-pe-3-noiembrie-314464.html',
    },
    {
      title: 'Întoarcerii Inimii Reginei Maria la Castelul Pelişor din Sinaia',
      site: 'Financiarul',
      url: 'https://financiarul.ro/actualitate/intoarcerii-inimii-reginei-maria-la-castelul-pelisor-din-sinaia/',
    },
    {
      title:
        'Inima Reginei Maria va „bate“ la Castelul Pelişor. Ceremonii regale vor avea loc în Capitală şi la Sinaia',
      site: 'Adevărul',
      url: 'https://adevarul.ro/stiri-locale/ploiesti/inima-reginei-maria-va-bate-la-castelul-pelisor-1663400.html',
    },
    {
      title: 'Romania: Did Dracula Ever Set Foot In Dracula’s Castle?',
      site: 'RFE/RL',
      url: 'https://www.rferl.org/a/1068701.html',
    },
    {
      title: 'Romanian Bran Castle Officially Becomes Private Property',
      site: 'Mediafax',
      url: 'https://mediafax.ro/english/romanian-bran-castle-officially-becomes-private-property-4405441',
    },
  ],
  [RoPerson.GeorgeEnescu]: [
    { title: 'Luminiș', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Lumini%C8%99' },
    {
      title: 'Vila Luminiș de la Sinaia. Locul de liniște și creație al lui George Enescu',
      site: 'Adevărul',
      url: 'https://adevarul.ro/stil-de-viata/cultura/vila-luminis-de-la-sinaia-locul-de-liniste-si-2292566.html',
    },
    {
      title: '“George Enescu” Memorial House – Sinaia – The National Museum “George Enescu”',
      site: 'Muzeul Național George Enescu',
      url: 'https://www.georgeenescu.ro/en/departments_doc_25_george-enescu-memorial-house-sinaia_pg_0.htm',
    },
    { title: 'Five lei', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Five_lei' },
    {
      title: 'Romania 5 Lei 2018',
      site: 'banknotes.com',
      url: 'https://www.banknotes.com/ro118.htm',
    },
  ],
  [RoPerson.NadiaComaneci]: [
    {
      title:
        'Statuia Nadiei Comăneci, adusă de Ion Țiriac din China, a fost dezvelită în fața sălii de la Otopeni. Cum arată',
      site: 'Antena Sport',
      url: 'https://as.ro/extra/statuia-nadiei-comaneci-adusa-de-ion-tiriac-din-china-a-fost-dezvelita-in-fata-salii-de-la-otopeni-cum-arata-668712.html',
    },
    {
      title:
        'Sala de gimnastică „Nadia Comăneci” a fost inaugurată la Otopeni: O investiție pentru tineretul de astăzi',
      site: 'Basilica.ro',
      url: 'https://basilica.ro/sala-gimnastica-nadia-comaneci-inaugurata-otopeni/',
    },
    {
      title:
        'Reportaj. Sala „Nadia Comăneci” de la Otopeni: gimnastică gratuită pentru copii. Sala a fost construită în 9 luni pentru a fi gata la momentul aniversar.',
      site: 'Urban',
      url: 'https://www.urban.ro/reportaj-sala-nadia-comaneci/',
    },
    {
      title:
        'Nadia Comăneci a inaugurat sala de gimnastică din Otopeni, la 50 de ani de la primul „10” olimpic',
      site: 'Radio România Actualități',
      url: 'https://www.romania-actualitati.ro/stiri/sport/nadia-comaneci-a-inaugurat-sala-de-gimnastica-din-otopeni-la-50-de-ani-de-la-primul-10-olimpic-id231623.html',
    },
    {
      title: 'Onești a inaugurat „Drumul Perfecțiunii”',
      site: 'Evenimentul Zilei',
      url: 'https://evz.ro/onesti-a-inaugurat-drumul-perfectiunii-traseul-dedicat-povestii-nadiei-comaneci.html',
    },
    {
      title:
        'Onești: "Drumul Perfecțiunii”, un traseu urban care transformă copilăria Nadiei în patrimoniu turistic',
      site: 'Capital',
      url: 'https://www.capital.ro/onesti-drumul-perfectiunii-un-traseu-urban-care-transforma-copilaria-nadiei-in-patrimoniu-turistic.html',
    },
    {
      title:
        'România nu-și permite să construiască un muzeu Nadia Comăneci și să renoveze sala de gimnastică care poartă numele zeiței de la Montreal',
      site: 'Europa Liberă România',
      url: 'https://romania.europalibera.org/a/romania-nu-si-permite-sa-refaca-sala-de-gimnastica-nadia-comaneci-din-onesti-si-nici-sa-construiasca-un-muzeu-dedicat-legendei/33021971.html',
    },
  ],
  [Ro.Bucharest]: [
    {
      title: 'UEFA a eliminat trofeul Cupei Campionilor Europeni din dreptul FCSB-ului',
      site: 'Soccerway',
      url: 'https://ro.soccerway.com/stiri/fotbal-champions-league-uefa-a-eliminat-trofeul-cupei-campionilor-europeni-din-dreptul-fcsb-ului/nqF2tCem',
    },
    {
      title: 'Steaua anunță că va notifica FRF după motivarea deciziei ÎCCJ privind palmaresul',
      site: 'Mediafax',
      url: 'https://www.mediafax.ro/sport/steaua-anunta-ca-va-notifica-frf-dupa-motivarea-deciziei-iccj-privind-palmaresul-23678995/amp',
    },
    {
      title:
        'Decizia Înaltei Curți de Casație și Justiție în privința palmaresului clubului Steaua',
      site: 'Flashscore',
      url: 'https://www.flashscore.ro/stiri/fotbal-superliga-decizia-inaltei-curti-de-casatie-si-justitie-in-privinta-palmaresului-clubului-steaua/jDDVtBxh/',
    },
    {
      title: 'Dimitrie Gusti National Village Museum',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Dimitrie_Gusti_National_Village_Museum',
    },
    {
      title:
        'Lucruri mai puţin cunoscute despre înfiinţarea Muzeului Satului din Bucureşti. Ce meşteri au lucrat la reconstrucţia caselor',
      site: 'Adevărul',
      url: 'https://adevarul.ro/stiri-locale/targu-jiu/lucruri-mai-putin-cunoscute-despre-infiintarea-1943453.html',
    },
    {
      title: 'Biserica',
      site: 'Mănăstirea Stavropoleos',
      url: 'https://stavropoleos.ro/biserica-2-2/',
    },
    {
      title: 'Ansamblul Mănăstirii Stavropoleos din București',
      site: 'cIMeC, Repertoriul Arheologic Național',
      url: 'https://ran.cimec.ro/sel.asp?Lang=EN&descript=bucuresti-municipiul-bucuresti-bucuresti-ansamblul-manastirii-stavropoleos-din-bucuresti-cod-sit-ran-179132.176',
    },
    {
      title: 'Marca de Patrimoniu European – Ateneul Român',
      site: 'Filarmonica George Enescu',
      url: 'https://filarmonicaenescu.ro/ro/istoric-ateneul-roman',
    },
    {
      title: 'Ateneul Român – Instituţii culturale – Cronologia della Letteratura Rumena',
      site: 'Università di Firenze',
      url: 'https://www.clrm.unifi.it/index.php?func=viewpage&module=CMpro&newlang=ron&pageid=607',
    },
    {
      title: 'Direcții de acces',
      site: 'Filarmonica George Enescu',
      url: 'https://filarmonicaenescu.ro/ro/directii-acces',
    },
    {
      title: 'Mănăstirea Mihai Vodă',
      site: 'Arhiepiscopia Bucureștilor',
      url: 'https://arhiepiscopiabucurestilor.ro/exarhat/manastiri/manastirea-mihai-voda',
    },
    {
      title: 'Bucureşti – Materiale de Istorie şi Muzeografie',
      site: 'Muzeul Municipiului București',
      url: 'https://bmim.muzeulbucurestiului.ro/?articol=13216-descoperiri-arheologice-pe-santierele-de-translare-partea-i-bisericile-schitului-maicilor-olari-si-mihai-voda',
    },
    {
      title: 'Palatul Parlamentului',
      site: 'Primăria Sectorului 5',
      url: 'https://sector5.ro/puncte-de-interes/palatul-parlamentului/',
    },
    {
      title: 'The Uranus district',
      site: 'Radio Romania International',
      url: 'https://www.rri.ro/en/panoramice/pro-memoria/the-uranus-district-id131668.html',
    },
    {
      title:
        'Balconul de unde a vorbit Ceauşescu, biroul său şi celulele Securităţii – vizitate de mii de persoane',
      site: 'Agerpres',
      url: 'https://agerpres.ro/social/2019/12/22/balconul-de-unde-a-vorbit-ceausescu-biroul-sau-si-celulele-securitatii---vizitate-de-mii-de-persoane--424090',
    },
    {
      title:
        'Cum arată acum biroul lui Nicolae Ceaușescu, liftul + acoperișul clădirii CC al PCR de unde a fugit cu elicopterul în 1989. REPORTAJ EXCLUSIV VIDEO în sediul MAI',
      site: 'Realitatea',
      url: 'https://www.realitatea.net/stiri/politica/birou-nicolae-ceausescu-revolutie-1989-cc-pcr_5dcc925e406af85273d68d0d',
    },
  ],
  [Ro.Iasi]: [
    {
      title:
        'Bojdeuca lui Creangă din Țicău va fi restaurată. Proiect de 1,7 milioane de euro pentru primul muzeu din România',
      site: 'BZI',
      url: 'https://www.bzi.ro/bojdeuca-lui-creanga-din-ticau-va-fi-restaurata-proiect-de-17-milioane-de-euro-pentru-primul-muzeu-din-romania-4244712',
    },
    {
      title: 'Când bojdeuca scrie istorie și devine un loc fundamental pentru literatură',
      site: 'Evenimentul Zilei',
      url: 'https://evz.ro/cand-bojdeuca-scrie-istorie-si-devine-un-loc-fundamental-pentru-literatura.html',
    },
    { title: 'Bojdeuca lui Ion Creangă', site: 'TVR Info', url: 'https://tvrinfo.ro/?p=134382' },
  ],
  [Ro.Suceava]: [
    {
      title: 'Mănăstirea Voroneţ – „Capela Sixtină a Orientului”',
      site: 'Financiarul',
      url: 'https://financiarul.ro/actualitate/manastirea-voronet-capela-sixtina-a-orientului/',
    },
    { title: 'Voronet', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Voronet' },
    {
      title: 'C. I. Ciobanu, Profețiile de la Voroneț',
      site: 'Studii și Cercetări de Istoria Artei',
      url: 'https://www.medieval.istoria-artei.ro/resources/Voronrt.SCIA.AP2011-02-C.%20Ciobanu-Profetiile.pdf',
    },
  ],
  [Ro.AlbaIulia]: [
    {
      title: 'Alba Iulia Fortress',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Alba_Iulia_Fortress',
    },
    {
      title: 'THE BASTIONARY, VAUBAN-TYPE CITADEL OF ALBA CAROLINA, THE SCULPTURE',
      site: 'apulum.ro',
      url: 'https://www.apulum.ro/index.php/patrimoniu_en/cetatea_alba_carolina',
    },
    {
      title: 'Alba Carolina Fortress',
      site: 'Radio Romania International',
      url: 'https://rri.ro/en/features-and-reports/rri-encyclopaedia/alba-carolina-fortress-id168235.html',
    },
    {
      title:
        'FOTO: Detalii mai puţin cunoscute despre Cetatea Alba Carolina. 300 de ani de la începutul lucrărilor la fortificația bastionară de la Alba Iulia',
      site: 'Alba24',
      url: 'https://alba24.ro/foto-detalii-mai-putin-cunoscute-despre-cetatea-alba-carolina-300-de-ani-de-la-inceputul-lucrarilor-la-fortificatia-bastionara-de-la-alba-iulia-450441.html',
    },
    {
      title: 'St. Michael’s Cathedral, Alba Iulia',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/St._Michael%27s_Cathedral,_Alba_Iulia',
    },
    {
      title: 'THE “SAINT MICHAEL” ROMAN-CATHOLIC CHURCH',
      site: 'apulum.ro',
      url: 'https://apulum.ro/index.php/patrimoniu_en/biserica/569',
    },
    {
      title:
        '11 august 1456: Ziua în care voievodul Iancu de Hunedoara a decedat. Este înmormântat în catedrala ”Sfântul Mihail” din Alba Iulia',
      site: 'Alba24',
      url: 'https://alba24.ro/11-august-1456-ziua-in-care-voievodul-iancu-de-hunedoara-a-decedat-este-inmormantat-in-catedrala-romano-catolica-din-alba-iulia-1094361.html',
    },
    {
      title:
        'REPORTAJ/Alba: Sala Unirii, mai mare în 1918 decât acum, neîncăpătoare pentru cei 1.228 de delegaţi',
      site: 'Agerpres',
      url: 'https://agerpres.ro/2023/11/28/reportaj-alba-sala-unirii-mai-mare-in-1918-decat-acum-neincapatoare-pentru-cei-1-228-de-delegati--1211263',
    },
    {
      title:
        'Sala Unirii, simbol al Marii Uniri de la 1 Decembrie 1918: semnificații și istoric. De ce nu au fost făcute fotografii',
      site: 'Alba24',
      url: 'https://alba24.ro/sala-unirii-simbol-al-marii-uniri-de-la-1-decembrie-1918-semnificatii-si-istoric-de-ce-nu-au-fost-facute-fotografii-1109394.html',
    },
    {
      title: 'Detalii legate de Marea Unire de la Alba Iulia, unele cunoscute doar de istorici',
      site: 'Profit.ro',
      url: 'https://profit.ro/stiri/social/foto-arhiva-detalii-legate-de-marea-unire-de-la-alba-iulia-unele-cunoscute-doar-de-istorici-17422074',
    },
    {
      title: 'Alba Iulia: Catedrala Încoronării regilor Ferdinand şi Maria (GALERIE FOTO)',
      site: 'Adevărul',
      url: 'https://adevarul.ro/stiri-locale/alba-iulia/alba-iulia-catedrala-incoronarii-regilor-958951.html',
    },
    {
      title: 'December 1: the history of Romania’s National Day',
      site: 'Romania Insider',
      url: 'https://romania-insider.com/dec-1-celebration-history-nov-2020',
    },
  ],
  [Ro.Brasov]: [
    {
      title: 'Numele Braşovului, în beznă',
      site: 'Digi24',
      url: 'https://www.digi24.ro/regional/digi24-brasov/numele-brasovului-in-bezna-424647',
    },
    {
      title: 'Vești proaste pentru turiști. Telecabina de pe Tâmpa se închide până la primăvară',
      site: 'Antena 3',
      url: 'https://www.antena3.ro/actualitate/vesti-proaste-pentru-turisti-telecabina-de-pe-tampa-se-inchide-pana-la-primavara-724361.html',
    },
    {
      title: 'Cantacuzino Castle',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Cantacuzino_Castle',
    },
    {
      title:
        'Istoria impresionantă a castelului unde s-a filmat serialul Wednesday: Curtea trebuia să fie din aur • Newsweek România',
      site: 'Newsweek România',
      url: 'https://newsweek.ro/timp-liber/istoria-impresionanta-a-castelului-unde-s-a-filmat-serialul-wednesday-curtea-trebuia-sa-fie-din-aur',
    },
    {
      title: 'Local heritage – Biblioteca Județeană „George Bariţiu‟ Braşov',
      site: 'Biblioteca Județeană George Barițiu Brașov',
      url: 'https://www.bjbv.ro/en/brasov-and-its-surroundings/local-heritage/',
    },
    {
      title: 'Casa Sfatului',
      site: 'Muzeul Județean de Istorie Brașov',
      url: 'https://www.brasovistorie.ro/despre-muzeu/istoria-cladirilor/casa-sfatului',
    },
    {
      title: 'Povestea Bisericii Negre – 600 de ani de existență în credință',
      site: 'Biserica Neagră',
      url: 'https://bisericaneagra.ro/en/the-history-of-the-black-church/',
    },
  ],
  [Ro.ClujNapoca]: [
    {
      title: 'Electric Castle (EC)',
      site: 'Interreg Europe',
      url: 'https://interregeurope.eu/good-practices/electric-castle-ec',
    },
    {
      title: 'The Restoration of Bánffy Castle, Bontida',
      site: 'Transylvania Trust',
      url: 'https://www.transylvaniatrust.ro/?p=767',
    },
    {
      title: 'History of Cluj-Napoca',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/History_of_Cluj-Napoca',
    },
    {
      title: 'Timeline of Cluj-Napoca',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Timeline_of_Cluj-Napoca',
    },
    {
      title: 'St. Michael’s Church, Cluj-Napoca',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/St._Michael%27s_Church,_Cluj-Napoca',
    },
    {
      title: 'Matthias Corvinus Monument',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Matthias_Corvinus_Monument',
    },
    {
      title:
        'Cluj:UDMR părăseşte şedinţa CL din cauza plăcuţei cu textul lui Iorga de la statuia lui Matei Corvin',
      site: 'Mediafax',
      url: 'https://www.mediafax.ro/politic/cluj-udmr-paraseste-sedinta-cl-din-cauza-placutei-cu-textul-lui-iorga-de-la-statuia-lui-matei-corvin-9745388/amp',
    },
    {
      title:
        'Dosarul în care e cercetat Apostu ar viza plăcuţa cu textul lui Iorga de pe statuia lui Matei Corvin',
      site: 'Adevărul',
      url: 'https://adevarul.ro/stiri-locale/cluj-napoca/dosarul-in-care-e-cercetat-apostu-ar-viza-placuta-1101116.html',
    },
    {
      title: 'Birthplace of King Matthias of Hungary',
      site: 'Explore Carpathia',
      url: 'https://explorecarpathia.eu/en/romania/kolozsvar-cluj-napoca/birthplace-of-king-matthias-of-hungary',
    },
    {
      title:
        'Universitatea de Artă deschide Casa Matei pentru public, prezintă selecție din fotografiile donate de Brâncuși',
      site: 'Actual de Cluj',
      url: 'https://actualdecluj.ro/universitatea-de-arta-deschide-casa-matei-pentru-public-prezinta-selectie-din-fotografiile-donate-de-brancusi/',
    },
    {
      title: 'Cluj-Napoca National Theatre',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Cluj-Napoca_National_Theatre',
    },
    {
      title: 'Former Hungarian National Theatre – Romanian National Theatre',
      site: 'Explore Carpathia',
      url: 'https://explorecarpathia.eu/en/romania/kolozsvar-cluj-napoca/former-hungarian-national-theatre-romanian-national-theatre',
    },
    {
      title:
        'Exemple din Clujul interbelic: concursuri de arhitectură pentru spațiile reprezentative ale orașului',
      site: 'Actual de Cluj',
      url: 'https://actualdecluj.ro/?p=46959',
    },
  ],
  [Ro.Sibiu]: [
    { title: 'About Us', site: 'The ASTRA Museum', url: 'https://muzeulastra.ro/en/despre/' },
    {
      title:
        'Romania’s largest museum, the ASTRA village museum near Sibiu, further expands to become Europe’s largest',
      site: 'Romania Insider',
      url: 'https://www.romania-insider.com/romanias-largest-museum-the-astra-village-museum-near-sibiu-further-expands-to-become-europes-largest',
    },
    {
      title: 'HISTORY OF BRUKENTHAL MUSEUM',
      site: 'Muzeul Național Brukenthal',
      url: 'https://www.brukenthalmuseum.ro/mnb/istoric_detaliu_en/1088',
    },
    {
      title: 'Muzeul Brukenthal. Galeriile de Artă',
      site: 'Sibiu Turism',
      url: 'https://sibiucity.ro/ro/muzeu/galeriile-de-arta.-palatul-brukenthal',
    },
    {
      title: 'Bridge of Lies',
      site: 'Primăria Sibiu',
      url: 'https://www.sibiucity.ro/en/detalii/180',
    },
    {
      title: 'Bridge Of Lies: Sibiu',
      site: 'Sibiu Travel Guide',
      url: 'https://sibiutravelguide.com/attractions/bridge-of-lies/',
    },
    {
      title: 'Evangelic Church',
      site: 'Primăria Sibiu',
      url: 'https://patrimoniu.sibiu.ro/biserici_en/evanghelica/53',
    },
    {
      title: 'Evangelic Parochial Church',
      site: 'Sibiu City App',
      url: 'https://www.sibiucityapp.ro/catedrala-evanghelica?locale=en',
    },
    {
      title: 'Evangelische Kirchengemeinde A.B. Hermannstadt',
      site: 'hermannstadt.evang.ro',
      url: 'https://hermannstadt.evang.ro/ro/',
    },
  ],
  [Ro.Sighisoara]: [
    {
      title: 'Casa memorială Hermann Oberth, Mediaș',
      site: 'cIMeC, Ghidul muzeelor',
      url: 'https://ghidulmuzeelor.cimec.ro/idEN.asp?k=1527',
    },
    {
      title: 'Town of Medias in Transylvania – Romania. Information for visitors.',
      site: 'Romania Tourism',
      url: 'https://romaniatourism.com/medias.html',
    },
    {
      title: 'The memorial house "Hermann Oberth," the museum of pioneers in space.',
      site: 'Turist in Transilvania',
      url: 'https://discover.turistintransilvania.com/en/the-memorial-house-hermann-oberth-the-museum-of-pioneers-in-space-2586',
    },
    {
      title: 'Historic Centre of Sighișoara',
      site: 'UNESCO',
      url: 'https://whc.unesco.org/en/list/902/',
    },
    {
      title: 'Advisory Body Evaluation (ICOMOS): Historic Centre of Sighișoara',
      site: 'UNESCO',
      url: 'https://whc.unesco.org/document/154557',
    },
    {
      title: 'Clock Tower',
      site: 'Explore Sighișoara',
      url: 'https://ghid.exploresighisoara.ro/en/obiectiv/turnul-cu-ceas',
    },
    {
      title: 'Covered Stairway',
      site: 'Explore Sighișoara',
      url: 'https://ghid.exploresighisoara.ro/en/obiectiv/scara-acoperita',
    },
  ],
  [Ro.Timisoara]: [
    {
      title: 'History of Timisoara',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/History_of_Timisoara',
    },
    {
      title: 'Siege of Temeşvar (1716)',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Siege_of_Teme%C5%9Fvar_(1716)',
    },
    {
      title: 'Temesvár (Timișoara), Transylvania / Romania',
      site: 'Explore Carpathia',
      url: 'https://www.explorecarpathia.eu/en/romania/temesvar-timisoara',
    },
    {
      title:
        'Artileria cetăţii Timişoara la 1716 / The Guns Of The Fortress Of Timişoara (Temesvar) in 1716',
      site: 'Analele Banatului',
      url: 'https://analelebanatului.ro/en/view-article/399/',
    },
    {
      title: 'Catholic Church',
      site: 'Heritage of Timișoara',
      url: 'https://heritageoftimisoara.ro/en/buildings/Cetate/address/Unirii/12',
    },
    {
      title: 'Domul Romano-Catolic din Timișoara • Zile și Nopți',
      site: 'Zile și Nopți',
      url: 'https://zilesinopti.ro/?p=599076',
    },
    {
      title: 'Union Square, Timișoara',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Union_Square,_Timi%C8%99oara',
    },
    {
      title: 'László Tőkés',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/L%C3%A1szl%C3%B3_T%C5%91k%C3%A9s',
    },
    {
      title: 'Timisoara',
      site: 'Rough Guides',
      url: 'https://m.roughguides.com/romania/the-banat-and-crisana/timisoara/',
    },
    {
      title: '15 decembrie 1989, Timişoara. Aici a început drumul spre libertate',
      site: 'eMaramures',
      url: 'https://www.emaramures.ro/15-decembrie-1989-timisoara-aici-a-inceput-drumul-spre-libertate',
    },
    {
      title: 'Timișoara, 20 decembrie ’89. Euforia libertății în bătaia puștii',
      site: 'Europa Liberă România',
      url: 'https://romania.europalibera.org/a/decembrie-1989-timisoara/32734358.html',
    },
    {
      title:
        '24 de ani de la Revoluţie. Pe 20 decembrie 1989 Timişoara a devenit primul oraş liber de comunism',
      site: 'Digi24',
      url: 'https://www.digi24.ro/stiri/actualitate/evenimente/24-de-ani-de-la-revolutie-pe-20-decembrie-1989-timisoara-a-devenit-primul-oras-liber-de-comunism-172238',
    },
    {
      title:
        '20 decembrie 1989, ziua în care Timișoara se declara oraș liber de comunism. Sirenele au răsunat din nou în oraș pentru a aminti ce s-a întâmplat în urmă cu 35 de ani',
      site: 'G4Media',
      url: 'https://www.g4media.ro/20-decembrie-1989-ziua-in-care-timisoara-se-declara-oras-liber-de-comunism-sirenele-au-rasunat-din-nou-in-oras-pentru-a-aminti-ce-s-a-intamplat-in-urma-cu-35-de-ani.html',
    },
  ],
  [Ro.Constanta]: [
    {
      title: 'Central Stadium (Gheorghe Hagi Academy)',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Central_Stadium_(Gheorghe_Hagi_Academy)',
    },
    {
      title: 'FC Viitorul Constanța',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/FC_Viitorul_Constan%C8%9Ba',
    },
    {
      title:
        'Viitorul și Farul Constanța au fuzionat! Gică Hagi va fi antrenor, iar Gică Popescu- președinte',
      site: 'BZI',
      url: 'https://www.bzi.ro/viitorul-si-farul-constanta-au-fuzionat-gica-hagi-va-fi-antrenor-iar-gica-popescu-presedinte-2-4213253',
    },
    {
      title: 'Vacanțele artiștilor la 2 Mai și Vama Veche',
      site: 'CEEOL',
      url: 'https://ceeol.com/search/article-detail?id=1089271',
    },
    {
      title:
        'Vama Veche în 2026: istoria, farmecul pierdut și transformarea celei mai controversate destinații de la mare de 1 Mai',
      site: 'Playtech',
      url: 'https://playtech.ro/?p=887220',
    },
    { title: 'Vama Veche', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Vama_Veche' },
    { title: 'Constanța', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Constan%C8%9Ba' },
    {
      title: 'DOCUMENTAR: 110 ani de la inaugurarea oficială a Portului Constanţa',
      site: 'Agerpres',
      url: 'https://agerpres.ro/documentare/2019/09/27/documentar-110-ani-de-la-inaugurarea-oficiala-a-portului-constanta--375928',
    },
    {
      title: 'Monumental art – Ovidiu, the singer of gentle loves',
      site: 'Curatorial',
      url: 'https://curatorial.ro/en/art/monumental-art-ovidiu-the-singer-of-gentle-loves/',
    },
    {
      title: 'Statue of Ovid – Constanţa, Romania – Attractions',
      site: 'Lonely Planet',
      url: 'https://www.lonelyplanet.com/points-of-interest/statue-of-ovid/1285086',
    },
    {
      title: 'Ettore Ferrari',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Ettore_Ferrari',
    },
    {
      title: 'Edificiul Roman cu Mozaic din Constanța',
      site: 'Digi24',
      url: 'https://www.digi24.ro/trecutul-din-prezent/edificiul-roman-cu-mozaic-din-constanta-3211927',
    },
    {
      title:
        'Un important monument istoric din Constanţa, restaurat de o companie italiană. A fost descoperit întâmplător în 1959',
      site: 'Observator News',
      url: 'https://observatornews.ro/eveniment/un-important-monument-istoric-din-constanta-restaurat-de-o-companie-italiana-a-fost-descoperit-intamplator-in-1959-585071.html',
    },
    {
      title:
        'Edificiul Roman cu Mozaic din Constanța a fost redeschis. Intrarea este gratuită până la sfârșitul anului',
      site: 'Evenimentul Zilei',
      url: 'https://evz.ro/edificiul-roman-cu-mozaic-din-constanta-a-fost-redeschis-intrarea-este-gratuita-pana-la-sfarsitul-anului.html',
    },
    {
      title: 'Grand Mosque of Constanța',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Grand_Mosque_of_Constan%C8%9Ba',
    },
    {
      title: 'Marea Moschee sau Moscheea „Carol I” din Constanța',
      site: 'InfoCons',
      url: 'https://infocons.ro/infocons-protectia-consumatorului-de-patrimoniu-marea-moschee-sau-moscheea-carol-i-din-constanta/',
    },
    {
      title:
        'Fascinanta poveste a Cazinoului din Constanţa, clădirea cu trei fundaţii, unde se destrămau vieţi într-o clipită. De ce se zice că simbolul oraşului este bântuit',
      site: 'Adevărul',
      url: 'https://adevarul.ro/stiri-locale/constanta/fascinanta-poveste-a-cazinoului-din-constanta-1607801.html',
    },
    {
      title: 'The Casino in Constanța',
      site: 'Radio Romania International',
      url: 'https://www.rri.ro/en/features-and-reports/rri-encyclopaedia/the-casino-in-constanta-id169639.html',
    },
    {
      title: 'Cazinoul din Constanța, redeschis: 10.000 de vizitatori în patru zile',
      site: 'G4Media',
      url: 'https://www.g4media.ro/cazinoul-din-constanta-redeschis-10-000-de-vizitatori-in-patru-zile.html',
    },
    {
      title:
        'Cazinoul Constanța, clădirea simbol a litoralului românesc, redeschisă după 5 ani de lucrări. Când poate fi vizitat monumentul',
      site: 'Gândul',
      url: 'https://www.gandul.ro/actualitate/cazinoul-constanta-cladirea-simbol-a-litoralului-romanesc-redeschisa-dupa-5-ani-de-lucrari-cand-poate-fi-vizitat-monumentul-20524365',
    },
  ],
  [RoLandscape.DanubeDelta]: [
    {
      title: 'DELTA SĂLBATICĂ/ Pelicanul – simbol al Deltei Dunării',
      site: 'Agerpres',
      url: 'https://agerpres.ro/2022/07/22/delta-salbatica-pelicanul---simbol-al-deltei-dunarii--953990',
    },
    {
      title:
        'Paradisul din rezervaţia Delta Dunării unde trăieşte pelicanul creţ, o specie periclitată la nivel mondial. Agenţii ecologi au mărit zona de cuibărit',
      site: 'Adevărul',
      url: 'https://adevarul.ro/stiri-locale/tulcea/paradisul-din-rezervatia-delta-dunarii-unde-1998580.html',
    },
    {
      title: 'Pelicanii creți s-au întors pe insula Ceaplace. Păsările au depus deja ouă',
      site: 'Antena 3',
      url: 'https://www.antena3.ro/mediu/pelicanii-creti-s-au-intors-pe-insula-ceaplace-pasarile-au-depus-deja-oua-734974.html',
    },
    {
      title:
        'Imagini revoltătoare în Delta Dunării: O ambarcațiune intră intenționat într-un stol de pelicani',
      site: 'Digi24',
      url: 'https://www.digi24.ro/stiri/actualitate/evenimente/foto-imagini-revoltatoare-in-delta-dunarii-o-ambarcatiune-intra-intentionat-intr-un-stol-de-pelicani-1560179',
    },
    { title: 'Danube Delta', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Danube_Delta' },
    {
      title: '1 septembrie – Ziua Rezervației Biosferei Delta Dunării',
      site: 'Radio România Constanța',
      url: 'https://radioconstanta.ro/2021/09/01/1-septembrie-ziua-rezervatiei-biosferei-delta-dunarii-2',
    },
    {
      title: 'Planul lui Ceaușescu de a distruge Delta Dunării',
      site: 'Gândul',
      url: 'https://www.gandul.ro/magazin/planul-diabolic-al-lui-ceausescu-de-a-distruge-delta-dunarii-dictatorul-a-incercat-sa-faca-din-bijuteria-naturala-unesco-al-doilea-baragan-20942643',
    },
    {
      title:
        'Cum a „măcelărit” România Delta Dunării înainte să apară pericolul Bîstroe. 1.753 km de canale noi • Newsweek România',
      site: 'Newsweek România',
      url: 'https://newsweek.ro/actualitate/cum-a-macelarit-romania-delta-dunarii-inainte-sa-apara-pericolul-bistroe-1753-km-de-canale-noi',
    },
    {
      title: 'Delta câştigă 1.000 de hectare. Zona Carasuhat Mahmudia este renaturată',
      site: 'Digi24',
      url: 'https://www.digi24.ro/regional/digi24-constanta/delta-castiga-1-000-de-hectare-zona-carasuhat-mahmudia-este-renaturata-432238',
    },
    {
      title: 'Farul Comisiei Europene a Dunării, Sulina',
      site: 'cIMeC, Ghidul muzeelor',
      url: 'https://ghidulmuzeelor.cimec.ro/idEN.asp?k=1536',
    },
    {
      title: 'Lighthouse at the end of the Danube',
      site: 'Arhitectura 1906',
      url: 'https://arhitectura-1906.ro/en/2022/08/lighthouse-at-the-end-of-the-danube/',
    },
    {
      title: 'Legends of the Sulina',
      site: 'Arhitectura 1906',
      url: 'https://arhitectura-1906.ro/en/2022/08/legends-of-the-sulina/',
    },
    {
      title: 'TULCEA: Lucrările de reabilitare a Farului vechi din Sulina, nerecepţionate încă',
      site: 'Radio România Constanța',
      url: 'https://radioconstanta.ro/2022/11/12/tulcea-lucrarile-de-reabilitare-a-farului-vechi-din-sulina-nereceptionate-inca',
    },
    {
      title: 'REPORTAJ/ Tulcea: Festivalul scrumbiei albastre a deschis sezonul turistic la Sulina',
      site: 'Agerpres',
      url: 'https://agerpres.ro/2025/05/03/reportaj-tulcea-festivalul-scrumbiei-albastre-a-deschis-sezonul-turistic-la-sulina--1445212',
    },
    { title: 'Letea Forest', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Letea_Forest' },
    {
      title: 'VIDEO Colţ de rai: Pădurea Letea, cel mai exotic loc din România',
      site: 'Adevărul',
      url: 'https://adevarul.ro/stil-de-viata/video-colt-de-rai-padurea-letea-cel-mai-exotic-1296111.html',
    },
    {
      title: 'Pe urmele cailor din Pădurea Letea – Rezervaţia Deltei Dunării',
      site: 'Financiarul',
      url: 'https://financiarul.ro/actuale/pe-urmele-cailor-din-padurea-letea-rezervatia-deltei-dunarii/',
    },
    {
      title: 'Project to protect Letea Forest and local half-wild horse herd in the Danube Delta',
      site: 'Romania Insider',
      url: 'https://www.romania-insider.com/project-to-protect-letea-forest-and-local-half-wild-horse-herd-in-the-danube-delta',
    },
    {
      title: 'REPORTAJ Tulcea: Comunitatea tradiţională de pescari din Jurilovca se schimbă',
      site: 'Agerpres',
      url: 'https://agerpres.ro/2023/06/19/reportaj-tulcea-comunitatea-traditionala-de-pescari-din-jurilovca-se-schimba--1126341',
    },
    {
      title: 'Tulcea: Gura Portiței se deschide oaspeților în luna iunie (GALERIE FOTO)',
      site: 'Agerpres',
      url: 'https://agerpres.ro/social/2025/04/14/tulcea-gura-portitei-se-deschide-oaspetilor-in-luna-iunie-galerie-foto--1440455',
    },
    {
      title: 'The Lipovan Russians Of Romania',
      site: 'Institutul Cultural Român',
      url: 'https://icr.ro/pagini/the-lipovan-russians-of-romania',
    },
    {
      title: 'A. Baltreș, I. Stanciu, sulla cetatea di Enisala',
      site: 'Peuce, n.s. IX (2011)',
      url: 'https://revistapeuce.icemtl.ro/wp-content/uploads/Arhiva-Peuce-Serie-noua/08-Peuce-SN-IX-2011/26-Baltres-Stanciu-sn.9.pdf',
    },
    {
      title: 'Cetatea Enisala, singura cetate medievală din Dobrogea',
      site: 'Citadina',
      url: 'https://citadina.substack.com/p/plebeulamuzeu-cetatea-enisala-singura-cetate-medievala-din-dobrogea',
    },
  ],
  [RoLandscape.FagarasMountains]: [
    {
      title:
        'Romania’s Transfagarasan: How Soviet Invasion Fears Inspired The ’Best Road In The World’',
      site: 'RFE/RL',
      url: 'https://rferl.org/amp/romania-transfagarasan-road-50th-anniversary/33125063.html',
    },
    {
      title:
        'Povestea Transfăgărășanului. Cum a fost construit drumul tăiat în munte de teama unei invazii rusești',
      site: 'Europa Liberă România',
      url: 'https://romania.europalibera.org/a/cum-a-declansat-invazia-rusilor-in-cehoslovacia-construirea-transfagarasanului-drumul-taiat-in-munte-de-teama-unei-invazii-a-urss-ului/33123637.html',
    },
    {
      title:
        'Transfăgărășanul, unul dintre simbolurile României, a împlinit 51 de ani. Cum va fi modernizat și de ce l-a construit Ceaușescu',
      site: 'Capital',
      url: 'https://www.capital.ro/transfagarasanul-unul-dintre-simbolurile-romaniei-a-implinit-51-de-ani-cum-va-fi-modernizat-si-de-ce-l-a-construit-ceausescu.html',
    },
    {
      title: 'Făgăraș Mountains',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/F%C4%83g%C4%83ra%C8%99_Mountains',
    },
    {
      title:
        'Top 5 cele mai spectaculoase lacuri glaciare din România. Locurile speciale care-i lasă pe turiști fără cuvinte',
      site: 'Fanatik',
      url: 'https://www.fanatik.ro/top-5-cele-mai-spectaculoase-lacuri-glaciare-din-romania-locurile-speciale-care-i-lasa-pe-turisti-fara-cuvinte-21005648',
    },
    {
      title: 'Transfăgărășan',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Transf%C4%83g%C4%83r%C4%83%C8%99an',
    },
    {
      title:
        '49 de ani de Transfăgărășan: Construcția celui mai spectaculos drum din România, urgentată de invadarea Cehoslovaciei',
      site: 'Economica.net',
      url: 'https://www.economica.net/49-de-ani-de-transfagarasan-constructia-celui-mai-spectaculos-drum-din-romania-urgentata-de-invadarea-cehoslovaciei_694691.html',
    },
    {
      title:
        'Cum au fost construite marile șosele din Carpați, drumurile de vis care unesc România',
      site: 'Adevărul',
      url: 'https://adevarul.ro/stil-de-viata/magazin/cum-au-fost-construite-marile-sosele-din-carpati-2396753.html',
    },
    { title: 'Vidraru Dam', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Vidraru_Dam' },
    {
      title: 'Vidraru Dam (Poenari, 1965)',
      site: 'Structurae',
      url: 'https://structurae.net/structures/vidraru-dam',
    },
    {
      title:
        'Argeş: A fost semnat contractul pentru retehnologizarea Hidrocentralei Vidraru, investiţie de peste 200 de milioane de euro',
      site: 'Agerpres',
      url: 'https://agerpres.ro/economic/2024/07/09/arges-a-fost-semnat-contractul-pentru-retehnologizarea-hidrocentralei-vidraru-investitie-de-peste-20--1324906',
    },
    {
      title: 'Căldarea glaciară Bâlea',
      site: 'Sibiu City App',
      url: 'https://www.sibiucityapp.ro/en/places/caldarea-glaciara-balea-8c3rqgomkyqfga?page=9',
    },
    {
      title: 'Cabana Bâlea Cascadă – Valea Bâlea – Lacul Bâlea',
      site: 'Munții Noștri',
      url: 'https://muntii-nostri.ro/trails/download-atlas/cabana-balea-cascada-valea-balea-lacul-balea/',
    },
    {
      title: 'Studio sui laghi glaciari dei Făgăraș',
      site: 'GeoEcoMar, supplemento 2009',
      url: 'https://geoecomar.ro/website/publicatii/supliment2009/7.pdf',
    },
  ],
  [RoLandscape.PiatraCraiului]: [
    {
      title: 'Piatra Craiului National Park',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Piatra_Craiului_National_Park',
    },
    {
      title: 'Regulamentul Parcului Național Piatra Craiului',
      site: 'Ministerul Mediului',
      url: 'https://mmediu.ro/app/webroot/uploads/files/2016-03-23_REGULAMENT_Piatra_Craiului.pdf',
    },
    {
      title: 'Piatra Craiului National Park (Romania): application for the European Diploma',
      site: 'Council of Europe',
      url: 'https://rm.coe.int/piatra-craiului-national-park-romania-application-for-the-european-dip/168092a8f9',
    },
    { title: 'Moieciu', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Moieciu' },
    {
      title: 'Romania photo of the day: Măgura village',
      site: 'Romania Insider',
      url: 'https://www.romania-insider.com/life/romania-photo-day-dreamstime-magura-village',
    },
    {
      title: 'Ocolul Pietrei Craiului',
      site: 'Munții Noștri',
      url: 'https://www.muntii-nostri.ro/trails/download-atlas/ocolul-pietrei-craiului',
    },
    {
      title: 'Casa Folea – Prăpăstiile Zărneștilor',
      site: 'Munții Noștri',
      url: 'https://muntii-nostri.ro/trails/download-atlas/casa-folea-prapastiile-zarnestilor-2/',
    },
    {
      title: 'Travelling through the defiant Gorges of Zarnesti',
      site: 'Dangerous Roads',
      url: 'https://dangerousroads.org/eastern-europe/romania/10743-travelling-through-the-defiant-gorges-of-zarnesti.html',
    },
    {
      title: 'Visit the sanctuary',
      site: 'Asociația Milioane de Prieteni',
      url: 'https://www.millionsoffriends.org/en/libearty/visit-the-sanctuary',
    },
    {
      title: 'Bear sanctuary',
      site: 'Zarnesti.net',
      url: 'https://zarnesti.net/en/useful-information/bear-sanctuary/',
    },
    {
      title:
        'Zarnesti Libearty Bear Sanctuary – the largest bear sanctuary in Europe. Come and convince yourself.',
      site: 'Visit Zărnești',
      url: 'https://www.visitzarnesti.ro/en/libearty-bear-sanctuary',
    },
  ],
  [RoLandscape.ApuseniMountains]: [
    { title: 'Salina Turda', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Salina_Turda' },
    {
      title: 'Salina Turda, minunea din adâncuri',
      site: 'Evenimentul Zilei',
      url: 'https://evz.ro/salina-turda-minunea-din-adancuri.html',
    },
    {
      title:
        'Salina Turda – informații utile, localizare și obiective turistice de neratat în această zonă din inima Transilvaniei',
      site: 'Spotmedia',
      url: 'https://spotmedia.ro/stiri/timp-liber/salina-turda-informatii-utile-localizare-si-obiective-turistice-de-neratat-in-aceasta-zona-din-inima-transilvaniei-lmt',
    },
    {
      title: 'Apuseni Natural Park',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Apuseni_Natural_Park',
    },
    {
      title: 'Țara Moților',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/%C8%9Aara_Mo%C8%9Bilor',
    },
    {
      title: 'Scărișoara Cave',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Sc%C4%83ri%C8%99oara_Cave',
    },
    {
      title:
        'Ritmul de topire a Ghețarului de la Scărișoara, cel mai accelerat din ultima sută de ani. Specialiști internaționali, în Apuseni',
      site: 'Alba24',
      url: 'https://alba24.ro/ritmul-de-topire-a-ghetarului-de-la-scarisoara-cel-mai-accelerat-din-ultima-suta-de-ani-specialisti-internationali-in-apuseni-1118524.html',
    },
    {
      title:
        'Cercetare internațională în Peștera Ghețarul de la Scărișoara, pentru reconstituirea climatului din trecut. Model 3D, obținut prin scanarea completă a peșterii',
      site: 'G4Media',
      url: 'https://www.g4media.ro/cercetare-internationala-in-pestera-ghetarul-de-la-scarisoara-pentru-reconstituirea-climatului-din-trecut-model-3d-obtinut-prin-scanarea-completa-a-pesterii.html',
    },
    {
      title: 'Sat Arieșeni – Peștera Ghețarul Scărișoara',
      site: 'Munții Noștri',
      url: 'https://muntii-nostri.ro/trails/download-atlas/sat-arieseni-pestera-ghetarul-scarisoara',
    },
    { title: 'Bears’ Cave', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Bears%27_Cave' },
    {
      title:
        'Lucruri neştiute despre Peştera Urşilor, minunăţia din Munţii Apuseni. Legenda celor 140 de „monştri“ înfometaţi',
      site: 'Adevărul',
      url: 'https://adevarul.ro/stiri-locale/oradea/lucruri-nestiute-despre-pestera-ursilor-minunatia-1602357.html',
    },
    {
      title:
        'Misterul Peșterii Urșilor din Munții Apuseni: Casa zeilor sau acunzișul a 140 de urși? • Newsweek România',
      site: 'Newsweek România',
      url: 'https://newsweek.ro/actualitate/misterul-pesterii-ursilor-din-muntii-apuseni-casa-zeilor-sau-acunzisul-a-140-de-ursi',
    },
    {
      title:
        'Minunea naturală a „Everestului” speologiei române. E cel mai mare complex carstic din România • Newsweek România',
      site: 'Newsweek România',
      url: 'https://newsweek.ro/actualitate/minunea-naturala-a-everestului-speologiei-romane-e-cel-mai-mare-complex-carstic-din-romania',
    },
    {
      title: 'Castles of Ponor tour hiking trail, Bihor-Vladeasa, Apuseni mountains',
      site: 'Welcome to Romania',
      url: 'https://www.welcometoromania.eu/Apuseni/Apuseni_Padis_Cetatile_Ponorului_e.htm',
    },
    {
      title: 'Casa memorială Avram Iancu, Incești',
      site: 'cIMeC, Ghidul muzeelor',
      url: 'https://ghidulmuzeelor.cimec.ro/idEN.asp?k=51',
    },
    {
      title:
        'Complexul muzeal "Avram Iancu", inaugurat oficial. A fost reabilitat cu fonduri de 4,8 milioane lei de la Ministerul Culturii',
      site: 'Alba24',
      url: 'https://alba24.ro/astazi-complexul-muzeal-avram-iancu-inaugurat-oficial-a-fost-reabilitat-cu-fonduri-de-48-milioane-lei-de-la-ministerul-culturii-228471.html',
    },
    {
      title:
        'Testamentul olograf al lui Avram Iancu, expus în localitatea natală cu ocazia Târgului de Fete de pe Muntele Găina',
      site: 'Alba24',
      url: 'https://alba24.ro/testamentul-olograf-al-lui-avram-iancu-expus-in-localitatea-natala-cu-ocazia-targului-de-fete-de-pe-muntele-gaina-506497.html',
    },
  ],
  [RoLandscape.IronGates]: [
    { title: 'Iron Gates', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Iron_Gates' },
    {
      title: 'Tabula Traiana',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Tabula_Traiana',
    },
    {
      title: 'Ada Kaleh, the island swallowed by the Iron Gates',
      site: 'Romania Insider',
      url: 'https://www.romania-insider.com/ada-kaleh-iron-gates',
    },
    {
      title:
        '48 de ani de la scufundarea insulei Ada Kaleh. „A fost foarte frumos, o copilărie cum nici în cărţi nu există, nici în romanele cele mai romane”',
      site: 'Adevărul',
      url: 'https://adevarul.ro/stil-de-viata/cultura/48-de-ani-de-la-scufundarea-insulei-ada-kaleh-a-1874277.html',
    },
    {
      title:
        'Paradisul de pe Dunăre care a fost înghițit de ape. Cum a fost sacrificată Ada Kaleh de comuniști? • Newsweek România',
      site: 'Newsweek România',
      url: 'https://newsweek.ro/actualitate/paradisul-de-pe-dunare-care-a-fost-inghitit-de-ape-cum-a-fost-sacrificata-ada-kaleh-de-comunisti',
    },
    {
      title:
        'Se împlinesc 20 de ani de la reconstrucţia sfintei Mânăstiri Mraconia. Lăcaşul a fost demolat de comunişti',
      site: 'Adevărul',
      url: 'https://adevarul.ro/stiri-locale/turnu-severin/se-implinesc-20-de-ani-de-la-reconstructia-sfintei-1464659.html',
    },
    {
      title: 'Mănăstirea Mraconia – Asociaţia Pro-Mehedinţi',
      site: 'Pro-Mehedinți',
      url: 'https://promehedinti.ro/en/manastirea-mraconia-2/',
    },
    {
      title:
        'Turism în România. Opt lăcașuri de cult care sunt în picioare și astăzi, chiar dacă au fost înghițite de ape în urmă cu zeci de ani',
      site: 'Evenimentul Zilei',
      url: 'https://evz.ro/turism-in-romania-opt-lacasuri-de-cult-care-sunt-in-picioare-si-astazi-chiar-daca-au-fost-inghitite-de-ape-in-urma-cu-zeci-de-ani.html',
    },
    {
      title: 'Trajan’s Bridge',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Trajan%27s_Bridge',
    },
    {
      title: 'Traian’s Bridge – Asociaţia Pro-Mehedinţi',
      site: 'Pro-Mehedinți',
      url: 'https://promehedinti.ro/en/podul-lui-traian/',
    },
    {
      title:
        'Muzeul Regiunii Porților de Fier din Drobeta, unde poți vedea rămășițele Podului lui Traian, iar istoria e transformată în experiență',
      site: 'Euronews România',
      url: 'https://www.euronews.ro/articole/muzeul-regiunii-de-fier-drobeta-turnu-severin-podul-traian-expozitie-istorie',
    },
  ],
  [RoLandscape.Retezat]: [
    {
      title: 'Retezat National Park',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Retezat_National_Park',
    },
    {
      title:
        'Azi e Ziua Europeană a Parcurilor Naţionale. Care e primul parc de acest gen din România',
      site: 'Puterea',
      url: 'https://www.puterea.ro/?p=58734',
    },
    {
      title: 'Excursie în cel mai vechi parc din ţară',
      site: 'Adevărul',
      url: 'https://adevarul.ro/stiri-locale/hunedoara/excursie-in-cel-mai-vechi-parc-din-tara-1157957.html',
    },
    {
      title:
        'Bucura(ă)-te de Retezat. Cum ajungi în două ore la cel mai întins lac glaciar din România',
      site: 'Adevărul',
      url: 'https://adevarul.ro/blogurile-adevarul/bucuraa-te-de-retezat-cum-ajungi-in-doua-ore-la-1541355.html',
    },
    {
      title: 'Lacul Bucura – cel mai mare lac glaciar din România',
      site: 'Financiarul',
      url: 'https://financiarul.ro/actualitate/lacul-bucura-cel-mai-mare-lac-glaciar-din-romania/',
    },
    {
      title: 'Alpine lakes of Retezat Mountains – Climbing, Hiking & Mountaineering',
      site: 'SummitPost',
      url: 'https://Summitpost.org/alpine-lakes-of-retezat-mountains/658515',
    },
    {
      title: 'List of lakes of Romania',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/List_of_lakes_of_Romania',
    },
    {
      title: 'Lacul Bucura – Romania Photo Spot',
      site: 'Pixeo',
      url: 'https://pixeoapp.com/photography-guides/europe/romania/lacul-bucura',
    },
    {
      title: 'Care sunt cele mai adânci lacuri din România – FOTO',
      site: 'BZI',
      url: 'https://www.bzi.ro/care-sunt-cele-mai-adanci-lacuri-din-romania-foto-1177645',
    },
  ],
  [RoLandscape.VaserValleyRodna]: [
    {
      title:
        'A murit sculptorul de la Cimitirul Vesel din Săpânța. Dumitru Pop-Tincu era considerat „tezaurul uman viu”',
      site: 'Adevărul',
      url: 'https://adevarul.ro/stiri-locale/baia-mare/a-murit-sculptorul-de-la-cimitirul-vesel-din-2227954.html',
    },
    {
      title: 'Legenda inspirației divine a celui care a întemeiat Cimitirul Vesel',
      site: 'Puterea',
      url: 'https://www.puterea.ro/?p=496825',
    },
    {
      title: 'Merry Cemetery',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Merry_Cemetery',
    },
    {
      title: 'Nomination file: Wooden Churches of Maramureș',
      site: 'UNESCO',
      url: 'https://whc.unesco.org/document/154560',
    },
    {
      title:
        'Povestea celor opt bisericuţe maramureşene din lemn, înregistrate în patrimoniul UNESCO',
      site: 'Financiarul',
      url: 'https://financiarul.ro/actualitate/povestea-celor-opt-bisericute-maramuresene-din-lemn-inregistrate-in-patrimoniul-unesco/',
    },
    {
      title: 'Biserica de lemn din Bârsana',
      site: 'Digi24',
      url: 'https://www.digi24.ro/trecutul-din-prezent/biserica-de-lemn-din-barsana-3557391',
    },
    {
      title: 'About Mocanita, the Romanian Forestry Narrow Gauge Steam Train',
      site: 'CFF Vișeu de Sus',
      url: 'https://www.mocanita.ro/about-mocanita/',
    },
    {
      title: 'Mocăniţa – Last of the Carpathian Forestry Railways',
      site: 'Google Arts & Culture',
      url: 'https://artsandculture.google.com/story/moc%C4%83ni%C5%A3a-last-of-the-carpathian-forestry-railways-mocanita/hwWBAhG2oQ0A8A?hl=en-GB',
    },
    {
      title: 'Vișeu de Sus Mocănița: Journey along the Vaser Valley',
      site: 'RHN',
      url: 'https://rhn.ro/en/mocanita-of-viseu-de-sus-a-journey-along-the-vaser-valley/',
    },
    {
      title:
        'Mocănița din Vișeu, unică în lume: de ce trebuie să parcurgi traseele cu trenurile cu abur îndrăgite de turiștii din întreaga lume',
      site: 'Playtech',
      url: 'https://playtech.ro/2023/mocanita-din-viseu-unica-in-lume-de-ce-trebuie-sa-parcurgi-traseele-cu-trenurile-cu-abur-indragite-de-turistii-din-intreaga-lume/',
    },
    {
      title: 'Rodna Mountains National Park',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Rodna_Mountains_National_Park',
    },
    {
      title: 'The Rodna Mountains National Park',
      site: 'Radio Romania International',
      url: 'https://rri.ro/en/features-and-reports/green-planet/the-rodna-mountains-national-park-id153268.html',
    },
    {
      title: 'Rodna, Romania: Ratings & Visitor Guide',
      site: 'International Parks',
      url: 'https://www.internationalparks.org/romania/Rodna',
    },
    {
      title:
        'Cascada Cailor din Borșa: De ce să vizitezi acest loc și ce alte obiective găsești în zonă',
      site: 'Spotmedia',
      url: 'https://spotmedia.ro/stiri/timp-liber/cascada-cailor-din-borsa-de-ce-sa-vizitezi-acest-loc-si-ce-alte-obiective-gasesti-in-zona-lmt',
    },
    {
      title: 'Legenda cumplită din Munții Rodnei',
      site: 'Digi24',
      url: 'https://www.digi24.ro/magazin/timp-liber/vacante/legenda-cumplita-din-muntii-rodnei-758059',
    },
    {
      title: 'Locuri unice din România. Cascada unde natură creează o atmosferă de poveste',
      site: 'Evenimentul Zilei',
      url: 'https://evz.ro/cascada-cailor-romania-atractii-turistice.html',
    },
  ],
  [RoLandscape.BicazCeahlau]: [
    { title: 'Bicaz Canyon', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Bicaz_Canyon' },
    {
      title: 'Take the Scenic Route and Discover Bicaz Gorge in Romania',
      site: 'Dangerous Roads',
      url: 'https://dangerousroads.org/eastern-europe/romania/4946-bicaz-gorge.html',
    },
    {
      title: 'Bicaz Gorge',
      site: 'Birdingplaces.eu',
      url: 'https://www.birdingplaces.eu/birdingplaces/romania/bicaz-gorge',
    },
    {
      title: 'Red Lake (Romania)',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Red_Lake_(Romania)',
    },
    { title: 'Lacul Roșu', site: 'Wikiwand', url: 'https://www.wikiwand.com/ro/Lacul_Roșu' },
    {
      title:
        'De ce merită vizitat Lacul Roșu? Iată care este legenda unuia dintre cele mai îndrăgite lacuri din România!',
      site: 'BZI',
      url: 'https://www.bzi.ro/de-ce-merita-vizitat-lacul-rosu-iata-care-este-legenda-unuia-dintre-cele-mai-indragite-lacuri-din-romania-5446316',
    },
    {
      title: 'Lacul Rosu',
      site: 'Orange Romania',
      url: 'https://www.orange.ro/info/centenar/article/lacul-rosu/2768707',
    },
    {
      title: 'Ceahlău Massif',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Ceahl%C4%83u_Massif',
    },
    {
      title:
        'REPORTAJ Masivul Ceahlău – un munte de legende şi credinţă, vizitat anual de zeci de mii de turişti',
      site: 'Agerpres',
      url: 'https://agerpres.ro/2018/10/15/reportaj-masivul-ceahlau---un-munte-de-legende-si-credinta-vizitat-anual-de-zeci-de-mii-de-turisti--193377',
    },
    {
      title: '6 august, Schimbarea la Față a Domnului și Preobrajenia',
      site: 'TVR Info',
      url: 'https://tvrinfo.ro/6-august-schimbarea-la-fata-a-domnului-si-probejania/',
    },
    {
      title: 'Evenimente care vor avea loc în Arhiepiscopia Iaşilor, în perioada 6-12 august 2023',
      site: 'BZI',
      url: 'https://www.bzi.ro/evenimente-care-vor-avea-loc-in-arhiepiscopia-iasilor-in-perioada-6-12-august-2023-4774223',
    },
    {
      title:
        'Enigma piramidei holografice, straniul fenomen din Ceahlău. Se crede că e muntele sacru al dacilor • Newsweek România',
      site: 'Newsweek România',
      url: 'https://newsweek.ro/timp-liber/enigma-piramidei-holografice-straniul-fenomen-din-ceahlau-se-crede-ca-e-muntele-sacru-al-dacilor',
    },
    {
      title:
        'Fenomenul paranormal care atrage pe data de 6 august mii de turiști pe muntele Ceahlău',
      site: 'Evenimentul Zilei',
      url: 'https://evz.ro/fenomenul-paranormal-care-atrage-pe-data-de-6-august-mii-de-turisti-pe-muntele-ceahlau.html',
    },
    {
      title: 'Descriptio Moldaviae Dimitrie Cantemir',
      site: 'Visit Neamț',
      url: 'https://www.visitneamt.com/tag/descriptio-moldaviae-dimitrie-cantemir',
    },
  ],
  [RoSection.FoodCommon]: [
    {
      title: 'Mămăligă',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/M%C4%83m%C4%83lig%C4%83',
    },
    { title: 'Sarma (food)', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Sarma_(food)' },
    {
      title: 'Romanian cuisine',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Romanian_cuisine',
    },
    { title: 'Chorba', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Chorba' },
    {
      title: 'Ce înseamnă „ciorbă” în turcă și cum i s-a schimbat sensul în română',
      site: 'Playtech',
      url: 'https://playtech.ro/2026/ce-inseamna-ciorba-in-turca-si-cum-i-s-a-schimbat-sensul-in-romana/',
    },
    { title: 'Cozonac', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Cozonac' },
    {
      title: 'Cozonac: The Festive Sweet Bread That Rose Through Empires and Time',
      site: 'Baking Heritage',
      url: 'https://bakingheritage.com/history/cozonac-the-festive-sweet-bread-that-rose-through-empires-and-time',
    },
    { title: 'Țuică', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/%C8%9Auic%C4%83' },
  ],
  [RoSection.FoodTransylvania]: [
    {
      title: 'Brânză de burduf',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Br%C3%A2nz%C4%83_de_burduf',
    },
    {
      title: 'Brânzeturile românești: tipuri, tradiții și particularități regionale',
      site: 'Zile și Nopți',
      url: 'https://zilesinopti.ro/2026/11/04/branzeturile-romanesti-tipuri-traditii/',
    },
    {
      title: 'Bucegi Mountains brânză de burduf (Slow Food)',
      site: 'Google Arts & Culture',
      url: 'https://artsandculture.google.com/story/bucegi-mountains-brânză-de-burduf-slow-food/2gVBQRoIYhQA8A?hl=en',
    },
    {
      title:
        'România a reuşit să obţină protecţia şi recunoaşterea europeană pentru ’Salamul de Sibiu’',
      site: 'Capital',
      url: 'https://www.capital.ro/romania-a-reusit-sa-obtina-protectia-si-recunoasterea-europeana-pentru-salamul-de-sibiu.html',
    },
    {
      title:
        'România a reuşit să obţină protecţia şi recunoaşterea europeană pentru „Salamul de Sibiu”',
      site: 'Financiarul',
      url: 'https://www.financiarul.ro/2016/02/19/romania-a-reusit-sa-obtina-protectia-si-recunoasterea-europeana-pentru-salamul-de-sibiu/',
    },
    {
      title:
        'Salamul de Sibiu, recunoscut oficial ca produs traditional romanesc, in Uniunea Europeana. A fost inventat de un italian, acum 100 de ani',
      site: 'StartupCafe',
      url: 'https://www.startupcafe.ro/stiri-afaceri-20808695-salamul-sibiu-recunoscut-oficial-produs-traditional-romanesc-uniunea-europeana.htm',
    },
    {
      title: 'Kürtőskalács',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/K%C3%BCrt%C5%91skal%C3%A1cs',
    },
    {
      title: 'The Yummiest Hungarikum: Kürtőskalács',
      site: 'Hungarian Conservative',
      url: 'https://hungarianconservative.com/articles/culture_society/the-history-of-kurtoskalacs-trdelnik-prague-budapest',
    },
    {
      title: 'Disputed Words of Disputed Territories: Whose Is...',
      site: 'Paradigm',
      url: 'https://reference-global.com/article/10.2478/ausp-2018-0028',
    },
    {
      title:
        'Kolozsvár híres káposztái: Mámi töltött káposztájától egészen a Káposztás vendéglő rakott fogásáig',
      site: 'Telex',
      url: 'https://telex.hu/transtelex/2025/11/09/kolozsvari-kaposzta-gasztronomia-tortenelem',
    },
    {
      title: 'Hányféle töltött káposzta létezik a világon, és kié az igazi?',
      site: 'Telex',
      url: 'https://telex.hu/gasztro/2021/12/22/hanyfele-toltott-kaposzta-letezik-a-vilagon-es-kie-az-igazi',
    },
    {
      title: 'Kolozsvári layered sauerkraut',
      site: 'Zserbo',
      url: 'https://zserbo.com/meat-dishes/kolozsvari-layered-sauerkraut/',
    },
    {
      title: 'Pălincă: scheda tecnica dell’indicazione geografica',
      site: 'DFAT',
      url: 'https://www.dfat.gov.au/sites/default/files/200s.docx',
    },
    {
      title:
        'Unde s-a inventat pălinca? Cât de românească este? Pot ungurii să o revendice? • Newsweek România',
      site: 'Newsweek România',
      url: 'https://newsweek.ro/timp-liber/unde-s-a-inventat-palinca-cat-de-romaneasca-este-pot-ungurii-sa-o-revendice',
    },
    {
      title: 'Un singur producător tradițional a fost atestat în Bihor',
      site: 'Digi24',
      url: 'https://www.digi24.ro/regional/digi24-oradea/un-singur-producator-traditional-a-fost-atestat-in-bihor-292351',
    },
    {
      title:
        'Cum să faci cea mai bună pălincă sau țuică de gutui: Secretul din Bihor al celei mai bune băuturi distilate',
      site: 'BZI',
      url: 'https://www.bzi.ro/cum-sa-faci-cea-mai-buna-palinca-sau-tuica-de-gutui-secretul-din-bihor-al-celei-mai-bune-bauturi-distilate-5050469',
    },
    {
      title: 'The Dance of the (Hungarian) Pálinka – Wine, Wit, and Wisdom',
      site: 'Wine Wit and Wisdom',
      url: 'https://winewitandwisdomswe.com/?p=21354',
    },
    {
      title:
        'Titlul de Regiune Gastronomică Europeană 2028 pune Banatul pe hartă, dar adevărata miză este ce facem noi, aici, acasă, cu el.',
      site: 'Zile și Nopți',
      url: 'https://zilesinopti.ro/2026/04/17/regiune-gastronomica-europeana-banat/',
    },
    {
      title: 'Gusturile României, între tradiție și influențe europene',
      site: 'Știrile ProTV',
      url: 'https://stirileprotv.ro/divers/gusturile-romaniei-intre-traditie-si-influente-europene.html',
    },
    {
      title:
        'Secretele pleşcaviţei, deliciosul „hamburger“ sârbesc care i-a cucerit pe bănăţeni după Revoluţie',
      site: 'Adevărul',
      url: 'https://adevarul.ro/stiri-locale/timisoara/secretele-plescavitei-deliciosul-hamburger-1730008.html',
    },
    { title: 'Țuică', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/%C8%9Auic%C4%83' },
    {
      title: 'Mămăligă',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/M%C4%83m%C4%83lig%C4%83',
    },
    {
      title: 'Cheesy Must-Eats in Romania’s Carpathian Mountains',
      site: 'Culture',
      url: 'https://culturecheesemag.com/travel/cheesy-must-eats-in-romanias-carpathian-mountains/',
    },
    {
      title: 'Cea mai bună mâncare din bucătăria tradiţională maramureşeană',
      site: 'Adevărul',
      url: 'https://adevarul.ro/stiri-locale/baia-mare/cea-mai-buna-mancare-din-bucataria-1762384.html',
    },
  ],
  [RoSection.FoodWallachia]: [
    {
      title: 'Mica istorie a marelui mic. Când a văzut lumina zilei faimosul mititel românesc',
      site: 'Euronews România',
      url: 'https://www.euronews.ro/articole/mica-istorie-a-marelui-mic',
    },
    {
      title:
        'Unde au fost inventați mititeii românești? Cine i-a botezat așa? Rețetă de mici de la 1872 • Newsweek România',
      site: 'Newsweek România',
      url: 'https://newsweek.ro/timp-liber/unde-au-fost-inventati-mititeii-romanesti-cine-i-a-botezat-asa-reteta-de-mici-de-la-1872',
    },
    {
      title:
        'On Covaci Street in Bucharest, Romanian mici were invented, and Caragiale’s Craii de Curte Veche used to celebrate',
      site: 'Bucharest.ro',
      url: 'https://www.bucharest.ro/articles/on-covaci-street-in-bucharest-romanian-mici-were-invented-and-caragiale-s-craii-de-curte-veche-used-to-celebrate-382',
    },
    {
      title: 'Istoria micilor: Mituri urbane și tradiţii',
      site: 'Jurnalul',
      url: 'https://jurnalul.ro/stiri/observator/istoria-micilor-mituri-urbane-si-traditii-843844.html',
    },
    {
      title:
        'De ce mâncăm mici de 1 Mai: Cât costă în 2026 acest preparat tradițional în cele mai cunoscute locuri din București',
      site: 'Playtech',
      url: 'https://playtech.ro/2026/de-ce-mancam-mici-de-1-mai-cat-costa-in-2026-acest-preparat-traditional-in-cele-mai-cunoscute-locuri-din-bucuresti/',
    },
    {
      title:
        'Ciorba de burtă, motiv de ceartă între turci şi greci. Românii au desăvârşit reţeta: "N-am văzut-o la ei"',
      site: 'Observator News',
      url: 'https://observatornews.ro/eveniment/ciorba-de-burta-motiv-de-cearta-intre-turci-si-greci-romanii-au-desavarsit-reteta-nam-vazuto-la-ei-652256.html',
    },
    {
      title:
        'Cine a inventat ciorba de burtă? Legătura lui Suleyman Magnificul cu felul de mâncare adorat de români • Newsweek România',
      site: 'Newsweek România',
      url: 'https://newsweek.ro/istorie/cine-a-inventat-ciorba-de-burta-legatura-lui-suleyman-magnificul-cu-felul-de-mancare-adorat-de-romani',
    },
    {
      title: 'Ciorbă de burtă. Rețetă tradițională românească',
      site: 'BZI',
      url: 'https://www.bzi.ro/ciorba-de-burta-reteta-traditionala-romaneasca-4836318',
    },
    {
      title: 'Famous Pretzels of Buzau (Covrigi de Buzau)',
      site: 'Bucharest Uncovered',
      url: 'https://unknownbucharest.com/romanian-traditional-food/the-famous-buzau-pretzels-covrigi-de-buzau/',
    },
    {
      title: 'Covrigii de Buzău. Istoria care nu vrea să fie dezgropată',
      site: 'Evenimentul Zilei',
      url: 'https://evz.ro/covrigii-buzau-istoria.html',
    },
    {
      title:
        'Tradiție Gustoasă și Crocantă: Covrigii de Buzău – Un deliciu pentru papilele gustative',
      site: 'Puterea',
      url: 'https://www.puterea.ro/?p=257022',
    },
    {
      title: 'Magiunul de prune Topoloveni, primul produs romanesc in topul calitatii europene',
      site: 'Avocatnet',
      url: 'https://www.avocatnet.ro/articol_24013/Magiunul-de-prune-Topoloveni-primul-produs-romanesc-in-topul-calitatii-europene.html',
    },
    {
      title: 'Sonimpex Topoloveni devine marcă înregistrată la OSIM',
      site: 'Bursa',
      url: 'https://www.bursa.ro/sonimpex-topoloveni-devine-marca-inregistrata-la-osim-60314738',
    },
    {
      title:
        'Magiunul de prune Topoloveni, produs românesc fără zahăr adăugat, recunoscut drept cel mai bun produs din fructe din lume',
      site: 'BZI',
      url: 'https://www.bzi.ro/magiunul-de-prune-topoloveni-produs-romanesc-fara-zahar-adaugat-recunoscut-drept-cel-mai-bun-produs-din-fructe-din-lume-5461162',
    },
    {
      title: 'Dealu Mare wine region',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Dealu_Mare_wine_region',
    },
    {
      title: 'Discover the Best Romania Wine Regions for Your Next Tasting Adventure',
      site: 'Regent Holidays',
      url: 'https://www.regent-holidays.co.uk/blog/romania-wine-regions-a-journey-through-dobrogea-dealu-mare-dragasani/',
    },
    {
      title: 'A Journey Through Dealu Mare DOC',
      site: 'The Quirky Cork',
      url: 'https://thequirkycork.com/?p=20131',
    },
  ],
  [RoSection.FoodMoldavia]: [
    { title: 'Tochitură', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Tochitur%C4%83' },
    {
      title:
        'Tochitura moldovenească: cum se face corect și ce greșeli să eviți (P) • Newsweek România',
      site: 'Newsweek România',
      url: 'https://newsweek.ro/timp-liber/tochitura-moldoveneasca-cum-se-face-corect-si-ce-greseli-sa-eviti-p',
    },
    {
      title: 'Where to eat Tochitură moldovenească: 2 editor picks',
      site: 'TableJourney',
      url: 'https://tablejourney.com/dish/tochitura-moldoveneasca/',
    },
    {
      title:
        'Cum se prepară celebrele plăcinte „poale-n brâu“. Secretele coacerii perfecte a brânzoaicelor',
      site: 'Adevărul',
      url: 'https://adevarul.ro/stiri-locale/galati/cum-se-prepara-celebrele-placinte-poale-n-brau-1797557.html',
    },
    {
      title:
        'Rețetă de poale-n brâu ca la bunica. Secretul plăcintelor moldovenești, preferatele lui Ion Creangă',
      site: 'Romania TV',
      url: 'https://www.romaniatv.net/reteta-de-poale-n-brau-ca-la-bunica-secretul-placintelor-moldovenesti-preferatele-lui-ion-creanga_8058466.html',
    },
    {
      title: 'Brânzoaice cu brânză dulce: Poale-n brâu ca la bunica acasă',
      site: 'BZI',
      url: 'https://www.bzi.ro/branzoaice-cu-branza-dulce-poale-n-brau-ca-la-bunica-acasa-4312964',
    },
    {
      title:
        'Ciorba rădăuțeană împlinește 40 de ani de când a intrat în meniurile restaurantelor / A fost inventată de o bucătăreasă din Bucovina',
      site: 'G4Media',
      url: 'https://www.g4media.ro/ciorba-radauteana-implineste-40-de-ani-de-cand-a-intrat-in-meniurile-restaurantelor-a-fost-inventata-de-o-bucatareasa-din-bucovina.html',
    },
    {
      title:
        'Ciorba rădăuțeană, în topul celor mai bune supe din lume. A fost inventată la insistențele unui soț • Newsweek România',
      site: 'Newsweek România',
      url: 'https://newsweek.ro/timp-liber/ciorba-radauteana-in-topul-celor-mai-bune-supe-din-lume-a-fost-inventata-la-insistentele-unui-sot',
    },
    {
      title: 'Inventatoarea ciorbei rădăuțene a ajuns pe Netflix',
      site: 'Puterea',
      url: 'https://www.puterea.ro/?p=278970',
    },
    {
      title: 'Cotnari – Campionul Vinurilor Româneşti',
      site: 'Bursa',
      url: 'https://www.bursa.ro/cotnari-campionul-vinurilor-romanesti-60361538',
    },
    {
      title: 'Wine Trips România – Cotnari, pe urmele soiurilor românești',
      site: 'Știrile ProTV',
      url: 'https://stirileprotv.ro/divers/wine-trips-romania-cotnari-pe-urmele-soiurilor-romanesti.html',
    },
    {
      title: 'Grasă de Cotnari, un vino romeno da rivalutare',
      site: 'Vitae Online',
      url: 'https://vitae.aisitalia.it/?p=12016',
    },
  ],
  [RoSection.FoodDobruja]: [
    {
      title:
        'Festivalul borșului de peste din Tulcea. Peste 40 de mii de porții de mâncare au fost pregătite',
      site: 'Euronews România',
      url: 'https://www.euronews.ro/articole/festivalul-borsului-de-peste-din-tulcea-peste-40-de-mii-de-portii-de-mancare-au-f',
    },
    {
      title:
        'GALERIE FOTO Se pregătesc 50.000 de porții la Festivalul Borșului de Pește din Jurilovca, anunță organizatorii',
      site: 'G4Media',
      url: 'https://www.g4media.ro/galerie-foto-se-pregatesc-50-000-de-portii-la-festivalul-borsului-de-peste-din-jurilovca-anunta-organizatorii.html',
    },
    {
      title: 'Bucate savuroase, ca la lipoveni',
      site: 'Jurnalul',
      url: 'https://jurnalul.ro/timp-liber/culinar/bucate-savuroase-ca-la-lipoveni-551758.html',
    },
    {
      title:
        'Secretul ciorbei de pește, aflat de la un pescar din Delta Dunării. Reportaj la Sulina',
      site: 'Spotmedia',
      url: 'https://spotmedia.ro/stiri/timp-liber/secretul-ciorbei-de-peste-aflat-de-la-un-pescar-din-delta-dunarii-reportaj-la-sulina',
    },
    {
      title: 'Rețeta saramurii lipovenești care a intrat în gura întregii lumi',
      site: 'Evenimentul Zilei',
      url: 'https://evz.ro/reteta-saramurii-lipovenesti-care-a-intrat-in-gura-intregii-lumi.html',
    },
    {
      title:
        'Plăcinta dobrogeană. Rețeta păstrată și neschimbată de generații întregi. Care e povestea ei',
      site: 'Romania TV',
      url: 'https://www.romaniatv.net/placinta-dobrogeana-reteta-pastrata-si-neschimbata-de-generatii-intregi-care-e-povestea-ei_8505343.html',
    },
    {
      title: 'Placinta Dobrogeana (Romanian Savory Cheese Pie)',
      site: 'Chef’s Pencil',
      url: 'https://www.chefspencil.com/romanian-traditional-pie-placinta-dobrogeana/',
    },
    {
      title:
        'Plăcinta Dobrogeană, rețetă cu tradiție. De ce a contestat Bulgaria autenticitatea produsului românesc',
      site: 'Euronews România',
      url: 'https://www.euronews.ro/articole/placinta-dobrogreana-reteta-cu-traditie-de-ce-au-contestat-bulgarii-dreptul-roman',
    },
    {
      title:
        'Șuberekul dobrogean, de la bucătăria otomană pe litoralul românesc al Mării Negre. IATĂ rețeta',
      site: 'Jurnalul',
      url: 'https://jurnalul.ro/timp-liber/culinar/suberekul-dobrogean-de-la-bucataria-otomana-pe-litoralul-romanesc-al-marii-negre-iata-reteta-915219.html',
    },
    {
      title: 'Cum se prepară Suberekul, deliciul culinar tătăresc',
      site: 'Jurnalul',
      url: 'https://jurnalul.ro/timp-liber/culinar/cum-se-prepara-suberekul-deliciul-culinar-tataresc-988494.html',
    },
    {
      title:
        'Se împlinesc 142 de ani de la unirea Dobrogei cu România. Elise Ali transmite tradiţia tătărească dobrogenilor cu ajutorul mâncărurilor specifice',
      site: 'Mediafax',
      url: 'https://www.mediafax.ro/social/se-implinesc-142-de-ani-de-la-unirea-dobrogei-cu-romania-elise-ali-transmite-traditia-tatareasca-dobrogenilor-cu-ajutorul-mancarurilor-specifice-19744698/amp',
    },
    {
      title: 'Podgoria Murfatlar',
      site: 'Financiarul',
      url: 'https://financiarul.ro/actualitate/podgoria-murfatlar/',
    },
    {
      title: 'Murfatlar: disciplinare della denominazione di origine',
      site: 'eAmbrosia, Commissione europea',
      url: 'https://ec.europa.eu/geographical-indications-register/eambrosia-public-api/api/v1/attachments/11250',
    },
    { title: 'Murfatlar', site: 'Wein-Plus', url: 'https://glossary.wein-plus.eu/murfatlar' },
    {
      title: 'Constanţa:Turiştii, invitaţi la degustări de vin',
      site: 'Adevărul',
      url: 'https://adevarul.ro/stiri-locale/constanta/constantaturistii-invitati-la-degustari-de-vin-858598.html',
    },
  ],
}
