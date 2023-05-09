import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { Title, Button } from 'react-native-paper'

const Login = ({ onLogin }: { onLogin: any }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Title>Logga in (demo)</Title>
      <View style={styles.loginForm}>
        <Text>Vem är du?</Text>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => {
            onLogin({ userType: 'Supplier' })
          }}
        >
          Producent
        </Button>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => {
            onLogin({ userType: 'Buyer' })
          }}
        >
          Beställare
        </Button>
      </View>
    </SafeAreaView>
  )
}
export default Login

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'space-around' },
  loginForm: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  button: {
    margin: 5,
  },
})
