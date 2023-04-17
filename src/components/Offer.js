import * as React from 'react'
import { Card, TextInput, Banner } from 'react-native-paper'
import { ScrollView } from 'react-native'

const offers = [
  {
    id: 1,
    title: 'Morötter 100kg',
    subtitle: 'Svegs Gård AB',
    image: 'https://picsum.photos/700',
  },
  {
    id: 2,
    title: 'Vetemjöl 100kg',
    subtitle: 'Rönnängs Gård AB',
    image: 'https://picsum.photos/700',
  },
  {
    id: 3,
    title: 'Köttfärs 100kg',
    subtitle: 'BdG AB',
    image: 'https://picsum.photos/700',
  },
]

const Offers = ({ route }) => {
  const { id } = route.params
  const [title, setTitle] = React.useState('Rubrik')
  const [price, setPrice] = React.useState('')
  const [image, setImage] = React.useState('https://picsum.photos/700')
  const [bannerVisible, setBannerVisible] = React.useState(true)

  React.useEffect(() => {
    const offer = offers.find((offer) => offer.id === id)
    setTitle(offer.title)
    setPrice(offer.price)
    setImage(offer.image)
  }, [id])

  return (
    <ScrollView>
      <TextInput
        label="Rubrik på erbjudandet"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        label="Pris"
        value={price}
        onChangeText={(text) => setPrice(text)}
      />
      <Card>
        <Card.Title title={title} subtitle={price} />
        <Card.Cover source={{ uri: image }} />
      </Card>
    </ScrollView>
  )
}

export default Offers
