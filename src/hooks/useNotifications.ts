import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socketContext'

type fn = () => {}

const useNotifications = (): [Array<Notification>, fn] => {
  const socket = useContext(SocketContext)
  const [notifications, setNotifications] = useState([] as Array<Notification>)

  useEffect(() => {
    socket.on('notifications', (notifications: Array<Notification>) => {
      setNotifications(notifications)
    })

    return () => {
      socket.off('notifications')
    }
  }, [socket])

  const refresh = () => socket.emit('notifications')

  return [notifications, refresh]
}

export default useNotifications
