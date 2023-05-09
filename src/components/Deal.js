import * as React from 'react'
import { Card, TextInput, Banner, Button } from 'react-native-paper'
import { ScrollView } from 'react-native'
import deals from '../data/deals'

const Deal = ({ route, navigation }) => {
  const { id } = route.params
  const [title, setTitle] = React.useState('Rubrik')
  const [price, setPrice] = React.useState('')
  const [image, setImage] = React.useState('https://picsum.photos/700')
  const [bannerVisible, setBannerVisible] = React.useState(true)

  React.useEffect(() => {
    const deal = deals.find((offer) => offer.id === id)
    setTitle(deal.title)
    setPrice(deal.price)
    setImage(deal.image)
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
      <Button
        onPress={() =>
          navigation.navigate('CreateTenderRequest', {
            title: title,
            price: price,
            image: image,
          })
        }
      >
        Ny anbudsförfrågan
      </Button>
    </ScrollView>
  )
}

export default Deal
