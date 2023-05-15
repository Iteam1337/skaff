// import * as React from 'react'
import React, { useState } from 'react'
import { Button } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import TendersAndContracts from './components/TendersAndContracts'
import Login from './components/Login'
import Deals from './components/Deals'
import Deal from './components/Deal'
import Explore from './components/Explore'
import CreateDeal from './components/CreateDeal'
import TenderRequests from './components/TenderRequests'
import TenderRequest from './components/TenderRequest'
import { createStackNavigator } from '@react-navigation/stack'
import { IconButton, useTheme } from 'react-native-paper'
import Notifications from './components/Notifications'

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

const SupplierNavigation = () => {
  const Tab = createMaterialBottomTabNavigator()
  return (
    <Tab.Navigator
      // activeColor="red"
      // inactiveColor="yellow"
      barStyle={{ backgroundColor: '#eef' }}
      initialRouteName="TenderRequests"
    >
      <Tab.Screen
        name="TenderRequests"
        component={TenderRequestsNavigation}
        options={{
          tabBarLabel: 'Anbuds-förfrågningar',
          tabBarAccessibilityLabel: 'Anbudsförfrågningar',
          tabBarIcon: (color: any) => (
            <MaterialCommunityIcons name="cart" color={color} size={20} />
          ),
        }}
        // add back button in header:
      />
      <Tab.Screen
        name="Deals"
        component={DealsNavigation}
        options={{
          tabBarLabel: 'Erbjudna varor',
          tabBarAccessibilityLabel: 'Erbjudna varor',
          tabBarIcon: (color: any) => (
            <MaterialCommunityIcons name="corn" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateDeal"
        component={CreateDeal}
        options={{
          tabBarLabel: 'Nytt erbjudande',
          tabBarAccessibilityLabel: 'Nytt erbjudande',
          tabBarIcon: (color: any) => (
            <MaterialCommunityIcons name="corn" color={color} size={30} />
          ),
        }}
      />
      {/* TODO: Create stack navigation for explore/suppliers/buyers */}
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarLabel: 'Utforska',
          tabBarAccessibilityLabel: 'Utforska',
          tabBarIcon: (color: any) => (
            <MaterialCommunityIcons name="compass" color={color} size={20} />
          ),
        }}
      />

      <Tab.Screen
        name="TendersAndContracts"
        component={TendersAndContracts}
        options={{
          tabBarLabel: 'Mina anbud',
          tabBarAccessibilityLabel: 'Mina anbud',
          tabBarIcon: (color: any) => (
            <MaterialCommunityIcons name="account" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default SupplierNavigation
