import * as React from 'react'
import { Avatar, Button, Card, Text } from 'react-native-paper'
import { ScrollView, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import deals from '../data/deals'
import { CustomHeader } from './Header'

const Deals = ({ navigation }) => (
  <ScrollView>
    {deals.map(({ id, title, subtitle, image }) => (
      <Card
        key={id}
        style={styles.card}
        onPress={() => navigation.navigate('Deal', { id })}
      >
        <Card.Title
          titleVariant="headlineMedium"
          title={title}
          subtitle={subtitle}
        />
      </Card>
    ))}
  </ScrollView>
)

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
