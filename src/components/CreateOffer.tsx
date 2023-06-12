import { useState, useEffect } from 'react'
import { Button, Divider, Headline, Text } from 'react-native-paper'
import TextInput from './form/TextInput'
import DateTimeInput from './form/DateTimeInput'
import DropDownList from './form/DropDownList'
import buyers from '../data/buyers'
import { getAuthenticatedUser } from '../../lib/authStorage'
import { ScrollView } from 'react-native-gesture-handler'
import tenderRequests from '../data/tenderRequests'
import { SafeAreaView, StyleSheet, View } from 'react-native'

const containerStyle = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
})

const CreateOffer = ({
  navigation,
  route,
}: {
  navigation: any
  route: any
}) => {
  const [tenderRequest, setTenderRequest] = useState({})

  // const [buyer, setBuyer] = useState({})

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

  // getAuthenticatedUser().then((userId) => {
  //   const buyer = buyers.find((deal) => deal.id === userId)
  //   setBuyer(buyer)
  // })

  useEffect(() => {
    console.log('route.params', route.params)
    if (route.params?.id) {
      const tenderRequest = tenderRequests.find(
        (offer) => offer.id === route.params?.id
      )
      console.log('tenderRequest', tenderRequest)
      if (tenderRequest) setTenderRequest(tenderRequest)
    }
  }, [route.params])

  const publish = () => {
    // console.log('title', title)
    // console.log('volume', volume)
    // console.log('lastOfferDate', lastOfferDate)
    // console.log('lastAwardDate', lastAwardDate)
    // console.log('deliveryPlan', deliveryPlan)
    // console.log('volumePerDelivery', volumePerDelivery)
    // console.log('optionalCriteria', optionalCriteria)
    // console.log('qualificationCriteria', qualificationCriteria)

    //TODO: save new to backend

    navigation.navigate('ListTenderRequests')
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={containerStyle}>
          <Headline style={{ flex: 1 }}>{tenderRequest.title}</Headline>
          <Text>{tenderRequest.volume} kg</Text>
        </View>
        <Divider />
        <Text>Sista svar: {tenderRequest.lastOfferDate}</Text>
        <Text>Tilldelning senast: {tenderRequest.lastAwardDate}</Text>
        <Text>Leveransplan: {tenderRequest.deliveryPlan}</Text>
        <Text>Leverans startdatum: {tenderRequest.deliveryStartDate}</Text>
        <Text>Villor:</Text>
        <Text>Producent ansvarar för leverans enligt överenskommelse.</Text>
        <Divider />
        <Text>Urval:</Text>
        <Text>
          Inlämnade anbud som uppfyller krav rangordnas efter offererat pris.
          Uppfyllda önskemål ger prisavdrag vid rangordning av anbud.
        </Text>
        {/* 
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
        disabled={true}
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
      ></DropDownList> */}
        <Button
          mode="contained"
          // style={{ width: 200 }}
          onPress={publish}
        >
          Skicka anbud
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreateOffer
