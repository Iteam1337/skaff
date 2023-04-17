import * as React from "react"
import { Avatar, Button, Card, Text } from "react-native-paper"
import { ScrollView } from "react-native"

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />

const offers = [
  {
    id: 1,
    title: "Morötter 100kg",
    subtitle: "Svegs Gård AB",
    image: "https://picsum.photos/700",
  },
  {
    id: 2,
    title: "Vetemjöl 100kg",
    subtitle: "Rönnängs Gård AB",
    image: "https://picsum.photos/700",
  },
  {
    id: 3,
    title: "Köttfärs 100kg",
    subtitle: "BdG AB",
    image: "https://picsum.photos/700",
  },
]

const Offers = () => (
  <ScrollView>
    {offers.map(({ title, subtitle, image }) => (
      <Card>
        <Card.Title title={title} subtitle={subtitle} left={LeftContent} />
        <Card.Content>
          <Text variant="titleLarge">{title}</Text>
          <Text variant="bodyMedium">{subtitle}</Text>
        </Card.Content>
        <Card.Cover source={{ uri: image }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    ))}
  </ScrollView>
)

export default Offers
