import * as React from 'react'
import {
  Avatar,
  Badge,
  Button,
  Card,
  List,
  Searchbar,
  Text,
} from 'react-native-paper'
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import suppliers from '../data/suppliers'
import { CustomHeader } from './Header'
import Categories, { areas } from '../data/categories'
import {
  Accordion,
  AccordionGroup,
} from 'react-native-paper/lib/typescript/src/components/List/List'

const Explore = ({ navigation }: { navigation: any }) => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
console.log('filteredSuppliers', filteredSuppliers)
  // const activeAreas: { [key: string]: Area } = Object.entries(areas).reduce(
  //   (result, [key, area]) =>
  //     Object.assign(result, {
  //       [key]: {
  //         ...area,
  //         count: filteredDeals.filter((d) => d.commodity.area === area.title)
  //           .length,
  //       },
  //     }),
  //   {}
  // )
  return (
    <SafeAreaView>
    <ScrollView>
      <Searchbar
        placeholder="Sök producent/beställare"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      {Object.entries(suppliers)
        .map((supplier: {name:string, image:string, id:number}) => (
          
          <Text key={supplier.id}>supplier: {supplier.name}</Text>
          // <Text key={supplier.name}>{supplier.name}</Text>
        ))}
    </ScrollView>
    </SafeAreaView>
  )
}

export default Explore

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
