import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './RootNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import { SocketProvider } from './context/socketContext'
import { AuthProvider } from './context/authContext'
import { NotificationSnackbar } from './components/NotificationSnackbar'

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
