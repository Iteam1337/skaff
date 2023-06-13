import * as React from 'react'
import {
  Avatar,
  Button,
  Divider,
  Searchbar,
  Text,
  Subheading,
  useTheme,
} from 'react-native-paper'
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
        <Subheading style={styles.header}>Producenter</Subheading>
        {filteredSuppliers.map((supplier) => {
          return (
            <View style={styles.searchResult} key={supplier.id}>
              <Avatar.Image
                size={30}
                style={styles.avatar}
                source={{ uri: `https://skaff-api.iteam.pub${supplier.image}` }}
              />
              <Text
                style={styles.searchResultName}
                onPress={() => navigation.navigate('Supplier', { supplier })}
              >
                {supplier.name}
              </Text>
            </View>
          )
        })}
        <View style={styles.linkContainer}>
          <Button uppercase={false}>
            Ansök om att bli ansluten{' '}
            <MaterialCommunityIcons
              name="open-in-new"
              color="black"
              size={20}
            />
          </Button>
        </View>
        <Divider />
        <Subheading style={styles.header}>Beställare</Subheading>
        {filteredBuyers.map((buyer) => {
          return (
            <View style={styles.searchResult} key={buyer.id}>
              <Avatar.Image
                size={30}
                style={styles.avatar}
                source={{ uri: `https://skaff-api.iteam.pub${buyer.image}` }}
              />
              <Text
                style={styles.searchResultName}
                onPress={() => navigation.navigate('Buyer', { buyer })}
              >
                {buyer.name}
              </Text>
            </View>
          )
        })}
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
    elevation: false,
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
    marginBottom: 10,
  },
})
