import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socketContext'
import { Deal } from '../data/deals'

const useDeals = (): [Array<Deal>, any, any, any] => {
  const socket = useContext(SocketContext)
  const [deals, setDeals] = useState([] as Array<Deal>)

  useEffect(() => {
    const receive = (deals: Array<Deal>) => {
      setDeals(deals)
    }
    socket.on('deals', receive)

    return () => {
      socket.off('deals', receive)
    }
  }, [socket])

  const editDeal = (deal: Deal) => {
    socket.emit('editDeal', deal)
  }

  const addDeal = (deal: Deal) => {
    socket.emit('addDeal', deal)
  }

  const refresh = () =>
    socket.emit('deals', (deals: Array<Deal>) => setDeals(deals))

  return [deals, editDeal, addDeal, refresh]
}

export default useDeals
