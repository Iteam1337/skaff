import { Button, List, useTheme, Divider, Card } from 'react-native-paper'
import { Tabs, TabScreen } from 'react-native-paper-tabs'
import Supplier from './Supplier'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useOffers from '../hooks/useOffers'
import OfferCard from './OfferCard'
import { ScrollView } from 'react-native'
import useTenderRequests from '../hooks/useTenderRequests'
import useDeals from '../hooks/useDeals'
import DealCard from './DealCard'
import TenderRequestCard from './TenderRequestCard'

const SupplierProfile = ({
  route,
  navigation,
}: {
  route: any
  navigation: any
}) => {
  const theme = useTheme()
  const [showOffers, setShowOffers] = useState(true)
  const [tenderRequests, , , refreshTenderRequests] = useTenderRequests()
  const [deals, , , refreshDeals] = useDeals()
  const { user: supplier, logout } = useAuth()
  const [offers, , , refreshOffers] = useOffers()

  if (!supplier) return null
  useEffect(() => {
    refreshTenderRequests()
    navigation.header = 'Profil'
    navigation.setOptions({ title: supplier.name })
  }, [supplier])

  useEffect(() => {
    refreshOffers()
    refreshTenderRequests()
    refreshDeals()
  }, [])

  const myOffers = offers.filter((o) => o.supplier.id === supplier.id)
  const myDeals = deals.filter((o) => o.supplier.id === supplier.id)
  const myTenderRequests = tenderRequests.filter((tr) =>
    myOffers.some((offer) => offer.tenderRequestId === tr.id)
  )

  return (
    <>
      <Tabs
        uppercase={false}
        style={{ backgroundColor: '#D8F5E3' }}
        theme={theme}
      >
        <TabScreen label="Aktuellt">
          <ScrollView>
            <List.Accordion
              title="Anbud"
              expanded={showOffers}
              onPress={() => setShowOffers((show) => !show)}
            >
              <List.Subheader>Inskickade anbud</List.Subheader>
              {myOffers.length === 0 && (
                <Card.Title
                  title="Inga anbud"
                  subtitle="Du har inte skickat in några anbud"
                ></Card.Title>
              )}
              {myOffers.map((offer, i) => (
                <OfferCard
                  key={i}
                  user={supplier}
                  key={offer.id}
                  offer={offer}
                  navigation={navigation}
                />
              ))}
            </List.Accordion>
            <Divider />
            <List.Accordion title="Erbjudanden" expanded={true}>
              <List.Subheader>Publicerade</List.Subheader>
              {myDeals.map((deal, i) => (
                <DealCard
                  key={i}
                  user={supplier}
                  deal={deal}
                  navigation={navigation}
                />
              ))}
            </List.Accordion>
          </ScrollView>
        </TabScreen>
        <TabScreen label="Mina avtal">
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
                    user={supplier}
                    key={tenderRequest.id}
                    tenderRequest={tenderRequest}
                    navigation={navigation}
                  />
                ))}
            </List.Accordion>
            <Divider />
            <List.Accordion title="Avslutade">
              {myTenderRequests
                .filter((t) =>
                  offers
                    .filter((o) => o.approved)
                    .some((o) => o.tenderRequestId === t.id)
                )
                .map((tenderRequest, i) => (
                  <TenderRequestCard
                    key={tenderRequest.id}
                    user={supplier}
                    key={tenderRequest.id}
                    tenderRequest={tenderRequest}
                    navigation={navigation}
                  />
                ))}
            </List.Accordion>
          </ScrollView>
        </TabScreen>
        <TabScreen label="Profil">
          <Supplier
            route={{ ...route, params: { supplier } }}
            navigation={navigation}
            editable={true}
          ></Supplier>
        </TabScreen>
      </Tabs>
      <Button
        mode="outlined"
        onPress={() => navigation.popToTop() || logout(supplier)}
      >
        Logga ut
      </Button>
    </>
  )
}

export default SupplierProfile
