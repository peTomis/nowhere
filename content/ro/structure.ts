import { defineGuide } from '@/content/types'

/*
 * Structure of the Romania guide: the same in every language (docs/data-model.md §2). Texts are
 * in it/names.ts (short) and it/guide.tsx (body).
 */

/**
 * Regions and cities (docs/data-model.md §4). The values are stored in readers' browsers by the
 * trip filter: don't rename them once published.
 */
export enum Ro {
  // regions
  Dobruja = 'ro.dobruja',
  Moldavia = 'ro.moldavia',
  Transylvania = 'ro.transylvania',
  Wallachia = 'ro.wallachia',
  // cities
  Sibiu = 'ro.sibiu',
  Brasov = 'ro.brasov',
  Sighisoara = 'ro.sighisoara',
  Bucharest = 'ro.bucharest',
  Targoviste = 'ro.targoviste',
  Iasi = 'ro.iasi',
  Suceava = 'ro.suceava',
  Constanta = 'ro.constanta',
  Tulcea = 'ro.tulcea',
}

/** Chapters, parts and titled timelines: index entries and URL anchors (`ro.section.` dropped). */
export enum RoSection {
  /** Chapter 1, Identità. */
  Emblems = 'ro.section.emblems',
  Flag = 'ro.section.emblems.flag',
  CoatOfArms = 'ro.section.emblems.coat-of-arms',
  /** Chapter 2, Timeline storica. */
  History = 'ro.section.history',
  DaciaToHungarians = 'ro.section.dacia-to-hungarians',
  DaciaAndRome = 'ro.section.dacia-and-rome',
  MigrationPeriod = 'ro.section.migration-period',
  Principalities = 'ro.section.principalities',
  LateMiddleAges = 'ro.section.late-middle-ages',
  OttomanSuzerainty = 'ro.section.ottoman-suzerainty',
  OttomanSuzeraintyTransylvania = 'ro.section.ottoman-suzerainty.transylvania',
  OttomanSuzeraintyWallachia = 'ro.section.ottoman-suzerainty.wallachia',
  OttomanSuzeraintyMoldavia = 'ro.section.ottoman-suzerainty.moldavia',
  OttomanSuzeraintyDobruja = 'ro.section.ottoman-suzerainty.dobruja',
  ThreeEmpires = 'ro.section.three-empires',
  ThreeEmpiresTransylvania = 'ro.section.three-empires.transylvania',
  ThreeEmpiresWallachia = 'ro.section.three-empires.wallachia',
  ThreeEmpiresMoldavia = 'ro.section.three-empires.moldavia',
  ThreeEmpiresDobruja = 'ro.section.three-empires.dobruja',
  /** Chapter 3, Personaggi. */
  People = 'ro.section.people',
}

/** Traces of the album: stored with the reader's photos, never rename them. */
export enum RoTrace {
  SarmizegetusaRegia = 'ro.place.sarmizegetusa-regia',
  DecebalusRockSculpture = 'ro.place.decebalus-rock-sculpture',
  TrajansColumnCopy = 'ro.place.trajans-column-copy',
  VladDraculHouse = 'ro.place.vlad-dracul-house',
  ChindiaTower = 'ro.place.chindia-tower',
  PoenariCitadel = 'ro.place.poenari-citadel',
  StephenTheGreatTomb = 'ro.place.stephen-the-great-tomb',
  StephenTheGreatEquestrianStatue = 'ro.place.stephen-the-great-equestrian-statue',
  MihaiVodaChurch = 'ro.place.mihai-voda-church',
  MichaelTheBraveObelisk = 'ro.place.michael-the-brave-obelisk',
  MichaelTheBraveHeadTomb = 'ro.place.michael-the-brave-head-tomb',
  MichaelTheBraveEquestrianStatue = 'ro.place.michael-the-brave-equestrian-statue',
  PelesCastle = 'ro.place.peles-castle',
  CurteaDeArgesRoyalTombs = 'ro.place.curtea-de-arges-royal-tombs',
  KingCarolIBridge = 'ro.place.king-carol-i-bridge',
  CarolIEquestrianStatue = 'ro.place.carol-i-equestrian-statue',
}

/** Persons with a card: stored with the reader's pins, never rename them. */
export enum RoPerson {
  Decebalus = 'ro.person.decebalus',
  VladTheImpaler = 'ro.person.vlad-the-impaler',
  StephenTheGreat = 'ro.person.stephen-the-great',
  MichaelTheBrave = 'ro.person.michael-the-brave',
  CarolI = 'ro.person.carol-i',
}

const { Dobruja, Moldavia, Transylvania, Wallachia } = Ro
const all = [Transylvania, Wallachia, Moldavia, Dobruja]
const bc1 = { century: -1 }

export const structure = defineGuide<Ro, RoSection>({
  country: 'ro',
  regions: [
    { id: Dobruja, cities: [] },
    { id: Moldavia, cities: [Ro.Suceava] },
    { id: Transylvania, cities: [Ro.Sighisoara] },
    { id: Wallachia, cities: [Ro.Bucharest, Ro.Targoviste] },
  ],
  sections: [
    { id: RoSection.Emblems, level: 1, chapter: 'identity', on: 'always' },
    { id: RoSection.Flag, level: 2, on: 'always' },
    { id: RoSection.CoatOfArms, level: 2, on: 'always' },

    {
      id: RoSection.History,
      level: 1,
      chapter: 'history',
      on: 'always',
      period: { from: bc1, to: 1818 },
    },
    { id: RoSection.DaciaToHungarians, level: 2, on: 'always', period: { from: bc1, to: 895 } },
    { id: RoSection.DaciaAndRome, level: 3, on: 'always', period: { from: bc1, to: 275 } },
    { id: RoSection.MigrationPeriod, level: 3, on: 'always', period: { from: 290, to: 895 } },
    { id: RoSection.Principalities, level: 2, on: all, period: { from: 971, to: 1395 } },
    { id: RoSection.LateMiddleAges, level: 2, on: all, period: { from: 1416, to: 1538 } },

    { id: RoSection.OttomanSuzerainty, level: 2, on: all, period: { from: 1541, to: 1688 } },
    {
      id: RoSection.OttomanSuzeraintyTransylvania,
      level: 3,
      on: [Transylvania],
      period: { from: 1613, to: 1686 },
    },
    {
      id: RoSection.OttomanSuzeraintyWallachia,
      level: 3,
      on: [Wallachia],
      period: { from: 1611, to: 1688 },
    },
    {
      id: RoSection.OttomanSuzeraintyMoldavia,
      level: 3,
      on: [Moldavia],
      period: { from: 1634, to: 1680 },
      verify: 'its last event is 1653; 1680 comes from the Context 1660–1680',
    },
    {
      id: RoSection.OttomanSuzeraintyDobruja,
      level: 3,
      on: [Dobruja],
      period: { from: 1541, to: 1688 },
      verify: 'only Contexts, no dated events: the dates come from their periods',
    },
    { id: RoSection.ThreeEmpires, level: 2, on: all, period: { from: 1688, to: 1818 } },
    {
      id: RoSection.ThreeEmpiresTransylvania,
      level: 3,
      on: [Transylvania],
      period: { from: 1688, to: 1792 },
    },
    {
      id: RoSection.ThreeEmpiresWallachia,
      level: 3,
      on: [Wallachia],
      period: { from: 1688, to: 1746 },
    },
    {
      id: RoSection.ThreeEmpiresMoldavia,
      level: 3,
      on: [Moldavia],
      period: { from: 1711, to: 1818 },
    },
    {
      id: RoSection.ThreeEmpiresDobruja,
      level: 3,
      on: [Dobruja],
      period: { from: 1775, to: 1812 },
    },

    { id: RoSection.People, level: 1, chapter: 'people', on: 'always' },
  ],
  traces: [
    {
      id: RoTrace.SarmizegetusaRegia,
      region: Transylvania,
      where: 'remote',
      rarity: 'rare',
      icon: 'wall',
    },
    {
      // Mehedinți county, on the Danube west of Orșova: historically Banat, which the trip filter
      // has no entry for; Wallachia is the region of the county's capital today.
      id: RoTrace.DecebalusRockSculpture,
      region: Wallachia,
      where: 'remote',
      rarity: 'rare',
      icon: 'mountains',
    },
    {
      id: RoTrace.TrajansColumnCopy,
      region: Wallachia,
      city: Ro.Bucharest,
      where: 'city',
      rarity: 'common',
      icon: 'frame',
    },
    {
      id: RoTrace.VladDraculHouse,
      region: Transylvania,
      city: Ro.Sighisoara,
      where: 'city',
      rarity: 'common',
      icon: 'house',
    },
    {
      id: RoTrace.ChindiaTower,
      region: Wallachia,
      city: Ro.Targoviste,
      where: 'city',
      rarity: 'common',
      icon: 'castle',
    },
    {
      id: RoTrace.PoenariCitadel,
      region: Wallachia,
      where: 'remote',
      rarity: 'rare',
      icon: 'steps',
    },
    // TODO image: freely licensed photograph of Stephen the Great’s tomb at Putna.
    // Sources: putna.ro/en/the-princely-church-the-monastic-complex;
    // arhiva.basilica.ro/en/uk-ambassador-to-romania-lays-flowers-to-tomb-of-st-stephen-the-great/
    {
      id: RoTrace.StephenTheGreatTomb,
      region: Moldavia,
      where: 'remote',
      rarity: 'common',
      icon: 'church',
    },
    // TODO image: licensed photograph, including rights clearance for the modern sculpture.
    // Sources: visitsuceava.ro/obiectiv-turistic/statuia-ecvestra-stefan-cel-mare/;
    // primariasv.ro/dm_suceava/site.nsf/pagini/obiective+turistice-0001223E
    {
      id: RoTrace.StephenTheGreatEquestrianStatue,
      region: Moldavia,
      city: Ro.Suceava,
      where: 'city',
      rarity: 'common',
      icon: 'shield',
    },
    // TODO image: freely licensed photograph of the Mihai Vodă church on Strada Sapienței.
    {
      id: RoTrace.MihaiVodaChurch,
      region: Wallachia,
      city: Ro.Bucharest,
      where: 'city',
      rarity: 'rare',
      icon: 'church',
    },
    // Near Turda (Cluj county), not a city of the guide. TODO image: licensed photograph of the
    // 1977 obelisk.
    {
      id: RoTrace.MichaelTheBraveObelisk,
      region: Transylvania,
      where: 'remote',
      rarity: 'rare',
      icon: 'pin',
    },
    // TODO image: freely licensed photograph of the Dealu monastery church.
    {
      id: RoTrace.MichaelTheBraveHeadTomb,
      region: Wallachia,
      where: 'nearby',
      rarity: 'rare',
      icon: 'church',
    },
    // TODO image: freely licensed photograph of the statue in Piața Universității (1874, out of
    // copyright).
    {
      id: RoTrace.MichaelTheBraveEquestrianStatue,
      region: Wallachia,
      city: Ro.Bucharest,
      where: 'city',
      rarity: 'common',
      icon: 'shield',
    },
    // Sinaia, Prahova valley: historically Wallachia. TODO image: freely licensed photograph.
    {
      id: RoTrace.PelesCastle,
      region: Wallachia,
      where: 'nearby',
      rarity: 'common',
      icon: 'castle',
    },
    // TODO image: freely licensed photograph of the tombs in the pronaos.
    {
      id: RoTrace.CurteaDeArgesRoyalTombs,
      region: Wallachia,
      where: 'remote',
      rarity: 'rare',
      icon: 'church',
    },
    // TODO image: freely licensed photograph of the bridge at Cernavodă.
    {
      id: RoTrace.KingCarolIBridge,
      region: Dobruja,
      where: 'remote',
      rarity: 'rare',
      icon: 'bridge',
    },
    // TODO image: licensed photograph, including rights clearance for the 2010 sculpture.
    {
      id: RoTrace.CarolIEquestrianStatue,
      region: Wallachia,
      city: Ro.Bucharest,
      where: 'city',
      rarity: 'common',
      icon: 'shield',
    },
  ],
  cards: [
    {
      id: RoPerson.Decebalus,
      kind: 'person',
      region: Transylvania,
      on: 'always',
      traces: [
        RoTrace.SarmizegetusaRegia,
        RoTrace.DecebalusRockSculpture,
        RoTrace.TrajansColumnCopy,
      ],
    },
    {
      id: RoPerson.VladTheImpaler,
      kind: 'person',
      region: Wallachia,
      on: [Wallachia, Transylvania],
      traces: [RoTrace.VladDraculHouse, RoTrace.ChindiaTower, RoTrace.PoenariCitadel],
    },
    {
      id: RoPerson.StephenTheGreat,
      kind: 'person',
      region: Moldavia,
      on: [Moldavia],
      traces: [RoTrace.StephenTheGreatTomb, RoTrace.StephenTheGreatEquestrianStatue],
    },
    {
      id: RoPerson.MichaelTheBrave,
      kind: 'person',
      region: Wallachia,
      on: [Wallachia, Transylvania],
      traces: [
        RoTrace.MihaiVodaChurch,
        RoTrace.MichaelTheBraveObelisk,
        RoTrace.MichaelTheBraveHeadTomb,
        RoTrace.MichaelTheBraveEquestrianStatue,
      ],
    },
    {
      id: RoPerson.CarolI,
      kind: 'person',
      region: Wallachia,
      on: [Wallachia, Dobruja],
      traces: [
        RoTrace.PelesCastle,
        RoTrace.CurteaDeArgesRoyalTombs,
        RoTrace.KingCarolIBridge,
        RoTrace.CarolIEquestrianStatue,
      ],
    },
  ],
})
