import type { GuideNames } from '@/content/types'
import { Ro, RoSection } from '../structure'

/** Italian names of the Romania guide's places and sections (index, titles, trip filter). */

const places: Record<Ro, string> = {
  [Ro.Dobruja]: 'Dobrogea',
  [Ro.Moldavia]: 'Moldavia',
  [Ro.Transylvania]: 'Transilvania',
  [Ro.Wallachia]: 'Valacchia',
  [Ro.Sibiu]: 'Sibiu',
  [Ro.Brasov]: 'Brașov',
  [Ro.Sighisoara]: 'Sighișoara',
  [Ro.Bucharest]: 'Bucarest',
  [Ro.Iasi]: 'Iași',
  [Ro.Suceava]: 'Suceava',
  [Ro.Constanta]: 'Constanța',
  [Ro.Tulcea]: 'Tulcea',
}

export const names: GuideNames<Ro, RoSection> = {
  places,
  sections: {
    [RoSection.Emblems]: 'La bandiera e lo stemma',
    [RoSection.Flag]: 'Bandiera',
    [RoSection.CoatOfArms]: 'Stemma',
    [RoSection.DaciaToPrincipalities]: 'Dalla Dacia ai principati',
    [RoSection.DaciaToHungarians]: 'Dalla Dacia agli Ungari',
    [RoSection.DaciaAndRome]: 'Dacia e Roma',
    [RoSection.MigrationPeriod]: 'Anni di passaggio',
    [RoSection.Principalities]: 'I principati',
    [RoSection.LateMiddleAges]: 'Il basso Medioevo',
    [RoSection.EarlyModern]: 'L’era moderna',
    [RoSection.OttomanSuzerainty]: 'Sotto la sovranità ottomana',
    [RoSection.OttomanSuzeraintyTransylvania]: places[Ro.Transylvania],
    [RoSection.OttomanSuzeraintyWallachia]: places[Ro.Wallachia],
    [RoSection.OttomanSuzeraintyMoldavia]: places[Ro.Moldavia],
    [RoSection.OttomanSuzeraintyDobruja]: places[Ro.Dobruja],
    [RoSection.ThreeEmpires]: 'Tra tre imperi',
    [RoSection.ThreeEmpiresTransylvania]: places[Ro.Transylvania],
    [RoSection.ThreeEmpiresWallachia]: places[Ro.Wallachia],
    [RoSection.ThreeEmpiresMoldavia]: places[Ro.Moldavia],
    [RoSection.ThreeEmpiresDobruja]: places[Ro.Dobruja],
  },
}
