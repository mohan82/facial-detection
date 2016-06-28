import React, {
    PropTypes,
} from 'react';
import  MediaHelper from './MedialHelper';
import EyeDetector from './EyeDetector';
import ClmTrackerAdapter from '../adapters/ClmTrackerAdapter.jsx'
export default class FacialDetection extends React.Component {
    constructor(props) {
        super(props);
        this.clm= new ClmTrackerAdapter();

    }

    componentDidMount() {
        this.playVideo(this.refs.facialVideo);
        this.clm.init(pModel);
        this.refs.facialVideo.width =$(this.refs.facialVideo).width()
        this.refs.facialVideo.height=$(this.refs.facialVideo).height()
        this.clm.start(this.refs.facialVideo);
        this.drawCanvas();
    }

    drawCanvas(){
        var canvasInput = $(this.refs.facialCanvas)[0];
        var cc = canvasInput.getContext('2d');
           MediaHelper.requestAnimationFrame(this.drawCanvas.bind(this));
            cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
            console.log(this.clm.draw(canvasInput));
        console.log(this.clm.getCurrentPosition().length)

    }

    playVideo(video) {
        let errBack = function (error) {
            console.log("Video capture error: ", error.code);
            video.pause();
        };
        let successCallBack = (stream)=> {
            video.src = MediaHelper.URL.createObjectURL(stream);
            this.videoStream = stream;
            video.play();
        };
        let videoObj = {"video": true};
        MediaHelper.getUserMedia(videoObj, successCallBack, errBack);
    }

    render() {
        return (
            <div className="facial-content">
                <div className="face-container">
                    <video  ref="facialVideo"  preload="auto" loop>

                    </video>
                    <canvas  ref="facialCanvas"></canvas>
            </div>
           </div>
            );  
    }
}

