import * as React from 'react'
import { Card, TextInput, Banner } from 'react-native-paper'
import { ScrollView } from 'react-native'
import deals from '../data/deals'

const CreateDeal = ({ route }) => {
  const [title, setTitle] = React.useState('Rubrik')
  const [price, setPrice] = React.useState('')
  const [image, setImage] = React.useState('https://picsum.photos/700')

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

export default CreateDeal
