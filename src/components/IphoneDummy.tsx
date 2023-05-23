import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function IphoneDummy({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>{children}</View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    position: 'relative',
    width: 375,
    maxWidth: '100vw',
    height: '90vh',
    maxHeight: '100vh',
    borderWidth: 10,
    borderColor: '#555',
    borderStyle: 'inset',
    borderRadius: 40,
    overflow: 'hidden',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
})
