const WebSocket = require('ws')
var url = require('url')

const wss = new WebSocket.Server({ port: 7000, host: '0.0.0.0' })

let DEBUG = false
let INFO  = true

let lastState = {}

wss.on('connection', function connection(ws, req) {
  const { query: {id, room } } = url.parse(req.url, true)
  ws.id = id
  ws.room = room

  info(`new client connected client [%id] at room [%room]`, ws)

  ws.send(lastState[room]) //send even if it's undefined

  ws.on('message', function incoming(message) {
    info(`Received message from [%id] at room [%room]`, ws)
    debug(message)

    if (isIdentification(message)) {
      ws.id = message.replace('id=', '')
      info('Client identified: %id', ws)
      return
    }

    lastState[room] = message
  
    /* Broadcast to all clients from the same room except me */
    wss.clients.forEach(client => {
      if (client !== ws &&
          client.room === ws.room &&
          client.readyState === WebSocket.OPEN
        ){
        info(`Broadcasting to [%id] at room [%room]`, client)
        client.send(message)
      }
    })
  })

  ws.on('close', function close() {
    info(`Client [%id] closed the connection at room [%room]`, ws)
  })
})



// UTIL

const isIdentification = (message) => {
  return message.indexOf('id=') === 0
}

const now = () => new Date().toISOString()
  .replace(/T/, ' ')
  .replace(/\..+/, '')  

function debug() {
  DEBUG && console.log(now(), ...arguments)
}

function info(msg, client={}) {
  msg = msg
    .replace('%id', client.id)
    .replace('%room', client.room)
  const socket = client._socket || {remoteAddress: ''}
  INFO && console.log(now(), socket.remoteAddress, msg)
}

