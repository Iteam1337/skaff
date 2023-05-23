import 'react-native-gesture-handler'
import * as React from 'react'
import { AppRegistry, Platform, StyleSheet, View } from 'react-native'
import { Provider as PaperProvider, MD2LightTheme } from 'react-native-paper'
import { expo } from './app.json'
import App from './src/App'
import { StatusBar } from 'expo-status-bar'
import IphoneDummy from './src/components/IphoneDummy'

const theme = {
  ...MD2LightTheme,
  roundness: 1,
  colors: {
    ...MD2LightTheme.colors,
    primary: '#000', // morotsfärg: #FFA726
    // Add any other color changes here
  },
}

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      {Platform.OS === 'web' ? (
        <IphoneDummy>
          <App />
        </IphoneDummy>
      ) : (
        <>
          <StatusBar />
          <App />
        </>
      )}
    </PaperProvider>
  )
}

AppRegistry.registerComponent(expo.name, () => Main)
