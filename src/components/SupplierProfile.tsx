import { Text, Button, List, useTheme, Divider, Card } from 'react-native-paper'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { Tabs, TabScreen } from 'react-native-paper-tabs'
import { ScrollView } from 'react-native-gesture-handler'
import Supplier from './Supplier'
import { getAuthenticatedUser } from '../../lib/authStorage'
import { SetStateAction, useState } from 'react'
import useAuth from '../hooks/useAuth'

const SupplierProfile = ({
  route,
  navigation,
}: {
  route: any
  navigation: any
}) => {
  const theme = useTheme()
  const [user] = useAuth()
  return (
    <>
      <Tabs
        uppercase={false}
        style={{ backgroundColor: theme.colors.surface }}
        theme={theme}
      >
        <TabScreen label="Aktuellt">
          <ScrollView>
            <List.Accordion title="Anbud">
              <List.Subheader>Inskickade anbud</List.Subheader>
              <Card>
                <Card.Title
                  title="Morötter"
                  subtitle="1 000 kg | Kvarnbergsskolan, Karlstad"
                ></Card.Title>
              </Card>
              <Card>
                <Card.Title
                  title="Potatis"
                  subtitle="2 000 kg | Kvarnbergsskolan, Karlstad"
                ></Card.Title>
              </Card>
              <List.Subheader>Utkast</List.Subheader>
              <Card>
                <Card.Title
                  title="Potatis"
                  subtitle="1 500 kg | Nyeds skola, Molkom"
                ></Card.Title>
              </Card>
              <List.Subheader>Favoriter</List.Subheader>
              <List.Subheader>Tidigare besökta</List.Subheader>
            </List.Accordion>
            <Divider />
            <List.Accordion title="Erbjudanden">
              <List.Subheader>Publicerade</List.Subheader>
              <Card>
                <Card.Title
                  title="Fina morötter"
                  subtitle="Upp till 5 000 kg per år, leverans veckovis"
                ></Card.Title>
              </Card>
              <List.Subheader>Utkast</List.Subheader>
            </List.Accordion>
          </ScrollView>
        </TabScreen>
        <TabScreen label="Mina avtal">
          <ScrollView>
            <List.Accordion title="Pågående" expanded={true}>
              <Card>
                <Card.Title
                  title="Morötter"
                  subtitle="500 kg | Fredricelundsskolan, Karlstad"
                ></Card.Title>
              </Card>
              <Card>
                <Card.Title
                  title="Morötter"
                  subtitle="700 kg | Nyeds skola, Molkom"
                ></Card.Title>
              </Card>
            </List.Accordion>
            <Divider />
            <List.Accordion title="Avslutade">
              <Card>
                <Card.Title
                  title="Morötter"
                  subtitle="500 kg | Nyeds skola, Molkom"
                ></Card.Title>
              </Card>
            </List.Accordion>
          </ScrollView>
        </TabScreen>
        <TabScreen label="Profil">
          <Supplier
            route={{ ...route, params: { supplier: user } }}
            navigation={navigation}
            editable={true}
          ></Supplier>
        </TabScreen>
      </Tabs>
      <Button mode="outlined" onPress={() => navigation.popToTop()}>
        Logga ut
      </Button>
    </>
  )
}

export default SupplierProfile
