import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socketContext'
import { Offer } from '../data/offers'
import useTenderRequests from './useTenderRequests'

type OfferExtended = Offer & {
  tenderRequest: any
}

const useOffers = (): [Array<OfferExtended>, any, any, any] => {
  const socket = useContext(SocketContext)
  const [offers, setOffers] = useState([] as Array<OfferExtended>)
  const [tenderRequests] = useTenderRequests()

  useEffect(() => {
    socket.on('offers', (offers: Array<Offer>) => {
      const extended = offers.map((offer) => {
        const offerExtended = offer as OfferExtended
        offerExtended.tenderRequest = tenderRequests.find(
          (tr) => tr.id === offer.tenderRequestId
        )
        return offer
      }) as Array<OfferExtended>
      setOffers(extended)
    })

    return () => {
      socket.off('offers')
    }
  }, [socket])

  const editOffer = (offer: OfferExtended) => {
    const offerBase = { ...offer } as Offer
    offerBase.tenderRequestId =
      offerBase.tenderRequestId || offer.tenderRequest.id
    socket.emit('editOffer', offerBase)
  }

  const addOffer = (offer: OfferExtended) => {
    const offerBase = { ...offer } as Offer
    offerBase.tenderRequestId =
      offerBase.tenderRequestId || offer.tenderRequest.id
    socket.emit('addOffer', offerBase)
  }

  const refresh = () => socket.emit('offers')

  return [offers, editOffer, addOffer, refresh]
}

export default useOffers
