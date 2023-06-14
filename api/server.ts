import { Server } from 'socket.io'
import express from 'express'
import { createServer } from 'http'
import path from 'path'

import buyers from '../src/data/buyers'
import deals from '../src/data/deals'
import offers from '../src/data/offers'
import tenderRequests from '../src/data/tenderRequests'
import suppliers from '../src/data/suppliers'
import { categories } from '../src/data/categories'
import { sendPushNotification as push } from './notifications'
const port = process.env.PORT || 3000
const app = express()
const server = createServer(app)
const io = new Server(server)

app.use('/assets', express.static(path.join(__dirname, '../assets')))

server.listen(port, () => {
  console.log(`listening on *:${port}`)
})

type State = {
  buyers: typeof buyers
  suppliers: typeof suppliers
  deals: typeof deals
  offers: typeof offers
  tenderRequests: typeof tenderRequests
  categories: typeof categories
  notifications: any[]
}

const state = {} as State

const reset = () =>
  Object.assign(state, {
    buyers: [...buyers], // reset to original data
    suppliers: [...suppliers],
    offers: [...offers],
    deals: [...deals],
    tenderRequests: [...tenderRequests],
    categories: { ...categories },
    notifications: [],
  })

const sendPushNotification = (data: any) => {
  push(data)
  state.notifications.push(data)
}
const sendMyOffers = (socket: any) => {
  /*if (!socket.data.user) return console.error('no user, can not send offers')
  const myOffers = state.offers.filter(
    (offer) =>
      offer.supplier?.id === socket.data.user.id ||
      offer.buyer?.id === socket.data.user.id
  )*/
  socket.emit('offers', state.offers)
}

// either provide socket or io - if you provide io then it will send to all sockets
const sync = (socket: any) => {
  console.log(
    'syncing',
    state.deals.length,
    'deals',
    state.tenderRequests.length,
    'tenderRequests'
  )
  socket.emit('tenderRequests', state.tenderRequests)
  socket.emit('suppliers', state.suppliers)
  socket.emit('buyers', state.buyers)
  socket.emit('notifications', state.notifications)
  socket.emit('deals', state.deals)
  sendMyOffers(socket)
}

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('reset', () => reset() && sync(io))

  socket.on('deals', () => socket.emit('deals', state.deals))
  socket.on('buyers', () => socket.emit('buyers', state.buyers))
  socket.on('tenderRequests', () =>
    socket.emit('tenderRequests', state.tenderRequests)
  )

  // USERS
  socket.on('login', ({ user, token }) => {
    console.log('login', user.type, user.name, token)
    switch (user.type) {
      case 'buyer':
        const buyer = state.buyers.find((b) => b.id === user.id)
        if (!buyer) return
        buyer.token = token
        buyer.online = true
        buyer.lastOnline = new Date()
        io.emit('buyers', state.buyers)
        socket.emit('user', buyer)
        socket.data.user = buyer

        break
      case 'supplier':
        const supplier = state.suppliers.find((s) => s.id === user.id)
        if (!supplier) return
        supplier.token = token
        supplier.online = true
        supplier.lastOnline = new Date()
        io.emit('suppliers', state.suppliers)
        socket.emit('user', supplier)
        socket.data.user = supplier
        break
    }
  })

  socket.on('logout', ({ user }) => {
    switch (user.type) {
      case 'buyer':
        const buyer = state.buyers.find((b) => b.id === user.id)
        if (!buyer) return
        buyer.token = undefined
        buyer.online = false
        buyer.lastOnline = new Date()
        io.emit('suppliers', state.suppliers)
        socket.emit('user', buyer)
        break
      case 'supplier':
        const supplier = state.suppliers.find((s) => s.id === user.id)
        if (!supplier) return
        supplier.token = undefined
        supplier.online = false
        supplier.lastOnline = new Date()
        io.emit('suppliers', state.suppliers)
        socket.emit('user', supplier)
        break
    }
  })

  // DEALS
  socket.on('addDeal', (deal) => {
    state.deals.push(deal)
    console.log('addDeal', deal)
    const tokens = state.buyers.map(({ token }) => token).filter((t) => t)
    if (tokens.length)
      sendPushNotification({
        to: tokens,
        title: 'Nytt erbjudande i Skaff',
        body: `${deal.product?.name || 'Produkt'} om ${deal.category} från ${
          deal.supplier.name
        }`,
        data: {
          type: 'deal',
          to: state.buyers.map(({ id }) => id),
          id: deal.id,
        },
      })

    io.emit('deals', state.deals)
  })

  // OFFERS
  socket.on('addOffer', (offer) => {
    if (!offer) return console.error('No offer provided')
    state.offers.push(offer)
    console.log('addOffer', offer)
    const tenderRequest = state.tenderRequests.find(
      (tr) => tr.id === offer.tenderRequestId
    )
    // TODO: only send if the offer is submitted
    const token = tenderRequest?.buyer?.token
    if (token)
      sendPushNotification({
        to: [token],
        title: 'Nytt anbud i Skaff',
        body: `Anbud på ${tenderRequest.title} från ${offer.supplier.name}`,
        data: {
          type: 'offer',
          to: [tenderRequest.buyer.id],
          id: offer.id,
        },
      })
    sendMyOffers(socket)
  })

  socket.on('offers', () => {
    sendMyOffers(socket)
  })

  socket.on('editOffer', (offer) => {
    const index = state.offers.findIndex((d) => d.id === offer.id)
    state.offers[index] = offer
    io.emit('offers', state.offers)
  })

  // TENDER REQUESTS
  socket.on('addTenderRequest', (tenderRequest) => {
    console.log('addTenderRequest', tenderRequest)
    state.tenderRequests.push(tenderRequest)
    io.emit('tenderRequests', state.tenderRequests)
    const tokens = state.suppliers.map(({ token }) => token).filter((t) => t)
    if (tokens.length)
      sendPushNotification({
        to: tokens,
        title: 'Ny förfrågan i Skaff',
        body: `${tenderRequest.title} från ${tenderRequest.buyer.name}`,
        data: {
          type: 'tenderRequest',
          to: state.suppliers.map(({ id }) => id),
          id: tenderRequest.id,
        },
      })
  })

  socket.on('editTenderRequest', (tenderRequest) => {
    const index = state.tenderRequests.findIndex(
      (d) => d.id === tenderRequest.id
    )
    state.tenderRequests[index] = tenderRequest
    io.emit('tenderRequests', state.tenderRequests)
  })

  // NOTIFICATIONS

  socket.on('notifications', () =>
    socket.emit(
      'notifications',
      state.notifications.filter((n) => n.data.to.includes(socket.data.user.id))
    )
  )
})

reset()
