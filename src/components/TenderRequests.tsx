import * as React from 'react'
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Searchbar,
  Text,
  Title,
} from 'react-native-paper'
import { ScrollView, StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import tenderRequests from '../data/tenderRequests'

const TenderRequests = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [checkboxStatus, setCheckboxStatus] = React.useState({
    favoriter: false,
    öppna: false,
    tilldelade: false,
  })
  const handleCheckboxChange = (key) => {
    setCheckboxStatus((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }))
  }

  return (
    <ScrollView>
      <Searchbar
        placeholder="Sök vara"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <Text style={styles.label}>Visa urval</Text>
      <View style={styles.checkboxContainer}>
        {Object.keys(checkboxStatus).map((key) => (
          <View style={styles.checkbox} key={key}>
            <Checkbox
              status={checkboxStatus[key] ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange(key)}
            />
            <Text>{key}</Text>
          </View>
        ))}
      </View>
      <Title>Öppna förfrågningar</Title>

      {tenderRequests.map(({ id, title, subtitle, image }) => (
        <Card
          key={id}
          style={styles.card}
          onPress={() => navigation.navigate('TenderRequest', { id })}
        >
          <Card.Title
            titleVariant="headlineMedium"
            title={title}
            subtitle={subtitle}
          />

          <Card.Cover source={{ uri: image }} style={styles.cover} />
        </Card>
      ))}
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
