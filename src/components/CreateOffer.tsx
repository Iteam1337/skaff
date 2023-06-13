import { useState, useEffect } from 'react'
import {
  Button,
  Divider,
  Headline,
  Subheading,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import tenderRequests from '../data/tenderRequests'
import { SafeAreaView, StyleSheet } from 'react-native'
import { View } from 'react-native'
import CheckboxWithText from './form/CheckboxWithText'
import TextInput from './form/TextInput'

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  text: {
    paddingTop: 5,
  },
  divider: {
    borderColor: '#D8D6CE',
    borderWidth: 0.5,
    marginTop: 20,
    marginBottom: 10,
  },
  surface: {
    backgroundColor: '#FFFFFF',
    elevation: 0,
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
  const [vicinityChecked, setVicinityChecked] = useState(true)
  const [deliveryChecked, setDeliveryChecked] = useState(true)
  const [visitChecked, setVisitChecked] = useState(true)
  const [price, setPrice] = useState('')
  const [other, setOther] = useState('')

  const theme = useTheme()

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
        <View style={styles.container}>
          <Headline>{tenderRequest.title}</Headline>
          <Text style={styles.text}>{tenderRequest.volume} kg</Text>

          <Divider style={styles.divider} />
          <Text style={styles.text}>
            Sista svar: {tenderRequest.lastOfferDate}
          </Text>
          <Text style={styles.text}>
            Tilldelning senast: {tenderRequest.lastAwardDate}
          </Text>
          <Text style={styles.text}>
            Leveransplan: {tenderRequest.deliveryPlan}
          </Text>
          <Text style={styles.text}>
            Leverans startdatum: {tenderRequest.deliveryStartDate}
          </Text>
          <Subheading style={styles.text}>Villkor</Subheading>
          <Text style={styles.text}>
            Producent ansvarar för leverans enligt överenskommelse.
          </Text>
          <Divider style={styles.divider} />
          <Subheading style={styles.text}>Urval</Subheading>
          <Text style={styles.text}>
            Inlämnade anbud som uppfyller krav rangordnas efter offererat pris.
            Uppfyllda önskemål ger prisavdrag vid rangordning av anbud.
          </Text>
        </View>
        <Surface style={styles.surface}>
          <View style={styles.container}>
            <Subheading>Krav</Subheading>
            <CheckboxWithText
              text="Produktion inom radie om 10 mil från leveransadress."
              checkedByDefault={true}
              onChange={(checked) => setVicinityChecked(checked)}
            ></CheckboxWithText>
            <CheckboxWithText
              text="Producent ansvarar för leverans."
              checkedByDefault={false}
              onChange={(checked) => setDeliveryChecked(checked)}
            ></CheckboxWithText>
            <Subheading>Önskemål</Subheading>
            <CheckboxWithText
              text="Studiebesök, 1h, 5 tillfällen"
              checkedByDefault={true}
              onChange={(checked) => setVicinityChecked(checked)}
            ></CheckboxWithText>
            <Subheading>Offererat pris</Subheading>
            <TextInput
              label="Pris i kr"
              value={price}
              keyboardType="numeric"
              outlined={true}
              styles={{ width: 300, marginBottom: 10 }}
              onChange={(text) => setPrice(text)}
            />
            <Subheading>Övrigt</Subheading>
            <TextInput
              label="Eventuell ytterligare information"
              value={other}
              outlined={true}
              styles={{ width: 300 }}
              onChange={(text) => setOther(text)}
            />
          </View>
        </Surface>
        <View style={{ ...styles.container, flexDirection: 'row' }}>
          <Button style={{ width: 200 }} onPress={() => {}}>
            Spara utkast
          </Button>
          <Button mode="contained" style={{ width: 200 }} onPress={publish}>
            Skicka anbud
          </Button>
        </View>
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
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreateOffer
