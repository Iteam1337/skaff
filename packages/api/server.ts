import { Server } from 'socket.io'
import express from 'express'
import { createServer } from 'http'

import buyers from '../app/src/data/buyers'
import deals from '../app/src/data/deals'
import tenderRequests from '../app/src/data/tenderRequests'
const port = process.env.PORT || 3000
const app = express()
const server = createServer(app)
const io = new Server(server)

server.listen(port, () => {
  console.log(`listening on *:${port}`)
})

const state = {
  buyers: [],
  deals: deals,
  tenderRequests: tenderRequests,
  suppliers: [],
  categories: [],
}

const reset = () =>
  Object.assign(state, {
    buyers: buyers,
    deals: deals,
    tenderRequests: tenderRequests,
    suppliers: [],
    categories: [],
  })

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
}

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('reset', () => reset() && sync(io))

  socket.on('deals', () => socket.emit('deals', state.deals))
  socket.on('buyers', () => socket.emit('buyers', state.buyers))
  socket.on('tenderRequests', () =>
    socket.emit('tenderRequests', state.tenderRequests)
  )

  // DEALS
  socket.on('addDeal', (deal) => {
    state.deals.push(deal)
    io.emit('deals', state.deals)
  })

  socket.on('editDeal', (deal) => {
    const index = state.deals.findIndex((d) => d.id === deal.id)
    state.deals[index] = deal
    io.emit('deals', state.deals)
  })

  // TENDER REQUESTS
  socket.on('addTenderRequest', (tenderRequest) => {
    state.tenderRequests.push(tenderRequest)
    io.emit('tenderRequests', state.tenderRequests)
  })

  socket.on('editTenderRequest', (tenderRequest) => {
    const index = state.tenderRequests.findIndex(
      (d) => d.id === tenderRequest.id
    )
    state.tenderRequests[index] = tenderRequest
    io.emit('tenderRequests', state.tenderRequests)
  })
})

reset()
