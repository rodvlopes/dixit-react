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

  INFO && console.log('new client connected client [%s] at room [%s]', id, room)

  lastState[room] && ws.send(lastState[room])

  ws.on('message', function incoming(message) {
    INFO && console.log('received message from [%s] at room [%s]', ws.id, ws.room)
    DEBUG && console.log(message)

    if (isIdentification(message)) {
      ws.id = message.replace('id=', '')
      INFO && console.log('Client identified: %s', ws.id)
      return
    }

    lastState[room] = message
  
    /* Broadcast to all clients from the same room except me */
    wss.clients.forEach(client => {
      if (client !== ws &&
          client.room === ws.room &&
          client.readyState === WebSocket.OPEN
        ){
        INFO && console.log('Broadcasting to [%s] at room [%s]', client.id, client.room)
        client.send(message)
      }
    })
  })

  ws.on('close', function close() {
    INFO && console.log('Client [%s] closed the connection at room [%s]', ws.id, ws.room)
  })
})


const isIdentification = (message) => {
  return message.indexOf('id=') === 0
}