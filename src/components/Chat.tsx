import React from "react"
import { StyleSheet, View } from "react-native"
import { Title } from "react-native-paper"

interface IChatProps {}

const Chat: React.FunctionComponent<IChatProps> = (props) => {
  return (
    <View style={styles.container}>
      <Title>Chat</Title>
    </View>
  )
}
export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
