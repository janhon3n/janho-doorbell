process.chdir(process.env.WORKING_DIR)

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
console.log('Serving static files at port :8084')

relay.createRelay('doorbell')

const startStream = () => {
	const stream = exec('sh ./start-stream.sh')
	console.log('Started the video stream from the usb webcam')
	stream.on('close', (code) => {
	    console.log('Stream closed, restarting...')
		setTimeout(startStream, 0)
	})
}
startStream()

io.on('connection', (socket) => {
   console.log('New socket.io connection')
})

buttonListener.listen(() => {
   console.log('Sending doorbell alerts to connected clients')
   io.sockets.emit('doorbell')
})

io.listen(8080)
console.log('Listening for socket.io connections on port 8080')
