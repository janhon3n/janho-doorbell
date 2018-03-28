# janho-doorbell

I use a tmpfs (file system in ram) at janho-doorbell/tmpfs to store the temp image files.


## what is what

file/folder          | what it is
-----------------------------------
package.json         | npm package info
main.js              | Main script that launches all the services
websocket-relay      | Websocket relay/cache server for the videostream
button-listener.js   | Raspberry pi GPIO button click listener that launches the alarm
start-stream.sh      | a script that starts the video stream to the websocket-relay
capture-jpg.sh       | a script that captures a jpg image file and stores it in the tmpfs
face-detector.js     | a script for detecting faces in images, NOT IN USE
static-served/       | files in this folder are served over http, the stream viewing page
