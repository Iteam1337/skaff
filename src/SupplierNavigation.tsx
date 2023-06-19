import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Deals from './components/Deals'
import Deal from './components/Deal'
import ExploreNavigation from './ExploreNavigation'
import TenderRequests from './components/TenderRequests'
import TenderRequest from './components/TenderRequest'
import { createStackNavigator } from '@react-navigation/stack'
import { IconButton, useTheme } from 'react-native-paper'
import Notifications from './components/Notifications'
import SupplierProfile from './components/SupplierProfile'
import BottomNavigationIcon from './components/BottomNavigationIcon'
import CreateDeal from './components/CreateDeal'
import CreateOffer from './components/CreateOffer'

const DealsNavigation = () => {
  const Stack = createStackNavigator()
  return (
    <>
      <Stack.Navigator>
        <Stack.Group>
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
          <Stack.Screen
            name="CreateDeal"
            options={{
              title: 'Erbjud vara',
            }}
            component={CreateDeal}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="Notifications" component={Notifications} />
        </Stack.Group>
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
          name="CreateOffer"
          options={{
            title: 'Lämna anbud',
          }}
          component={CreateOffer}
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
          options={({ navigation }) => ({
            title: 'Producent',
            headerRight: () => (
              <IconButton
                icon="bell"
                size={18}
                onPress={() => navigation.navigate('Notifications')}
              />
            ),
          })}
          component={SupplierProfile}
        />
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Navigator>
    </>
  )
}

const SupplierNavigation = () => {
  const theme = useTheme()
  const Tab = createMaterialBottomTabNavigator()
  return (
    <Tab.Navigator
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.iconInactive}
      barStyle={{ backgroundColor: theme.colors.background }}
      theme={theme}
      initialRouteName="TenderRequests"
    >
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: 'Notiser',
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
