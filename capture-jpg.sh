ffmpeg -y \
	-f v4l2 \
		-i /dev/v4l/by-id/usb-Sonix_Technology_Co.__Ltd._USB_2.0_Camera-video-index0 \
	-vframes 1 tmpfs/image.jpg
