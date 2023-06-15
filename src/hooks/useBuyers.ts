import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socketContext'
import { Buyer } from '../data/buyers'

const useBuyers = (): [Array<Buyer>, any, any, any] => {
  const socket = useContext(SocketContext)
  const [buyers, setBuyers] = useState([] as Array<Buyer>)

  useEffect(() => {
    const receive = (buyers: Array<Buyer>) => {
      setBuyers(buyers)
    }
    socket.on('buyers', receive)
    socket.on('connect', () => socket.emit('buyers', receive))

    return () => {
      socket.off('buyers', receive)
      socket.off('connect', receive)
    }
  }, [socket])

  const editBuyer = (buyer: Buyer) => {
    socket.emit('editBuyer', buyer)
  }

  const addBuyer = (buyer: Buyer) => {
    socket.emit('addBuyer', buyer)
  }

  const refresh = () =>
    socket.emit('buyers', (buyers: Buyer[]) => setBuyers(buyers))

  return [buyers, editBuyer, addBuyer, refresh]
}

export default useBuyers
