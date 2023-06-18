// id,
// title: vad ska upphandlas?
// subtitle: vilken är organisationen, t ex skolmatsalen
// image: bild på vad som ska upphandlas

import buyers, { Buyer } from './buyers'

const days = 24 * 60 * 60 * 1000

export type TenderRequest = {
  id: string
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
    id: '1',
    title: 'Ägg 100kg',
    lastAwardDate: new Date(Date.now() + 10 * days),
    buyer: buyers[0],
  },
  {
    id: '2',
    title: 'Lammkött 100kg',
    lastAwardDate: new Date(Date.now() + 14 * days),
    buyer: buyers[1],
  },
  {
    id: '3',
    title: 'Tomater 100kg',
    lastAwardDate: new Date(Date.now() + 3 * days),
    buyer: buyers[3],
  },
] as TenderRequest[]
