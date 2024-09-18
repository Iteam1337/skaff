import * as React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Button, List } from 'react-native-paper'
import useAuth from '../hooks/useAuth'

const TendersAndContracts = ({ navigation }: any) => {
  const [expanded, setExpanded] = React.useState(true)
  const { user, logout } = useAuth()

  const handlePress = () => setExpanded(!expanded)

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <List.Section title="Min affärer">
        <List.Accordion
          title="Skickade anbud"
          expanded={true}
          left={(props) => <List.Icon {...props} icon="lock" />}
        >
          <List.Item
            title="First Item"
            description="Item description"
            left={(props) => <List.Icon {...props} icon="lock" />}
          />
          <List.Item
            title="Second Item"
            description="Item description"
            left={(props) => <List.Icon {...props} icon="lock" />}
            right={(props) => (
              <List.Icon {...props} color="green" icon="star" />
            )}
          />
        </List.Accordion>

        <List.Accordion
          title="Aktiva anbud"
          left={(props) => <List.Icon {...props} icon="folder" />}
          expanded={expanded}
          onPress={handlePress}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </List.Section>
      <List.Section>
        <List.Accordion title="Mitt Konto" expanded={true}>
          <Button
            mode="contained"
            onPress={() => {
              navigation.popToTop()
              if (user) logout(user)
            }}
          >
            Logga ut
          </Button>
        </List.Accordion>
      </List.Section>
    </SafeAreaView>
  )
}

export default TendersAndContracts

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
