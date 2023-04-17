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

const theme = {
  ...MD3DarkTheme,
}

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style={!theme.isV3 || theme.dark ? "light" : "dark"} />
      <App />
    </PaperProvider>
  )
}

AppRegistry.registerComponent(expo.name, () => Main)
