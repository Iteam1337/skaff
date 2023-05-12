import * as React from 'react'
import {
  Avatar,
  Badge,
  Button,
  Card,
  List,
  Searchbar,
  Text,
} from 'react-native-paper'
import { ScrollView, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import deals from '../data/deals'
import { CustomHeader } from './Header'
import Categories, { areas } from '../data/categories'
import {
  Accordion,
  AccordionGroup,
} from 'react-native-paper/lib/typescript/src/components/List/List'

const Deals = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const filteredDeals = deals.filter((deal) =>
    deal.product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeAreas = Object.entries(areas).reduce(
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
    <ScrollView>
      <Searchbar
        placeholder="Sök erbjudande"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      {Object.entries(activeAreas)
        .filter(([, { count }]) => count > 0)
        .map(([, area]) => (
          <Card>
            <Card.Cover source={area.image} />
            <List.Accordion
              title={area.title}
              expanded={searchQuery || undefined}
            >
              <List.Subheader>{`${area.count} varor`}</List.Subheader>
              {filteredDeals
                .filter((d) => d.commodity.area === area.title)
                .sort((a, b) => a.product.name.localeCompare(b.product.name))
                .map((deal) => (
                  <List.Item
                    key={deal.id}
                    right={() => <Text>{deal.price.SEK_per_Kg} kr/kg</Text>}
                    title={deal.product.name}
                    description={deal.product.brand}
                    onPress={() => navigation.navigate('Deal', { id: deal.id })}
                  />
                ))}
            </List.Accordion>
          </Card>
        ))}
    </ScrollView>
  )
}

export default Deals

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: 'white',
  },
  cover: {
    height: 200,
    borderRadius: 0,
  },
})
