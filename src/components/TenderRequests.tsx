import * as React from 'react'
import { Avatar, Button, Card, Text } from 'react-native-paper'
import { ScrollView, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import tenderRequests from '../data/tenderRequests'

const TenderRequests = ({ navigation }) => (
  <ScrollView>
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
})
