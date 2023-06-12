import * as Device from 'expo-device'
import * as ExpoNotifications from 'expo-notifications'
import { Platform } from 'react-native'
import assert from 'assert'

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
export async function sendPushNotification({
  to: expoPushToken = '',
  sound = 'default',
  title = 'Notifiering från Skaff',
  body = '',
  data = {},
}) {
  assert(
    expoPushToken,
    'expoPushToken is required, use registerForPushNotificationsAsync() to get it'
  )
  const message = {
    to: expoPushToken,
    sound,
    title,
    body,
    data,
  }

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
}

export async function registerForPushNotificationsAsync() {
  let token
  if (Device.isDevice) {
    const { status: existingStatus } =
      await ExpoNotifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await ExpoNotifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return undefined
    }
    token = (await ExpoNotifications.getExpoPushTokenAsync()).data
    console.log('token', token)

    if (Platform.OS === 'android') {
      ExpoNotifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: ExpoNotifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }
    return token
  }

  return undefined
}
