// import * as React from 'react'
import React, { useState } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Deals from './components/Deals'
import Deal from './components/Deal'
import ExploreNavigation from './ExploreNavigation'
// import CreateDeal from './components/CreateDeal'
import TenderRequests from './components/TenderRequests'
import TenderRequest from './components/TenderRequest'
import { createStackNavigator } from '@react-navigation/stack'
import { IconButton, useTheme } from 'react-native-paper'
import Notifications from './components/Notifications'
import SupplierProfile from './components/SupplierProfile'
import BottomNavigationIcon from './components/BottomNavigationIcon'

const DealsNavigation = () => {
  const Stack = createStackNavigator()
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
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Navigator>
    </>
  )
}

const TenderRequestsNavigation = () => {
  const Stack = createStackNavigator()
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="ListTenderRequests"
          options={{
            title: 'Anbudsförfrågningar',
          }}
          component={TenderRequests}
        />
        <Stack.Screen
          name="TenderRequest"
          options={{
            title: 'Anbudsförfrågan',
          }}
          component={TenderRequest}
        />
      </Stack.Navigator>
    </>
  )
}

const SupplierProfileNavigation = () => {
  const Stack = createStackNavigator()
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="SupplierProfile"
          options={{
            title: 'Wermlands Mejeri',
          }}
          component={SupplierProfile}
        />
      </Stack.Navigator>
    </>
  )
}

const SupplierNavigation = () => {
  const theme = useTheme()
  const Tab = createMaterialBottomTabNavigator()
  const theme = useTheme()
  return (
    <Tab.Navigator
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.iconInactive}
      barStyle={{ backgroundColor: theme.colors.background }}
      theme={theme}
      initialRouteName="TenderRequests"
    >
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
        // add back button in header:
      />
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
      {/* <Tab.Screen
        name="CreateDeal"
        component={CreateDeal}
        options={{
          tabBarLabel: 'Nytt erbjudande',
          tabBarAccessibilityLabel: 'Nytt erbjudande',
          tabBarIcon: (color: any) => (
            <MaterialCommunityIcons name="corn" color={color} size={30} />
          ),
        }}
      /> */}
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
        component={SupplierProfileNavigation}
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

export default SupplierNavigation
