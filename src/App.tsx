import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './RootNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import { SocketProvider } from './context/socketContext'
import { AuthProvider } from './context/authContext'

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
        </SafeAreaProvider>
      </SocketProvider>
    </AuthProvider>
  )
}
