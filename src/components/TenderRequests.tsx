import * as React from 'react'
import { Card, Checkbox, FAB, List, Searchbar } from 'react-native-paper'
import { ScrollView, StyleSheet, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import useTenderRequests from '../hooks/useTenderRequests'
import { getAuthenticatedUserType } from '../../lib/authStorage'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'

const ChevronRight = () => (
  <MaterialCommunityIcons
    size={25}
    style={{ marginRight: 20 }}
    name="chevron-right"
  />
)

const TenderRequests = ({ navigation }: { navigation: any }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [open, setOpen] = useState(true)

  const [user] = useAuth()

  const [tenderRequests, update, add, refresh] = useTenderRequests()

  React.useEffect(() => {
    refresh()
  }, [])

  const filteredRequests =
    (!searchQuery && tenderRequests) ||
    tenderRequests.filter((request) =>
      request.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return (
    <>
      <ScrollView>
        <Searchbar
          placeholder="Sök upphandling"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
        <List.Section>
          <List.Accordion
            title="Aktiva upphandlingar"
            onPress={() => setOpen(!open)}
            expanded={open}
          >
            {filteredRequests.map(({ id, title, buyer, image }) => (
              <Card
                key={id}
                style={styles.card}
                onPress={() => navigation.navigate('TenderRequest', { id })}
              >
                <Card.Title
                  key={id}
                  titleVariant="titleSmall"
                  titleStyle={{
                    fontSize: 14,
                  }}
                  title={title}
                  subtitle={buyer.name}
                  right={(props) => <ChevronRight />}
                />
              </Card>
            ))}
          </List.Accordion>

          <List.Accordion title="Tilldelade förfrågningar">
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>
        </List.Section>
      </ScrollView>
      {user?.type === 'buyer' && (
        <FAB
          style={styles.fab}
          onPress={
            () => navigation.navigate('CreateTenderRequest') //, { screen: 'CreateTenderRequest' }
          }
          icon="plus"
        />
      )}
    </>
  )
}

export default TenderRequests

const styles = StyleSheet.create({
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

  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  title: {
    marginHorizontal: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  searchbar: {
    backgroundColor: 'white',
    elevation: false,
    marginBottom: 16,
  },
})
