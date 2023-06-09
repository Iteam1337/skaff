import { Appbar } from 'react-native-paper'

export function CustomHeader({ title, navigation }) {
  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
      <Appbar.Action
        icon="bell"
        onPress={() => {
          // Handle notifications menu onPress event
          console.log('Notifications icon pressed')
        }}
      />
    </Appbar.Header>
  )
}
