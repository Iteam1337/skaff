import * as React from 'react'
import { Card, TextInput, Banner, Title } from 'react-native-paper'
import { SafeAreaView } from 'react-native'
import tenderRequests from '../data/tenderRequests'

const CreateTenderRequest = ({ route }) => {
  const incomingProps = route.params

  const [title, setTitle] = React.useState('Rubrik')
  const [price, setPrice] = React.useState('')
  const [image, setImage] = React.useState('https://picsum.photos/700')
  const [bannerVisible, setBannerVisible] = React.useState(true)

  // React.useEffect(() => {
  //   const tenderRequest = tenderRequests.find((offer) => offer.id === id)
  //   setTitle(tenderRequest.title)
  //   setPrice(tenderRequest.price)
  //   setImage(tenderRequest.image)
  // }, [id])

  React.useEffect(() => {
    if (incomingProps) {
      setTitle(incomingProps.title)
      setPrice(incomingProps.price)
      setImage(incomingProps.image)
    }
  }, [incomingProps])

  return (
    <SafeAreaView>
      <Title>Ny anbudsförfrågan</Title>
      <TextInput
        label="Rubrik på anbudsförfrågan"
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
    </SafeAreaView>
  )
}

export default CreateTenderRequest
