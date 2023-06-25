import { StyleSheet } from 'react-native'
import { Button, Card } from 'react-native-paper'
import { Deal } from '../data/deals'
import useAuth from '../hooks/useAuth'

const DealCard = ({
  deal,
  navigation,
}: {
  deal: Deal
  navigation: any
  user: ReturnType<typeof useAuth>['user']
}) => {
  return (
    <Card
      style={styles.card}
      onPress={() =>
        navigation.navigate('Deals', {
          screen: 'Deal',
          params: {
            deal,
          },
        })
      }
    >
      <Card.Title
        title={deal.product.name}
        titleVariant="titleSmall"
        titleStyle={{
          fontSize: 14,
        }}
        subtitle={'Pris: ' + deal.price.SEK}
        right={(props) => <Button icon="chevron-right" />}
      ></Card.Title>
    </Card>
  )
}

export default DealCard

const styles = StyleSheet.create({
  header: {
    margin: 16,
  },
  card: {
    margin: 10,
    backgroundColor: 'white',
  },
  infoCard: {
    marginTop: 5,
    marginBottom: 5,
  },
})
