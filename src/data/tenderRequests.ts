// id,
// title: vad ska upphandlas?
// subtitle: vilken är organisationen, t ex skolmatsalen
// image: bild på vad som ska upphandlas

import buyers, { Buyer } from './buyers'

export type TenderRequest = {
  id: number
  title: string
  buyer: Buyer
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
    buyer: buyers[0],
  },
  {
    id: 2,
    title: 'Lammkött 100kg',
    buyer: buyers[1],
  },
  {
    id: 3,
    title: 'Tomater 100kg',
    buyer: buyers[3],
  },
] as TenderRequest[]
