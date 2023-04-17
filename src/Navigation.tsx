import React from "react"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { BottomNavigation } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { CommonActions } from "@react-navigation/native"

import Chat from "./components/Chat"
import Offers from "./components/Offers"
import Quotes from "./components/Quotes"

const Tab = createBottomTabNavigator()

export default function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            })

            if (event.defaultPrevented) {
              preventDefault()
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              })
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key]
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 })
            }

            return null
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key]
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title

            return label
          }}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={Offers}
        options={{
          tabBarLabel: "Erbjudanden",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />
          },
        }}
      />
      <Tab.Screen
        name="Quotes"
        component={Quotes}
        options={{
          tabBarLabel: "Mina anbud",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="lock" size={size} color={color} />
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: "Meddelanden",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="forum" size={size} color={color} />
          },
        }}
      />
    </Tab.Navigator>
  )
}
