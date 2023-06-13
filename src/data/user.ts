import { Deal } from './deals'

export type User = {
  id: string
  name: string
  token?: string
  type: 'supplier' | 'buyer'
  lastOnline?: Date
  online: boolean
  image: string
  address: string
  zip: string
  postalAddress: string
  email: string
  description: string
  deals?: Array<Deal>
}
