import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '../src/data/user'

export async function saveAuthenticatedUser(user: User) {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user))
  } catch (e: any) {
    console.error('Error saving user selection: ' + e.message)
  }
}

export async function getAuthenticatedUser() {
  try {
    const user = JSON.parse((await AsyncStorage.getItem('user')) || '{}')
    return user
  } catch (e: any) {
    console.error('Error getting user selection: ' + e.message)
  }
}
export async function removeAuthenticatedUser() {
  try {
    await AsyncStorage.removeItem('user')
    return true
  } catch (e: any) {
    console.error('Error removing user selection: ' + e.message)
    return false
  }
}
