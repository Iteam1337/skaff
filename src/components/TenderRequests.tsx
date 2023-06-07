import * as React from 'react'
import { Card, Checkbox, FAB, List, Searchbar } from 'react-native-paper'
import { ScrollView, StyleSheet, View } from 'react-native'
import tenderRequests from '../data/tenderRequests'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getAuthenticatedUserType } from '../../lib/authStorage'
import { useState } from 'react'

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
  const [userType, setUserType] = useState('')

  const filteredRequests = tenderRequests.filter((request) =>
    request.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // const handleCheckboxChange = (key) => {
  //   setCheckboxStatus((prevState: any) => ({
  //     ...prevState,
  //     [key]: !prevState[key],
  //   }))
  // }
  getAuthenticatedUserType().then((userType) => {
    if (userType) setUserType(userType)
  })

  return (
    <>
      <ScrollView>
        <Searchbar
          placeholder="Sök upphandling"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <List.Section title="Visa">
          <View style={styles.checkboxContainer}>
            <Checkbox.Item
              labelVariant="bodySmall"
              label="Favoriter"
              status="checked"
            />
            <Checkbox.Item label="Öppna" status="checked" />
            <Checkbox.Item label="Tilldelade" status="checked" />
          </View>
        </List.Section>
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
                  subtitle={buyer}
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
      {userType && userType == 'Buyer' && (
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
})
