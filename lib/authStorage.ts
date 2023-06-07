import AsyncStorage from '@react-native-async-storage/async-storage'

export async function saveAuthenticatedUser(id: number, type: string) {
  try {
    await AsyncStorage.setItem('userId', id.toString())
    await AsyncStorage.setItem('userType', type)
  } catch (e) {
    console.error('Error saving user selection: ' + e.message)
  }
}

export async function getAuthenticatedUser() {
  try {
    const userId = await AsyncStorage.getItem('userId')
    if (userId != null) return parseInt(userId)
  } catch (e) {
    console.error('Error getting user selection: ' + e.message)
  }
}
export async function getAuthenticatedUserType() {
  try {
    const userType = await AsyncStorage.getItem('userType')
    if (userType != null) return userType
  } catch (e) {
    console.error('Error getting user type: ' + e.message)
  }
}

export async function removeAuthenticatedUser(id: number) {
  try {
    await AsyncStorage.removeItem('userId')
    return true
  } catch (e) {
    console.error('Error removing user selection: ' + e.message)
    return false
  }
}