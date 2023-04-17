import React from "react"
import { Provider as PaperProvider } from "react-native-paper"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import Navigation from "./Navigation"
import { NavigationContainer } from "@react-navigation/native"
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PaperProvider>
          <Navigation />
          <StatusBar style="auto" />
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
