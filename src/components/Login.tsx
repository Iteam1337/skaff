import { View, Button } from 'react-native'
import { Title } from 'react-native-paper'

const Login = ({ onLogin }: { onLogin: any }) => {
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}
    >
      <Title>Vem är du?</Title>
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
