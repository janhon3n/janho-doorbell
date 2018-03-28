var Service = require('node-service-linux').Service;

// Create a new service object
var svc = new Service({
   name:'janhodoorbell',
   description: 'Doorbell system.',
   script: '/home/pi/Projects/janho-doorbell/main.js',
   env: {
      name: 'WORKING_DIR',
      value: '/home/pi/Projects/janho-doorbell/'
	}
});

// Listen for the "install" event, which indicates the 
// process is available as a service. 
svc.on('install',function(){
   svc.start();
});

svc.install();
