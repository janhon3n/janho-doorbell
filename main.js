const exec = require('child_process').exec
const buttonListener = require('./button-listener')
const relay = require ('./websocket-relay')
const io = require('socket.io')(8083)
const http = require('http')
const finalhandler = require('finalhandler')
const serveStatic = require('serve-static')

var serve = serveStatic('./static-served/')
var server = http.createServer((req, res) => {
   var done = finalhandler(req, res)
   serve(req, res, done)
})

server.listen(8084)

relay.createRelay('doorbell')


const stream = exec('sh ./start-stream.sh')
stream.on('close', (code) => {
   console.log('Stream closed')
})

io.on('connection', (socket) => {
   console.log('New socket.io connection')
})

buttonListener.listen(() => {
   console.log('Sending doorbell alerts to connected clients')
   io.sockets.emit('doorbell')
})

io.listen(8080)
console.log('Listening for socket.io connections on port 8080')