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
  styles,
  outlined,
  onChange,
}: {
  label: string
  value: string
  keyboardType?: KeyboardTypeOptions
  disabled?: boolean
  multiline?: boolean
  numberOfLines?: number
  styles?: any
  outlined?: boolean
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
        roundness: 0,
      }}
      style={{
        opacity: 1,
        backgroundColor: 'white',
        ...styles,
      }}
      keyboardType={keyboardType}
      label={label}
      value={value}
      onChangeText={onChange}
      disabled={disabled}
      multiline={multiline}
      numberOfLines={numberOfLines}
      mode={outlined == undefined && !outlined ? 'flat' : 'outlined'}
    ></PaperTextInput>
  )
}

export default TextInput
