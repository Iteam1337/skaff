import { User } from './user'
const image8 = '/assets/avatars/Image008.png'
const image9 = '/assets/avatars/Image009.png'
const image10 = '/assets/avatars/Image010.png'

export type Supplier = User & {
  type: 'supplier'
  produce: string[]
}

export default [
  {
    id: '1',
    type: 'supplier',
    online: false,
    name: 'Skafferi Värmland',
    image: image8,
    address: 'Mejerigatan 2',
    zip: '653 43',
    postalAddress: 'Karlstad',
    email: 'info@skafferivarmland.se',
    produce: ['Morötter', 'Palsternackor', 'Rädisor'],
    description:
      'Vi är din lokala leverantör av närproducerad mat och dryck från Värmland. Beställ lokalt och närproducerat mathantverk som producerats där du själv lever och bor - för smakernas, djurens, människornas och miljöns skull.',
  },
  {
    id: '2',
    type: 'supplier',
    online: false,
    name: 'August Larsson Chark Hemgården',
    image: image9,
    address: 'Älvdalsvägen 35',
    zip: '683 93',
    postalAddress: 'Råda',
    email: 'info@augustlarssonchark.se',
    produce: ['Lammkött', 'Köttfärs', 'Nötfärs'],
    description:
      'Vi bevarar gamla traditioner i en modern tillverkning, det får ta lite extra tid och vi väljer våra köttleverantörer med omsorg. Vi vet genom våra kunder att det är smaken och vetskapen att det är producerat med kärlek som avgör i slutändan.',
  },
  {
    id: '3',
    type: 'supplier',
    online: false,
    name: 'Wermlands Mejeri',
    image: image10,
    address: 'Gillbergavägen 2',
    zip: '661 95',
    postalAddress: 'Värmlands Nysäter',
    email: 'info@wermlandsmeeri.se',
    produce: ['Komjölk', 'Yoghurt', 'Ost'],
    description:
      'Välkommen till Wermlands Mejeri. Ett mejeri med hjärtat i Värmlands Nysäter som säljer närproducerad mjölk och grädde från värmländska kor.',
  },
] as Array<Supplier>
