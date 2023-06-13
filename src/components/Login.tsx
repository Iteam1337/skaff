import { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { Avatar, Title, Button, Subheading } from 'react-native-paper'
import suppliers from '../data/suppliers'
import buyers from '../data/buyers'
import { saveAuthenticatedUser } from '../../lib/authStorage'
import { registerForPushNotificationsAsync } from '../../lib/notifications'
import useAuth from '../hooks/useAuth'

const Login = ({ onLogin }: { onLogin: any }) => {
  const [user, login] = useAuth()

  useEffect(() => {
    user.type && onLogin(user)
  }, [user])

  return (
    <SafeAreaView style={styles.container}>
      <Title style={styles.title}>Logga in (DEMO)</Title>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          <Subheading style={styles.subheading}>Producent</Subheading>
          {suppliers.map((supplier) => {
            return (
              <View style={styles.searchResult} key={supplier.id}>
                <Avatar.Image
                  size={30}
                  style={styles.avatar}
                  source={{
                    uri: 'https://skaff-api.iteam.pub' + supplier.image,
                  }}
                />
                <Text
                  style={styles.searchResultName}
                  onPress={async () => {
                    const token = await registerForPushNotificationsAsync()
                    login(supplier, token)
                  }}
                >
                  {supplier.name}
                </Text>
              </View>
            )
          })}
          <Subheading style={styles.subheading}>Beställare</Subheading>
          {buyers.map((buyer) => {
            return (
              <View style={styles.searchResult} key={buyer.id}>
                <Avatar.Image
                  size={30}
                  style={styles.avatar}
                  source={{
                    uri: 'https://skaff-api.iteam.pub' + buyer.image,
                  }}
                />
                <Text
                  style={styles.searchResultName}
                  onPress={async () => {
                    const token = await registerForPushNotificationsAsync()
                    login(buyer, token)
                  }}
                >
                  {buyer.name}
                </Text>
              </View>
            )
          })}
        </View>
      </ScrollView>
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
