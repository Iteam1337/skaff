// id,
// title: vad ska upphandlas?
// subtitle: vilken är organisationen, t ex skolmatsalen
// image: bild på vad som ska upphandlas

export type TenderRequest = {
  id: number
  title: string
  buyer: string //string or object?
  buyerId: string
  deliveryPlan: string
  deliveryStartDate: Date
  lastAwardDate: Date
  lastOfferDate: Date
  optionalCriteria: Array<string>
  qualificationCriteria: Array<string>
  grading: string
  terms: string
  volume: number
  volumePerDelivery: number
}

export default [
  {
    id: 1,
    title: 'Ägg 100kg',
    buyer: 'Skolmatsalen i Rönnänge Skola',
  },
  {
    id: 2,
    title: 'Lammkött 100kg',
    buyer: 'Södra Ängby Skola',
    image: 'https://picsum.photos/700',
  },
  {
    id: 3,
    title: 'Tomater 100kg',
    buyer: 'Abrahamsbergsskolan',
    image: 'https://picsum.photos/700',
  },
] as TenderRequest[]
