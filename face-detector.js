const path = require('path')
const fs = require('fs')
const face = require('face-recognition')
const { execSync } = require('child_process')

const imagePath = 'tmpfs/image.jpg'
const detector = face.FaceDetector()

function detectFaces() {
	let image = face.loadImage(imagePath)
	let faceRectangles = detector.locateFaces(image)
	return (faceRectangles.length !== 0)
}

function update() {
	const output = execSync('sh capture-jpg.sh', {stdio:[0]})
	console.log('Image captured and saved to ' + imagePath)
	if (detectFaces()) {
		console.log('Faces detected')
	} else {
		console.log('No faces')
	}
	setTimeout(update, 0)
}

update()
