import suppliers from '../data/suppliers'
import { Avatar, Button, Searchbar, Text, Subheading } from 'react-native-paper'
import { ScrollView, StyleSheet, SafeAreaView, View } from 'react-native'

const Supplier = ({ route, navigation }: { route: any; navigation: any }) => {
  const { id } = route.params
  const supplier = suppliers.find((deal) => deal.id === id)
  if (!supplier) return navigation.back()
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.headerContainer}>
        <Subheading style={styles.heading}>{supplier.name}</Subheading>
        <Avatar.Image
          size={150}
          style={styles.avatar}
          source={supplier.image}
        ></Avatar.Image>
        <Text style={styles.address}>{supplier.address}</Text>
        <Text style={styles.address}>
          {supplier.zip} {supplier.postalAddress}
        </Text>
        <Text style={styles.email}>{supplier.email}</Text>
        <Text style={styles.header2} variant="titleMedium">
          Varor
        </Text>
        {supplier.produce.map((p) => {
          return (
            <Text key={p} style={styles.produce}>
              {p}
            </Text>
          )
        })}
        <Text style={styles.header2} variant="titleMedium">
          Presentation
        </Text>
        <Text style={styles.description}>{supplier.description}</Text>
      </View>
    </ScrollView>
  )
}

export default Supplier

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
  produce: {
    marginTop: 3,
  },
  header2: {
    marginTop: 20,
  },
  description: {
    marginTop: 3,
    lineHeight: 20,
  },
})
