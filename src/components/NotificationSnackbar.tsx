import { useEffect, useState } from 'react'
import useNotifications from '../hooks/useNotifications'
import { Button, Snackbar, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const getNavigationType = (data: any) =>
  ({
    deal: 'Deal',
    offer: 'Offer',
    tenderRequest: 'TenderRequest',
  }[data.type])

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
  const navigationType = getNavigationType(lastNotification?.data.type || '')

  return (
    (lastNotification && (
      <Snackbar
        visible={notificationVisible}
        onDismiss={() => setNotificationVisible(false)}
        action={{
          label: 'Gå till',
          onPress: () => {
            navigation.navigate(navigationType, {
              id: lastNotification.data.id,
            })
          },
        }}
      >
        {lastNotification.title + ': ' + lastNotification.body}
      </Snackbar>
    )) ||
    null
  )
}
