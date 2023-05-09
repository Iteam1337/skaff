import * as React from 'react'
import { Card, TextInput, Banner, Title } from 'react-native-paper'
import { SafeAreaView, ScrollView } from 'react-native'
import deals from '../data/deals'

const CreateDeal = ({ route }) => {
  // const { id } = route.params
  const [title, setTitle] = React.useState('Rubrik')
  const [price, setPrice] = React.useState('')
  const [image, setImage] = React.useState('https://picsum.photos/700')
  const [bannerVisible, setBannerVisible] = React.useState(true)

  // React.useEffect(() => {
  //   const deal = deals.find((offer) => offer.id === id)
  //   setTitle(deal.title)
  //   setPrice(deal.price)
  //   setImage(deal.image)
  // }, [id])

  return (
    <SafeAreaView>
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
    </SafeAreaView>
  )
}

export default CreateDeal
