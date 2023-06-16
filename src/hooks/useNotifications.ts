import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socketContext'
import useAuth from './useAuth'
import { useAuthContext } from '../context/authContext'

type fn = () => {}

const useNotifications = (): [Array<Notification>, fn] => {
  const socket = useContext(SocketContext)
  const [notifications, setNotifications] = useState([] as Array<Notification>)
  const { user } = useAuthContext()

  useEffect(() => {
    if (!socket) return
    const receive = (notifications: Array<Notification>) => {
      setNotifications(
        notifications.filter((n) => n.data?.to?.contains(user.id))
      )
    }
    socket.on('notifications', receive)

    return () => {
      socket.off('notifications', receive)
    }
  }, [user, socket])

  const refresh = () =>
    socket.emit('notifications', (notifications: Array<Notification>) =>
      setNotifications(notifications)
    )

  return [notifications, refresh]
}

export default useNotifications
