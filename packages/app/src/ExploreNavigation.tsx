import { createStackNavigator } from '@react-navigation/stack'
import Explore from './components/Explore'
import Supplier from './components/Supplier'
import Buyer from './components/Buyer'

const ExploreNavigation = () => {
  const Stack = createStackNavigator()
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="ExploreSuppliersAndBuyers"
          options={{
            title: 'Utforska',
          }}
          component={Explore}
        />
        <Stack.Screen
          name="Supplier"
          options={{
            title: 'Utforska producent',
          }}
          component={Supplier}
        />
        <Stack.Screen
          name="Buyer"
          options={{
            title: 'Utforska beställare',
          }}
          component={Buyer}
        />
      </Stack.Navigator>
    </>
  )
}

export default ExploreNavigation
