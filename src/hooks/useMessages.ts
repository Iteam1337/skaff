import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socketContext'
import { Message } from '../data/tenderRequests'

const useMessages = (tenderRequestId: string): [Message[], any, any] => {
  const socket = useContext(SocketContext)
  const [messages, setMessages] = useState(new Array<Message>())

  useEffect(() => {
    const receive = (arr: Array<Message>) => setMessages(arr)
    socket.on('messages', receive)

    return () => {
      socket.off('messages', receive)
    }
  }, [socket])

  const sendMessage = (message: Message) => {
    console.log('sendMessage', message)
    socket.emit('sendMessage', message)
  }

  const refresh = () =>
    socket.emit('messages', tenderRequestId, (messages: Message[]) =>
      setMessages(messages)
    )

  return [messages, sendMessage, refresh]
}

export default useMessages
