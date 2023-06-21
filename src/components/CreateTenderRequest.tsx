import { useState, useEffect, useLayoutEffect } from 'react'
import { Button } from 'react-native-paper'
import TextInput from './form/TextInput'
import DateTimeInput from './form/DateTimeInput'
import DropDownList from './form/DropDownList'
import { ScrollView } from 'react-native-gesture-handler'
import useTenderRequests from '../hooks/useTenderRequests'
import useAuth from '../hooks/useAuth'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'

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
  const [terms] = useState(
    'Producent ansvarar för leverans enligt överenskommelse.'
  )
  const [grading] = useState(
    'Inlämnade anbud som uppfyller krav rangordnas efter offererat pris. Uppfyllda önskemål ger prisavdrag vid rangordning av anbud.'
  )
  const [, , add] = useTenderRequests()

  const { user: buyer } = useAuth()

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
    if (route.params?.title) {
      setTitle(route.params?.title)
    }
  }, [route.params])

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

  const tenderRequest = {
    title,
    volume: +volume,
    lastOfferDate,
    lastAwardDate,
    buyer,
    deliveryStartDate,
    deliveryPlan: getSelectedOptions(deliveryPlan, deliveryPlans).pop(),
    volumePerDelivery: volumePerDelivery,
    optionalCriteria: getSelectedOptions(optionalCriteria, criterias),
    qualificationCriteria: getSelectedOptions(qualificationCriteria, criterias),
    terms,
    grading,
  }

  useLayoutEffect(() => {
    // publish button in header:
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => publish(tenderRequest)}>Publicera</Button>
      ),
    })
  }, [tenderRequest])

  const publish = (tenderRequest: any) => {
    add(tenderRequest)

    navigation.navigate('ListTenderRequests')
  }

  return (
    <KeyboardAvoidingView>
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
          value={terms}
          disabled={true}
          multiline={true}
          numberOfLines={2}
        />
        <TextInput
          label="Urval"
          value={grading}
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
        <View style={styles.actionContainer}>
          <Button onPress={() => {}} uppercase={false}>
            Spara utkast
          </Button>
          <Button mode="contained" onPress={publish} uppercase={false}>
            Publicera
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CreateTenderRequest

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 20,
  },
})
