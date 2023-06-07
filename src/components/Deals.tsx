import * as React from 'react'
import { Card, FAB, List, Searchbar, Text } from 'react-native-paper'
import { ScrollView, StyleSheet } from 'react-native'
import deals from '../data/deals'
import { areas } from '../data/categories'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Chat from './Chat'
import { getAuthenticatedUserType } from '../../lib/authStorage'
import { useState } from 'react'

interface Area {
  image: string
  title: string
  count: number
}

const Deals = ({ navigation }: { navigation: any }) => {
  const [expanded, setExpanded] = React.useState({})
  const [userType, setUserType] = useState('')
  const [searchQuery, setSearchQuery] = React.useState('')

  const filteredDeals = deals.filter((deal) =>
    deal.product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
  getAuthenticatedUserType().then((userType) => {
    if (userType) setUserType(userType)
  })
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
      {userType && userType == 'Supplier' && (
        <FAB
          style={styles.fab}
          onPress={() => navigation.navigate('CreateDeal')} //, { screen: 'CreateDeal' })}
          icon="plus"
        />
      )}
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
