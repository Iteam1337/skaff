import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socketContext'
import { TenderRequest } from '../data/tenderRequests'

const useTenderRequests = (): [Array<TenderRequest>, any, any, any] => {
  const socket = useContext(SocketContext)
  const [tenderRequests, setTenderRequests] = useState(
    new Array<TenderRequest>()
  )

  useEffect(() => {
    const receive = (arr: Array<TenderRequest>) => setTenderRequests(arr)
    socket.on('tenderRequests', receive)

    return () => {
      socket.off('tenderRequests', receive)
    }
  }, [socket])

  const editTenderRequest = (tenderRequest: TenderRequest) => {
    console.log('editTenderRequest', tenderRequest)
    socket.emit('editTenderRequest', tenderRequest)
  }

  const addTenderRequest = (tenderRequest: TenderRequest) => {
    console.log('addTenderRequest', tenderRequest)
    socket.emit('addTenderRequest', tenderRequest)
  }

  const refresh = () =>
    socket.emit('tenderRequests', (tenderRequests: TenderRequest[]) =>
      setTenderRequests(tenderRequests)
    )

  return [tenderRequests, editTenderRequest, addTenderRequest, refresh]
}

export default useTenderRequests
