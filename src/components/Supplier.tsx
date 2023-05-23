import suppliers from '../data/suppliers'
import {
  Avatar,
  Text,
  Subheading,
  Divider,
  useTheme,
  Title,
  Paragraph,
  IconButton,
} from 'react-native-paper'
import { ScrollView, StyleSheet, View } from 'react-native'

const Supplier = ({
  route,
  navigation,
  editable,
}: {
  route: any
  navigation: any
  editable: boolean
}) => {
  const theme = useTheme()
  const { id } = route.params
  navigation.header = 'Profil'
  const supplier = suppliers.find((deal) => deal.id === id)
  navigation.setOptions({ title: supplier.name })
  if (!supplier) return navigation.back()
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.headerContainer}>
        {editable && (
          <IconButton icon="pencil" size={20} style={styles.editButton} />
        )}
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
        <Divider style={styles.divider} />
        <Subheading style={styles.subHeading}>Varor</Subheading>
        {supplier.produce.map((p) => {
          return (
            <Text key={p} style={styles.produce}>
              {p}
            </Text>
          )
        })}
        <Subheading style={styles.subHeading}>Presentation</Subheading>
        <Paragraph style={styles.description}>{supplier.description}</Paragraph>
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
  description: {
    marginTop: 3,
    lineHeight: 20,
  },
  divider: {
    marginTop: 20,
  },
  subHeading: {
    marginTop: 20,
  },
  editButton: {
    alignSelf: 'flex-end',
  },
})
