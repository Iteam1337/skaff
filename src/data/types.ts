interface Content {
  quantity: string
  unit: string
}

interface Certifications {
  organic: boolean
  msc: boolean
  kravMarked: boolean
  ethical: boolean
  fairtrade: boolean
  locallyProduced: boolean
}

interface Origin {
  productManufacturingCountry: string
  rawMaterialOriginCountry: string
}

interface Price {
  SEK: number
  kilos: number
  SEK_per_Kg: number
  finalAmountSEK_per_Kg: number
  percentageOutsideContract: number
}

interface Product {
  name: string
  manufacturer: string
  brand: string
  content: Content
}

interface Supplier {
  name: string
  artNo: string
}

interface Commodity {
  area: string
  mainGroup: string
  group: string
}

interface ProcurementItem {
  procurement: string
  positionNo: string
  commodity: Commodity
  supplier: Supplier
  product: Product
  price: Price
  certifications: Certifications
  origin: Origin
}

// Exempel på användning
const item: ProcurementItem = {
  procurement: '-',
  positionNo: '-',
  commodity: {
    area: 'Färskvaror/Kylvaror',
    mainGroup: 'Grönsaker obehandlade',
    group: 'Polkabetor',
  },
  supplier: {
    name: 'Skafferi Värmland',
    artNo: 'K3071',
  },
  product: {
    name: 'Polkabetor Krav 6kg',
    manufacturer: 'Torfolk & Vänner',
    brand: 'Torfolk & Vänner',
    content: {
      quantity: '1 x 6. KG',
      unit: 'ST',
    },
  },
  price: {
    SEK: 1570.0,
    kilos: 78.0,
    SEK_per_Kg: 20.2,
    finalAmountSEK_per_Kg: 20.2,
    percentageOutsideContract: 100.0,
  },
  certifications: {
    organic: true,
    msc: false,
    kravMarked: true,
    ethical: false,
    fairtrade: false,
    locallyProduced: true,
  },
  origin: {
    productManufacturingCountry: 'SVERIGE',
    rawMaterialOriginCountry: 'SVERIGE',
  },
}
