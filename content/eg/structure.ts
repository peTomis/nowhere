import { defineGuide } from '@/content/types'

/*
 * Structure of the Egypt guide: the same in every language (docs/data-model.md §2). Texts are in
 * it/names.ts (short) and it/guide.tsx (body). A draft: only the Gastronomia chapter is written
 * (research/food/); the country sheet and the album plan are in research/.
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
  // Gastronomia, by region
  FoodSayadeya = 'eg.place.food-sayadeya',
  FoodEishShamsi = 'eg.place.food-eish-shamsi',
  FoodKarkade = 'eg.place.food-karkade',
  FoodSiwaDates = 'eg.place.food-siwa-dates',
  FoodJabana = 'eg.place.food-jabana',
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
    { id: EgSection.Food, level: 1, chapter: 'food', on: 'always' },
    { id: EgSection.FoodCommon, level: 2, on: 'always' },
    { id: EgSection.FoodLowerEgypt, level: 2, on: [LowerEgypt] },
    { id: EgSection.FoodUpperEgypt, level: 2, on: [UpperEgypt] },
    { id: EgSection.FoodWesternDesert, level: 2, on: [WesternDesert] },
    { id: EgSection.FoodRedSea, level: 2, on: [RedSea] },
  ],
  // Stock images: Wikimedia Commons and Flickr, 960x720 WebP (research/food/images.md).
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
    // Gastronomia, by region, in the order of the regions.
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
