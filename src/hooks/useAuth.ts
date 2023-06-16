import { useContext, useEffect, useCallback } from 'react'
import { SocketContext } from '../context/socketContext'
import { User } from '../data/user'
import { useAuthContext } from '../context/authContext'

type fn = (user: User, token?: string) => void

const useAuth = (): [user: User | null, login: fn, logout: fn, reset: any] => {
  const socket = useContext(SocketContext)
  const { user, setUser } = useAuthContext()

  const login = useCallback(
    (user: User, token?: string) => {
      socket.emit('login', { user, token }, (user: User) => {
        console.log('got user from socket', user)
        setUser(user)
      })
    },
    [socket, setUser]
  )

  const logout = useCallback(
    (user: User) => {
      console.log('logout', user)
      socket.emit('logout', { user }, (user: User) => {
        console.log('got user from socket', user)
        setUser(user)
      })
    },
    [socket, setUser]
  )

  const reset = useCallback(() => {
    socket.emit('reset')
    return true
  }, [socket])

  return [user, login, logout, reset]
}

export default useAuth
