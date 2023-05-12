// import * as React from 'react'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import TendersAndContracts from './components/TendersAndContracts'
import TenderRequests from './components/TenderRequests'
import TenderRequest from './components/TenderRequest'
import CreateTenderRequest from './components/CreateTenderRequest'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Deal from './components/Deal'
import Deals from './components/Deals'
import { IconButton } from 'react-native-paper'

const Stack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator()

const TenderRequestsNavigation = () => {
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

const BuyerNavigation = () => {
  const Tab = createMaterialBottomTabNavigator()
  return (
    <Tab.Navigator
      // activeColor="red"
      // inactiveColor="yellow"
      shifting={true}
      barStyle={{ backgroundColor: '#fff' }}
      initialRouteName="Login"
      screenOptions={{}}
    >
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
        name="TenderRequests"
        component={TenderRequestsNavigation}
        options={{
          tabBarLabel: 'Anbuds-förfrågningar',
          tabBarAccessibilityLabel: 'Anbudsförfrågningar',
          tabBarIcon: (color: any) => (
            <MaterialCommunityIcons name="cart" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateTenderRequest"
        component={CreateTenderRequest}
        options={{
          tabBarLabel: 'Ny anbuds-förfrågan',
          tabBarAccessibilityLabel: 'Ny anbudsförfrågan',
          tabBarIcon: (color: any) => (
            <MaterialCommunityIcons name="cart-plus" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="TendersAndContracts"
        component={TendersAndContracts}
        options={{
          tabBarBadge: '5',
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

export default BuyerNavigation
