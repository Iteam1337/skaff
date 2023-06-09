import * as React from 'react'
import {
  Avatar,
  Badge,
  Button,
  Card,
  FAB,
  List,
  Searchbar,
  Text,
} from 'react-native-paper'
import { ScrollView, StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { CustomHeader } from './Header'
import { areas } from '../data/categories'
import {
  Accordion,
  AccordionGroup,
} from 'react-native-paper/lib/typescript/src/components/List/List'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Chat from './Chat'
import useDeals from '../hooks/useDeals.ts'
import { Deal } from '../data/deals'

interface Area {
  image: string
  title: string
  count: number
}

const Deals = ({ navigation }: { navigation: any }) => {
  const [expanded, setExpanded] = React.useState({})
  const [searchQuery, setSearchQuery] = React.useState('')
  const [filteredDeals, setFilteredDeals] = React.useState(new Array<Deal>())

  const [deals, update, add, refresh] = useDeals()

  React.useEffect(() => {
    console.log('refresh')
    refresh()
  }, [])

  React.useEffect(() => {
    console.log('filter')

    setFilteredDeals(
      deals.filter((deal) =>
        deal.product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  }, [searchQuery, deals])

  const activeAreas: { [key: string]: Area } = Object.entries(areas).reduce(
    (result, [key, area]) =>
      Object.assign(result, {
        [key]: {
          ...area,
          count: filteredDeals.filter((d) => d.commodity.area === area.title)
            .length,
        },
      }),
    {}
  )
  return (
    <>
      <ScrollView>
        <Searchbar
          placeholder="Sök erbjudande"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />

        {Object.entries(activeAreas)
          .filter(([, { count }]) => count > 0)
          .map(([, area]) => (
            <Card key={area.title}>
              <TouchableOpacity
                onPress={() =>
                  setExpanded((expanded) => ({
                    ...expanded,
                    [area.title]: !expanded[area.title],
                  }))
                }
              >
                <Card.Cover source={area.image} />
              </TouchableOpacity>
              <List.Accordion
                title={area.title}
                expanded={
                  !!searchQuery ||
                  (expanded[area.title] as boolean) ||
                  undefined
                }
              >
                <List.Subheader>{`${area.count} varor`}</List.Subheader>
                <List.Item
                  title=""
                  description={() => <Chat></Chat>}
                ></List.Item>
                {filteredDeals
                  .filter((d) => d.commodity.area === area.title)
                  .sort((a, b) => a.product.name.localeCompare(b.product.name))
                  .map((deal) => (
                    <List.Item
                      key={deal.id}
                      right={() => <Text>{deal.price.SEK_per_Kg} kr/kg</Text>}
                      title={deal.product.name}
                      description={deal.product.brand}
                      onPress={() =>
                        navigation.navigate('Deal', { id: deal.id })
                      }
                    />
                  ))}
              </List.Accordion>
            </Card>
          ))}
      </ScrollView>
      <FAB
        style={styles.fab}
        onPress={() =>
          navigation.navigate('Supplier', { screen: 'CreateDeal' })
        }
        icon="plus"
      />
    </>
  )
}

export default Deals

const styles = StyleSheet.create({
  searchbar: {
    backgroundColor: 'white',
    elevation: false,
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  card: {
    margin: 10,
    backgroundColor: 'white',
  },
  cover: {
    height: 200,
    borderRadius: 0,
  },
})
