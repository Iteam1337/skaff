import React from 'react'
import TenderRequests from './components/TenderRequests'
import TenderRequest from './components/TenderRequest'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Deal from './components/Deal'
import Deals from './components/Deals'
import ExploreNavigation from './ExploreNavigation'
import { IconButton, useTheme } from 'react-native-paper'
import BuyerProfile from './components/BuyerProfile'
import BottomNavigationIcon from './components/BottomNavigationIcon'
import CreateTenderRequest from './components/CreateTenderRequest'

const Stack = createStackNavigator()

const TenderRequestsNavigation = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="ListTenderRequests"
          options={{
            title: 'Förfrågningar',
          }}
          component={TenderRequests}
        />
        <Stack.Screen
          name="TenderRequest"
          options={{
            title: 'Förfrågan',
          }}
          component={TenderRequest}
        />
        <Stack.Screen
          name="CreateTenderRequest"
          options={{
            title: 'Anbudsförfrågan',
          }}
          component={CreateTenderRequest}
        />
      </Stack.Navigator>
    </>
  )
}

const DealsNavigation = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="ListDeals"
          options={({ navigation }) => ({
            headerRight: () => (
              <IconButton
                icon="bell"
                size={18}
                onPress={() => navigation.navigate('Notifications')}
              />
            ),
            title: 'Erbjudanden',
          })}
          component={Deals}
        />
        <Stack.Screen
          name="Deal"
          options={{
            title: 'Erbjudande',
          }}
          component={Deal}
        />
      </Stack.Navigator>
    </>
  )
}

const BuyerProfileNavigation = () => {
  const Stack = createStackNavigator()
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="BuyerProfile"
          options={{
            title: 'Kvarnbergsskolan',
          }}
          component={BuyerProfile}
        />
      </Stack.Navigator>
    </>
  )
}
const BuyerNavigation = () => {
  const Tab = createMaterialBottomTabNavigator()
  const theme = useTheme()
  return (
    <Tab.Navigator
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.iconInactive}
      barStyle={{ backgroundColor: theme.colors.background }}
      theme={theme}
      initialRouteName="Deals"
    >
      <Tab.Screen
        name="Deals"
        component={DealsNavigation}
        options={{
          tabBarLabel: 'Erbjudanden',
          tabBarAccessibilityLabel: 'Erbjudanden',
          tabBarIcon: ({ focused }) => (
            <BottomNavigationIcon
              name="corn"
              focused={focused}
            ></BottomNavigationIcon>
          ),
        }}
      />
      <Tab.Screen
        name="TenderRequests"
        component={TenderRequestsNavigation}
        options={{
          tabBarLabel: 'Förfrågningar',
          tabBarAccessibilityLabel: 'Förfrågningar',
          tabBarIcon: ({ focused }) => (
            <BottomNavigationIcon
              name="cart"
              focused={focused}
            ></BottomNavigationIcon>
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreNavigation}
        options={{
          tabBarLabel: 'Upptäck',
          tabBarAccessibilityLabel: 'Upptäck',
          tabBarIcon: ({ focused }) => (
            <BottomNavigationIcon
              name="compass"
              focused={focused}
            ></BottomNavigationIcon>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={BuyerProfileNavigation}
        options={{
          tabBarLabel: 'Mina sidor',
          tabBarAccessibilityLabel: 'Mina sidor',
          tabBarIcon: ({ focused }) => (
            <BottomNavigationIcon
              name="account"
              focused={focused}
            ></BottomNavigationIcon>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BuyerNavigation
