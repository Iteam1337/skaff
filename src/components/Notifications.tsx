import { useState, useEffect, useRef } from 'react'
import { Text, View, Button, Platform } from 'react-native'
import * as Device from 'expo-device'
import * as ExpoNotifications from 'expo-notifications'

ExpoNotifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

export default function Notifications() {
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

    notificationListener.current =
      ExpoNotifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    responseListener.current =
      ExpoNotifications.addNotificationResponseReceivedListener((response) => {
        console.log(response)
      })

    return () => {
      ExpoNotifications.removeNotificationSubscription(
        notificationListener.current
      )
      ExpoNotifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}
    >
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Title: {notification && notification.request.content.title}{' '}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{' '}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken)
        }}
      />
    </View>
  )
}
