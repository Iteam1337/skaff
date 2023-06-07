import { useState, useEffect } from 'react'
import { Button } from 'react-native-paper'
import TextInput from './form/TextInput'
import DateTimeInput from './form/DateTimeInput'
import DropDownList from './form/DropDownList'
import buyers from '../data/buyers'
import { getAuthenticatedUser } from '../../lib/authStorage'
import { ScrollView } from 'react-native-gesture-handler'

const CreateTenderRequest = ({
  navigation,
  route,
}: {
  navigation: any
  route: any
}) => {
  const [title, setTitle] = useState('')
  const [volume, setVolume] = useState('')
  const [lastOfferDate, setLastOfferDate] = useState(new Date())
  const [lastAwardDate, setLastAwardDate] = useState(new Date())
  const [deliveryStartDate, setDeliveryStartDate] = useState(new Date())
  const [deliveryPlan, setDeliveryPlan] = useState('')
  const [volumePerDelivery, setVolumePerDelivery] = useState('')
  const [qualificationCriteria, setQualificationCriteria] = useState('')
  const [optionalCriteria, setOptionalCriteria] = useState('')

  const [buyer, setBuyer] = useState({})

  const deliveryPlans = [
    { label: 'Veckovis', value: '0' },
    { label: 'Månadsvis', value: '1' },
    { label: 'Kvartalsvis', value: '2' },
    { label: 'Endast en leverans', value: '3' },
  ]

  const criterias = [
    { label: 'KRAV-certifierad', value: '0' },
    { label: 'Ekologisk', value: '1' },
    { label: 'Kvalitet klass 1', value: '2' },
    { label: 'Studiebesök på plats, 1h', value: '3' },
    { label: 'Studiebesök på plats, 2h', value: '4' },
    { label: 'Studiebesök digitalt, 1h', value: '5' },
    { label: 'Studiebesök digitalt, 2h', value: '6' },
  ]

  getAuthenticatedUser().then((userId) => {
    const buyer = buyers.find((deal) => deal.id === userId)
    setBuyer(buyer)
  })

  // useEffect(() => {
  //   const tenderRequest = tenderRequests.find((offer) => offer.id === id)
  //   setTitle(tenderRequest.title)
  //   setPrice(tenderRequest.price)
  //   setImage(tenderRequest.image)
  // }, [id])

  useEffect(() => {
    if (route.params?.title) {
      setTitle(route.params?.title)
    }
  }, [route.params])

  const publish = () => {
    console.log('title', title)
    console.log('volume', volume)
    console.log('lastOfferDate', lastOfferDate)
    console.log('lastAwardDate', lastAwardDate)
    console.log('deliveryPlan', deliveryPlan)
    console.log('volumePerDelivery', volumePerDelivery)
    console.log('optionalCriteria', optionalCriteria)
    console.log('qualificationCriteria', qualificationCriteria)

    //TODO: save new to backend

    navigation.navigate('ListTenderRequests')
  }

  return (
    <ScrollView>
      <TextInput
        label="Namn på vara"
        value={title}
        onChange={(text) => setTitle(text)}
      />
      <TextInput
        label="Total volym"
        value={volume}
        onChange={(text) => setVolume(text)}
      />
      <TextInput
        label="Beställare"
        value={
          buyer?.name +
          ', ' +
          buyer?.address +
          ', ' +
          buyer?.zip +
          ' ' +
          buyer?.postalAddress
        }
        disabled={true}
      />
      <DateTimeInput
        label="Sista anbud"
        value={lastOfferDate}
        onChange={(newDate) => {
          if (newDate) setLastOfferDate(newDate)
        }}
      ></DateTimeInput>
      <DateTimeInput
        label="Tilldelning senast"
        value={lastAwardDate}
        onChange={(newDate) => {
          if (newDate) setLastAwardDate(newDate)
        }}
      ></DateTimeInput>
      <DateTimeInput
        label="Leverans startdatum"
        value={deliveryStartDate}
        onChange={(newDate) => {
          if (newDate) setDeliveryStartDate(newDate)
        }}
      ></DateTimeInput>
      <DropDownList
        label="Leveransplan"
        value={deliveryPlan}
        setValue={setDeliveryPlan}
        values={deliveryPlans}
      ></DropDownList>
      <TextInput
        label="Volym per leverans"
        value={volumePerDelivery}
        onChange={(text) => setVolumePerDelivery(text)}
      />
      <TextInput
        label="Villkor"
        value="Producent ansvarar för leverans enligt överenskommelse."
        disabled={true}
        multiline={true}
        numberOfLines={2}
      />
      <TextInput
        label="Urval"
        value="Inlämnade anbud som uppfyller krav rangordnas efter offererat pris. Uppfyllda önskemål ger prisavdrag vid rangordning av anbud."
        disabled={true}
        multiline={true}
        numberOfLines={3}
      />
      <DropDownList
        label="Krav"
        value={qualificationCriteria}
        setValue={setQualificationCriteria}
        values={criterias}
        multiSelect={true}
      ></DropDownList>
      <DropDownList
        label="Önskemål"
        value={optionalCriteria}
        setValue={setOptionalCriteria}
        values={criterias}
        multiSelect={true}
      ></DropDownList>
      <Button
        mode="contained"
        // style={{ width: 200 }}
        onPress={publish}
      >
        Publicera
      </Button>
    </ScrollView>
  )
}

export default CreateTenderRequest
