import { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Checkbox, Text, useTheme } from 'react-native-paper'

const styles = StyleSheet.create({
  checkbox: {},
  checkboxContainer: {
    flexDirection: 'row',
  },
})

const CheckboxWithText = ({
  checkedByDefault,
  text,

  onChange,
}: {
  checkedByDefault: boolean
  text: string

  onChange: (checked: boolean) => void
}) => {
  const [checked, setChecked] = useState(checkedByDefault)
  const theme = useTheme()
  return (
    <View style={styles.checkboxContainer}>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          onChange(!checked)
          setChecked(!checked)
        }}
        color={theme.colors.primary}
      ></Checkbox>
      <Pressable
        onPress={() => {
          onChange(!checked)
          setChecked(!checked)
        }}
      >
        <Text style={{ paddingTop: 10 }}>{text}</Text>
      </Pressable>
    </View>
  )
}

export default CheckboxWithText
