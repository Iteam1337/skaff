import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socketContext'
import { Deal } from '../data/deals'

const useDeals = () => {
  const socket = useContext(SocketContext)
  const [deals, setDeals] = useState([] as Deal[])

  useEffect(() => {
    socket.on('deals', setDeals)

    return () => {
      socket.off('deals')
    }
  }, [socket])

  const updateDeal = (deal: Deal) => {
    socket.emit('editDeal', deal)
  }

  return [deals, updateDeal]
}

export default useDeals
