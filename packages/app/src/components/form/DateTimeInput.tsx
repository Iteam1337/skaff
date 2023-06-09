import { useTheme } from 'react-native-paper'
import { DatePickerInput } from 'react-native-paper-dates'

const DateTimeInput = ({
  label,
  value,

  onChange,
}: {
  label: string
  value: Date

  onChange: (date: Date | undefined) => void
}) => {
  const theme = useTheme()
  return (
    <DatePickerInput
      theme={{
        ...theme,
        colors: {
          ...theme.colors,
          background: '#FFFFFF',
        },
      }}
      locale="sv"
      label={label}
      value={value}
      onChange={onChange}
      inputMode="start"
    ></DatePickerInput>
  )
}

export default DateTimeInput
