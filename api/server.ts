import express from 'express'
import { createServer } from 'http'
import path from 'path'
import uuid from 'react-native-uuid'
import { Server } from 'socket.io'

import buyers from '../src/data/buyers'
import { categories } from '../src/data/categories'
import deals from '../src/data/deals'
import offers from '../src/data/offers'
import suppliers from '../src/data/suppliers'
import tenderRequests from '../src/data/tenderRequests'
import { sendPushNotification as push } from './notifications'
const port = process.env.PORT || 3000
const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

app.use('/assets', express.static(path.join(__dirname, '../assets')))
app.get('/healthz', (req, res) => res.send('ok'))

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

const reset = () => {
  Object.assign(state, {
    buyers: [...buyers], // reset to original data
    suppliers: [...suppliers],
    offers: [...offers],
    deals: [...deals],
    tenderRequests: [...tenderRequests],
    categories: { ...categories },
    notifications: [],
  })
  sync(io)
}

const unique = (arr: any[]) => [...new Set(arr)]

const sendPushNotification = (data: any) => {
  console.log('saving and sending push notification', data)
  if (data.to?.length) push(data)
  state.notifications.push(data)
  io.emit('notifications', state.notifications)
}

// either provide socket or io - if you provide io then it will send to all sockets
const sync = (socket: any) => {
  console.log(
    'syncing',
    state.deals.length,
    'deals',
    state.tenderRequests.length,
    'tenderRequests',
    state.suppliers.length,
    'suppliers',
    state.buyers.length,
    'buyers',
    state.offers.length,
    'offers'
  )
  socket.emit('tenderRequests', state.tenderRequests)
  socket.emit('suppliers', state.suppliers)
  socket.emit('buyers', state.buyers)
  socket.emit('notifications', state.notifications)
  socket.emit('deals', state.deals)
  socket.emit('offers', state.offers)
}

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('reset', () => reset())

  socket.on('deals', (respond) => respond(state.deals))
  socket.on('buyers', (respond) => respond(state.buyers))
  socket.on('tenderRequests', (respond) => respond(state.tenderRequests))

  // USERS
  socket.on('login', ({ user, token }, respond) => {
    console.log('login', user.type, user.name, token)
    switch (user.type) {
      case 'buyer':
        const buyer = state.buyers.find((b) => b.id === user.id)
        if (!buyer) return
        buyer.token = token
        buyer.online = true
        buyer.lastOnline = new Date()
        io.emit('buyers', state.buyers)
        socket.data.user = buyer
        respond(buyer)

        break
      case 'supplier':
        const supplier = state.suppliers.find((s) => s.id === user.id)
        if (!supplier) return
        supplier.token = token
        supplier.online = true
        supplier.lastOnline = new Date()
        io.emit('suppliers', state.suppliers)
        socket.data.user = supplier
        respond(supplier)
        break
    }
    socket.once('disconnect', () => {
      if (!socket.data.user) return
      console.log('disconnect', socket.data.user.name)
      socket.data.user.online = false
      socket.data.user.lastOnline = new Date()
      io.emit('suppliers', state.suppliers)
      io.emit('buyers', state.buyers)
    })
  })

  socket.on('logout', ({ user }) => {
    switch (user.type) {
      case 'buyer':
        const buyer = state.buyers.find((b) => b.id === user.id)
        if (!buyer) return
        buyer.online = false
        buyer.lastOnline = new Date()
        io.emit('suppliers', state.suppliers)
        socket.emit('user', buyer)
        break
      case 'supplier':
        const supplier = state.suppliers.find((s) => s.id === user.id)
        if (!supplier) return
        supplier.online = false
        supplier.lastOnline = new Date()
        io.emit('suppliers', state.suppliers)
        socket.emit('user', supplier)
        break
    }
  })

  socket.on('editUser', (user, respond) => {
    console.log('editUser', user)

    // don't overwrite values set by server
    delete user.token
    delete user.onlin
    delete user.lastOnline

    switch (user.type) {
      case 'buyer':
        const buyer = state.buyers.find((b) => b.id === user.id)
        if (!buyer) return
        Object.assign(buyer, user)
        respond(buyer)
        io.emit('buyers', state.buyers)
        break
      case 'supplier':
        const supplier = state.suppliers.find((s) => s.id === user.id)
        if (!supplier) return
        Object.assign(supplier, user)
        io.emit('suppliers', state.suppliers)
        respond(supplier)
        break
    }
  })

  // DEALS
  socket.on('addDeal', (deal) => {
    deal.id = uuid.v4()
    state.deals.push(deal)
    console.log('addDeal', deal)
    const tokens = unique(
      state.buyers.map(({ token }) => token).filter((t) => t)
    )

    sendPushNotification({
      to: tokens,
      title: 'Nytt erbjudande i Skaff',
      body: `${deal.product?.name || 'Produkt'} för ${
        Math.round(deal.price.SEK_per_Kg * 10) / 10
      } kr/kg från ${deal.supplier.name}`,
      data: {
        date: new Date(),
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
    offer.id = uuid.v4()
    state.offers.push(offer)
    console.log('addOffer', offer)
    const tenderRequest = state.tenderRequests.find(
      (tr) => tr.id === offer.tenderRequestId
    )
    // TODO: only send if the offer is submitted
    const token = tenderRequest?.buyer?.token
    if (tenderRequest)
      sendPushNotification({
        to: [token],
        title: 'Nytt anbud i Skaff',
        body: `Anbud på ${tenderRequest.title} från ${offer.supplier.name}`,
        data: {
          date: new Date(),
          type: 'offer',
          to: [tenderRequest.buyer.id],
          id: offer.id,
          tenderRequestId: offer.tenderRequestId,
        },
      })
    io.emit('offers', state.offers)
  })

  socket.on('offers', (respond) => {
    respond(state.offers)
  })

  socket.on('editOffer', (offer) => {
    const index = state.offers.findIndex((d) => d.id === offer.id)
    const oldOffer = state.offers[index]
    if (!oldOffer.approved && offer.approved) {
      const token = oldOffer.supplier.token
      const tenderRequest = state.tenderRequests.find(
        (tr) => tr.id === offer.tenderRequestId
      )
      const otherOffersForTender = state.offers.filter(
        (o) => o.tenderRequestId === tenderRequest?.id && offer.id !== o.id
      )
      if (tenderRequest)
        sendPushNotification({
          to: [token],
          title: 'Anbud godkänt',
          body: `Ditt anbud på ${tenderRequest.title} har godkänts`,
          data: {
            date: new Date(),
            type: 'offer',
            to: [oldOffer.supplier.id],
            id: offer.id,
            tenderRequestId: offer.tenderRequestId,
          },
        })

      if (tenderRequest && otherOffersForTender)
        otherOffersForTender.forEach((o) =>
          sendPushNotification({
            to: [o.supplier.token],
            title: 'Anbud förkastat',
            body: `Ditt bud på ${tenderRequest.title} har förkastats. ${offer.supplier.name}s bud har godkänts av följande skäl: ${offer.acceptanceMotivation}`,
            data: {
              date: new Date(),
              type: 'offer',
              to: [o.supplier.id],
              id: offer.id,
              tenderRequestId: tenderRequest?.id,
            },
          })
        )
    }
    state.offers[index] = offer
    io.emit('offers', state.offers)
  })

  // TENDER REQUESTS
  socket.on('addTenderRequest', (tenderRequest) => {
    console.log('addTenderRequest', tenderRequest)
    tenderRequest.id = uuid.v4()
    state.tenderRequests.push(tenderRequest)
    io.emit('tenderRequests', state.tenderRequests)
    const tokens = unique(
      state.suppliers.map(({ token }) => token).filter((t) => t)
    )
    sendPushNotification({
      to: tokens,
      title: 'Ny förfrågan i Skaff',
      body: `${tenderRequest.title} från ${tenderRequest.buyer.name}`,
      data: {
        date: new Date(),
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

  // CHAT

  socket.on('messages', (tenderRequestId) => {
    const tenderRequestIndex = state.tenderRequests.findIndex(
      (d) => d.id === tenderRequestId
    )
    const tenderRequest = state.tenderRequests[tenderRequestIndex]

    io.emit('messages', tenderRequest.messages)
  })

  socket.on('sendMessage', (message) => {
    const tenderRequestIndex = state.tenderRequests.findIndex(
      (d) => d.id === message.tenderRequestId
    )
    const tenderRequest = state.tenderRequests[tenderRequestIndex]

    console.log(tenderRequest.messages)

    state.tenderRequests[tenderRequestIndex].messages = [
      ...tenderRequest.messages,
      message,
    ]

    // Send notification to everyone involved in the conversation
    // Currently also sends notification to the user who sent the message for easy demo purposes

    const toUsers = unique(
      tenderRequest.messages.map((message) => message.from)
      // .filter(
      //   (user) => user?.id != message.from?.id
      // ) /* <- uncomment this to disable notification to sender */
    )

    const tokens = unique(
      tenderRequest.messages
        .map((message) => message.from?.token)
        .filter((t) => t && t)
    )

    sendPushNotification({
      to: tokens,
      title: `Nytt meddelande i ${tenderRequest.title} från ${message.from.name}`,
      body: message.text,
      data: {
        date: message.date,
        type: 'message',
        to: toUsers.map((user) => user.id),
        id: tenderRequest.id,
      },
    })

    io.emit('messages', tenderRequest.messages)
  })

  // NOTIFICATIONS

  socket.on('notifications', (respond) =>
    respond(
      state.notifications.filter(
        (n) => !socket.data.user || n.data.to.includes(socket.data.user.id)
      )
    )
  )

  // SUPPLIERS
  socket.on('suppliers', (respond) => respond(state.suppliers))

  // BUYERS
  socket.on('buyers', (respond) => respond(state.buyers))
})

reset()
