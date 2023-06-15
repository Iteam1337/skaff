import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './RootNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { Snackbar, useTheme } from 'react-native-paper'
import { SocketProvider } from './context/socketContext'
import { AuthProvider } from './context/authContext'
import useNotifications from './hooks/useNotifications'

const NotificationSnackbar = () => {
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false)
  const [notifications] = useNotifications()

  return (
    <Snackbar
      visible={notificationVisible}
      onDismiss={() => setNotificationVisible(false)}
    >
      {notifications.length > 0 && notifications.at(-1)?.title}
    </Snackbar>
  )
}

export default function App() {
  const theme = useTheme()
  return (
    <AuthProvider>
      <SocketProvider>
        <SafeAreaProvider>
          <NavigationContainer theme={theme}>
            <Navigation />
            <StatusBar style="light" />
          </NavigationContainer>
          <NotificationSnackbar />
        </SafeAreaProvider>
      </SocketProvider>
    </AuthProvider>
  )
}
