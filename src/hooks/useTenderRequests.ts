import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socketContext'
import { TenderRequest } from '../data/tenderRequests'

const useTenderRequests = (): [Array<TenderRequest>, any, any, any] => {
  const socket = useContext(SocketContext)
  const [tenderRequests, setTenderRequests] = useState(
    new Array<TenderRequest>()
  )

  useEffect(() => {
    socket.on('tenderRequests', (arr: Array<TenderRequest>) =>
      setTenderRequests(arr)
    )

    return () => {
      socket.off('tenderRequests')
    }
  }, [socket])

  const editTenderRequest = (tenderRequest: TenderRequest) => {
    socket.emit('editTenderRequest', tenderRequest)
  }

  const addTenderRequest = (tenderRequest: TenderRequest) => {
    socket.emit('addTenderRequest', tenderRequest)
  }

  const refresh = () => socket.emit('tenderRequests')

  return [tenderRequests, editTenderRequest, addTenderRequest, refresh]
}

export default useTenderRequests
