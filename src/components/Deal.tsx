import * as React from 'react'
import {
  Caption,
  Headline,
  Subheading,
  useTheme,
  Text,
  DataTable,
  Checkbox,
  Button,
} from 'react-native-paper'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Tabs, TabScreen } from 'react-native-paper-tabs'
import Chat from './Chat'
import deals from '../data/deals'
import { certifications } from '../data/categories'
import useAuth from '../hooks/useAuth'

const Header = ({ product, supplier, price }) => (
  <View style={{ ...styles.container, ...styles.header }}>
    <Headline>{product.name}</Headline>
    <Subheading>{supplier.name}</Subheading>
    <Subheading style={{ fontWeight: 'bold' }}>
      {Math.round(price.SEK).toLocaleString('sv')} kr
    </Subheading>
  </View>
)

const Deal = ({ route, navigation }) => {
  const [favorite, setFavorite] = React.useState(false)
  const [deal, setDeal] = React.useState(route.params.deal)

  const [deals] = useDeals()

  React.useEffect(() => {
    if (route.params.dealId) {
      const deal = deals.find(({ id }) => id === route.params.dealId)
      setDeal(deal)
    }
  }, [route.params.dealId])

  if (!deal) return <Text>Deal not found: {route.params.dealId}</Text>

  const theme = useTheme()

  console.log('deal', deal)
  const getTitle = function (deal: any) {
    return (
      deal.commodity.group +
      ' i kategorin ' +
      deal.commodity.mainGroup.toLocaleLowerCase() +
      ' ' +
      deal.commodity.area.toLocaleLowerCase()
    )
  }

  const toggleFavorite = function (deal: any, on: boolean = !favorite) {
    global.alert('Ej implementerad än')
  }

  React.useLayoutEffect(() => {
    // publish button in header:
    navigation.setOptions({
      headerRight: () => (
        <Button
          children={[]}
          icon={favorite ? 'star' : 'star-outline'}
          onPress={() => toggleFavorite(deal, !favorite)}
        />
      ),
    })
  }, [deal, favorite])

  return (
    <>
      <Header {...deal} />
      <Tabs
        // defaultIndex={0} // default = 0
        uppercase={false} // true/false | default=true | labels are uppercase
        // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
        // iconPosition // leading, top | default=leading
        style={{ backgroundColor: '#D8F5E3' }}
        dark={false} // works the same as AppBar in react-native-paper
        theme={theme} // works the same as AppBar in react-native-paper
        // mode="scrollable" // fixed, scrollable | default=fixed
        // onChangeIndex={(newIndex) => {}} // react on index change
        // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
        // disableSwipe={false} // (default=false) disable swipe to left/right gestures
      >
        <TabScreen label="Information">
          <ScrollView>
            <Container>
              <Row>
                <Column>
                  <Caption>Tillverkare</Caption>
                  <Text>{deal.product.manufacturer || 'Ej känt'}</Text>
                </Column>
                <Column>
                  <Caption>Varumärke</Caption>
                  <Text>{deal.product.brand || 'Ej känt'}</Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Caption>Beskrivning</Caption>
                  <Text>
                    {getTitle(deal)} Säljs i paket om{' '}
                    {deal.price.kilos?.toLocaleString('sv')}kg.
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Caption>Pris</Caption>
                  <Text>
                    {deal.price.SEK_per_Kg?.toLocaleString('sv')} kr/kg
                  </Text>
                </Column>
                <Column>
                  <Caption>Paketstorlek</Caption>
                  <Text>{deal.price.kilos.toLocaleString('sv')} kg</Text>
                </Column>
              </Row>
            </Container>

            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Miljömärkning</DataTable.Title>
                <DataTable.Title>Godkänd</DataTable.Title>
              </DataTable.Header>
              {Object.entries(deal.certifications)
                .filter(([, checked]) => checked)
                .map(([cert, checked], i) => (
                  <DataTable.Row key={i}>
                    <DataTable.Cell>
                      {certifications[cert].title}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Checkbox status={checked ? 'checked' : 'unchecked'} />
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
            </DataTable>
            <View style={styles.actionContainer}>
              <Button
                mode="contained"
                onPress={() =>
                  navigation.navigate('TenderRequests', {
                    screen: 'CreateTenderRequest',
                    params: {
                      title: deal.product.name,
                    },
                  })
                }
                uppercase={false}
              >
                Skapa anbudsförfrågan
              </Button>
            </View>
          </ScrollView>
        </TabScreen>
        <TabScreen label="Meddelande">
          <Chat />
        </TabScreen>
        {/* <TabScreen
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
              onPress={() => navigation.navigate('CreateOffer', { dealId: id })}
            >
              Lämna anbud
            </Button>
          </Container>
        </TabScreen> */}
      </Tabs>
    </>
  )
}

const Row = ({ children }) => (
  <View style={{ flexDirection: 'row', marginBottom: 10 }}>{children}</View>
)

const Column = ({ children }) => (
  <View style={{ flexDirection: 'column', marginRight: 20, flex: 1 }}>
    {children}
  </View>
)

const Container = ({ children }) => (
  <View style={styles.container}>{children}</View>
)

export default Deal

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: {},
  actionContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 20,
  },
})
