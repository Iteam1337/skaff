import { View, Button, Text } from 'react-native'

const Login = ({ onLogin }: { onLogin: any }) => {
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}
    >
      <Text>Vem är du?</Text>
      <Button
        title="Producent"
        onPress={() => {
          onLogin({ userType: 'Supplier' })
        }}
      />
      <Button
        title="Beställare"
        onPress={() => {
          onLogin({ userType: 'Buyer' })
        }}
      />
    </View>
  )
}
export default Login
