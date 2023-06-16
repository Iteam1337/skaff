import { List } from 'react-native-paper'
import useNotifications from '../hooks/useNotifications'
import { useEffect } from 'react'
import useOffers from '../hooks/useOffers'
import useTenderRequests from '../hooks/useTenderRequests'
import useDeals from '../hooks/useDeals'

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
      {notifications.map((notification, i) => (
        <List.Item
          key={i}
          onPress={() => {
            console.log('navigate to', notification)
            switch (notification.data.type) {
              case 'offer':
                navigation.navigate('Offer', {
                  offer: offers.find(
                    (offer) => offer.id === notification.data.id
                  ),
                })
                break
              case 'tenderRequest':
                navigation.navigate('TenderRequest', {
                  tenderRequest: tenderRequests.find(
                    (tenderRequest) => tenderRequest.id === notification.data.id
                  ),
                })
                break

              case 'deal':
                navigation.navigate('Deal', {
                  deal: deals.find((deal) => deal.id === notification.data.id),
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
