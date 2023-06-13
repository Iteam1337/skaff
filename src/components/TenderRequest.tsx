import { useEffect, useState } from 'react'
import {
  Caption,
  Headline,
  Subheading,
  useTheme,
  Text,
  DataTable,
  Checkbox,
  Button,
  Paragraph,
} from 'react-native-paper'
import { ScrollView, StyleSheet, View } from 'react-native'
import tenderRequests from '../data/tenderRequests'
import { Tabs, TabScreen } from 'react-native-paper-tabs'
import Chat from './Chat'

const Header = ({ tenderRequest: { title, price, buyer } }) => (
  <View style={styles.container}>
    <Headline>{title}</Headline>
    <Subheading>{buyer?.name}</Subheading>
  </View>
)

const TenderRequest = ({
  route,
  navigation,
}: {
  route: any
  navigation: any
}) => {
  const [tenderRequest, setTenderRequest] = useState({})

  const theme = useTheme()

  useEffect(() => {
    if (route.params?.id) {
      const tenderRequest = tenderRequests.find(
        (offer) => offer.id === route.params?.id
      )
      if (tenderRequest) setTenderRequest(tenderRequest)
    }
  }, [route.params])

  return (
    <>
      <Header tenderRequest={{ ...tenderRequest }} />
      <Tabs
        // defaultIndex={0} // default = 0
        uppercase={false} // true/false | default=true | labels are uppercase
        // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
        // iconPosition // leading, top | default=leading
        style={{
          backgroundColor: theme.colors.surface,
        }} // works the same as AppBar in react-native-paper
        // dark={false} // works the same as AppBar in react-native-paper
        theme={theme} // works the same as AppBar in react-native-paper
        // mode="scrollable" // fixed, scrollable | default=fixed
        // onChangeIndex={(newIndex) => {}} // react on index change
        // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
        // disableSwipe={false} // (default=false) disable swipe to left/right gestures
      >
        <TabScreen label="Förfrågan">
          <ScrollView>
            <Container>
              <Row>
                <Column>
                  <Caption>Sista svar</Caption>
                  <Text>{tenderRequest.applicationDate || 'Inget datum'}</Text>
                </Column>
                <Column>
                  <Caption>Tilldelning senast</Caption>
                  <Text>{tenderRequest.assignmentDate || 'Inget datum'}</Text>
                </Column>
              </Row>
            </Container>

            <DataTable backgroundColor="#fff">
              <DataTable.Header>
                <DataTable.Title>Datum</DataTable.Title>
                <DataTable.Title>Storlek</DataTable.Title>
                <DataTable.Title>Levererad</DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell>2023-06-01</DataTable.Cell>
                <DataTable.Cell>159kg</DataTable.Cell>
                <DataTable.Cell>
                  <Checkbox status="checked" />
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>2023-07-01</DataTable.Cell>
                <DataTable.Cell>237kg</DataTable.Cell>
                <DataTable.Cell>
                  <Checkbox status="checked" />
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>2023-09-01</DataTable.Cell>
                <DataTable.Cell>350kg</DataTable.Cell>
                <DataTable.Cell>
                  <Checkbox status="unchecked" />
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>

            <Container>
              <Caption>Villkor</Caption>
              <Paragraph>
                Producent ansvarar för leverans till Storskolan, Storköping
                enligt överenskommelse.
              </Paragraph>
              <Caption>Urval</Caption>
              <Paragraph>
                Inlämnade anbud som uppfyller krav utvärderas efter pris och
                uppfyllda önskemål.
              </Paragraph>
              <Caption>Önskemål</Caption>
              <Paragraph>Ekologiskt odlat</Paragraph>
            </Container>
          </ScrollView>
        </TabScreen>
        <TabScreen label="Frågor">
          <Chat />
        </TabScreen>
        <TabScreen
          label="Anbud"
          // icon="bag-suitcase"
          // optional props
          // onPressIn={() => {
          //   console.log('onPressIn explore');
          // }}
          // onPress={() => {
          //   console.log('onPress explore');
          // }}
        >
          <Container>
            <Paragraph>
              För att lämna anbud måste du vara ansluten till detta DIS. För att
              kontrollera att du är det kan du gå till xx..yy.z
            </Paragraph>
            <Button
              mode="contained"
              onPress={() =>
                navigation.navigate('TenderRequests', {
                  screen: 'CreateOffer',
                  params: {
                    id: tenderRequest.id,
                  },
                })
              }
            >
              Lämna anbud
            </Button>
          </Container>
        </TabScreen>
      </Tabs>
    </>
  )
}

const Row = ({ children }) => (
  <View style={{ flexDirection: 'row' }}>{children}</View>
)

const Column = ({ children }) => (
  <View style={{ flexDirection: 'column', marginRight: 20 }}>{children}</View>
)

const Container = ({ children }) => (
  <View style={styles.container}>{children}</View>
)

export default TenderRequest

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: 'white' },
})
