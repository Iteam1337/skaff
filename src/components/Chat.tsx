import { useState, useEffect, useRef } from 'react'
import { Text, View, Button, Platform } from 'react-native'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

async function getPushReceipt(id: string) {
  return await fetch('https://exp.host/--/api/v2/push/getReceipts', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids: [id] }),
  })
}
// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    // sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    // data: { someData: 'goes here' },
  }

  console.log('message', message)

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      console.log('result', result)
      return getPushReceipt(result.data.id)
    })
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      console.log('result of receipt', result)
    })
    .catch((error) => {
      console.log('error', error)
    })
}

async function registerForPushNotificationsAsync() {
  let token
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
  } else {
    alert('Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  return token
}

export default function Chat() {
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState<Notifications.Notification>()
  const notificationListener = useRef<Notifications.Subscription>()
  const responseListener = useRef<Notifications.Subscription>()

  useEffect(() => {
    registerForPushNotificationsAsync().then((token: string | any) => {
      console.log('setExpoPushToken token', token)
      setExpoPushToken(token)
    })

    notificationListener.current =
      Notifications.addNotificationReceivedListener(
        (notification: Notifications.Notification) => {
          console.log('notification', notification)
          setNotification(notification)
        }
      )

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('response', response)
        console.log(response)
      })

    return () => {
      if (notificationListener.current)
        Notifications.removeNotificationSubscription(
          notificationListener.current
        )
      if (responseListener.current)
        Notifications.removeNotificationSubscription(responseListener.current)
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
