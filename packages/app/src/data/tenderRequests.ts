// id,
// title: vad ska upphandlas?
// subtitle: vilken är organisationen, t ex skolmatsalen
// image: bild på vad som ska upphandlas

export type TenderRequest = {
  id: number
  title: string
  buyer: string
  image?: string
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
