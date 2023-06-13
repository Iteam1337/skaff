const frozen = '/assets/area_frozen_food.png'
const fresh_cooled = '/assets/area_fresh_or_cooled.png'
const groceries = '/assets/area_groceries.png'
const other = '/assets/area_fruit.png'

export const categories = {
  Frozen: {
    Desserts_Snacks: ['Ostkaka'],
    Fruits_Berries: ['Blåbär', 'Lingon'],
    Unprepared_Meat: [
      'Bacon',
      'Fransyska',
      'Nötfärs',
      'Nötkött strimlat',
      'Viltfärs',
    ],
    Meat_Products: ['Grillkorv', 'Kassler'],
  },
  Fresh_Cooled: {
    Fruits_Berries: ['Päron', 'Äpplen'],
    Unprepared_Vegetables: [
      'Champinjoner',
      'Gulbetor',
      'Kålrot',
      'Lök gul',
      'Morötter',
      'Palsternackor',
      'Polkabetor',
      'Purjolök',
      'Rotselleri',
      'Rödbetor',
      'Vitkål',
    ],
    Peeled_Vegetables: ['Morötter'],
    Unprepared_Meat: [
      'Blandfärs',
      'Fläskkarré',
      'Fläskkotlett',
      'Fläskkött strimlat',
      'Fläskkött tärnat',
      'Hjortkött',
      'Nötfärs',
      'Nötkött strimlat',
      'Nötkött tärnat',
    ],
    Meat_Products: [
      'Falukorv',
      'Fläskkorv',
      'Grillkorv',
      'Korv övrig',
      'Prinskorv',
      'Skinka kokt',
      'Varmkorv',
    ],
    Dairy_Products: [
      'Filmjölk naturell lägst 2% fetthalt',
      'Lättmjölk, högst 0,5% fetthalt',
      'Mellanmjölk, 1,5%-1,8% fetthalt',
      'Standardmjölk, 3,0%-3,5% fetthalt',
      'Vispgrädde',
      'Yoghurt naturell',
      'Yoghurt smaksatt',
    ],
    Cheese: ['Ost Hårdost övrig'],
    Potatoes: [
      'Potatis',
      'Potatis skalad',
      'Potatis skivad',
      'Potatis strimlad',
    ],
    Eggs: ['Ägg färska'],
  },
  Pantry_Specialties: {
    Legumes: ['Baljväxter övriga', 'Ärter gula'],
    Seeds_and_Kernels: ['Solroskärnor'],
    Grains: ['Havregryn', 'Mannagryn'],
    Cooking_Fat_Oil: ['Rapsolja'],
    Flour: [
      'Dinkelmjöl',
      'Grahamsmjöl',
      'Havremjöl',
      'Mjölmix',
      'Rågmjöl',
      'Rågsikt',
      'Vetemjöl',
    ],
    Sugar_Sweeteners: ['Honung'],
    Jam_Marmalade_Jelly: ['Jordgubbssylt', 'Lingonsylt', 'Pannkakssylt'],
    Beer: ['Öl klass 1'],
  },
}

export const areas = {
  'Frozen': {
    title: 'Djupfryst',
    image: frozen,
  },
  'Fresh/Cooled': {
    title: 'Färskvaror/Kylvaror',
    image: fresh_cooled,
  },
  'Grocery/Specialty': {
    title: 'Kolonial/Speceri',
    image: groceries,
  },
  'BakeryGoods': {
    title: 'Bagerivaror',
  },
  'DryGoods': {
    title: 'Torrvaror',
  },
  'CannedGoods': {
    title: 'Konserver',
  },
  'Beverages': {
    title: 'Drycker',
  },
  'CondimentsAndSpices': {
    title: 'Kryddor och kryddblandningar',
  },
  'DiaryProducts': {
    title: 'Mejeriprodukter',
  },
  'FishAndSeafood': {
    title: 'Fisk och skaldjur',
  },
  'Pastries': {
    title: 'Konditorivaror',
  },
  'Snacks': {
    title: 'Snacks',
  },
  'HealthFoods': {
    title: 'Hälsokost',
  },
  'NonAlcoholicBeverages': {
    title: 'Alkoholfria drycker',
  },
  'Other': {
    title: 'Övrigt',
    image: other,
  },
}

export const mainGroups = {
  BreadAndRolls: 'Bröd och frallor',
  CerealsAndGrains: 'Spannmål och gryn',
  Rice: 'Ris',
  Pasta: 'Pasta',
  NutsAndSeeds: 'Nötter och frön',
  CoffeeAndTea: 'Kaffe och te',
  JuicesAndSoftDrinks: 'Juicer och läskedrycker',
  OilsAndVinegars: 'Oljor och vinäger',
  Cheese: 'Ost',
  Eggs: 'Ägg',
  Shellfish: 'Skaldjur',
  SausagesAndDeliMeats: 'Korv och charkuterier',
  CookiesAndBiscuits: 'Kakor och kex',
  ChocolatesAndSweets: 'Choklad och godis',
  EnergyBarsAndDrinks: 'Energi bars och drycker',
  GlutenFreeProducts: 'Glutenfria produkter',
  LactoseFreeProducts: 'Laktosfria produkter',
}

export const certifications = {
  organic: {
    title: 'Organisk',
  },
  MSC: {
    title: 'MSC',
  },
  kravMarked: {
    title: 'Kravmärkt',
  },
  ethical: {
    title: 'Etisk',
  },
  fairtrade: {
    title: 'Fairtrade',
  },
  locallyProduced: {
    title: 'Närodlad',
  },
}
