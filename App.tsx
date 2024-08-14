import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { AppRegistry, Platform } from 'react-native'
import 'react-native-gesture-handler'
import {
  MD2LightTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper'
import { expo } from './app.json'
import App from './src/App'
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
    surface: '#FAF7F0',
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
    text: '#1B1918',
    placeholder: '#1B1918',
  },
  fonts: configureFonts({ config: fontConfig }),
}

export default function Main() {
  /*
  const [notification, setNotification] = React.useState({} as Notification)

  React.useEffect(() => {
    const lastNotification = notifications.at(-1)
    if (
      lastNotification &&
      new Date(lastNotification?.data.date).valueOf() > Date.now() - 10000
    ) {
      setNotificationVisible(true)
      setNotification(lastNotification)
    }
  }, [notifications])*/

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
