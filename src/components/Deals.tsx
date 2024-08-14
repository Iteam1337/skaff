import * as React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Card, FAB, List, Searchbar, Text } from 'react-native-paper'
import { areas } from '../data/categories'
import { Deal } from '../data/deals'
import useAuth from '../hooks/useAuth'
import useDeals from '../hooks/useDeals'

interface Area {
  image: string
  title: string
  count: number
}

const Deals = ({ navigation }: { navigation: any }) => {
  const [expanded, setExpanded] = React.useState({})
  const [searchQuery, setSearchQuery] = React.useState('')
  const [filteredDeals, setFilteredDeals] = React.useState(new Array<Deal>())

  const [deals, , , refresh] = useDeals()
  const { user } = useAuth()
  const [activeAreas, setActiveAreas] = React.useState<{ [key: string]: Area }>(
    {}
  )

  React.useLayoutEffect(() => {
    refresh()
  }, [])

  React.useEffect(() => {
    setFilteredDeals(
      deals.filter((deal) =>
        deal.product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  }, [areas, searchQuery, deals])

  React.useEffect(() => {
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
    setActiveAreas(activeAreas)
  }, [filteredDeals])

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
          .filter(([, c]) => c.count > 0)
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
                <Card.Cover
                  source={{ uri: `https://skaff-api.iteam.pub${area.image}` }}
                />
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
                {filteredDeals
                  .filter((d) => d.commodity.area === area.title)
                  .sort((a, b) => a.product.name.localeCompare(b.product.name))
                  .map((deal) => (
                    <List.Item
                      key={deal.id}
                      right={() => <Text>{deal.price.SEK_per_Kg} kr/kg</Text>}
                      title={deal.product.name}
                      description={deal.supplier.name}
                      onPress={() => navigation.navigate('Deal', { deal })}
                    />
                  ))}
              </List.Accordion>
            </Card>
          ))}
      </ScrollView>
      {user?.type === 'supplier' && (
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
