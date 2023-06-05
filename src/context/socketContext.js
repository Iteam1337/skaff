// SocketContext.js
import React, { createContext } from 'react'
import io from 'socket.io-client'

export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
  const socket = io('http://localhost:3000')
  socket.emit('reset')

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
