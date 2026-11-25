import type { GuideSources } from '@/content/types'
import { Eg, EgLandscape, EgSection } from './structure'

/*
 * The Egypt guide's bibliography, shown in its "Fonti" view: the pages read while writing the
 * guide, grouped by entry of the index. `title` and `site` as the page gives them. Built from the
 * research notes in research/, which keep what each page was used for and what is still to
 * verify: when a note gains a page, add it here too. Covered so far: the Identità, Città, Natura
 * and Gastronomia chapters.
 */
export const sources: GuideSources = {
  [EgSection.Flag]: [
    {
      title: 'Constitution of the Arab Republic of Egypt (2014, rev. 2019), art. 223',
      site: 'Constitute Project',
      url: 'https://www.constituteproject.org/constitution/Egypt_2019',
    },
    {
      title: 'Egypt',
      site: 'Flags of the World',
      url: 'https://www.crwflags.com/fotw/flags/eg.html',
    },
    {
      title: 'Flags, Symbols & Currency of Egypt',
      site: 'WorldAtlas',
      url: 'https://www.worldatlas.com/articles/what-do-the-colors-and-symbols-of-the-flag-of-egypt-mean.html',
    },
    {
      title: 'Flag of Egypt',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Flag_of_Egypt',
    },
  ],
  [EgSection.CoatOfArms]: [
    {
      title: 'Egypt',
      site: 'Flags of the World',
      url: 'https://www.crwflags.com/fotw/flags/eg.html',
    },
    {
      title: 'Flags, Symbols & Currency of Egypt',
      site: 'WorldAtlas',
      url: 'https://www.worldatlas.com/articles/what-do-the-colors-and-symbols-of-the-flag-of-egypt-mean.html',
    },
    {
      title: 'Coat of arms of Egypt',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Coat_of_arms_of_Egypt',
    },
    {
      title: 'Eagle of Saladin',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Eagle_of_Saladin',
    },
    {
      title: 'Fortress of the Mountain',
      site: 'Saudi Aramco World',
      url: 'https://archive.aramcoworld.com/issue/199302/fortress.of.the.mountain.htm',
    },
  ],
  [Eg.Cairo]: [
    {
      title: 'Cairo, Egypt',
      site: 'Rough Guides',
      url: 'https://www.roughguides.com/egypt/cairo/',
    },
    {
      title: 'Bab Zuwayla',
      site: 'Egypt’s Monuments (Ministry of Tourism and Antiquities)',
      url: 'https://egymonuments.gov.eg/en/monuments/bab-zuwayla/',
    },
    {
      title: 'Baron Empain Palace',
      site: 'Egypt’s Monuments (Ministry of Tourism and Antiquities)',
      url: 'https://egymonuments.gov.eg/en/monuments/baron-empain-palace/',
    },
    {
      title: 'Historical Cairo',
      site: 'Egypt’s Monuments (Ministry of Tourism and Antiquities)',
      url: 'https://egymonuments.gov.eg/en/collections/historical-cairo/',
    },
    {
      title: 'Masjid al-Sultan al-Ashraf Qaytbay',
      site: 'Archnet',
      url: 'https://archnet.org/sites/2234',
    },
    {
      title: 'Qasaba Radwan Bey',
      site: 'Archnet',
      url: 'https://archnet.org/sites/2385',
    },
    {
      title: 'Street of the Tentmakers, Cairo (Egypt)',
      site: 'Textile Research Centre, Leiden',
      url: 'https://trc-leiden.nl/trc-needles/regional-traditions/middle-east-and-north-africa/pre-modern-middle-east-and-north-africa/street-of-the-tentmakers-cairo-egypt',
    },
    {
      title: 'St. Simon’s Monastery, the Coptic Zabbaleen cave church in Cairo',
      site: 'Slate (Atlas Obscura)',
      url: 'https://www.slate.com/blogs/atlas_obscura/2015/02/10/st_simon_s_monastery_the_cave_church_in_cairo.html',
    },
    {
      title: 'Tanoura Show at Wekalet El Ghouri: Tickets, Schedule & Tips',
      site: 'Pure Nile Tours',
      url: 'https://pureniletours.com/tanoura-show-at-wekalet-el-ghouri-cairo-guide/',
    },
    {
      title: 'Cairo',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Cairo',
    },
    {
      title: 'Mosque of Ibn Tulun',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Mosque_of_Ibn_Tulun',
    },
    {
      title: 'Bab Zuwayla',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Bab_Zuwayla',
    },
    {
      title: 'Funerary complex of Sultan Qaytbay',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Funerary_complex_of_Sultan_Qaytbay',
    },
    {
      title: 'Baron Empain Palace',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Baron_Empain_Palace',
    },
    {
      title: 'Wikala of al-Ghuri',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Wikala_of_al-Ghuri',
    },
    {
      title: 'Qasaba of Radwan Bey',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Qasaba_of_Radwan_Bey',
    },
    {
      title: 'Zabbaleen',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Zabbaleen',
    },
  ],
  [Eg.Alexandria]: [
    {
      title: 'Places to see',
      site: 'Bibliotheca Alexandrina',
      url: 'https://www.bibalex.org/ESOLEC2020/Home/StaticPage.aspx?page=110',
    },
    {
      title: 'Alexandria’s Cavafy Museum Opens to the Public After Two-Year Closure',
      site: 'Scene Now',
      url: 'https://scenenow.com/Buzz/Alexandria-s-Cavafy-Museum-Opens-to-the-Public-After-Two-Year-Closure',
    },
    {
      title: 'Missing Nostalgia in Alexandria',
      site: 'Stanford Humanities Center, Arcade',
      url: 'https://shc.stanford.edu/arcade/interventions/missing-nostalgia-alexandria',
    },
    {
      title: 'The great wine-press of love grows stale',
      site: 'The Irish Times',
      url: 'https://www.irishtimes.com/news/the-great-wine-press-of-love-grows-stale-1.144326',
    },
    {
      title: 'Alexandria',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Alexandria',
    },
    {
      title: 'Catacombs of Kom El Shoqafa',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Catacombs_of_Kom_El_Shoqafa',
    },
    {
      title: 'Pompey’s Pillar',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Pompey%27s_Pillar_(column)',
    },
    {
      title: 'Citadel of Qaitbay',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Citadel_of_Qaitbay',
    },
    {
      title: 'Qaitbay Fort',
      site: 'Egypt’s Monuments (Ministry of Tourism and Antiquities)',
      url: 'https://egymonuments.gov.eg/en/monuments/qaitbay-fort/',
    },
    {
      title: 'Abu al-Abbas al-Mursi Mosque',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Abu_al-Abbas_al-Mursi_Mosque',
    },
    {
      title: 'Mario Rossi (architect)',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Mario_Rossi_(architect)',
    },
    {
      title: 'Bibliotheca Alexandrina',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Bibliotheca_Alexandrina',
    },
    {
      title: 'Cavafy Museum',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Cavafy_Museum',
    },
  ],
  [Eg.Rosetta]: [
    {
      title: 'Rosetta (Rashid)',
      site: 'Rough Guides',
      url: 'https://roughguides.com/destinations/africa/egypt/alexandria-mediterranean-coast-delta/delta/rosetta-rashid',
    },
    {
      title: 'Outstanding Islamic And Ottoman Places In Rosetta',
      site: 'Travel2Egypt',
      url: 'https://travel2egypt.org/outstanding-islamic-and-ottoman-places-in-rosetta/',
    },
    {
      title: 'Rosetta',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Rosetta',
    },
    {
      title: 'Fort Julien',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Fort_Julien',
    },
  ],
  [Eg.Luxor]: [
    {
      title: 'Luxor, Egypt',
      site: 'Rough Guides',
      url: 'https://roughguides.com/egypt/nile-valley/upper-egypt/luxor',
    },
    {
      title: 'Luxor Temple',
      site: 'Egypt’s Monuments (Ministry of Tourism and Antiquities)',
      url: 'https://egymonuments.gov.eg/en/monuments/luxor-temple/',
    },
    {
      title: 'Highlights: Turin Strike Papyrus',
      site: 'Museo Egizio, Torino',
      url: 'https://collezionepapiri.museoegizio.it/en-GB/section/Papyrus-Collection/History-and-content/Highlights-Turin-Strike-Papyrus/',
    },
    {
      title: 'New Gourna Village',
      site: 'World Monuments Fund',
      url: 'https://wmf.org/projects/new-gourna-village',
    },
    {
      title: 'Searching for Tutankhamun: Howard Carter’s Hotel',
      site: 'Elizabeth Hawksley',
      url: 'https://elizabethhawksley.com/searching-for-tutankhamun-howard-carters-hotel/',
    },
    {
      title: 'Luxor',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Luxor',
    },
    {
      title: 'Great Hypostyle Hall',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Great_Hypostyle_Hall',
    },
    {
      title: 'Abu Haggag Mosque',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Abu_Haggag_Mosque',
    },
    {
      title: 'Colossi of Memnon',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Colossi_of_Memnon',
    },
    {
      title: 'Deir el-Medina',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Deir_el-Medina',
    },
    {
      title: 'Hassan Fathy',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Hassan_Fathy',
    },
    {
      title: 'Winter Palace Hotel',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Winter_Palace_Hotel',
    },
  ],
  [Eg.Aswan]: [
    {
      title: 'Agatha Christie Suite',
      site: 'Old Cataract, Aswan (Mandarin Oriental)',
      url: 'https://www.mandarinoriental.com/en/aswan/old-cataract/stay/agatha-christie-suite-nile-view',
    },
    {
      title: 'Aswan, Egypt',
      site: 'Rough Guides',
      url: 'https://roughguides.com/egypt/nile-valley/upper-egypt/aswan',
    },
    {
      title: 'Gateway on the Nile',
      site: 'Saudi Aramco World',
      url: 'https://archive.aramcoworld.com/issue/198505/gateway.on.the.nile.htm',
    },
    {
      title: 'The Unfinished Obelisk',
      site: 'Egypt’s Monuments (Ministry of Tourism and Antiquities)',
      url: 'https://egymonuments.gov.eg/en/monuments/the-unfinished-obelisk/',
    },
    {
      title: 'Daraw Camel Market – Different, Unique and Fascinating',
      site: 'Egypt Tours Plus',
      url: 'https://www.egypttoursplus.com/daraw-camel-market/',
    },
    {
      title: 'Gharb Suhayl, Egypt',
      site: 'UN Tourism, Best Tourism Villages',
      url: 'https://tourism-villages.unwto.org/en/villages/gharb-suhayl-egypt/',
    },
    {
      title: 'Aswan',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Aswan',
    },
    {
      title: 'Qubbet el-Hawa',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Qubbet_el-Hawa',
    },
    {
      title: 'Old Cataract Hotel',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Old_Cataract_Hotel',
    },
    {
      title: 'Philae temple complex',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Philae',
    },
    {
      title: 'Graffito of Esmet-Akhom',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Graffito_of_Esmet-Akhom',
    },
  ],
  [Eg.Siwa]: [
    {
      title: 'Gebel al Mawta Siwa – Mountain of Dead Tombs',
      site: 'Memphis Tours',
      url: 'https://www.memphistours.com/Egypt/WikiTravel/the-western-desert-and-oases/wiki/Mountain-of-the-Dead',
    },
    {
      title: 'Siwa Oasis',
      site: 'Rough Guides',
      url: 'https://www.roughguides.com/egypt/siwa-oasis/',
    },
    {
      title: 'A Salty Desert Retreat',
      site: 'NASA Earth Observatory',
      url: 'https://earthobservatory.nasa.gov/images/151238/a-salty-desert-retreat',
    },
    {
      title: 'Siwa Oasis',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Siwa_Oasis',
    },
  ],
  [Eg.SharmElSheikh]: [
    {
      title: 'Sharm El Sheikh’s ‘Al Sahaba Mosque’ Blends Spirituality and Tourism',
      site: 'Egyptian Streets',
      url: 'https://egyptianstreets.com/2022/05/14/sharm-el-sheikhs-al-sahaba-mosque-blends-spirituality-and-tourism/',
    },
    {
      title: 'Can new mosque boost tourism in Egypt resort town?',
      site: 'Al-Monitor',
      url: 'https://www.al-monitor.com/originals/2017/04/egypt-sharm-sheikh-mosque-tourism-economy-sinai.html',
    },
    {
      title: 'Sharm El Sheikh, Egypt',
      site: 'Rough Guides',
      url: 'https://www.roughguides.com/egypt/sharm-el-sheikh/',
    },
    {
      title: 'Sharm El Sheikh',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Sharm_El_Sheikh',
    },
  ],
  [EgLandscape.WadiAlHitan]: [
    {
      title: 'Tour Egypt’s Valley of the Whales for a window onto the history of evolution',
      site: 'National Geographic',
      url: 'https://www.nationalgeographic.com/travel/article/tour-egypt-valley-of-the-whales-wadi-al-hitan',
    },
    {
      title: 'Whale Valley, Cetacea and Sirenia Eocene fossils of Wadi Al-Hitan',
      site: 'IUGS Geoheritage',
      url: 'https://iugs-geoheritage.org/?p=10712',
    },
    {
      title:
        'Hydrogeochemical evolution of inland lakes’ water: A study of major element geochemistry in the Wadi El Raiyan depression, Egypt',
      site: 'PubMed Central',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4642196/',
    },
    {
      title: 'Wadi El Rayan Falls',
      site: 'Wondermondo',
      url: 'https://www.wondermondo.com/wadi-el-rayan-falls/',
    },
    {
      title: 'Wadi al Hitan',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Wadi_Al-Hitan',
    },
    {
      title: 'Wadi El Rayan',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Wadi_El_Rayan',
    },
    {
      title: 'Lake El Rayan',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Lake_El_Rayan',
    },
  ],
  [EgLandscape.FirstCataract]: [
    {
      title: 'Gateway on the Nile',
      site: 'Saudi Aramco World',
      url: 'https://archive.aramcoworld.com/issue/198505/gateway.on.the.nile.htm',
    },
    {
      title: 'Kitchener Island',
      site: 'Frommer’s',
      url: 'https://www.frommers.com/destinations/aswan/attractions/kitchener-island',
    },
    {
      title: 'Cataracts of the Nile',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Cataracts_of_the_Nile',
    },
    {
      title: 'El Nabatat Island',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/El_Nabatat_Island',
    },
  ],
  [EgLandscape.SiwaWaters]: [
    {
      title: 'A Salty Desert Retreat',
      site: 'NASA Earth Observatory',
      url: 'https://earthobservatory.nasa.gov/images/151238/a-salty-desert-retreat',
    },
    {
      title: 'Egypt’s Siwa Salt Lakes: why you float instead of sinking',
      site: 'The Business Standard',
      url: 'https://www.tbsnews.net/explainer/egypts-siwa-salt-lakes-why-you-float-instead-sinking-1340691',
    },
    {
      title: 'Siwa Oasis',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Siwa_Oasis',
    },
    {
      title: 'Great Sand Sea',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Great_Sand_Sea',
    },
  ],
  [EgLandscape.WhiteDesert]: [
    {
      title: 'White rocks an eerie sight',
      site: 'Deseret News (Associated Press)',
      url: 'https://www.deseret.com/2003/9/14/19783295/white-rocks-an-eerie-sight/',
    },
    {
      title: 'The Black Desert: A Volcanic Wonder of the Bahariya Oasis',
      site: 'Egypt Fun Tours',
      url: 'https://egyptfuntours.com/?p=70398',
    },
    {
      title: 'The Black Desert',
      site: 'Flying Carpet Tours',
      url: 'https://www.flyingcarpettours.com/Attractions/Egypt-Attractions/Bahariya-Oasis/The-Black-Desert',
    },
    {
      title: 'White Desert National Park',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/White_Desert_National_Park',
    },
    {
      title: 'Black Desert (Egypt)',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Black_Desert_(Egypt)',
    },
    {
      title: 'Crystal Mountain (Egypt)',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Crystal_Mountain_(Egypt)',
    },
  ],
  [EgLandscape.SinaiMountains]: [
    {
      title: 'Saint Catherine’s Monastery and its surrounding area',
      site: 'Egypt’s Monuments (Ministry of Tourism and Antiquities)',
      url: 'https://egymonuments.gov.eg/en/world-heritage/saint-catherine-s-monastery-and-its-surrounding-area/',
    },
    {
      title: 'Mount Sinai',
      site: 'Sacred Land Film Project',
      url: 'https://sacredland.org/?p=900',
    },
    {
      title: 'Mount Sinai',
      site: 'Sacred Destinations',
      url: 'https://www.sacred-destinations.com/egypt/mount-sinai',
    },
    {
      title: 'Mount Sinai, Egypt',
      site: 'Rough Guides',
      url: 'https://www.roughguides.com/egypt/mount-sinai/',
    },
    {
      title: 'Mount Sinai',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Mount_Sinai',
    },
    {
      title: 'Saint Catherine’s Monastery',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Saint_Catherine%27s_Monastery',
    },
  ],
  [EgLandscape.GulfOfAqaba]: [
    {
      title: 'Ras Mohammed National Park',
      site: 'Key Biodiversity Areas',
      url: 'https://www.keybiodiversityareas.org/site/factsheet/6219',
    },
    {
      title: 'Nabq Protected Area',
      site: 'Key Biodiversity Areas',
      url: 'https://www.keybiodiversityareas.org/site/factsheet/6208',
    },
    {
      title: 'Ecology of Avicennia marina mangals along Gulf of Aqaba, South Sinai, Red Sea',
      site: 'Egyptian Journal of Aquatic Biology and Fisheries',
      url: 'https://ejabf.journals.ekb.eg/article_2063.html',
    },
    {
      title: 'Ras Muhammad National Park',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Ras_Muhammad_National_Park',
    },
    {
      title: 'Blue Hole (Red Sea)',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blue_Hole_(Red_Sea)',
    },
    {
      title: 'Nabq Protected Area',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Nabq_Protected_Area',
    },
    {
      title: 'Dead Sea Transform',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Dead_Sea_Transform',
    },
  ],
  [EgLandscape.RedSeaCoast]: [
    {
      title: 'Hurghada Archipelago',
      site: 'Key Biodiversity Areas',
      url: 'https://www.keybiodiversityareas.org/site/factsheet/6201',
    },
    {
      title: 'Samadai project',
      site: 'HEPCA',
      url: 'https://www.hepca.org/projects/conservation/samadai-project',
    },
    {
      title:
        'Spinner dolphin (Stenella longirostris) resting habitat in Samadai Reef (Egypt, Red Sea) protected through tourism management',
      site: 'Journal of the Marine Biological Association of the United Kingdom',
      url: 'https://www.cambridge.org/core/journals/journal-of-the-marine-biological-association-of-the-united-kingdom/article/spinner-dolphin-stenella-longirostris-resting-habitat-in-samadai-reef-egypt-red-sea-protected-through-tourism-management/D1DF942800427CA5DD5AE41B9BFD5A9D',
    },
    {
      title: 'Abu Dabab Conservation Initiative',
      site: 'HEPCA',
      url: 'https://hepca.org/news/abu-dabab-conservation-initiative',
    },
    {
      title: '‘A very successful story’: An Egypt tribe welcomes tourists & protects its coast',
      site: 'Mongabay',
      url: 'https://news.mongabay.com/2025/10/a-very-successful-story-an-egypt-tribe-welcomes-tourists-protects-its-coast/',
    },
    {
      title: 'Giftun Islands',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Giftun_Islands',
    },
    {
      title: 'Marsa Alam',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Marsa_Alam',
    },
    {
      title: 'Wadi El Gemal National Park',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Wadi_El_Gemal_National_Park',
    },
  ],
  [EgSection.FoodCommon]: [
    {
      title: 'The History of Koshari is as Rich as its Flavor',
      site: 'Egyptian Streets',
      url: 'https://egyptianstreets.com/2021/09/21/the-history-of-koshari-is-as-rich-as-its-flavor/',
    },
    {
      title:
        'Egyptian Koshari, kushari or koshary: A delicious mix of rice, lentils, pasta and cultures',
      site: 'Gulf News',
      url: 'https://gulfnews.com/food/egyptian-koshari-kushari-or-koshary-a-delicious-mix-of-rice-lentils-pasta-and-cultures-1.1638712028370',
    },
    {
      title: 'Everything You Ever Needed to Know About Mashed Fava Beans',
      site: 'Roads & Kingdoms',
      url: 'https://roadsandkingdoms.com/2018/ful-medames-cairo/',
    },
    {
      title: 'Fava Beans: Egypt’s Favorite Street Food',
      site: 'Nawaya, Google Arts & Culture',
      url: 'https://artsandculture.google.com/story/rgVh-ZvedqfAGw',
    },
    {
      title: 'Egypt’s beloved breakfast is a fava bean duo with ancient roots',
      site: 'NPR (KUNC)',
      url: 'https://www.kunc.org/2026-08-30/egypts-beloved-breakfast-is-a-fava-bean-duo-with-ancient-roots',
    },
    {
      title: 'Falafel or Taameya? Celebrating the Popular Dish’s Many Disguises',
      site: 'Egyptian Streets',
      url: 'https://egyptianstreets.com/2019/06/12/falafel-or-taameya-celebrating-the-popular-dishs-many-disguises-on-international-falafel-day/',
    },
    {
      title: 'A Mad Caliph: the Egyptian Ruler Who Hated (and Banned) Molokhia',
      site: 'Egyptian Streets',
      url: 'https://egyptianstreets.com/2020/02/14/a-mad-caliph-the-egyptian-ruler-who-hated-and-banned-molokkheya/',
    },
    { title: 'Mulukhiyah', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Mulukhiyah' },
    {
      title: 'Molokheya (Egyptian style)',
      site: 'SBS Food',
      url: 'https://www.sbs.com.au/food/recipe/molokheya-egyptian-style/mvbb1pymx',
    },
    {
      title: 'Molokhia (Egyptian Jute Mellow Soup)',
      site: 'Chez Nermine',
      url: 'https://cheznermine.com/2023/09/06/molokhia-egyptian-jute-mellow-soup-شوربة-الملوخية/',
    },
    {
      title: 'Flying Feteer: The Story of a Beloved Pastry',
      site: 'RAWI, Google Arts & Culture',
      url: 'https://artsandculture.google.com/story/EwUhrEn5ye9ypQ',
    },
    {
      title: 'Feteer meshaltet “Egyptian layered pastry”',
      site: 'Chef in disguise',
      url: 'https://chefindisguise.com/2015/02/03/feteer-meshaltet-egyptian-layered-pastry/',
    },
    { title: 'Om Ali', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Om_Ali' },
    {
      title: 'Celebrating Om Ali on Eat an Extra Dessert Day',
      site: 'Egyptian Streets',
      url: 'https://egyptianstreets.com/2021/09/04/celebrating-om-ali-on-eat-an-extra-dessert-day/',
    },
    {
      title: 'The Murderous History of Qatar’s Most Common Dessert',
      site: 'Vice',
      url: 'https://vice.com/en/article/the-murderous-history-of-qatars-most-common-dessert',
    },
    {
      title: 'The iftar table: Umm Ali and Kallaj Ramadan',
      site: 'The National',
      url: 'https://www.thenationalnews.com/lifestyle/food/the-iftar-table-umm-ali-and-kallaj-ramadan-1.37928',
    },
    {
      title: 'Egypt’s Coffeehouses',
      site: 'National Geographic',
      url: 'https://www.nationalgeographic.com/travel/article/egypts-coffeehouses',
    },
    {
      title: 'Women’s slow invasion of the ahwa',
      site: 'Daily News Egypt',
      url: 'https://www.dailynewsegypt.com/2007/07/14/womens-slow-invasion-of-the-ahwa/',
    },
    {
      title: 'Fishawy’s Café: Two Centuries of Tea',
      site: 'Saudi Aramco World',
      url: 'https://archive.aramcoworld.com/issue/199605/fishawy.s.caf.-two.centuries.of.tea.htm',
    },
    {
      title: 'The Drink That Unites All Egyptians',
      site: 'Egyptian Streets',
      url: 'https://egyptianstreets.com/2014/06/30/the-drink-that-unites-all-egyptians/',
    },
    {
      title: 'Upper Egypt wraps up its annual sugarcane harvest',
      site: 'The National',
      url: 'https://www.thenationalnews.com/mena/egypt/upper-egypt-wraps-up-its-annual-sugarcane-harvest-1.1229851',
    },
    {
      title: 'Stella (beer)',
      site: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Stella_(beer)',
    },
    {
      title: 'Egypt’s beer industry toasts long history',
      site: 'Al-Monitor',
      url: 'https://www.al-monitor.com/originals/2014/10/beer-egypt-stella-heineken-pyramids.html',
    },
    {
      title: 'Egypt’s Stella Beer: Celebrating 120 Years (1897 – 2017)',
      site: 'Photorientalist',
      url: 'https://photorientalist.org/?p=2279',
    },
    {
      title: 'Stella Beer Caught in the Ebb and Flow of Egyptian History',
      site: 'Photorientalist',
      url: 'https://www.photorientalist.org/?p=1843',
    },
    {
      title: 'Omar Foda, Egypt’s Beer: Stella, Identity and the Modern State',
      site: 'Jadaliyya',
      url: 'https://www.jadaliyya.com/Details/40353',
    },
    {
      title: 'OPA sur la Stella',
      site: 'Afrik.com',
      url: 'https://www.afrik.com/opa-sur-la-stella',
    },
    {
      title: 'Following the Sinai Trail the Bedouin way',
      site: 'The National',
      url: 'https://www.thenationalnews.com/lifestyle/travel/following-the-sinai-trail-the-bedouin-way-1.219309',
    },
    {
      title: 'What I learned on an off-grid camping trip with Egypt’s Bedouin',
      site: 'National Geographic',
      url: 'https://www.nationalgeographic.com/travel/article/off-grid-camping-trip-with-jebeliya-bedouins-egypts',
    },
    {
      title: 'Bedouin Herbalism: Abundance in the Desert',
      site: 'Atmos',
      url: 'https://atmos.earth/bedouin-herbalism/',
    },
  ],
  [EgSection.FoodLowerEgypt]: [
    { title: 'Sayadieh', site: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Sayadieh' },
    {
      title: 'What to Eat in Alexandria, Egypt: 5 Iconic Dishes',
      site: 'Sunheron',
      url: 'https://sunheron.com/blog/cuisine/what-to-eat-in-alexandria/',
    },
    {
      title: 'Sayadiah (Egyptian Fish and Seafood Rice)',
      site: 'Chez Nermine',
      url: 'https://cheznermine.com/2022/06/07/ruz-sayadeya-egyptian-seafood-rice/',
    },
    {
      title: 'Sayadieh (Jaffa-Style Fish Over Rice)',
      site: 'Asif',
      url: 'https://asif.org/en/recipes/sayadieh-jaffa-style-fish-over-rice/',
    },
    {
      title: 'Sayadieh: The Classic Fish and Rice Dish Of the Levant',
      site: 'Arab America',
      url: 'https://arabamerica.com/sayadieh-the-classic-fish-and-rice-dish-of-the-levant',
    },
  ],
  [EgSection.FoodUpperEgypt]: [
    {
      title: 'Eish Shamsi: Egypt’s Sun-kissed Bread',
      site: 'Nawaya, Google Arts & Culture',
      url: 'https://artsandculture.google.com/story/DgURdvKJqoFmIA',
    },
    {
      title: 'Shamsi Bread',
      site: 'Fondazione Slow Food, Arca del Gusto',
      url: 'https://www.fondazioneslowfood.com/en/ark-of-taste-slow-food/shamsi-bread/',
    },
    {
      title: '‘Aish: An Assortment of Bread Types from Egypt',
      site: 'Egyptian Streets',
      url: 'https://egyptianstreets.com/2022/08/22/aish-an-assortment-of-bread-types-from-egypt/',
    },
    {
      title: 'Ruby Red: How Karkade Became a Signature Egyptian Tea',
      site: 'Egyptian Streets',
      url: 'https://egyptianstreets.com/2022/08/15/ruby-red-how-karkade-became-a-signature-egyptian-tea/',
    },
    {
      title: 'The Red Tea of Egypt',
      site: 'Saudi Aramco World',
      url: 'https://archive.aramcoworld.com/issue/200105/the.red.tea.of.egypt.htm',
    },
    {
      title: 'Karkadè: The crimson taste of the Nile',
      site: 'Pilgrimaps',
      url: 'https://www.pilgrimaps.com/karkade-the-crimson-taste-of-the-nile/',
    },
  ],
  [EgSection.FoodWesternDesert]: [
    {
      title: 'Dates production System in Siwa Oasis, Egypt',
      site: 'FAO, GIAHS',
      url: 'https://www.fao.org/giahs/giahs-around-the-world/egypt-siwa-oasis-dates-system/en',
    },
    {
      title: 'Siwa Oasis Dates',
      site: 'Fondazione Slow Food, Presìdi',
      url: 'https://www.fondazioneslowfood.com/en/slow-food-presidia/siwa-oasis-dates/',
    },
    {
      title:
        'Egypt outlines date sector strategy and 20% global production share at 9th International Egyptian Dates Festival',
      site: 'Daily News Egypt',
      url: 'https://www.dailynewsegypt.com/?p=855189',
    },
  ],
  [EgSection.FoodRedSea]: [
    {
      title: 'Inside Egypt’s Gabbana Coffee Culture',
      site: 'Nawaya, Google Arts & Culture',
      url: 'https://artsandculture.google.com/story/HwWRwLIhCt19OA',
    },
    { title: 'Meet The Ababda', site: 'MarsaAlam.com', url: 'https://marsaalam.com/?p=24838' },
    {
      title: '«A very successful story»: An Egypt tribe welcomes tourists & protects its coast',
      site: 'Mongabay',
      url: 'https://news.mongabay.com/2025/10/a-very-successful-story-an-egypt-tribe-welcomes-tourists-protects-its-coast/',
    },
  ],
}
