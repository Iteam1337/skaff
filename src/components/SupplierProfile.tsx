import { Text, Button, List, useTheme, Divider, Card } from 'react-native-paper'
import { StyleSheet, SafeAreaView, View } from 'react-native'
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
    <Tabs
      uppercase={false}
      style={{ backgroundColor: theme.colors.surface }}
      theme={theme}
    >
      <TabScreen label="Aktuellt">
        <ScrollView>
          <List.Accordion title="Anbudsförfrågningar">
            <Card>
              <Card.Title title="Test1"></Card.Title>
            </Card>
          </List.Accordion>
          <Divider />
          <List.Accordion title="Erbjudanden">
            <Card>
              <Card.Title title="Mumsiga morötter"></Card.Title>
            </Card>
          </List.Accordion>
        </ScrollView>
      </TabScreen>
      <TabScreen label="Mina avtal">
        <Text>Mina avtal</Text>
      </TabScreen>
      <TabScreen label="Profil">
        <Text>Profil</Text>
      </TabScreen>
    </Tabs>
  )
}

export default SupplierProfile
