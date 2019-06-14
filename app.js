const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
  }

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia

const video = document.querySelector('#video')
const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')
const caption = document.querySelector('#caption')
let model

handTrack.startVideo(video).then(status => {
    if (status) {
        navigator.getUserMedia(
            {video: {}},
            stream => {
                video.srcObject = stream
                setInterval(runDetection, 500)
            },
            err => console.log(err)
        )
    }
})

function runDetection() {
    model.detect(video).then(predictions => {
        caption.innerHTML = ''
        if (predictions.length > 0) {
            caption.innerHTML = 'Zabieraj te łapska'
        }
    })
}

handTrack.load(modelParams).then(lmodel => {
    model = lmodel
})
