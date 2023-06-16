import { Text, Button, List, useTheme, Divider, Card } from 'react-native-paper'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { Tabs, TabScreen } from 'react-native-paper-tabs'
import { ScrollView } from 'react-native-gesture-handler'
import Buyer from './Buyer'

import useAuth from '../hooks/useAuth'

const BuyerProfile = ({
  route,
  navigation,
}: {
  route: any
  navigation: any
}) => {
  const theme = useTheme()
  const [buyer, , logout] = useAuth()

  console.log('buyer profile', buyer)
  return (
    <>
      <Tabs
        uppercase={false}
        style={{ backgroundColor: theme.colors.surface }}
        theme={theme}
      >
        <TabScreen label="Aktuellt">
          <ScrollView>
            <List.Accordion title="Anbudsförfrågningar">
              <List.Subheader>Publicerade</List.Subheader>
              <Card>
                <Card.Title
                  titleVariant="bodyMedium"
                  title="Morötter"
                  subtitle="1 000 kg"
                ></Card.Title>
              </Card>
              <Card>
                <Card.Title title="Potatis" subtitle="2 000 kg"></Card.Title>
              </Card>
              <List.Subheader>Utkast</List.Subheader>
              <Card>
                <Card.Title title="Potatis" subtitle="1 500 kg"></Card.Title>
              </Card>
            </List.Accordion>
            <Divider />
            <List.Accordion title="Erbjudanden">
              <List.Subheader>Favoriter</List.Subheader>
              <Card>
                <Card.Title
                  title="Fina morötter"
                  subtitle="Upp till 5 000 kg per år, leverans veckovis"
                ></Card.Title>
              </Card>
              <List.Subheader>Tidigare besökta</List.Subheader>
            </List.Accordion>
          </ScrollView>
        </TabScreen>
        <TabScreen label="Mina avtal">
          <ScrollView>
            <List.Accordion title="Pågående" expanded={true}>
              <Card>
                <Card.Title
                  title="Morötter"
                  subtitle="500 kg | Wermlands Mejeri"
                ></Card.Title>
              </Card>
              <Card>
                <Card.Title
                  title="Morötter"
                  subtitle="700 kg | Wermlands Mejeri"
                ></Card.Title>
              </Card>
            </List.Accordion>
            <Divider />
            <List.Accordion title="Avslutade">
              <Card>
                <Card.Title
                  title="Morötter"
                  subtitle="500 kg | Wermlands Mejeri"
                ></Card.Title>
              </Card>
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
        onPress={() => navigation.popToTop() || logout(buyer)}
      >
        Logga ut
      </Button>
    </>
  )
}

export default BuyerProfile
