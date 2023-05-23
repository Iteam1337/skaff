import buyers from '../data/buyers'
import {
  Avatar,
  Button,
  Searchbar,
  Text,
  Subheading,
  Title,
  Paragraph,
  IconButton,
} from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView, StyleSheet, SafeAreaView, View } from 'react-native'

const Buyer = ({
  route,
  navigation,
  editable,
}: {
  route: any
  navigation: any
  editable: boolean
}) => {
  const { id } = route.params
  const buyer = buyers.find((buyer) => buyer.id === id)
  if (!buyer) return navigation.back()
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.headerContainer}>
        {editable ? (
          <IconButton icon="pencil" size={20} style={styles.editButton} />
        ) : (
          <Title style={styles.heading}>{buyer.name}</Title>
        )}

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
        <View style={styles.menuContainer}>
          <Button style={styles.menuLink} uppercase={false}>
            Planerad matsedel{' '}
            <MaterialCommunityIcons
              name="open-in-new"
              color="black"
              size={20}
            />
          </Button>
        </View>
        <Subheading>Presentation</Subheading>
        <Paragraph style={styles.description}>{buyer.description}</Paragraph>
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
  description: {
    lineHeight: 20,
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  menuLink: { marginLeft: -12 },
  editButton: {
    alignSelf: 'flex-end',
  },
})
