import {
  Text,
  Button,
  List,
  useTheme,
  Divider,
  Card,
  Headline,
  Subheading,
} from 'react-native-paper'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { Tabs, TabScreen } from 'react-native-paper-tabs'
import { ScrollView } from 'react-native-gesture-handler'
import Buyer from './Buyer'

import useAuth from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import useTenderRequests from '../hooks/useTenderRequests'
import TenderRequestCard from './TenderRequestCard'
import useOffers from '../hooks/useOffers'

const BuyerProfile = ({
  route,
  navigation,
}: {
  route: any
  navigation: any
}) => {
  const theme = useTheme()
  const { user: buyer, logout } = useAuth()
  const [tenderRequests, , , refreshTenderRequests] = useTenderRequests()
  const [offers, , , refreshOffers] = useOffers()
  const [showTenderRequests, setShowTenderRequests] = useState(true)
  const [showDeals, setShowDeals] = useState(true)

  useEffect(() => {
    refreshTenderRequests()
    refreshOffers({ buyer })
  }, [])

  const myTenderRequests = tenderRequests.filter(
    (tr) => tr.buyer.id === buyer?.id
  )
  return (
    <>
      <View style={{ ...styles.header }}>
        <Headline>Mina sidor</Headline>
        <Subheading>{buyer?.name}</Subheading>
      </View>
      <Tabs
        uppercase={false}
        style={{ backgroundColor: '#D8F5E3' }}
        theme={theme}
      >
        <TabScreen label="Aktuellt">
          <ScrollView>
            <List.Accordion
              title="Anbudsförfrågningar"
              expanded={showTenderRequests}
              onPress={() =>
                setShowTenderRequests(
                  (showTenderRequests) => !showTenderRequests
                )
              }
            >
              {(myTenderRequests.length === 0 && (
                <Card.Title
                  style={styles.infoCard}
                  title="Inga anbudsförfrågningar"
                  subtitle="Skapa en ny förfrågan för att få anbud från leverantörer."
                ></Card.Title>
              )) || <List.Subheader>Publicerade</List.Subheader>}
              {myTenderRequests.map((tenderRequest) => (
                <TenderRequestCard
                  user={buyer}
                  key={tenderRequest.id}
                  tenderRequest={tenderRequest}
                  navigation={navigation}
                />
              ))}
            </List.Accordion>
          </ScrollView>
        </TabScreen>
        <TabScreen label="Anbud">
          <ScrollView>
            <List.Accordion title="Pågående" expanded={true}>
              {myTenderRequests
                .filter((t) =>
                  offers
                    .filter((o) => !o.approved)
                    .some((o) => o.tenderRequestId === t.id)
                )
                .map((tenderRequest) => (
                  <TenderRequestCard
                    user={buyer}
                    key={tenderRequest.id}
                    tenderRequest={tenderRequest}
                    navigation={navigation}
                  />
                ))}
            </List.Accordion>
            <Divider />
            <List.Accordion title="Avslutade" expanded={true}>
              {myTenderRequests
                .filter((t) =>
                  offers
                    .filter((o) => o.approved)
                    .some((o) => o.tenderRequestId === t.id)
                )
                .map((tenderRequest) => (
                  <TenderRequestCard
                    user={buyer}
                    key={tenderRequest.id}
                    tenderRequest={tenderRequest}
                    navigation={navigation}
                  />
                ))}
            </List.Accordion>
          </ScrollView>
        </TabScreen>
        <TabScreen label="Profil">
          <Buyer
            route={{ ...route, params: { buyer } }}
            navigation={navigation}
            editable={true}
          />
        </TabScreen>
      </Tabs>
      <Button
        mode="outlined"
        onPress={() => {
          navigation.popToTop()
          if (buyer) logout(buyer)
        }}
      >
        Logga ut
      </Button>
    </>
  )
}
export default BuyerProfile

const styles = StyleSheet.create({
  header: {
    margin: 16,
  },
  card: {
    margin: 10,
    backgroundColor: 'white',
  },
  infoCard: {
    marginTop: 5,
    marginBottom: 5,
  },
})
