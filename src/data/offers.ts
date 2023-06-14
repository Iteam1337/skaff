import suppliers from './suppliers'
import { Supplier } from './suppliers'

const days = 24 * 60 * 60 * 1000

export type Offer = {
  id: string
  supplier: Supplier
  approved: boolean
  submissionDate: Date
  submitted: boolean
  tenderRequestId: number
  price: {
    SEK: number
  }
}

export default [
  {
    id: '1',
    supplier: suppliers[0],
    approved: false,
    submissionDate: new Date(Date.now() - 7 * days),
    submitted: false,
    tenderRequestId: 1,
    price: {
      SEK: 100,
    },
  },
  {
    id: '2',
    supplier: suppliers[1],
    approved: false,
    submissionDate: new Date(Date.now() - 4 * days),
    submitted: true,
    tenderRequestId: 1,
    price: {
      SEK: 200,
    },
  },
  {
    id: '3',
    supplier: suppliers[2],
    approved: false,
    submissionDate: new Date(Date.now() - 5 * days),
    submitted: false,
    tenderRequestId: 1,
    price: {
      SEK: 300,
    },
  },
] as Offer[]
