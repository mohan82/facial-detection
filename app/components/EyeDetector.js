import MediaHelper from './MedialHelper';
import objectdetect from 'objectdetect'
import eye from 'objectdetectEye'
import face from 'objectdetectFace';
import  Smoother from  'smoother'


export default class EyeDetector {
    constructor(video, canvas) {
        this.video = video;
        this.canvas = canvas;
        this.smoother = new Smoother([0.9999999, 0.9999999, 0.999, 0.999], [0, 0, 0, 0]);
        this.canvasContext = this.canvas.getContext('2d');
        this.detector =null;
    }

    detectEye() {
        let videoElement =$(this.video);

       MediaHelper.requestAnimationFrame(this.detectEye.bind(this));
        console.log(`width:${videoElement.width()},offsetX:${videoElement.offset().left} ]
        height:${videoElement.height()}`);
        //detector = objectdetect.detector(width, height, 1.2, objectdetect.eye);
        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA && this.video.videoWidth > 0) {

            // Prepare the detector once the video dimensions are known:
            if (this.detector===null) {
                // var width = ~~(60 * this.video.videoWidth / this.video.videoHeight);
                // var height = 60;
                this.detector = new objectdetect.detector(videoElement.width(),videoElement.height(), 1.2, eye.eye);
                console.log(this.detector);
            }
            var coords = this.detector.detect(this.video, 1);
            if (coords[0]) {
                var coord = coords[0];
                console.log(coords)
                //coord = this.smoother.smooth(coord);
                this.drawEye(coord);

            }
        }
    }

    drawEye(coord){
       this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let videoElement =$(this.video);
        // // Rescale coordinates from detector to video coordinate space:
        // coord[0] *= videoElement.width() / this.detector.canvas.width;
        // coord[1] *= videoElement.height() / this.detector.canvas.height;
        // coord[2] *= videoElement.width()  / this.detector.canvas.width;
        // coord[3] *= videoElement.height() / this.detector.canvas.height;
        this.canvasContext.strokeStyle = "rgb(0,0,250)";
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(coord[0], coord[1]);
        this.canvasContext.lineTo(coord[0]+3,coord[1]+3)
        this.canvasContext.closePath();
        this.canvasContext.stroke();

        // this.canvasContext.beginPath();
        // this.canvasContext.arc(coord[2], coord[3], 3, 0, Math.PI*2, true);
        // this.canvasContext.closePath();
        // this.canvasContext.fill();

    }
    drawLeftEye(){

    }

}


