import { StyleSheet } from 'react-native'
import { Button, Card } from 'react-native-paper'
import { Offer } from '../data/offers'
import { User } from '../data/user'

const OfferCard = ({
  offer,
  navigation,
  user,
}: {
  offer: Offer
  navigation: any
  user: User
}) => {
  const isBuyer = user?.type === 'buyer'
  const isSupplier = user?.type === 'supplier'

  return (
    <Card
      style={styles.card}
      onPress={() =>
        navigation.navigate('TenderRequest', {
          tenderRequestId: offer.tenderRequestId,
        })
      }
      /*  this causes endless loop
        onPress={() =>
        navigation.navigate('TenderRequests', {
          screen: 'TenderRequest',
          params: {
            tenderRequestId: offer.tenderRequestId,
          },
        })
      }*/
    >
      <Card.Title
        title={offer.price.SEK + ' kr' + ' - ' + offer.buyer.name}
        titleVariant="titleSmall"
        titleStyle={{
          fontSize: 14,
          color: offer.approved ? 'green' : 'black',
        }}
        subtitle={'Inlämnat: ' + offer.submissionDate?.toString().split('T')[0]}
        right={(props) => <Button icon="chevron-right" />}
      ></Card.Title>
    </Card>
  )
}

export default OfferCard

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
