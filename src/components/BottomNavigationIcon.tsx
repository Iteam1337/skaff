import { useTheme } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const BottomNavigationIcon = ({
  name,
  focused,
}: {
  name: string
  focused: boolean
}) => {
  const theme = useTheme()

  return (
    <MaterialCommunityIcons
      name={name}
      color={focused ? theme.colors.primary : theme.colors.iconInactive}
      size={20}
    />
  )
}

export default BottomNavigationIcon
