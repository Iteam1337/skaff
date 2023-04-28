import * as React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Deals from './components/Deals'
import Offers from './components/Offers'
import Offer from './components/Offer'
import Chat from './components/Chat'
import { createStackNavigator } from '@react-navigation/stack'

const OffersNavigation = () => {
  const Stack = createStackNavigator()

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="ListOffers"
          options={{
            title: 'Erbjudanden',
          }}
          component={Offers}
        />
        <Stack.Screen
          name="Offer"
          options={{
            title: 'Erbjudande',
          }}
          component={Offer}
        />
      </Stack.Navigator>
    </>
  )
}

const Navigation = () => {
  const Tab = createMaterialBottomTabNavigator()

  return (
    <>
      <Tab.Navigator barStyle={{ backgroundColor: 'white' }}>
        <Tab.Screen
          name="Offers"
          component={OffersNavigation}
          options={{
            tabBarLabel: 'Erbjudanden',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="Deals"
          component={Deals}
          options={{
            tabBarLabel: 'Mina anbud',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="lock" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarLabel: 'Meddelanden',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="forum" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  )
}

export default Navigation
