import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socketContext'
import { TenderRequest } from '../data/tenderRequests'

const useTenderRequests = () => {
  const socket = useContext(SocketContext)
  const [tenderRequests, setTenderRequests] = useState([] as TenderRequest[])

  useEffect(() => {
    socket.on('tenderRequests', setTenderRequests)

    return () => {
      socket.off('tenderRequests')
    }
  }, [socket])

  const updateTenderRequest = (tenderRequest: TenderRequest) => {
    socket.emit('editTenderRequest', tenderRequest)
  }

  const addTenderRequest = (tenderRequest: TenderRequest) => {
    socket.emit('addTenderRequest', tenderRequest)
  }

  return [tenderRequests, updateTenderRequest, addTenderRequest]
}

export default useTenderRequests
