import * as React from "react"
import { Avatar, Button, Card, Text } from "react-native-paper"
import { ScrollView, StyleSheet } from "react-native"
import { StatusBar } from "expo-status-bar"

const offers = [
  {
    id: 1,
    title: "Morötter 100kg",
    subtitle: "Svegs Gård AB",
    image: "https://picsum.photos/seed/1/700",
  },
  {
    id: 2,
    title: "Vetemjöl 100kg",
    subtitle: "Rönnängs Gård AB",
    image: "https://picsum.photos/seed/2/700",
  },
  {
    id: 3,
    title: "Köttfärs 100kg",
    subtitle: "BdG AB",
    image: "https://picsum.photos/seed/3/700",
  },
]

const Offers = ({ navigation }) => (
  <ScrollView>
    {offers.map(({ id, title, subtitle, image }) => (
      <Card
        key={id}
        style={styles.card}
        onPress={() => navigation.navigate("Offer", { id })}
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

export default Offers

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: "white",
  },
  cover: {
    height: 200,
    borderRadius: 0,
  },
})
