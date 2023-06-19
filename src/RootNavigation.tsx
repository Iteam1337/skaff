// import * as React from 'react'
import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import { createStackNavigator } from '@react-navigation/stack'
import Notifications from './components/Notifications'
import SupplierNavigation from './SupplierNavigation'
import BuyerNavigation from './BuyerNavigation'
import { User } from './data/user'

const Navigation = () => {
  const RootStack = createStackNavigator()

  return (
    <RootStack.Navigator initialRouteName="Login">
      <RootStack.Screen
        name="Logga ut"
        options={{
          headerShown: false,
        }}
        children={({ navigation }) => (
          <Login
            onLogin={(user: User) => {
              navigation.navigate(user.type)
            }}
          />
        )}
      />
      <RootStack.Screen
        name="supplier"
        options={{
          headerShown: false,
        }}
        children={() => SupplierNavigation()}
      />
      <RootStack.Screen
        name="buyer"
        options={{
          headerShown: false,
          title: 'Tillbaka',
        }}
        children={() => BuyerNavigation()}
      />
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            title: 'Notiser',
          }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

export default Navigation
