import * as React from 'react'
import { KeyboardTypeOptions } from 'react-native'
import { TextInput as PaperTextInput, useTheme } from 'react-native-paper'

const TextInput = ({
  label,
  value,
  keyboardType,
  disabled,
  multiline,
  numberOfLines,
  onChange,
}: {
  label: string
  value: string
  keyboardType?: KeyboardTypeOptions
  disabled?: boolean
  multiline?: boolean
  numberOfLines?: number
  onChange?: (text: string) => void
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
      disabled={disabled}
      multiline={multiline}
      numberOfLines={numberOfLines}
    ></PaperTextInput>
  )
}

export default TextInput
