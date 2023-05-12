import * as React from 'react'
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  IconButton,
  List,
  Searchbar,
  Text,
  Title,
} from 'react-native-paper'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import tenderRequests from '../data/tenderRequests'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ChevronRight = () => (
  <MaterialCommunityIcons
    size="25"
    style={{ marginRight: 20 }}
    name="chevron-right"
  />
)

const TenderRequests = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [open, setOpen] = React.useState(true)

  const filteredRequests = tenderRequests.filter((request) =>
    request.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCheckboxChange = (key) => {
    setCheckboxStatus((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }))
  }

  return (
    <ScrollView>
      <Searchbar
        placeholder="Sök upphandling"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <List.Section title="Visa urval">
        <View style={styles.checkboxContainer}>
          <Checkbox.Item label="Favoriter" status="checked" />
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
          {filteredRequests.map(({ id, title, subtitle, image }) => (
            <Card
              key={id}
              style={styles.card}
              onPress={() => navigation.navigate('TenderRequest', { id })}
            >
              <Card.Title
                titleVariant="headlineMedium"
                title={title}
                subtitle={subtitle}
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
  )
}

export default TenderRequests

const styles = StyleSheet.create({
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
