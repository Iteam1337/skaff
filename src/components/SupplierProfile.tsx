import { Text, Button, List, useTheme } from 'react-native-paper'
import { StyleSheet, SafeAreaView } from 'react-native'
import { Tabs, TabScreen } from 'react-native-paper-tabs'
import { ScrollView } from 'react-native-gesture-handler'

const SupplierProfile = ({
  route,
  navigation,
}: {
  route: any
  navigation: any
}) => {
  const theme = useTheme()
  return (
    <ScrollView>
      <Tabs
        uppercase={false}
        style={{ backgroundColor: theme.colors.surface }}
        theme={theme}
      >
        <TabScreen label="Aktuellt">
          <SafeAreaView>
            <Text>Aktuellt</Text>
          </SafeAreaView>
        </TabScreen>
        <TabScreen label="Mina avtal">
          <Text>Mina avtal</Text>
        </TabScreen>
        <TabScreen label="Profil">
          <Text>Profil</Text>
        </TabScreen>
      </Tabs>
    </ScrollView>
  )
}

export default SupplierProfile
