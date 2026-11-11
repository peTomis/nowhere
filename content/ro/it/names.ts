import type { GuideNames } from '@/content/types'
import { Ro, RoPerson, RoSection, RoTrace } from '../structure'

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
  [Ro.Targoviste]: 'Târgoviște',
  [Ro.Iasi]: 'Iași',
  [Ro.Suceava]: 'Suceava',
  [Ro.Constanta]: 'Constanța',
  [Ro.Tulcea]: 'Tulcea',
}

export const names: GuideNames<Ro, RoSection> = {
  places,
  sections: {
    // Chapters: their line in the summary (the titles are the same in every guide).
    [RoSection.Emblems]: 'Bandiera e stemma',
    [RoSection.Flag]: 'Bandiera',
    [RoSection.CoatOfArms]: 'Stemma',
    [RoSection.History]: 'Dalla Dacia ai tre imperi',
    [RoSection.DaciaToHungarians]: 'Dalla Dacia agli Ungari',
    [RoSection.DaciaAndRome]: 'Dacia e Roma',
    [RoSection.MigrationPeriod]: 'Anni di passaggio',
    [RoSection.Principalities]: 'I principati',
    [RoSection.LateMiddleAges]: 'Il basso Medioevo',
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
    [RoSection.People]: 'I volti della storia romena',
  },
  traces: {
    [RoTrace.SarmizegetusaRegia]: {
      name: 'Sarmizegetusa Regia',
      place: `Monti Orăștie, ${places[Ro.Transylvania]}`,
      text: 'La capitale di Decebalo, a mille metri d’altezza tra i boschi: mura della cittadella, strada lastricata e, nella zona sacra, le basi delle colonne dei templi, il grande santuario circolare e il disco di andesite detto «Sole».',
      find: 'Grădiștea de Munte, distretto di Hunedoara. Da Orăștie si sale per Costești lungo la valle del fiume Grădiștea fino al parcheggio, poi un tratto a piedi nel bosco. Chiusa in inverno.',
    },
    [RoTrace.DecebalusRockSculpture]: {
      name: 'Il volto di Decebalo',
      local: 'Chipul lui Decebal',
      place: 'Cazanele Dunării, distretto di Mehedinți',
      text: 'Un volto scolpito nella roccia sulla riva del Danubio, alto più di 40 metri, fatto fra il 1994 e il 2004 per volere dell’imprenditore Iosif Constantin Drăgan. Sotto si legge DECEBALUS REX – DRAGAN FECIT.',
      find: 'Sulla strada lungo il Danubio da Orșova verso Dubova, poco prima del golfo di Mraconia: si vede dalla riva, meglio dalle barche che partono da Orșova e Dubova.',
    },
    [RoTrace.TrajansColumnCopy]: {
      name: 'La copia della Colonna Traiana',
      local: 'Copia Columnei lui Traian',
      place: `${places[Ro.Bucharest]}, ${places[Ro.Wallachia]}`,
      text: 'I rilievi della colonna che Traiano erige a Roma per la conquista della Dacia, in copia a grandezza naturale e all’altezza degli occhi. Cerca la scena di Decebalo che si toglie la vita mentre i cavalieri romani lo raggiungono.',
      find: 'Museo nazionale di storia della Romania, Calea Victoriei 12, nel Lapidarium. Chiuso lunedì e martedì.',
    },
    [RoTrace.VladDraculHouse]: {
      name: 'La casa di Vlad Dracul',
      local: 'Casa Vlad Dracul',
      place: `${places[Ro.Sighisoara]}, ${places[Ro.Transylvania]}`,
      text: 'Una casa della cittadella dove il padre, Vlad II Dracul, vive negli anni Trenta del Quattrocento: la tradizione vuole che Vlad III sia nato qui. Non ci sono prove, ed è oggi un ristorante, ma è il primo posto dove la sua storia si lega a un indirizzo.',
      find: 'Strada Cositorarilor 5, nella cittadella, a pochi passi dalla Torre dell’Orologio.',
    },
    [RoTrace.ChindiaTower]: {
      name: 'La torre Chindia',
      local: 'Turnul Chindiei',
      place: `${places[Ro.Targoviste]}, ${places[Ro.Wallachia]}`,
      text: 'La torre della Corte principesca di Târgoviște, la capitale dove Vlad III governa. La tradizione la attribuisce a lui; quella che vedi è in gran parte rifatta nell’Ottocento e nel Novecento. Dentro, una piccola mostra su Vlad e sul padre; dall’alto si vedono le rovine del palazzo.',
      find: 'Complesso museale nazionale Curtea Domnească, nel centro di Târgoviște. La torre è dentro il recinto della corte, accanto alla chiesa principesca.',
    },
    [RoTrace.PoenariCitadel]: {
      name: 'La cittadella di Poenari',
      local: 'Cetatea Poenari',
      place: `Valle dell’Argeș, ${places[Ro.Wallachia]}`,
      text: 'Una fortezza più antica di lui, su uno sperone di roccia sopra la valle dell’Argeș, che Vlad III fa restaurare e rafforzare. Restano le mura e le basi delle torri, restaurate e riaperte nel 2025.',
      find: 'Sulla Transfăgărășan (DN7C), a nord di Arefu: dal parcheggio sulla strada si sale a piedi per 1.480 gradini nel bosco.',
    },
    [RoTrace.StephenTheGreatTomb]: {
      name: 'La tomba di Stefano il Grande',
      local: 'Mormântul lui Ștefan cel Mare',
      place: `Putna, Bucovina, ${places[Ro.Moldavia]}`,
      text: 'Stefano fonda Putna come monastero e sepolcreto per sé e la sua famiglia. La sua tomba di marmo resta nella chiesa ricostruita nel Seicento: l’edificio che vedi non è quello del principe. Oggi è anche un luogo di venerazione: la Chiesa ortodossa romena lo proclama santo nel 1992. Il sovrano ricordato per le guerre è qui venerato come protettore della fede.',
      find: 'Nel monastero di Putna, nel distretto di Suceava. Dentro la chiesa, nella camera funeraria tra il pronao e la navata, cerca la tomba contro la parete sud, a destra entrando.',
    },
    [RoTrace.StephenTheGreatEquestrianStatue]: {
      name: 'Stefano a cavallo sopra Suceava',
      local: 'Statuia ecvestră a lui Ștefan cel Mare',
      place: `${places[Ro.Suceava]}, ${places[Ro.Moldavia]}`,
      text: 'Il principe a cavallo domina il parco vicino alla fortezza. È un monumento moderno: Iftimie Bârleanu lo realizza e viene inaugurato nel 1977, durante il regime comunista. Sul basamento, lo stemma della Moldavia e i rilievi di battaglia e di corte raccontano il sovrano come capo militare e politico. La sua immagine pubblica vive anche fuori dalle chiese.',
      find: 'Parco Șipote, lungo strada Cetății, vicino alla fortezza di Suceava. La statua è all’aperto, sul percorso tra la città e la cittadella.',
    },
  },
  cards: {
    [RoPerson.Decebalus]: { name: 'Decebalo', local: 'Decebal', dates: 'Re dei Daci, 87 – 106' },
    [RoPerson.VladTheImpaler]: {
      name: 'Vlad III',
      local: 'Vlad Țepeș',
      dates: 'Principe di Valacchia: 1448, 1456 – 1462, 1476',
    },
    [RoPerson.StephenTheGreat]: {
      name: 'Stefano il Grande',
      local: 'Ștefan cel Mare',
      dates: 'Principe di Moldavia, 1457 – 1504',
    },
  },
}
