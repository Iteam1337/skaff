import 'react-native-gesture-handler'
import * as React from 'react'
import { AppRegistry, Platform, StyleSheet, View } from 'react-native'
import {
  Provider as PaperProvider,
  MD2LightTheme,
  configureFonts,
} from 'react-native-paper'
import { expo } from './app.json'
import App from './src/App'
import { StatusBar } from 'expo-status-bar'
import IphoneDummy from './src/components/IphoneDummy'

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
} as const

const theme = {
  ...MD2LightTheme,
  roundness: 1,
  colors: {
    ...MD2LightTheme.colors,
    primary: '#000', // morotsfärg: #FFA726
    accent: '#333', // blå: #29B6F6
    // Add any other color changes here
    iconInactive: '#666259', //mörkgrå
  },
  fonts: configureFonts({ config: fontConfig }),
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
