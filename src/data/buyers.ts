import uuid from 'react-native-uuid'
import { User } from './user'
const image3 = '/assets/avatars/Image003.png'
const image4 = '/assets/avatars/Image004.png'
const image5 = '/assets/avatars/Image005.png'
const image6 = '/assets/avatars/Image006.png'
const image7 = '/assets/avatars/Image007.png'

export type Buyer = User & {
  type: 'buyer'
}

export default [
  {
    id: uuid.v4(),
    type: 'buyer',
    online: false,
    name: 'Fredricelundsskolan',
    image: image3,
    address: 'Tallåsvägen 2',
    zip: '653 45',
    postalAddress: 'Karlstad',
    email: 'info@fredricelundsskolan.se',
    description:
      'När du kommer till oss möts du av glädje och god stämning! Fredricelundsskolan är en skola med elever från förskoleklass till årskurs 6 med cirka 280 elever. Vår skola ligger på Våxnäs cirka fyra kilometer nordväst om Karlstads centrum i ett naturfint område med park och skog i närheten.',
  },
  {
    id: uuid.v4(),
    type: 'buyer',
    name: 'Frödingskolan',
    image: image4,
    address: 'Posthornsgatan 6',
    zip: '656 32',
    postalAddress: 'Karlstad',
    email: 'info@frodingskolan.se',
    description:
      'När du kommer till Frödingskolan möts du av glädje och nyfikenhet. Eleverna på skolan kommer från många olika kulturella bakgrunder. Detta ger en dynamik i lärandet och en härlig atmosfär! Frödingskolans främsta mål är att ge goda kunskaper och stärka språket i alla ämnen så att eleverna är väl förberedda för vidare studier och arbetsliv.',
  },
  {
    id: uuid.v4(),
    type: 'buyer',
    name: 'Kvarnbergsskolan',
    image: image5,
    address: 'Ölmegatan 10',
    zip: '656 30',
    postalAddress: 'Karlstad',
    email: 'info@kvarnbergsskolan.se',
    description:
      'Kvarnbergssskolan är en F-6 skola som ingår i Skolområde Syd. En skola för ALLA är viktigt för oss på Kvarnbergsskolan. Med forskningen som utgångspunkt strävar vi efter att skapa en kreativ miljö för stor som liten.',
  },
  {
    id: uuid.v4(),
    type: 'buyer',
    name: 'Vålbergsskolan',
    image: image6,
    address: 'Åslidsgatan 4B',
    zip: '660 50',
    postalAddress: 'Vålberg',
    email: 'info@valbergsskolan.se',
    description:
      'Välkommen till Vålbergsskolan! För oss är det viktigt att era barn får ett bra bemötande och att vi har goda relationer med varandra.',
  },
  {
    id: uuid.v4(),
    type: 'buyer',
    name: 'Nyeds skola',
    image: image7,
    address: '',
    zip: '660 60',
    postalAddress: 'Molkom',
    email: 'info@nyedsskola.se',
    description:
      'Vår strävan är att våra elever ska nå höga resultat som ger goda förutsättningar för vidare studier, ett gott liv och hopp om en meningsfull framtid',
  },
] as Array<Buyer>
