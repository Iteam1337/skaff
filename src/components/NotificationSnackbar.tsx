import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Snackbar } from 'react-native-paper'
import useNotifications from '../hooks/useNotifications'

const getNavigationArguments = (data: any) => {
  if (!data) return null
  console.log('getNavigationType', data)
  switch (data?.type) {
    case 'deal':
      return ['Deals', { screen: 'Deal', params: { dealId: data.id } }]
    case 'offer':
      return [
        'Offer',
        [
          'TenderRequests',
          {
            screen: 'TenderRequest',
            params: { tenderRequestId: data.tenderRequestId },
          },
        ],
      ]
    case 'tenderRequest':
      return [
        'TenderRequests',
        { screen: 'TenderRequest', params: { tenderRequestId: data.id } },
      ]
  }
}

export const NotificationSnackbar = () => {
  const [notificationVisible, setNotificationVisible] = useState<boolean>(true)
  const [notifications] = useNotifications()
  const navigation = useNavigation()
  const lastNotification = notifications.at(0)

  useEffect(() => {
    console.log('notifications', notifications)
    if (
      new Date(lastNotification?.data.date || 0).valueOf() >
      Date.now() - 10000
    ) {
      setNotificationVisible(true)
    }
  }, [lastNotification])

  return (
    (lastNotification && (
      <Snackbar
        visible={notificationVisible}
        onDismiss={() => setNotificationVisible(false)}
        action={{
          label: 'OK',
          onPress: () => {
            navigation.navigate('Notifications')
          },
        }}
      >
        {lastNotification.title + ': ' + lastNotification.body}
      </Snackbar>
    )) ||
    null
  )
}
