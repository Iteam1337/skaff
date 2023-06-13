import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socketContext'
import { User } from '../data/user'
import { AuthContext } from '../context/authContext'
import { set } from 'react-native-reanimated'

type fn = (user: User, token?: string) => User

const useAuth = (): [user: User, login: fn, logout: fn, reset: any] => {
  const socket = useContext(SocketContext)
  const auth = useContext(AuthContext) as { user: User }
  const [user, setUser] = useState(auth.user)

  useEffect(() => {
    socket.on('user', (user: User) => {
      console.log('got user from socket', user)
      auth.user = user
      setUser(user)
    })
  }, [socket])

  const login = (user: User, token?: string) => {
    socket.emit('login', { user, token })
    return user
  }

  const logout = (user: User) => {
    console.log('logout', user)
    socket.emit('logout', { user })
    auth.user = {} as User
    setUser(auth.user)
    return user
  }

  const reset = () => {
    socket.emit('reset')
    return true
  }

  return [user, login, logout, reset]
}

export default useAuth
