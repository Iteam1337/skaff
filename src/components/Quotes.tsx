import React from "react"
import { StyleSheet, View } from "react-native"
import { Title } from "react-native-paper"

interface IQuouteProps {}

const Quoute: React.FunctionComponent<IQuouteProps> = (props) => {
  return (
    <View style={styles.container}>
      <Title>Quoute</Title>
    </View>
  )
}
export default Quoute

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
