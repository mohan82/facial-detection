import React, {
    PropTypes,
} from 'react';
import  MediaHelper from './MedialHelper';
import EyeDetector from './EyeDetector';

export default class FacialDetection extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.playVideo(this.refs.facialVideo);
        this.eyedetector = new EyeDetector(this.refs.facialVideo, this.refs.facialCanvas);
        this.eyedetector.detectEye();
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
            <div id="face-container">
                <video id="videoel" ref="facialVideo" autoplay>
                </video>
                <canvas ref="facialCanvas" id="overlay"></canvas>
            </div>

        );
    }
}

