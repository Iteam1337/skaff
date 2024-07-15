import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './RootNavigation'
import { NotificationSnackbar } from './components/NotificationSnackbar'
import { AuthProvider } from './context/authContext'
import { SocketProvider } from './context/socketContext'

export default function App() {
  const theme = useTheme()
  return (
    <AuthProvider>
      <SocketProvider>
        <SafeAreaProvider>
          <NavigationContainer theme={theme}>
            <Navigation />
            <NotificationSnackbar />
          </NavigationContainer>
        </SafeAreaProvider>
      </SocketProvider>
    </AuthProvider>
  )
}
