import React from "react"
import { StyleSheet, View } from "react-native"
import { Title } from "react-native-paper"

interface IOffersProps {}

const Offers: React.FunctionComponent<IOffersProps> = (props) => {
  return (
    <View style={styles.container}>
      <Title>Offers</Title>
    </View>
  )
}
export default Offers

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
