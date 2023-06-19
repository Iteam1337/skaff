import { useState, useEffect, useLayoutEffect } from 'react'
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
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from 'react-native'
import { View } from 'react-native'
import CheckboxWithText from './form/CheckboxWithText'
import TextInput from './form/TextInput'
import useTenderRequests from '../hooks/useTenderRequests'
import useAuth from '../hooks/useAuth'
import uuid from 'react-native-uuid'
import useOffers from '../hooks/useOffers'
import { TenderRequest } from '../data/tenderRequests'
import { Offer } from '../data/offers'

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
  },
})

const CreateOffer = ({
  navigation,
  route,
}: {
  navigation: any
  route: any
}) => {
  const [selectedQualificationCriterias, setSelectedQualificationCriterias] =
    useState(Array<string>)
  const [selectedOptionalCriterias, setSelectedOptionalCriterias] = useState(
    Array<string>
  )
  const { user: supplier } = useAuth()
  const [, , add, refreshOffers] = useOffers()
  const [price, setPrice] = useState('')
  const [other, setOther] = useState('')
  const [offer, setOffer] = useState({} as Offer)
  const tenderRequest = route.params?.tenderRequest
  useEffect(() => {
    setOffer({
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
      buyer: tenderRequest.buyer,
      id: uuid.v4(),
    } as Offer)
  }, [
    selectedQualificationCriterias,
    selectedOptionalCriterias,
    price,
    other,
    tenderRequest,
    supplier,
  ])

  useEffect(() => {
    refreshOffers()
  }, [tenderRequest])

  useLayoutEffect(() => {
    // publish button in header:
    navigation.setOptions({
      headerRight: () => <Button onPress={() => publish(offer)}>Skicka</Button>,
    })
  }, [offer])

  const publish = (offer: Offer) => {
    if (!tenderRequest.id) return console.error('no tenderRequest.id')

    console.log('publish offer', offer)

    add(offer)

    navigation.navigate('TenderRequest', { tenderRequest })
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
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
          <Button
            onPress={() => publish(offer)}
            mode="contained"
            uppercase={false}
          >
            Publicera
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default CreateOffer
