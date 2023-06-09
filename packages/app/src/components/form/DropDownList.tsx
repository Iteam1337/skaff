import { useState } from 'react'
import { KeyboardTypeOptions } from 'react-native'
import { useTheme } from 'react-native-paper'
import DropDown from 'react-native-paper-dropdown'

const DropDownList = ({
  label,
  value,
  values,
  multiSelect,
  setValue,
}: {
  label: string
  value: string
  values: Array<{ label: string; value: string }>
  multiSelect?: boolean
  setValue: any
}) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const theme = useTheme()
  return (
    <DropDown
      theme={{
        ...theme,
        colors: {
          ...theme.colors,
          background: '#FFFFFF',
        },
      }}
      dropDownStyle={{
        width: '100%',
      }}
      label={label}
      value={value}
      setValue={setValue}
      list={values}
      visible={showDropdown}
      showDropDown={() => setShowDropdown(true)}
      onDismiss={() => setShowDropdown(false)}
      multiSelect={multiSelect}
    ></DropDown>
  )
}

export default DropDownList
