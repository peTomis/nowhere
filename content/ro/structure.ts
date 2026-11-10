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
}

const { Dobruja, Moldavia, Transylvania, Wallachia } = Ro
const all = [Transylvania, Wallachia, Moldavia, Dobruja]
const bc1 = { century: -1 }

export const structure = defineGuide<Ro, RoSection>({
  country: 'ro',
  regions: [
    { id: Dobruja, cities: [] },
    { id: Moldavia, cities: [] },
    { id: Transylvania, cities: [] },
    { id: Wallachia, cities: [] },
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
    { id: RoSection.Principalities, level: 2, on: all, period: { from: 1003, to: 1395 } },
    { id: RoSection.LateMiddleAges, level: 2, on: all, period: { from: 1416, to: 1538 } },

    {
      id: RoSection.OttomanSuzerainty,
      level: 2,
      on: all,
      period: { from: 1541, to: 1688 },
      verify: 'its last event (Apafi, 1661–1690) ends after 1688',
    },
    {
      id: RoSection.OttomanSuzeraintyTransylvania,
      level: 3,
      on: [Transylvania],
      period: { from: 1608, to: 1686 },
      verify: 'its last event (Apafi, 1661–1690) ends after 1686',
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
      period: { from: 1606, to: 1680 },
      verify: 'its last event is 1659; 1680 comes from the Context 1660–1680',
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
      period: { from: 1709, to: 1818 },
    },
    {
      id: RoSection.ThreeEmpiresDobruja,
      level: 3,
      on: [Dobruja],
      period: { from: 1775, to: 1812 },
    },
  ],
})
