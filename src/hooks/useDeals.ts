import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socketContext'
import { Deal } from '../data/deals'

const useDeals = (): [Array<Deal>, any, any, any] => {
  const socket = useContext(SocketContext)
  const [deals, setDeals] = useState([] as Array<Deal>)

  useEffect(() => {
    socket.on('deals', (deals: Array<Deal>) => {
      setDeals(deals)
    })

    return () => {
      socket.off('deals')
    }
  }, [socket])

  const editDeal = (deal: Deal) => {
    socket.emit('editDeal', deal)
  }

  const addDeal = (deal: Deal) => {
    socket.emit('addDeal', deal)
  }

  const refresh = () => socket.emit('deals')

  return [deals, editDeal, addDeal, refresh]
}

export default useDeals
