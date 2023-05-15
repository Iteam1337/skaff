// import * as React from 'react'
import React, { useState } from 'react'
import Login from './components/Login'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from 'react-native-paper'
import Notifications from './components/Notifications'
import SupplierNavigation from './SupplierNavigation'
import BuyerNavigation from './BuyerNavigation'

const Navigation = () => {
  const RootStack = createStackNavigator()
  const [user, setUser] = useState<string>('')
  const { colors } = useTheme()

  return (
    <RootStack.Navigator initialRouteName="Login">
      <RootStack.Screen
        name="Hem"
        options={{
          headerShown: false,
        }}
        children={({ navigation }) => (
          <Login
            onLogin={({ userType }: { userType: string }) => {
              setUser(userType)
              navigation.navigate(userType)
            }}
          />
        )}
      />
      <RootStack.Screen
        name="Supplier"
        options={{
          headerShown: false,
        }}
        children={() => SupplierNavigation()}
      />
      <RootStack.Screen
        name="Buyer"
        options={{
          headerShown: false,
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
