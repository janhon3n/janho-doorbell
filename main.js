const buttonListener = require('./button-listener')
const io = require('socket.io')(8083)

buttonListener.listen(() => {
   console.log('DOORBELL ALERT')
   io.sockets.emit('doorbell')
})