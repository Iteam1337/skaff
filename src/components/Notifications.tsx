import { List } from 'react-native-paper'
import useNotifications from '../hooks/useNotifications'

export default function Notifications() {
  const [notifications, refresh] = useNotifications()

  return (
    <List.Section>
      {notifications.map((notification, i) => (
        <List.Item
          key={i}
          title={notification.title}
          description={notification.body}
          left={(props) => <List.Icon {...props} icon="notification" />}
        />
      ))}
    </List.Section>
  )
}
