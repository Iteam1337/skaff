import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { Avatar, Title, Button, Subheading } from 'react-native-paper'
import { registerForPushNotificationsAsync } from '../../lib/notifications'
import useAuth from '../hooks/useAuth'
import useBuyers from '../hooks/useBuyers'
import useSuppliers from '../hooks/useSuppliers'
import { useAuthContext } from '../context/authContext'
import { SocketContext } from '../context/socketContext'

const Login = ({ onLogin }: { onLogin: any }) => {
  const { user, login, logout, reset } = useAuth()
  const [resetting, setResetting] = useState(false)
  const [buyers, , , loadBuyers] = useBuyers()
  const [suppliers, , , loadSuppliers] = useSuppliers()
  const socket = useContext(SocketContext)
  const [connected, setConnected] = useState(socket.connected)

  useEffect(() => {
    loadBuyers()
    loadSuppliers()
    socket.on('connect', () => setConnected(true))
    socket.on('disconnect', () => setConnected(false))
  }, [])

  // useLayoutEffect(() => {
  //   console.log('user', user)
  //   user?.online && logout(user) // logout if we are online
  // }, [user])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          <Title style={styles.title}>Välj användare att testa med</Title>
          <Subheading style={styles.subheading}>Producent</Subheading>
          {suppliers.map((supplier, i) => {
            return (
              <View style={styles.searchResult} key={i}>
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
                    let token
                    try {
                      token = await registerForPushNotificationsAsync()
                    } catch (e) {
                      console.log('push error', e)
                    }
                    login(supplier, token)
                    onLogin(supplier)
                  }}
                >
                  {supplier.name} {supplier.online && ' 🥕'}
                </Text>
              </View>
            )
          })}
          <Subheading style={{ ...styles.subheading, marginTop: 30 }}>
            Beställare
          </Subheading>
          {buyers.map((buyer, i) => {
            return (
              <View style={styles.searchResult} key={i}>
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
                    let token
                    try {
                      token = await registerForPushNotificationsAsync()
                    } catch (e) {
                      console.log('push error', e)
                    }
                    login(buyer, token)
                    onLogin(buyer)
                  }}
                >
                  {buyer.name} {buyer.online && ' 🥕'}
                </Text>
              </View>
            )
          })}
        </View>
        <Button
          onPress={() =>
            (reset() && setResetting(true)) ||
            setTimeout(() => setResetting(false), 10000)
          }
        >
          {connected
            ? (resetting && 'Återställer...') || 'Återställ demo'
            : 'Server offline'}
        </Button>
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
