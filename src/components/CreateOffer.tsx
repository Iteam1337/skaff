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
import { SafeAreaView, StyleSheet } from 'react-native'
import { View } from 'react-native'
import CheckboxWithText from './form/CheckboxWithText'
import TextInput from './form/TextInput'
import useTenderRequests from '../hooks/useTenderRequests'
import useAuth from '../hooks/useAuth'
import uuid from 'react-native-uuid'
import useOffers from '../hooks/useOffers'

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

  const [selectedQualificationCriterias, setSelectedQualificationCriterias] =
    useState(Array<string>)
  const [selectedOptionalCriterias, setSelectedOptionalCriterias] = useState(
    Array<string>
  )
  const [price, setPrice] = useState('')
  const [other, setOther] = useState('')

  const theme = useTheme()
  const [tenderRequests, , , refresh] = useTenderRequests()
  const [, , add] = useOffers()
  const [supplier] = useAuth()

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

  useEffect(() => {
    console.log('route.params', route.params)
    if (route.params?.id) {
      const tenderRequest = tenderRequests.find(
        (offer) => offer.id === route.params?.id
      )
      console.log('tenderRequest', tenderRequest)
      if (tenderRequest) setTenderRequest(tenderRequest)
    }
  }, [route.params, tenderRequests])

  useEffect(() => {
    refresh()
  }, [])

  const publish = () => {
    const offer = {
      qualificationCriteriasMet: selectedOptionalCriterias,
      optionalCriteriasMet: selectedOptionalCriterias,
      price: {
        SEK: +price,
      },
      other: other,
      tenderRequestId: tenderRequest.id,
      approved: false,
      submissionDate: new Date(),
      supplier: supplier,
      id: uuid.v4(),
    }

    console.log('offer', offer)

    add(offer)

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
            Sista svar: {tenderRequest.lastOfferDate?.toString().split('T')[0]}
          </Text>
          <Text style={styles.text}>
            Tilldelning senast:{' '}
            {tenderRequest.lastAwardDate?.toString().split('T')[0]}
          </Text>
          <Text style={styles.text}>
            Leveransplan: {tenderRequest.deliveryPlan}
          </Text>
          <Text style={styles.text}>
            Leverans startdatum:{' '}
            {tenderRequest.deliveryStartDate?.toString().split('T')[0]}
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
            {tenderRequest.qualificationCriteria?.map((criteria, i) => (
              <CheckboxWithText
                key={i}
                text={criteria}
                checkedByDefault={false}
                onChange={(checked) => {
                  let newChoices = selectedQualificationCriterias.filter(
                    (choice) => choice != criteria
                  )
                  if (checked) {
                    //add to list
                    newChoices.push(criteria)
                  }
                  setSelectedQualificationCriterias(newChoices)
                }}
              ></CheckboxWithText>
            ))}
            <Subheading>Önskemål</Subheading>
            {tenderRequest.optionalCriteria?.map((optionalCriteria, i) => (
              <CheckboxWithText
                key={i}
                text={optionalCriteria}
                checkedByDefault={false}
                onChange={(checked) => {
                  let newChoices = selectedOptionalCriterias.filter(
                    (choice) => choice != optionalCriteria
                  )
                  if (checked) {
                    //add to list
                    newChoices.push(optionalCriteria)
                  }
                  setSelectedOptionalCriterias(newChoices)
                }}
              ></CheckboxWithText>
            ))}
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
        <View
          style={{
            ...styles.container,
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <Button onPress={() => {}} uppercase={false}>
            Spara utkast
          </Button>
          <Button mode="contained" onPress={publish} uppercase={false}>
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
