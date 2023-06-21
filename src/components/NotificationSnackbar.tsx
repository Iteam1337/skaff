import { useEffect, useState } from 'react'
import useNotifications from '../hooks/useNotifications'
import { Button, Snackbar, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

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

  useEffect(() => {
    if (
      (notifications?.length > 0 &&
        new Date(notifications.at(-1).data.date || 0).valueOf()) ||
      0 > Date.now().valueOf() - 10000
    ) {
      setNotificationVisible(true)
    }
  }, [notifications])

  const lastNotification = notifications.at(-1)
  const args = getNavigationArguments(lastNotification?.data)

  return (
    (lastNotification && (
      <Snackbar
        visible={notificationVisible}
        onDismiss={() => setNotificationVisible(false)}
        /* action={{
          label: 'Gå till',
          onPress: () => {
            if (args) navigation.navigate(args)
          },
        }}*/
      >
        {lastNotification.title + ': ' + lastNotification.body}
      </Snackbar>
    )) ||
    null
  )
}
