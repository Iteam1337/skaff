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

export default [] as Offer[]
