import type { GuideNames } from '@/content/types'
import { Eg, EgFood, EgSection, EgTrace } from '../structure'

/** Italian names of the Egypt guide's places and sections (index, titles, trip filter). */

const places: Record<Eg, string> = {
  [Eg.LowerEgypt]: 'Basso Egitto',
  [Eg.UpperEgypt]: 'Alto Egitto',
  [Eg.Nubia]: 'Nubia',
  [Eg.WesternDesert]: 'Deserto occidentale',
  [Eg.Sinai]: 'Sinai',
  [Eg.RedSea]: 'Mar Rosso',
  [Eg.Cairo]: 'Il Cairo',
  [Eg.Alexandria]: 'Alessandria',
  [Eg.Rosetta]: 'Rosetta',
  [Eg.Luxor]: 'Luxor',
  [Eg.Aswan]: 'Assuan',
  [Eg.Siwa]: 'Siwa',
  [Eg.SharmElSheikh]: 'Sharm el-Sheikh',
}

const everywhere = 'In tutto l’Egitto'

export const names: GuideNames<Eg, EgSection> = {
  country: 'Egitto',
  summary: 'Il Nilo, il deserto e il Mar Rosso.',
  alt: {
    cover: 'Le piramidi di Giza nel deserto',
    'coat-of-arms': 'Stemma dell’Egitto',
    flag: 'Bandiera dell’Egitto',
  },
  places,
  sections: {
    [EgSection.Emblems]: 'Bandiera e stemma',
    [EgSection.Flag]: 'Bandiera',
    [EgSection.CoatOfArms]: 'Stemma',
    // Chapters: their line in the summary (the titles are the same in every guide).
    [EgSection.Food]: 'Dal koshari al karkadè: che cosa ordinare',
    [EgSection.FoodCommon]: 'In tutto il paese',
    [EgSection.FoodLowerEgypt]: places[Eg.LowerEgypt],
    [EgSection.FoodUpperEgypt]: places[Eg.UpperEgypt],
    [EgSection.FoodWesternDesert]: places[Eg.WesternDesert],
    [EgSection.FoodRedSea]: places[Eg.RedSea],
  },
  traces: {
    [EgTrace.FoodKoshari]: {
      name: 'Koshari',
      place: everywhere,
      find: 'Nelle botteghe di koshari, in ogni città. La salsa d’aceto e aglio (da’a) e quella piccante (shatta) si versano sopra a piacere.',
    },
    [EgTrace.FoodFulMedames]: {
      name: 'Ful medames',
      place: everywhere,
      find: 'La mattina, ai carretti e ai banchi di strada con la qidra sul fuoco, e nelle botteghe che vendono ful e ta’ameya; nei menù anche «foul».',
    },
    [EgTrace.FoodTaameya]: {
      name: 'Ta’ameya',
      place: everywhere,
      find: 'Nelle stesse botteghe e agli stessi carretti del ful, fritta al momento: a pezzi o in un panino.',
    },
    [EgTrace.FoodMolokhia]: {
      name: 'Molokhia',
      place: everywhere,
      find: 'Nei ristoranti di cucina egiziana di casa, fra i piatti principali o le zuppe: si ordina con riso o pane, e con pollo o coniglio.',
    },
    [EgTrace.FoodFeteer]: {
      name: 'Feteer meshaltet',
      place: everywhere,
      find: 'Nelle botteghe di feteer, dove la pasta si lancia in aria davanti al cliente; il meshaltet è quello senza ripieno, con miele, melassa o formaggio a parte.',
    },
    [EgTrace.FoodOmAli]: {
      name: 'Om ali',
      place: everywhere,
      find: 'Fra i dolci dei ristoranti di cucina egiziana, servito caldo nella sua terrina.',
    },
    [EgTrace.FoodAhwaTea]: {
      name: 'Il tè nell’ahwa',
      place: everywhere,
      find: 'In qualunque ahwa, il caffè di strada con i tavolini sul marciapiede: si chiede «shai». Al Cairo ce ne sono in ogni quartiere, dal centro a Khan el-Khalili.',
    },
    [EgTrace.FoodSugarcaneJuice]: {
      name: 'Un succo di canna',
      local: 'Asab',
      place: everywhere,
      find: 'Nei chioschi di succhi, riconoscibili dalle canne e dalla pressa al banco: si beve sul posto o si porta via.',
    },
    [EgTrace.FoodStella]: {
      name: 'Una Stella',
      place: everywhere,
      find: 'Nei ristoranti, bar e hotel con licenza per gli alcolici e nei negozi di alcolici: non si vende né si beve altrove.',
    },
    [EgTrace.FoodSayadeya]: {
      name: 'Sayadeya',
      place: `Alessandria, ${places[Eg.LowerEgypt]}`,
      find: 'Nei ristoranti di pesce di Alessandria; nel menù «sayadeya» per il piatto intero, «ruz sayadeya» per il solo riso.',
    },
    [EgTrace.FoodEishShamsi]: {
      name: 'Eish shamsi',
      place: `In tutto l’${places[Eg.UpperEgypt]}`,
      find: 'Nelle case e nei forni dei villaggi dell’Alto Egitto, dove le famiglie lo fanno ancora; nelle panetterie delle città si trova di rado. Chiedi a chi ti ospita o alla tua guida in un villaggio intorno a Luxor.',
    },
    [EgTrace.FoodKarkade]: {
      name: 'Karkadè',
      place: `Assuan e Qena, ${places[Eg.UpperEgypt]}`,
      find: 'Al mercato: i calici secchi, rosso scuro, si vendono a peso, nei sacchi. L’infuso si beve nei caffè e sulle navi del Nilo, caldo o ghiacciato.',
    },
    [EgTrace.FoodSiwaDates]: {
      name: 'I datteri di Siwa',
      place: `Siwa, ${places[Eg.WesternDesert]}`,
      find: 'Nelle botteghe di Siwa, freschi in autunno, secchi o in pasta tutto l’anno.',
    },
    [EgTrace.FoodJabana]: {
      name: 'La jabana degli ababda',
      local: 'Gabbana',
      place: `Wadi el-Gemal, ${places[Eg.RedSea]}`,
      find: 'Nel parco di Wadi el-Gemal, a sud di Marsa Alam: nel villaggio ababda di al-Qula’an, che accoglie i visitatori in una tenda sulla spiaggia, e al punto di ristoro che gli ababda tengono a volte a Sharm el-Luli. Chiedi della jabana (o gabbana).',
    },
  },
  cards: {
    [EgFood.Koshari]: { name: 'Koshari' },
    [EgFood.FulMedames]: { name: 'Ful medames' },
    [EgFood.Taameya]: { name: 'Ta’ameya' },
    [EgFood.Molokhia]: { name: 'Molokhia' },
    [EgFood.Feteer]: { name: 'Feteer meshaltet' },
    [EgFood.OmAli]: { name: 'Om ali' },
    [EgFood.Tea]: { name: 'Shai', local: 'Il tè' },
    [EgFood.SugarcaneJuice]: { name: 'Asab', local: 'Succo di canna' },
    [EgFood.Stella]: { name: 'Stella' },
    [EgFood.Sayadeya]: { name: 'Sayadeya' },
    [EgFood.EishShamsi]: { name: 'Eish shamsi' },
    [EgFood.Karkade]: { name: 'Karkadè' },
    [EgFood.SiwaDates]: { name: 'Datteri di Siwa' },
    [EgFood.Jabana]: { name: 'Jabana', local: 'Gabbana' },
  },
}
