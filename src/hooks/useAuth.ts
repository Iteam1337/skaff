import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socketContext'
import { User } from '../data/user'
import {
  saveAuthenticatedUser,
  removeAuthenticatedUser,
} from '../../lib/authStorage'

type fn = (user: User, token?: string) => User

const useAuth = (): [user: User, login: fn, logout: fn] => {
  const socket = useContext(SocketContext)
  const [user, setUser] = useState({} as User)

  useEffect(() => {
    socket.once('user', (user: User) => {
      console.log('got user', user)
      setUser(user)
      saveAuthenticatedUser(user)
    })
  }, [])

  const login = (user: User, token?: string) => {
    console.log('login', user, token)
    socket.emit('login', { user, token })
    saveAuthenticatedUser(user)
    return user
  }

  const logout = (user: User) => {
    console.log('logout', user)
    removeAuthenticatedUser()
    socket.emit('logout', { user })
    return user
  }

  return [user, login, logout]
}

export default useAuth
