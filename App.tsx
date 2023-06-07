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
      fontFamily: 'Avenir',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Avenir',
      fontWeight: 600,
    },
    light: {
      fontFamily: 'Avenir',
      fontWeight: 'light',
    },
    thin: {
      fontFamily: 'Avenir',
      fontWeight: 'thin',
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
  roundness: 4,
  colors: {
    ...MD2LightTheme.colors,
    background: '#FAF7F0', //beige
    surface: '#D8F5E3',
    surfaceVariant: '#EBFAEF',
    // surfaceVariant: '#FFF',
    primary: '#1C3BA0', //mörkblå
    accent: '#EBFAEF',
    // : '#666259', //mörkgrå
    // primary: '#000', // morotsfärg: #FFA726
    // accent: '#333', // blå: #29B6F6
    // Add any other color changes here
    iconInactive: '#666259', //mörkgrå
    secondary: '#FFFFFF',
    secondaryVariant: '#FFFFFF',
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
