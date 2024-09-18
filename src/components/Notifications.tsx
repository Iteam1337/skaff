import { useEffect } from 'react'
import { List } from 'react-native-paper'
import useDeals from '../hooks/useDeals'
import useNotifications from '../hooks/useNotifications'
import useOffers from '../hooks/useOffers'
import useTenderRequests from '../hooks/useTenderRequests'

export default function Notifications({ navigation }) {
  const [notifications, refresh] = useNotifications()
  const [offers, , , refreshOffers] = useOffers()
  const [tenderRequests, , , refreshTenderRequests] = useTenderRequests()
  const [deals, , , refreshDeals] = useDeals()

  useEffect(() => {
    refresh()
  }, [])

  return (
    <List.Section>
      {notifications.length === 0 && (
        <List.Item
          left={(props) => <List.Icon {...props} icon="bell-off" />}
          title="Inga notifikationer"
          description="Du har inga notifikationer än. Pröva att skapa ett erbjudande eller en förfrågan."
        />
      )}
      {notifications
        .sort(
          (a, b) =>
            new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
        )
        .map((notification, i) => (
          <List.Item
            key={i}
            onPress={() => {
              console.log('navigate to', notification)
              switch (notification.data.type) {
                case 'offer':
                  navigation.navigate('TenderRequests', {
                    screen: 'TenderRequest',
                    params: {
                      tenderRequestId: notification.data.tenderRequestId,
                    },
                  })
                  break
                case 'tenderRequest':
                  navigation.navigate('TenderRequests', {
                    screen: 'TenderRequest',
                    params: {
                      tenderRequestId: notification.data.id,
                    },
                  })
                  break

                case 'deal':
                  navigation.navigate('Deal', {
                    deal: deals.find(
                      (deal) => deal.id === notification.data.id
                    ),
                  })
                  break
              }
            }}
            title={notification.title}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            description={notification.body}
            left={(props) => <List.Icon {...props} icon="bell" />}
          />
        ))}
    </List.Section>
  )
}
