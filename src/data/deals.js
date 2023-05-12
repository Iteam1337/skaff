export default [
  {
    id: 1,
    title: 'Morötter 100kg',
    subtitle: 'Svegs Gård AB',
    image: 'https://picsum.photos/700',
  },
  {
    id: 2,
    title: 'Vetemjöl 100kg',
    subtitle: 'Rönnängs Gård AB',
    image: 'https://picsum.photos/700',
  },
  {
    id: 3,
    title: 'Köttfärs 100kg',
    subtitle: 'BdG AB',
    image: 'https://picsum.photos/700',
  },

  {
    id: 4,
    procurement: '-',
    positionNo: '-',
    commodity: {
      area: 'Djupfryst',
      mainGroup: 'Desserter/mellanmål',
      group: 'Ostkaka',
    },
    supplier: {
      name: 'Skafferi Värmland',
      artNo: '3075',
    },
    product: {
      name: 'Ostkaka 1.3kg',
      manufacturer: 'Mor Carins',
      brand: 'Mor Carins',
      content: {
        quantity: 1,
        unit: 'KG',
      },
    },
    price: {
      SEK: '858.00',
      kilos: '7.80',
      SEK_per_Kg: '110.00',
      finalAmountSEK_per_Kg: '110.00',
      percentageOutsideContract: '100.00',
    },
    certifications: {
      organic: false,
      MSC: false,
      kravMarked: false,
      ethical: false,
      fairtrade: false,
      locallyProduced: true,
    },
    origin: {
      productManufacturingCountry: 'SVERIGE',
      rawMaterialOriginCountry: 'SVERIGE',
    },
  },
]
