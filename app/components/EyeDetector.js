import MediaHelper from './MedialHelper';
import objectdetect from 'objectdetect'
import eye from 'objectdetectEye'
import face from 'objectdetectFace';
import  Smoother from  'smoother'


export default class EyeDetector {
    constructor(video, canvas,glasses) {
        this.video = video;
        this.canvas = canvas;
        this.glasses=glasses;
        this.smoother = new Smoother([0.9999999, 0.9999999, 0.999, 0.999], [0, 0, 0, 0]);
        this.canvasContext = this.canvas.getContext('2d');
        this.detector =null;
    }

    detectEye() {
        let videoElement =$(this.video);

       MediaHelper.requestAnimationFrame(this.detectEye.bind(this));
        console.log(`width:${videoElement.width()},offsetX:${videoElement.offset().left} ]
        height:${videoElement.height()}`);
              this.drawEye();
    }

    drawEye(){
        let video =$(this.video)[0];
        let detector = this.detector;
        let glasses = this.glasses;
        let smoother = this.smoother;
        if (video.readyState === video.HAVE_ENOUGH_DATA && video.videoWidth > 0) {
            // Prepare the detector once the video dimensions are known:
            if (detector==null) {
                var width = ~~(60 * video.videoWidth / video.videoHeight);
                var height  =60;
                this.canvas.width = width;
                this.canvas.height = height;
                detector = new objectdetect.detector(this.canvas.width, this.canvas.height, 1.1, face.frontalface);

            }

            // Perform the actual detection:
            var coords = detector.detect(video, 1);
            if (coords[0]) {
                var coord = coords[0];
                coord = smoother.smooth(coord);

                // Rescale coordinates from detector to video coordinate space:
                coord[0] *= video.videoWidth / detector.canvas.width;
                coord[1] *= video.videoHeight / detector.canvas.height;
                coord[2] *= video.videoWidth / detector.canvas.width;
                coord[3] *= video.videoHeight / detector.canvas.height;
                this.canvasContext.fillStyle = 'rgba(0, 255, 255, 0.5)';
                let left    = ~~(coord[0] + coord[2] * 1.0/8 + video.offsetLeft);
                let top   = ~~(coord[1] + coord[3] * 0.8/8 + video.offsetTop) ;
                let width   = ~~(coord[2] * 6/8) ;
                let height  = ~~(coord[3] * 6/8) ;
                this.canvasContext.clearRect(0,0,this.canvas.width,this.canvas.height);
                this.canvasContext.beginPath();
                this.canvasContext.moveTo(left,top);
                this.canvasContext.lineTo(width,height);
                this.canvasContext.closePath();
                this.canvasContext.stroke();
            }
            //     // Display glasses overlay:
            //     glasses.style.left    = ~~(coord[0] + coord[2] * 1.0/8 + video.offsetLeft) + 'px';
            //     glasses.style.top     = ~~(coord[1] + coord[3] * 0.8/8 + video.offsetTop) + 'px';
            //     glasses.style.width   = ~~(coord[2] * 6/8) + 'px';
            //     glasses.style.height  = ~~(coord[3] * 6/8) + 'px';
            //     glasses.style.opacity = 1;
            //
            // } else {
            //     var opacity = glasses.style.opacity - 0.2;
            //     glasses.style.opacity = opacity > 0 ? opacity : 0;
            // }
        }

    }
    drawLeftEye(){

    }

}


