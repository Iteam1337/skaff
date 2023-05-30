import { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { Avatar, Title, Button, Subheading } from 'react-native-paper'
import suppliers from '../data/suppliers'
import buyers from '../data/buyers'
import { saveAuthenticatedUser } from '../../lib/authStorage'

const Login = ({ onLogin }: { onLogin: any }) => {
  const [userType, setUserType] = useState('')

  const userTypeSelected = (userType: string) => {
    setUserType(userType)
  }

  const login = (userId: number) => {
    saveAuthenticatedUser(userId).then(() => {
      onLogin({ userType: userType })
      setUserType('')
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <Title style={styles.title}>Logga in (DEMO)</Title>
      {userType == '' && (
        <View style={styles.loginForm}>
          <Text>Vem är du?</Text>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => {
              userTypeSelected('Supplier')
            }}
          >
            Producent
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => {
              userTypeSelected('Buyer')
            }}
          >
            Beställare
          </Button>
        </View>
      )}
      {userType == 'Supplier' && (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View>
            <Subheading style={styles.subheading}>
              Välj producent att agera som
            </Subheading>
            {suppliers.map(
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
                      onPress={() => login(supplier.id)}
                    >
                      {supplier.name}
                    </Text>
                  </View>
                )
              }
            )}
          </View>
        </ScrollView>
      )}
      {userType == 'Buyer' && (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View>
            <Subheading style={styles.subheading}>
              Välj beställare att agera som
            </Subheading>
            {buyers.map(
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
                      onPress={() => login(buyer.id)}
                    >
                      {buyer.name}
                    </Text>
                  </View>
                )
              }
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  )
}
export default Login

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginVertical: 30,
  },
  container: { flex: 1, alignItems: 'center', justifyContent: 'space-around' },
  loginForm: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scrollView: { flex: 1, alignItems: 'center', justifyContent: 'space-around' },
  button: {
    margin: 5,
  },
  avatar: { marginRight: 5 },
  searchResultName: {
    paddingTop: 10,
  },
  searchResult: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  linkContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  subheading: {
    marginBottom: 20,
  },
})
