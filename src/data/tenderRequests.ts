// id,
// title: vad ska upphandlas?
// subtitle: vilken är organisationen, t ex skolmatsalen
// image: bild på vad som ska upphandlas

import buyers, { Buyer } from './buyers'

export type TenderRequest = {
  id: number
  title: string
  buyer: Buyer
  image?: string
}

export default [
  {
    id: 1,
    title: 'Ägg 100kg',
    buyer: buyers[0],
    image: 'https://picsum.photos/700',
  },
  {
    id: 2,
    title: 'Lammkött 100kg',
    buyer: buyers[1],
    image: 'https://picsum.photos/700',
  },
  {
    id: 3,
    title: 'Tomater 100kg',
    buyer: buyers[3],
    image: 'https://picsum.photos/700',
  },
] as TenderRequest[]
