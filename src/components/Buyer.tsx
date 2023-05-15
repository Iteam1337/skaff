import buyers from '../data/buyers'
import { Avatar, Button, Searchbar, Text, Subheading } from 'react-native-paper'
import { ScrollView, StyleSheet, SafeAreaView, View } from 'react-native'

const Buyer = ({ route, navigation }: { route: any; navigation: any }) => {
  const { id } = route.params
  const buyer = buyers.find((buyer) => buyer.id === id)
  if (!buyer) return navigation.back()
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.headerContainer}>
        <Subheading style={styles.heading}>{buyer.name}</Subheading>
        <Avatar.Image
          size={150}
          style={styles.avatar}
          source={buyer.image}
        ></Avatar.Image>
        <Text style={styles.address}>{buyer.address}</Text>
        <Text style={styles.address}>
          {buyer.zip} {buyer.postalAddress}
        </Text>
        <Text style={styles.email}>{buyer.email}</Text>
        <Text style={styles.header2} variant="titleMedium">
          Presentation
        </Text>
        <Text style={styles.description}>{buyer.description}</Text>
      </View>
    </ScrollView>
  )
}

export default Buyer

const styles = StyleSheet.create({
  scrollView: {
    padding: 10,
    backgroundColor: 'white',
  },
  headerContainer: {
    width: '100%',
  },
  heading: {
    marginTop: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  address: {
    alignSelf: 'center',
    marginTop: 5,
  },
  email: {
    alignSelf: 'center',
    marginTop: 15,
  },
  header2: {
    marginTop: 20,
  },
  description: {
    marginTop: 3,
    lineHeight: 20,
  },
})
