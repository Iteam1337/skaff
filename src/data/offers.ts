import { Buyer } from './buyers'
import { Supplier } from './suppliers'
import { Contract } from './contract'

const days = 24 * 60 * 60 * 1000

export type Offer = {
  id: string
  buyer: Buyer
  supplier: Supplier
  approved: boolean
  acceptanceMotivation: string
  submissionDate: Date
  submitted: boolean
  tenderRequestId: string
  price: {
    SEK: number
  }
  qualificationCriteriasMet: Array<string>
  optionalCriteriasMet: Array<string>
  contract: Contract
  other: string
}

export default [] as Offer[]
