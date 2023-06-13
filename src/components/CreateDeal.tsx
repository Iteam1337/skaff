import { useEffect, useState } from 'react'
import { Card, Banner, Title, useTheme, Button } from 'react-native-paper'

import { SafeAreaView, ScrollView } from 'react-native'
import deals from '../data/deals'
import TextInput from './form/TextInput'
import DropDown from 'react-native-paper-dropdown'
import DropDownList from './form/DropDownList'
import DateTimeInput from './form/DateTimeInput'
import Icon from 'react-native-paper/lib/typescript/src/components/Icon'

const CreateDeal = ({ route, navigation }: { route: any; navigation: any }) => {
  const id = route?.params?.id
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [volume, setVolume] = useState('')
  const [constraint, setConstraint] = useState('')
  const [date, setDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [description, setDescription] = useState('')
  const [other, setOther] = useState('')
  const constraints = [{ label: 'Bäst före', value: '0' }]

  // useEffect(() => {
  //   const deal = deals.find((offer) => offer.id === id)
  //   if (deal) {
  //     setTitle(deal?.product?.name)
  //     setPrice(deal?.price.SEK.toString())
  //     setVolume(deal?.price.kilos.toString())
  //   }
  // }, [id])

  const publish = () => {
    console.log('title', title)
    console.log('price', price)
    console.log('volume', volume)
    console.log('constraint', constraint)
    console.log('date', date)
    console.log('endDate', endDate)
    console.log('other', other)

    //TODO: save new to backend

    navigation.navigate('ListDeals')
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <TextInput
          label="Namn på vara"
          value={title}
          onChange={(text) => setTitle(text)}
        />
        <TextInput
          keyboardType="numeric"
          label="Volym"
          value={volume}
          onChange={(text) => setVolume(text)}
        />
        <TextInput
          keyboardType="numeric"
          label="Pris"
          value={price}
          onChange={(text) => setPrice(text)}
        />
        <DropDownList
          label="Välj begränsning"
          value={constraint}
          setValue={setConstraint}
          values={constraints}
        ></DropDownList>
        <DateTimeInput
          label="Ange datum"
          value={date}
          onChange={(newDate) => {
            if (newDate) setDate(newDate)
          }}
        ></DateTimeInput>
        <DateTimeInput
          label="Sista datum för erbjudande"
          value={endDate}
          onChange={(newDate) => {
            if (newDate) setEndDate(newDate)
          }}
        ></DateTimeInput>

        <Button
          icon="camera"
          // mode="contained"
          // style={{ width: 200 }}
          // onPress={() => console.log('Pressed')}
        >
          Lägg till bild
        </Button>
        <TextInput
          label="Kort beskrivning"
          value={description}
          onChange={(text) => setDescription(text)}
        />
        <TextInput
          label="Övrigt"
          value={other}
          onChange={(text) => setOther(text)}
        />
        <Button
          mode="contained"
          // style={{ width: 200 }}
          onPress={publish}
        >
          Publicera
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreateDeal
