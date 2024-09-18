import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socketContext'
import { Offer } from '../data/offers'

const useOffers = (): [Array<Offer>, any, any, any] => {
  const socket = useContext(SocketContext)
  const [offers, setOffers] = useState([] as Array<Offer>)

  useEffect(() => {
    const receive = (offers: Array<Offer>) => {
      setOffers(offers)
    }
    socket.on('offers', receive)

    return () => {
      socket.off('offers', receive)
    }
  }, [socket])

  const editOffer = (offer: Offer) => {
    socket.emit('editOffer', offer)
  }

  const addOffer = (offer: Offer) => {
    socket.emit('addOffer', offer)
  }

  const refresh = ({ supplier, buyer } = {}) =>
    socket.emit('offers', (offers: Array<Offer>) => {
      let filteredOffers = offers
      if (supplier) {
        filteredOffers = filteredOffers.filter((o) => o.supplier.id == supplier.id)
      }
      if (buyer) {
        filteredOffers = filteredOffers.filter((o) => o.buyer.id == buyer.id)
      }
      setOffers(filteredOffers.sort((a, b) => a.price.SEK - b.price.SEK))
    })

  return [offers, editOffer, addOffer, refresh]
}

export default useOffers
