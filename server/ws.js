const WebSocket = require('ws')
var url = require('url')

const wss = new WebSocket.Server({ port: 7000 })

let DEBUG = true

let lastState = {}

wss.on('connection', function connection(ws, req) {
  const { query: { id, room } } = url.parse(req.url, true)
  ws.id = id
  ws.room = room

  DEBUG && console.log('new client connected client [%s] at room [%s]', id, room)

  lastState[room] && ws.send(lastState[room])

  ws.on('message', function incoming(message) {
    DEBUG && console.log('received from [%s] at room [%]', ws.id, ws.room)
    DEBUG && console.log(message)
    lastState[room] = message
  
    /* Broadcast to all clients from the same room except me */
    wss.clients.forEach(client => {
      if (client !== ws &&
          client.room === ws.room &&
          client.readyState === WebSocket.OPEN
        ){
        DEBUG && console.log('Broadcasting to [%s] at room [%s]', client.id, client.room)
        client.send(message)
      }
    })
  })

})