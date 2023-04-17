import "react-native-gesture-handler" // Needs to be on top of this file
import * as React from "react"
import { AppRegistry } from "react-native"
import {
  Provider as PaperProvider,
  DefaultTheme,
  MD3DarkTheme,
} from "react-native-paper"
import { expo } from "./app.json"
import App from "./src/App"
import { StatusBar } from "expo-status-bar"

// TODO: not working yet
const theme = {
  ...DefaultTheme,
}

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar />
      <App />
    </PaperProvider>
  )
}

AppRegistry.registerComponent(expo.name, () => Main)
