import * as React from 'react'
import { Avatar, Button, Searchbar, Text } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView, StyleSheet, SafeAreaView, View } from 'react-native'
import suppliers from '../data/suppliers'
import buyers from '../data/buyers'

const Explore = ({ navigation }: { navigation: any }) => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const filteredBuyers = buyers.filter((buyer) =>
    buyer.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Searchbar
          placeholder="Sök producent/beställare"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
        <Text style={styles.header} variant="titleMedium">
          Producenter
        </Text>
        {filteredSuppliers.map(
          (supplier: { name: string; image: string; id: number }) => {
            return (
              <View style={styles.searchResult} key={supplier.id}>
                <Avatar.Image
                  size={30}
                  style={styles.avatar}
                  source={supplier.image}
                />
                <Text
                  style={styles.searchResultName}
                  onPress={() =>
                    navigation.navigate('Supplier', { id: supplier.id })
                  }
                >
                  {supplier.name}
                </Text>
              </View>
            )
          }
        )}
        <View style={styles.linkContainer}>
          <Button style={styles.link}>Ansök om att bli ansluten</Button>
          <MaterialCommunityIcons
            name="open-in-new"
            color="black"
            size={20}
            style={styles.linkIcon}
          />
        </View>
        <Text style={styles.header} variant="titleMedium">
          Beställare
        </Text>
        {filteredBuyers.map(
          (buyer: { name: string; image: string; id: number }) => {
            return (
              <View style={styles.searchResult} key={buyer.id}>
                <Avatar.Image
                  size={30}
                  style={styles.avatar}
                  source={buyer.image}
                />
                <Text
                  style={styles.searchResultName}
                  onPress={() => navigation.navigate('Buyer', { id: buyer.id })}
                >
                  {buyer.name}
                </Text>
              </View>
            )
          }
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Explore

const styles = StyleSheet.create({
  scrollView: {
    padding: 10,
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchbar: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
  },
  avatar: { marginRight: 5 },
  searchResultName: {
    paddingTop: 10,
  },
  searchResult: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  linkContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  linkIcon: { paddingTop: 10 },
  link: {},
})
