import { useContext, useState } from 'react'
import { SocketContext } from '../context/socketContext'
import { User } from '../data/user'

type fn = (user: User, token?: string) => User

const useAuth = (): [user: User, login: fn, logout: fn] => {
  const socket = useContext(SocketContext)
  const [user, setUser] = useState({} as User)

  const login = (user: User, token?: string) => {
    console.log('login', user, token)
    socket.emit('login', user, token)
    socket.once('user', (user: User) => setUser(user))
    return user
  }

  const logout = (user: User) => {
    console.log('logout', user)
    socket.emit('logout', user)
    socket.once('user', (user: User) => setUser(user))
    return user
  }

  return [user, login, logout]
}

export default useAuth
