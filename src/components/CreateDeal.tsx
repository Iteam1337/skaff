import { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'

import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import TextInput from './form/TextInput'
import DropDownList from './form/DropDownList'
import DateTimeInput from './form/DateTimeInput'
import useDeals from '../hooks/useDeals'
import useAuth from '../hooks/useAuth'
import { useAuthContext } from '../context/authContext'

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
})
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
  const constraints = [
    { label: 'Bäst före', value: '0' },
    { label: 'Sista förbrukningsdag', value: '1' },
  ]

  const [, , add] = useDeals()
  const { user } = useAuthContext()

  const getSelectedOptions = (
    selectedOptions: string,
    options: Array<{ label: string; value: string }>
  ) => {
    return selectedOptions
      .split(',')
      .map((critera: string) => {
        return options.find((option: any) => option.value == critera)?.label
      })
      .filter((criteria: string | undefined) => criteria)
  }

  const deal = {
    product: {
      name: title,
      price: +price,
    },
    volume: +volume,
    supplier: user,
    constraint: getSelectedOptions(constraint, constraints).pop(),
    date,
    endDate,
    other,
    description,
    commodity: {
      area: 'Other',
      mainGroup: 'Other',
      group: 'Other',
    },
  }

  // useEffect(() => {
  //   const deal = deals.find((offer) => offer.id === id)
  //   if (deal) {
  //     setTitle(deal?.product?.name)
  //     setPrice(deal?.price.SEK.toString())
  //     setVolume(deal?.price.kilos.toString())
  //   }
  // }, [id])

  useEffect(() => {
    // publish button in header:
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => publish(deal)}>Publicera</Button>
      ),
    })
  }, [])

  const publish = (deal: any) => {
    add(deal)

    navigation.navigate('ListDeals')
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <TextInput
          label="Namn på vara"
          value={title}
          placeholder='t ex "Äpplen"'
          onChange={(text) => setTitle(text)}
        />
        <TextInput
          keyboardType="numeric"
          label="Volym"
          value={volume}
          placeholder="t ex 10kg eller 5 liter"
          onChange={(text) => setVolume(text)}
        />
        <TextInput
          keyboardType="numeric"
          label="Pris"
          placeholder="tex 20kr/kg eller 10kr/liter"
          value={price}
          onChange={(text) => setPrice(text)}
        />
        <DateTimeInput
          label="Sista datum för erbjudande"
          value={endDate}
          onChange={(newDate) => {
            if (newDate) setEndDate(newDate)
          }}
        ></DateTimeInput>
        <DropDownList
          label="Ev datumbegränsning"
          value={constraint}
          setValue={setConstraint}
          values={constraints}
        ></DropDownList>
        {constraint && (
          <DateTimeInput
            label={constraint == '0' ? 'Bäst före' : 'Sista förbrukningsdag'}
            value={date}
            onChange={(newDate) => {
              if (newDate) setDate(newDate)
            }}
          ></DateTimeInput>
        )}

        <View
          style={{
            ...styles.actionContainer,
            justifyContent: 'flex-start',
            backgroundColor: '#FFFFFF',
          }}
        >
          <Button
            icon="camera"
            mode="contained"
            uppercase={false}
            // onPress={() => console.log('Pressed')}
          >
            Lägg till bild
          </Button>
        </View>
        <TextInput
          label="Kort beskrivning"
          value={description}
          placeholder='t ex "Ekologiskt, ursprung Sverige"'
          onChange={(text) => setDescription(text)}
        />
        <TextInput
          label="Övrigt"
          value={other}
          onChange={(text) => setOther(text)}
        />
        <View style={styles.actionContainer}>
          <Button
            onPress={() => {
              navigation.navigate('ListDeals')
            }}
            uppercase={false}
          >
            Rensa utkast
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreateDeal
