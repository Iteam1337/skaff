import { View, Button } from 'react-native'

const Login = (
  // { navigation }: { navigation: any },
  { onLogin }: { onLogin: any }
) => {
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}
    >
      <Button
        title="Jag är producent"
        onPress={() => {
          onLogin({ userType: 'Supplier' })
          // navigation.navigate('TenderReuests')
        }}
      />
      <Button
        title="Jag är kock"
        onPress={() => {
          onLogin({ userType: 'Buyer' })
        }}
      />
    </View>
  )
}
export default Login
