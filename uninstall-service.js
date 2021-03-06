var Service = require('node-service-linux').Service;

// Create a new service object 
var svc = new Service({
  name: 'janho-doorbell',
  script: '/home/pi/Projects/janho-doorbell/main.js'
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists());
});

// Uninstall the service. 
svc.uninstall();
