import * as React from 'react'
import { List } from 'react-native-paper'
import { StyleSheet } from 'react-native'

const TendersAndContracts = () => {
  const [expanded, setExpanded] = React.useState(true)

  const handlePress = () => setExpanded(!expanded)

  return (
    <List.Section title="Accordions">
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
          right={(props) => <List.Icon {...props} color="green" icon="star" />}
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
