const Gpio = require('onoff').Gpio
const button = new Gpio(4, 'in', 'both')

const alertDelayTime = 10000
var listeningToAlerts = true

exports.listen = function(alertFunction) {
  
  button.watch((err, value) => {
    if (err) return console.error('There was an error', err)
    if (listeningToAlerts) {
      listeningToAlerts = false
      setTimeout(() => {
        listeningToAlerts = true
      }, alertDelayTime)
      console.log('Calling alert function')
      alertFunction()
    }
  });
  
  function unexportOnClose() {
    button.unexport();
  };
  
  process.on('SIGINT', unexportOnClose);
  
  console.log('Listening to button press')
}
