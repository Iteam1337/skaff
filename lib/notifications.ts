import * as Device from 'expo-device'
import * as ExpoNotifications from 'expo-notifications'
import { Platform } from 'react-native'
import app from '../app.json'

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
    token = (
      await ExpoNotifications.getExpoPushTokenAsync({
        projectId: app.expo.extra.eas.projectId,
      })
    ).data
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
