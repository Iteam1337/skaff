import buyers, { Buyer } from './buyers'
import suppliers from './suppliers'
import { Supplier } from './suppliers'

const days = 24 * 60 * 60 * 1000

export type Offer = {
  id: string
  buyer: Buyer
  supplier: Supplier
  approved: boolean
  submissionDate: Date
  submitted: boolean
  tenderRequestId: string
  price: {
    SEK: number
  }
  qualificationCriteriasMet: Array<string>
  optionalCriteriasMet: Array<string>
  other: string
}

export default [
  {
    id: '1',
    buyer: buyers[0],
    supplier: suppliers[0],
    approved: false,
    submissionDate: new Date(Date.now() - 7 * days),
    submitted: false,
    tenderRequestId: '1',
    price: {
      SEK: 100,
    },
  },
  {
    id: '2',
    buyer: buyers[0],
    supplier: suppliers[1],
    approved: false,
    submissionDate: new Date(Date.now() - 4 * days),
    submitted: true,
    tenderRequestId: '1',
    price: {
      SEK: 200,
    },
  },
  {
    id: '3',
    buyer: buyers[0],
    supplier: suppliers[2],
    approved: false,
    submissionDate: new Date(Date.now() - 5 * days),
    submitted: false,
    tenderRequestId: '1',
    price: {
      SEK: 300,
    },
  },
] as Offer[]
