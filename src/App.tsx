import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './RootNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
export default function App() {
  const theme = useTheme()
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navigation />
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
