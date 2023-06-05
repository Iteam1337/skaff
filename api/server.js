const port = process.env.PORT || 3000
const io = require('socket.io')(port)
const state = {}

const reset = () => {
  state.buyers = require('../src/data/buyers')
  state.suppliers = require('../src/data/suppliers')
  state.deals = require('../src/data/deals')
  state.tenderRequests = require('../src/data/tenderRequests')
  state.categories = require('../src/data/categories')
  return state
}

// either provide socket or io - if you provide io then it will send to all sockets
const sync = (socket) => {
  socket.emit('deals', state.deals)
  socket.emit('tenderRequests', state.tenderRequests)
  socket.emit('suppliers', state.suppliers)
  socket.emit('buyers', state.buyers)
}

io.on('connection', (socket) => {
  console.log('a user connected')
  sync(socket) // send initial state
  socket.on('reset', () => reset() && sync(io))

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
