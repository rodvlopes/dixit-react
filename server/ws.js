const WebSocket = require('ws')
const url = require('url')
const https = require('https');
const http = require('http');
const fs = require('fs');
const PORT = 7000

let server

if (process.env.SSL_CERT_PATH) {
  server = https.createServer({
    cert: fs.readFileSync(process.env.SSL_CERT_PATH),
    key: fs.readFileSync(process.env.SSL_KEY_PATH)
  })
  console.log('SSL_CERT_PATH', process.env.SSL_CERT_PATH)
  console.log('SSL_KEY_PATH', process.env.SSL_KEY_PATH)
}
else {
  server = http.createServer()
  console.log('No SSL_CERT_PATH defined')
}

const wss = new WebSocket.Server({server})

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

    if (isEcho(message)) {
      return ws.send(message.replace('echo=', ''))
    }
    
    if (isStats(message)) {
      return ws.send(JSON.stringify(lastState))
    }

    console.time('addStampToState')
    if (!(message = addStampToState(message, lastState[room]))) {
      return ws.send(JSON.stringify({
        ...JSON.parse(lastState[room]),
        error: 'ErrorInvalidTransition'
      }))
    }
    console.timeEnd('addStampToState')

    lastState[room] = message
  
    /* Broadcast to all clients from the same room including me */
    wss.clients.forEach(client => {
      if (client.room === ws.room && client.readyState === WebSocket.OPEN){
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

const isEcho = (message) => {
  return message.indexOf('echo=') === 0
}

const isStats = (message) => {
  return message.indexOf('stats') === 0
}

const addStampToState = (message, lastStateMessage) => {
  const state = JSON.parse(message)
  if (!lastStateMessage || state.timestamp === JSON.parse(lastStateMessage).timestamp) {
    state.timestamp = Date.now()
    return JSON.stringify(state)
  }
  else {
    return null
  }
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

server.listen(PORT, '0.0.0.0');
info(`Server started on port ${PORT}`);
