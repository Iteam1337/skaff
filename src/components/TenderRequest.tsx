import { useEffect, useState } from 'react'
import {
  Caption,
  Headline,
  Subheading,
  useTheme,
  Text,
  Button,
  Paragraph,
  Divider,
} from 'react-native-paper'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Tabs, TabScreen } from 'react-native-paper-tabs'
import Chat from './Chat'
import useTenderRequests from '../hooks/useTenderRequests'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import useAuth from '../hooks/useAuth'

const TenderRequest = ({
  route,
  navigation,
}: {
  route: any
  navigation: any
}) => {
  const [tenderRequest, setTenderRequest] = useState({})

  const [tenderRequests, update, add, refresh] = useTenderRequests()

  const theme = useTheme()
  const [user] = useAuth()

  console.log('route.params?.id', route.params?.id)

  useEffect(() => {
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

  return (
    <>
      <View style={{ ...styles.container, marginTop: 20 }}>
        <Headline>{tenderRequest.title}</Headline>
        <Subheading>{tenderRequest.buyer?.name}</Subheading>
      </View>
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
          <ScrollView style={{ backgroundColor: '#ffffff' }}>
            <Container>
              <Row>
                <Column>
                  <Caption>Sista svar</Caption>
                  <Text>
                    {tenderRequest.lastOfferDate?.toString().split('T')[0] ||
                      'Inget datum'}
                  </Text>
                </Column>
                <Column>
                  <Caption>Tilldelning senast</Caption>
                  <Text>
                    {tenderRequest.lastAwardDate?.toString().split('T')[0] ||
                      'Inget datum'}
                  </Text>
                </Column>
              </Row>
            </Container>
            <Container>
              <Row>
                <Column>
                  <Caption>Leveransplan</Caption>
                  <Text>{tenderRequest.deliveryPlan}</Text>
                </Column>
                <Column>
                  <Caption>Första leverans</Caption>
                  <Text>
                    {tenderRequest.deliveryStartDate?.toString().split('T')[0]}
                  </Text>
                </Column>
              </Row>
            </Container>
            <Container>
              <Subheading>Villkor</Subheading>
              <Paragraph>{tenderRequest.terms}</Paragraph>
            </Container>
            <Divider />
            <Container>
              <Subheading>Urval</Subheading>
              <Paragraph>{tenderRequest.grading}</Paragraph>
            </Container>
            <Container>
              <Subheading>Krav</Subheading>
              {tenderRequest.qualificationCriteria?.map((criteria, i) => (
                <Paragraph key={i}>{criteria}</Paragraph>
              ))}
            </Container>
            <Container>
              <Subheading>Önskemål</Subheading>
              {tenderRequest.optionalCriteria?.map((optionalCriteria, i) => (
                <Paragraph key={i}>{optionalCriteria}</Paragraph>
              ))}
            </Container>
            <Container
              style={{
                flexDirection: 'row',
                display: 'flex',
                backgroundColor: '#DCF6FE',
                margin: 20,
                padding: 10,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <MaterialCommunityIcons
                name="exclamation"
                color="black"
                size={20}
              />
              <Paragraph style={{ paddingLeft: 10, paddingRight: 20 }}>
                Ett uppfyllt önskemål genererar, i jämförelsen mot andra anbud,
                ett prisavdrag motsvarande det uppskattade värdet. Offererat
                pris är fortfarande det som gäller vid fakturering.
              </Paragraph>
            </Container>
          </ScrollView>
        </TabScreen>
        <TabScreen label="Meddelande">
          <Chat />
        </TabScreen>
        <TabScreen label="Anbud">
          {user?.type === 'supplier' && (
            <Container>
              <Paragraph>
                För att lämna anbud måste du vara ansluten till detta DIS. För
                att kontrollera att du är det kan du gå till xx..yy.z
              </Paragraph>
              <Button
                mode="contained"
                onPress={() => {
                  console.log('skapa anbud nu plz')
                  navigation.navigate('TenderRequests', {
                    screen: 'CreateOffer',
                    params: {
                      id: tenderRequest.id,
                    },
                  })
                }}
              >
                Lämna anbud
              </Button>
            </Container>
          )}
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

const Container = ({ children, style }: { children: any; style?: any }) => (
  <View style={{ ...styles.container, ...style }}>{children}</View>
)

export default TenderRequest

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'white',
  },
})
