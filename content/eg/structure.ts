import { defineGuide } from '@/content/types'

/*
 * Structure of the Egypt guide: the same in every language (docs/data-model.md §2). Texts are in
 * it/names.ts (short) and it/guide.tsx (body). A draft: the Identità, Natura (research/nature/)
 * and Gastronomia (research/food/) chapters are written; the country sheet and the album plan are
 * in research/.
 */

/**
 * Regions and cities (docs/data-model.md §4, research/country-sheet.md §2 and §10). The values are
 * stored in readers' browsers by the trip filter: don't rename them once published. Regions in
 * the sheet's order, down the Nile and then the lands around it: the album's pages follow it.
 */
export enum Eg {
  // regions
  LowerEgypt = 'eg.lower-egypt',
  UpperEgypt = 'eg.upper-egypt',
  Nubia = 'eg.nubia',
  WesternDesert = 'eg.western-desert',
  Sinai = 'eg.sinai',
  RedSea = 'eg.red-sea',
  // cities
  Cairo = 'eg.cairo',
  Alexandria = 'eg.alexandria',
  Rosetta = 'eg.rosetta',
  Luxor = 'eg.luxor',
  Aswan = 'eg.aswan',
  Siwa = 'eg.siwa',
  SharmElSheikh = 'eg.sharm-el-sheikh',
}

/** Chapters, parts and titled timelines: index entries and URL anchors (`eg.section.` dropped). */
export enum EgSection {
  /** Chapter 1, Identità. */
  Emblems = 'eg.section.emblems',
  Flag = 'eg.section.emblems.flag',
  CoatOfArms = 'eg.section.emblems.coat-of-arms',
  /** Chapter 5, Natura: its entries in the index are the landscape cards. */
  Nature = 'eg.section.nature',
  /** Chapter 6, Gastronomia. */
  Food = 'eg.section.food',
  FoodCommon = 'eg.section.food.common',
  FoodLowerEgypt = 'eg.section.food.lower-egypt',
  FoodUpperEgypt = 'eg.section.food.upper-egypt',
  FoodWesternDesert = 'eg.section.food.western-desert',
  FoodRedSea = 'eg.section.food.red-sea',
}

/** Traces of the album: stored with the reader's photos, never rename them. */
export enum EgTrace {
  // Gastronomia, whole country
  FoodKoshari = 'eg.place.food-koshari',
  FoodFulMedames = 'eg.place.food-ful-medames',
  FoodTaameya = 'eg.place.food-taameya',
  FoodMolokhia = 'eg.place.food-molokhia',
  FoodFeteer = 'eg.place.food-feteer',
  FoodOmAli = 'eg.place.food-om-ali',
  FoodAhwaTea = 'eg.place.food-ahwa-tea',
  FoodSugarcaneJuice = 'eg.place.food-sugarcane-juice',
  FoodStella = 'eg.place.food-stella',
  // Natura and Gastronomia, by region
  WadiAlHitan = 'eg.place.wadi-al-hitan',
  WadiElRayan = 'eg.place.wadi-el-rayan',
  FoodSayadeya = 'eg.place.food-sayadeya',
  FeluccaCataract = 'eg.place.felucca-cataract',
  BotanicalIsland = 'eg.place.botanical-island',
  FoodEishShamsi = 'eg.place.food-eish-shamsi',
  FoodKarkade = 'eg.place.food-karkade',
  SaltLakes = 'eg.place.salt-lakes',
  CleopatrasSpring = 'eg.place.cleopatras-spring',
  WhiteDesert = 'eg.place.white-desert',
  BlackDesert = 'eg.place.black-desert',
  CrystalMountain = 'eg.place.crystal-mountain',
  FoodSiwaDates = 'eg.place.food-siwa-dates',
  StCatherinesMonastery = 'eg.place.st-catherines-monastery',
  MountSinai = 'eg.place.mount-sinai',
  RasMohammed = 'eg.place.ras-mohammed',
  BlueHole = 'eg.place.blue-hole',
  NabqMangroves = 'eg.place.nabq-mangroves',
  Giftun = 'eg.place.giftun',
  AbuDabbab = 'eg.place.abu-dabbab',
  Samadai = 'eg.place.samadai',
  WadiElGemal = 'eg.place.wadi-el-gemal',
  FoodJabana = 'eg.place.food-jabana',
}

/** Landscape cards, in the Natura chapter (their order is the index's). */
export enum EgLandscape {
  WadiAlHitan = 'eg.landscape.wadi-al-hitan',
  FirstCataract = 'eg.landscape.first-cataract',
  SiwaWaters = 'eg.landscape.siwa-waters',
  WhiteDesert = 'eg.landscape.white-desert',
  SinaiMountains = 'eg.landscape.sinai-mountains',
  GulfOfAqaba = 'eg.landscape.gulf-of-aqaba',
  RedSeaCoast = 'eg.landscape.red-sea-coast',
}

/** Food cards ("Specialità"), in the Gastronomia chapter. */
export enum EgFood {
  Koshari = 'eg.food.koshari',
  FulMedames = 'eg.food.ful-medames',
  Taameya = 'eg.food.taameya',
  Molokhia = 'eg.food.molokhia',
  Feteer = 'eg.food.feteer',
  OmAli = 'eg.food.om-ali',
  Tea = 'eg.food.tea',
  SugarcaneJuice = 'eg.food.sugarcane-juice',
  Stella = 'eg.food.stella',
  Sayadeya = 'eg.food.sayadeya',
  EishShamsi = 'eg.food.eish-shamsi',
  Karkade = 'eg.food.karkade',
  SiwaDates = 'eg.food.siwa-dates',
  Jabana = 'eg.food.jabana',
}

const { LowerEgypt, UpperEgypt, Nubia, WesternDesert, Sinai, RedSea } = Eg

export const structure = defineGuide<Eg, EgSection>({
  country: 'eg',
  cover: {
    src: '/guides/egypt/cover.jpg',
    credit: {
      author: 'Ricardo Liberato',
      license: 'CC BY-SA 2.0',
      url: 'https://commons.wikimedia.org/wiki/File:All_Gizah_Pyramids.jpg',
    },
  },
  /** Country name and nowhere logo on the cover. */
  coverInk: 'var(--color-text)',
  // Traces 02 and 03 of the album, shown in the Identità chapter.
  emblems: [
    {
      kind: 'coat-of-arms',
      src: '/guides/egypt/coat-of-arms.png',
      // The Eagle of Saladin, official version (gold and white), rendered from the Commons SVG.
      credit: {
        author: 'Wikimedia Commons',
        license: 'Public domain',
        url: 'https://commons.wikimedia.org/wiki/File:Coat_of_arms_of_Egypt_(Official).svg',
      },
      width: 480,
      height: 652,
    },
    {
      kind: 'flag',
      src: '/guides/egypt/flag.svg',
      credit: {
        author: 'Wikimedia Commons',
        license: 'Public domain',
        url: 'https://commons.wikimedia.org/wiki/File:Flag_of_Egypt.svg',
      },
      width: 72,
      height: 48,
    },
  ],
  regions: [
    { id: LowerEgypt, cities: [Eg.Cairo, Eg.Alexandria, Eg.Rosetta] },
    { id: UpperEgypt, cities: [Eg.Luxor, Eg.Aswan] },
    { id: Nubia, cities: [] },
    { id: WesternDesert, cities: [Eg.Siwa] },
    { id: Sinai, cities: [Eg.SharmElSheikh] },
    { id: RedSea, cities: [] },
  ],
  sections: [
    { id: EgSection.Emblems, level: 1, chapter: 'identity', on: 'always' },
    { id: EgSection.Flag, level: 2, on: 'always' },
    { id: EgSection.CoatOfArms, level: 2, on: 'always' },
    {
      id: EgSection.Nature,
      level: 1,
      chapter: 'nature',
      on: [LowerEgypt, UpperEgypt, WesternDesert, Sinai, RedSea],
    },
    { id: EgSection.Food, level: 1, chapter: 'food', on: 'always' },
    { id: EgSection.FoodCommon, level: 2, on: 'always' },
    { id: EgSection.FoodLowerEgypt, level: 2, on: [LowerEgypt] },
    { id: EgSection.FoodUpperEgypt, level: 2, on: [UpperEgypt] },
    { id: EgSection.FoodWesternDesert, level: 2, on: [WesternDesert] },
    { id: EgSection.FoodRedSea, level: 2, on: [RedSea] },
  ],
  // Stock images: Wikimedia Commons and Flickr, 960x720 WebP (research/food/images.md,
  // research/nature/images.md).
  traces: [
    // Gastronomia, whole country: traces anywhere (the album's first page).
    {
      id: EgTrace.FoodKoshari,
      where: 'anywhere',
      rarity: 'common',
      icon: 'bowl',
      image: {
        src: '/guides/egypt/traces/food-koshari.webp',
        credit: {
          author: 'Fred Cherrygarden',
          license: 'CC BY-SA 4.0',
          url: 'https://commons.wikimedia.org/wiki/File:Koshary_in_Khan_el_Khalili.jpg',
        },
      },
    },
    {
      id: EgTrace.FoodFulMedames,
      where: 'anywhere',
      rarity: 'common',
      icon: 'pot',
      image: {
        src: '/guides/egypt/traces/food-ful-medames.webp',
        credit: {
          author: 'David Stanley',
          license: 'CC BY 2.0',
          url: 'https://commons.wikimedia.org/wiki/File:Fuul_(8578194078).jpg',
        },
      },
    },
    {
      id: EgTrace.FoodTaameya,
      where: 'anywhere',
      rarity: 'common',
      icon: 'fork',
      image: {
        src: '/guides/egypt/traces/food-taameya.webp',
        credit: {
          author: 'Mohamed Shokry Algarnosy',
          license: 'CC BY-SA 4.0',
          url: 'https://commons.wikimedia.org/wiki/File:%D8%A7%D9%84%D8%B7%D8%B9%D9%85%D9%8A%D8%A9_%D9%85%D8%AD%D9%85%D8%AF_%D8%B4%D9%83%D8%B1%D9%8A_%D8%A7%D9%84%D8%AC%D8%B1%D9%86%D9%88%D8%B3%D9%8A_2.jpg',
        },
      },
    },
    {
      id: EgTrace.FoodMolokhia,
      where: 'anywhere',
      rarity: 'common',
      icon: 'bowl',
      image: {
        src: '/guides/egypt/traces/food-molokhia.webp',
        credit: {
          author: "Habib M'henni",
          license: 'CC BY-SA 3.0',
          url: 'https://commons.wikimedia.org/wiki/File:Molokheya_Egypt,_2012.JPG',
        },
      },
    },
    {
      id: EgTrace.FoodFeteer,
      where: 'anywhere',
      rarity: 'common',
      icon: 'bread',
      image: {
        src: '/guides/egypt/traces/food-feteer.webp',
        credit: {
          author: 'Mohamed Ouda',
          license: 'CC BY-SA 4.0',
          url: 'https://commons.wikimedia.org/wiki/File:Egyptian-food-16.jpg',
        },
      },
    },
    {
      id: EgTrace.FoodOmAli,
      where: 'anywhere',
      rarity: 'common',
      icon: 'cake',
      image: {
        src: '/guides/egypt/traces/food-om-ali.webp',
        credit: {
          author: 'Miansari66',
          license: 'CC0',
          url: 'https://commons.wikimedia.org/wiki/File:Umm_Ali.JPG',
        },
      },
    },
    {
      id: EgTrace.FoodAhwaTea,
      where: 'anywhere',
      rarity: 'common',
      icon: 'drop',
      image: {
        src: '/guides/egypt/traces/food-ahwa-tea.webp',
        credit: {
          author: 'Esraa Mohamed Aita',
          license: 'CC BY-SA 4.0',
          url: 'https://commons.wikimedia.org/wiki/File:Egyptian_tea.jpg',
        },
      },
    },
    {
      id: EgTrace.FoodSugarcaneJuice,
      where: 'anywhere',
      rarity: 'common',
      icon: 'drop',
      image: {
        src: '/guides/egypt/traces/food-sugarcane-juice.webp',
        credit: {
          author: 'Gehad Gallo',
          license: 'CC BY-SA 4.0',
          url: 'https://commons.wikimedia.org/wiki/File:A_person_makes_cane_juice.jpg',
        },
      },
    },
    {
      id: EgTrace.FoodStella,
      where: 'anywhere',
      rarity: 'common',
      icon: 'beer',
      image: {
        src: '/guides/egypt/traces/food-stella.webp',
        credit: {
          author: 'Grand Parc – Bordeaux',
          license: 'CC BY-SA 2.0',
          url: 'https://commons.wikimedia.org/wiki/File:Dahab_-_Egypte_07-2012_(7614804284).jpg',
        },
      },
    },
    // Natura and Gastronomia, by region, in the order of the regions.
    // Natura, Basso Egitto: Wadi al-Hitan and Wadi el-Rayan (Fayyum).
    {
      id: EgTrace.WadiAlHitan,
      region: LowerEgypt,
      where: 'remote',
      at: [30.0439, 29.2708],
      rarity: 'rare',
      icon: 'paw',
      image: {
        src: '/guides/egypt/traces/wadi-al-hitan.webp',
        credit: {
          author: 'Khaled Mokhtar',
          license: 'CC BY-SA 4.0',
          url: 'https://commons.wikimedia.org/wiki/File:Valley_of_the_Whales_-_Wadi_al_Hitan_-_skeleton.jpg',
        },
      },
    },
    // The falls between the two lakes (OpenStreetMap node 13629748156).
    {
      id: EgTrace.WadiElRayan,
      region: LowerEgypt,
      where: 'remote',
      at: [30.4225, 29.2153],
      rarity: 'rare',
      icon: 'drop',
      image: {
        src: '/guides/egypt/traces/wadi-el-rayan.webp',
        credit: {
          author: 'Ibrahim El-Mezayen',
          license: 'CC BY-SA 4.0',
          url: 'https://commons.wikimedia.org/wiki/File:Waterfalls_of_Wadi_El_Rayan,_Fayoum,_Egypt.jpg',
        },
      },
    },
    {
      id: EgTrace.FoodSayadeya,
      region: LowerEgypt,
      where: 'region',
      rarity: 'common',
      icon: 'fish',
      image: {
        src: '/guides/egypt/traces/food-sayadeya.webp',
        credit: {
          author: 'young shanahan',
          license: 'CC BY 2.0',
          url: 'https://commons.wikimedia.org/wiki/File:Fish_Sayadieh.jpg',
        },
      },
    },
    // Natura, Alto Egitto: the First Cataract (Wikidata), among the islands in front of Aswan.
    {
      id: EgTrace.FeluccaCataract,
      region: UpperEgypt,
      city: Eg.Aswan,
      where: 'city',
      at: [32.878, 24.078],
      rarity: 'common',
      icon: 'boat',
      image: {
        src: '/guides/egypt/traces/felucca-cataract.webp',
        credit: {
          author: 'LBM1948',
          license: 'CC BY-SA 4.0',
          url: 'https://commons.wikimedia.org/wiki/File:Asu%C3%A1n_1999_03.jpg',
        },
      },
    },
    {
      id: EgTrace.BotanicalIsland,
      region: UpperEgypt,
      city: Eg.Aswan,
      where: 'city',
      at: [32.8869, 24.0936],
      rarity: 'common',
      icon: 'tree',
      image: {
        src: '/guides/egypt/traces/botanical-island.webp',
        credit: {
          author: 'Marc Ryckaert (MJJR)',
          license: 'CC BY 3.0',
          url: 'https://commons.wikimedia.org/wiki/File:Aswan_Kitchener_Island_R01.jpg',
        },
      },
    },
    // TODO image: no freely licensed photograph of eish shamsi found (research/food/images.md).
    {
      id: EgTrace.FoodEishShamsi,
      region: UpperEgypt,
      where: 'region',
      rarity: 'rare',
      icon: 'bread',
    },
    {
      id: EgTrace.FoodKarkade,
      region: UpperEgypt,
      where: 'region',
      rarity: 'common',
      icon: 'flower',
      image: {
        src: '/guides/egypt/traces/food-karkade.webp',
        credit: {
          author: "Fearghal O'Nuallain",
          license: 'CC BY 2.0',
          url: 'https://commons.wikimedia.org/wiki/File:Karkady_-_Dried_Hibiscus_in_Aswan_souk.jpg',
        },
      },
    },
    // Natura, Deserto occidentale. The salt pools east of Siwa town (OpenStreetMap node 9276239217).
    {
      id: EgTrace.SaltLakes,
      region: WesternDesert,
      where: 'nearby',
      at: [25.6147, 29.204],
      rarity: 'common',
      icon: 'waves',
      image: {
        src: '/guides/egypt/traces/salt-lakes.webp',
        credit: {
          author: 'ولاء',
          license: 'Public domain',
          url: 'https://commons.wikimedia.org/wiki/File:Siwa_Salt_pools09.jpg',
        },
      },
    },
    // OpenStreetMap node 1894542597. Also a trace of the Cleopatra card, once it is written.
    {
      id: EgTrace.CleopatrasSpring,
      region: WesternDesert,
      where: 'nearby',
      at: [25.5501, 29.197],
      rarity: 'common',
      icon: 'drop',
      image: {
        src: '/guides/egypt/traces/cleopatras-spring.webp',
        credit: {
          author: 'Ahmed Emad Hamdy',
          license: 'CC BY-SA 4.0',
          url: 'https://commons.wikimedia.org/wiki/File:Cleopatra%27s_Pool_-_Spring_of_Juba.jpg',
        },
      },
    },
    // The "Mushroom" rock (Wikidata, OpenStreetMap node 8749969417).
    {
      id: EgTrace.WhiteDesert,
      region: WesternDesert,
      where: 'remote',
      at: [28.2004, 27.2773],
      rarity: 'rare',
      icon: 'mountains',
      image: {
        src: '/guides/egypt/traces/white-desert.webp',
        credit: {
          author: 'Vyacheslav Argenberg',
          license: 'CC BY 4.0',
          url: 'https://commons.wikimedia.org/wiki/File:White_Desert,_Egypt.jpg',
        },
      },
    },
    {
      id: EgTrace.BlackDesert,
      region: WesternDesert,
      where: 'remote',
      at: [28.7286, 28.1507],
      rarity: 'rare',
      icon: 'mountains',
      image: {
        src: '/guides/egypt/traces/black-desert.webp',
        credit: {
          author: 'Ahmedherz',
          license: 'CC BY-SA 4.0',
          url: 'https://commons.wikimedia.org/wiki/File:Black_Desert_in_Oasis_Bahriya.jpg',
        },
      },
    },
    {
      id: EgTrace.CrystalMountain,
      region: WesternDesert,
      where: 'remote',
      at: [28.4301, 27.6617],
      rarity: 'rare',
      icon: 'snowflake',
      image: {
        src: '/guides/egypt/traces/crystal-mountain.webp',
        credit: {
          author: 'Viktor Lazić',
          license: 'CC BY-SA 4.0',
          url: 'https://commons.wikimedia.org/wiki/File:Crystal_Mountain,_White_Desert,_Egypt_28.jpg',
        },
      },
    },
    {
      id: EgTrace.FoodSiwaDates,
      region: WesternDesert,
      where: 'region',
      rarity: 'common',
      icon: 'tree',
      image: {
        src: '/guides/egypt/traces/food-siwa-dates.webp',
        credit: {
          author: 'Michael Hermann',
          license: 'CC BY-SA 4.0',
          url: 'https://commons.wikimedia.org/wiki/File:Siwa_date_palm_orchards_01.JPG',
        },
      },
    },
    // Natura, Sinai.
    {
      id: EgTrace.StCatherinesMonastery,
      region: Sinai,
      where: 'remote',
      at: [33.9756, 28.5558],
      rarity: 'rare',
      icon: 'church',
      image: {
        src: '/guides/egypt/traces/st-catherines-monastery.webp',
        credit: {
          author: 'Berthold Werner',
          license: 'CC BY-SA 3.0',
          url: 'https://commons.wikimedia.org/wiki/File:Katharinenkloster_Sinai_BW_2.jpg',
        },
      },
    },
    {
      id: EgTrace.MountSinai,
      region: Sinai,
      where: 'remote',
      at: [33.9752, 28.5384],
      rarity: 'rare',
      icon: 'steps',
      image: {
        src: '/guides/egypt/traces/mount-sinai.webp',
        credit: {
          author: 'Grand Parc – Bordeaux',
          license: 'CC BY 2.0',
          url: 'https://commons.wikimedia.org/wiki/File:Lever_de_soleil_Mont_Sina%C3%AF_Egypte_-_Sunrise_Mount_Sinai_Egypt_-_Photo_image_picture_(12859772904).jpg',
        },
      },
    },
    {
      id: EgTrace.RasMohammed,
      region: Sinai,
      where: 'nearby',
      at: [34.2097, 27.7694],
      rarity: 'common',
      icon: 'fish',
      image: {
        src: '/guides/egypt/traces/ras-mohammed.webp',
        credit: {
          author: 'patano',
          license: 'CC BY-SA 3.0',
          url: 'https://commons.wikimedia.org/wiki/File:Ras_Mohammed_-_panoramio_(2).jpg',
        },
      },
    },
    // OpenStreetMap node 663869869.
    {
      id: EgTrace.BlueHole,
      region: Sinai,
      where: 'nearby',
      at: [34.5374, 28.5723],
      rarity: 'rare',
      icon: 'waves',
      image: {
        src: '/guides/egypt/traces/blue-hole.webp',
        credit: {
          author: 'Petar Milošević',
          license: 'CC BY-SA 4.0',
          url: 'https://commons.wikimedia.org/wiki/File:Blue_Whole,_Dahab.jpg',
        },
      },
    },
    // The protected area as a whole (Wikidata): the mangroves line some 7 km of its shore.
    {
      id: EgTrace.NabqMangroves,
      region: Sinai,
      where: 'nearby',
      at: [34.38, 28.278],
      rarity: 'rare',
      icon: 'tree',
      image: {
        src: '/guides/egypt/traces/nabq-mangroves.webp',
        credit: {
          author: 'Hatem Moushir',
          license: 'CC BY-SA 3.0',
          url: 'https://commons.wikimedia.org/wiki/File:Avicennia_marina_-_Nabq_by_Hatem_Moushir_6.JPG',
        },
      },
    },
    // Natura, Mar Rosso.
    {
      id: EgTrace.Giftun,
      region: RedSea,
      where: 'nearby',
      at: [33.9502, 27.2021],
      rarity: 'common',
      icon: 'beach',
      image: {
        src: '/guides/egypt/traces/giftun.webp',
        credit: {
          author: 'E v Schoonhoven',
          license: 'CC BY 3.0',
          url: 'https://commons.wikimedia.org/wiki/File:Giftun_Island_Egypte_-_panoramio.jpg',
        },
      },
    },
    {
      id: EgTrace.AbuDabbab,
      region: RedSea,
      where: 'nearby',
      at: [34.74, 25.3389],
      rarity: 'common',
      icon: 'paw',
      image: {
        src: '/guides/egypt/traces/abu-dabbab.webp',
        credit: {
          author: 'Jan Beránek',
          license: 'CC BY-SA 3.0',
          url: 'https://commons.wikimedia.org/wiki/File:Turtle_in_Abu_Dabbab,_Marsa_Alam,_Egypt_-_05.jpg',
        },
      },
    },
    // The reef (OpenStreetMap way 454976411).
    {
      id: EgTrace.Samadai,
      region: RedSea,
      where: 'nearby',
      at: [35.0017, 24.9886],
      rarity: 'rare',
      icon: 'boat',
      image: {
        src: '/guides/egypt/traces/samadai.webp',
        credit: {
          author: 'Sunphol Sorakul',
          license: 'CC BY 2.0',
          url: 'https://commons.wikimedia.org/wiki/File:Spinners.png',
        },
      },
    },
    // The national park (Wikidata).
    {
      id: EgTrace.WadiElGemal,
      region: RedSea,
      where: 'remote',
      at: [35.0487, 24.3521],
      rarity: 'rare',
      icon: 'mountains',
      image: {
        src: '/guides/egypt/traces/wadi-el-gemal.webp',
        credit: {
          author: 'Panegyrics of Granovetter',
          license: 'CC BY-SA 2.0',
          url: 'https://commons.wikimedia.org/wiki/File:27057-_Wadi_el_Gemal_landscape.jpg',
        },
      },
    },
    {
      id: EgTrace.FoodJabana,
      region: RedSea,
      where: 'region',
      rarity: 'rare',
      icon: 'jar',
      image: {
        src: '/guides/egypt/traces/food-jabana.webp',
        credit: {
          author: 'Hossam el-Hamalawy',
          license: 'CC BY 2.0',
          url: 'https://www.flickr.com/photos/87153545@N00/4805296229',
        },
      },
    },
  ],
  cards: [
    {
      id: EgLandscape.WadiAlHitan,
      kind: 'landscape',
      region: LowerEgypt,
      on: [LowerEgypt],
      traces: [EgTrace.WadiAlHitan, EgTrace.WadiElRayan],
    },
    {
      id: EgLandscape.FirstCataract,
      kind: 'landscape',
      region: UpperEgypt,
      on: [UpperEgypt],
      traces: [EgTrace.FeluccaCataract, EgTrace.BotanicalIsland],
    },
    {
      id: EgLandscape.SiwaWaters,
      kind: 'landscape',
      region: WesternDesert,
      on: [WesternDesert],
      traces: [EgTrace.SaltLakes, EgTrace.CleopatrasSpring],
    },
    {
      id: EgLandscape.WhiteDesert,
      kind: 'landscape',
      region: WesternDesert,
      on: [WesternDesert],
      traces: [EgTrace.WhiteDesert, EgTrace.BlackDesert, EgTrace.CrystalMountain],
    },
    {
      id: EgLandscape.SinaiMountains,
      kind: 'landscape',
      region: Sinai,
      on: [Sinai],
      traces: [EgTrace.StCatherinesMonastery, EgTrace.MountSinai],
    },
    {
      id: EgLandscape.GulfOfAqaba,
      kind: 'landscape',
      region: Sinai,
      on: [Sinai],
      traces: [EgTrace.RasMohammed, EgTrace.BlueHole, EgTrace.NabqMangroves],
    },
    {
      id: EgLandscape.RedSeaCoast,
      kind: 'landscape',
      region: RedSea,
      on: [RedSea],
      traces: [EgTrace.Giftun, EgTrace.AbuDabbab, EgTrace.Samadai, EgTrace.WadiElGemal],
    },
    { id: EgFood.Koshari, kind: 'food', on: 'always', traces: [EgTrace.FoodKoshari] },
    { id: EgFood.FulMedames, kind: 'food', on: 'always', traces: [EgTrace.FoodFulMedames] },
    { id: EgFood.Taameya, kind: 'food', on: 'always', traces: [EgTrace.FoodTaameya] },
    { id: EgFood.Molokhia, kind: 'food', on: 'always', traces: [EgTrace.FoodMolokhia] },
    { id: EgFood.Feteer, kind: 'food', on: 'always', traces: [EgTrace.FoodFeteer] },
    { id: EgFood.OmAli, kind: 'food', on: 'always', traces: [EgTrace.FoodOmAli] },
    { id: EgFood.Tea, kind: 'food', on: 'always', traces: [EgTrace.FoodAhwaTea] },
    {
      id: EgFood.SugarcaneJuice,
      kind: 'food',
      on: 'always',
      traces: [EgTrace.FoodSugarcaneJuice],
    },
    { id: EgFood.Stella, kind: 'food', on: 'always', traces: [EgTrace.FoodStella] },
    {
      id: EgFood.Sayadeya,
      kind: 'food',
      region: LowerEgypt,
      on: [LowerEgypt],
      traces: [EgTrace.FoodSayadeya],
    },
    {
      id: EgFood.EishShamsi,
      kind: 'food',
      region: UpperEgypt,
      on: [UpperEgypt],
      traces: [EgTrace.FoodEishShamsi],
    },
    {
      id: EgFood.Karkade,
      kind: 'food',
      region: UpperEgypt,
      on: [UpperEgypt],
      traces: [EgTrace.FoodKarkade],
    },
    {
      id: EgFood.SiwaDates,
      kind: 'food',
      region: WesternDesert,
      on: [WesternDesert],
      traces: [EgTrace.FoodSiwaDates],
    },
    {
      id: EgFood.Jabana,
      kind: 'food',
      region: RedSea,
      on: [RedSea],
      traces: [EgTrace.FoodJabana],
    },
  ],
})
