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

const Offers = ({ route }: { route: any }) => {
  const { id } = route.params
  const offer = offers.find((offer) => offer.id === id)
  if (!offer) return <Text>Hittade inte erbjudandet</Text>

  return (
    <ScrollView>
      <Card>
        <Card.Title
          title={offer.title}
          subtitle={offer.subtitle}
          left={LeftContent}
        />
        <Card.Content>
          <Text variant="titleLarge">{offer.title}</Text>
          <Text variant="bodyMedium">{offer.subtitle}</Text>
        </Card.Content>
        <Card.Cover source={{ uri: offer.image }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  )
}

export default Offers
