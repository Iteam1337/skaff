import { List } from 'react-native-paper'
import useNotifications from '../hooks/useNotifications'

export default function Notifications() {
  const [notifications, refresh] = useNotifications()

  return (
    <List.Section>
      {notifications.length === 0 && (
        <List.Item
          left={(props) => <List.Icon {...props} icon="bell-off" />}
          title="Inga notifikationer"
          description="Du har inga notifikationer än. Pröva att skapa ett erbjudande eller en förfrågan."
        />
      )}
      {notifications.map((notification, i) => (
        <List.Item
          key={i}
          title={notification.title}
          description={notification.body}
          left={(props) => <List.Icon {...props} icon="bell" />}
        />
      ))}
    </List.Section>
  )
}
