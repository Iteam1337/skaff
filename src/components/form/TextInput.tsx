import * as React from 'react'
import { KeyboardTypeOptions } from 'react-native'
import { TextInput as PaperTextInput, useTheme } from 'react-native-paper'

const TextInput = ({
  label,
  value,
  keyboardType,
  onChange,
}: {
  label: string
  value: string
  keyboardType?: KeyboardTypeOptions
  onChange: (text: string) => void
}) => {
  const theme = useTheme()
  return (
    <PaperTextInput
      theme={{
        ...theme,
        colors: {
          ...theme.colors,
          background: '#FFFFFF',
        },
      }}
      style={{ opacity: 1 }}
      keyboardType={keyboardType}
      label={label}
      value={value}
      onChangeText={onChange}
    ></PaperTextInput>
  )
}

export default TextInput
