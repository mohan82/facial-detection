import React, {
    PropTypes,
} from 'react';
import  MediaHelper from './MedialHelper';
import debounce from 'lodash/debounce'

import ClmTrackerAdapter from '../adapters/ClmTrackerAdapter.jsx'
/**
 * Please refer to this picture for
 * http://auduno.github.io/clmtrackr/media/facemodel_numbering_new.png
 */
export default class FacialDetection extends React.Component {
    constructor(props) {
        super(props);
        this.clm = new ClmTrackerAdapter();
        this.eyeTrackingInfo = this.initialiseEyeMovement();

    }

    handleEyeMovement() {
        this.props.handleEyeMovement(this.refs.facialVideo,this.refs.facialCanvas);
    }

    initialiseEyeMovement() {
        return {
            trackingEyeMovement: false,
            leftEyeCenter: {
                x: 0,
                y: 0
            },
            rightEyeCenter: {
                x: 0,
                y: 0
            }
        };
    }

    setEyeMovement(faces) {
        return {
            trackingEyeMovement: true,
            leftEyeCenter: {
                x: faces[27][0],
                y: faces[27][1]
            },
            rightEyeCenter: {
                x: faces[32][0],
                y: faces[32][1]
            }
        }
    }

    isMobile() {
        return window.innerWidth < 500;
    }

    setFacialRecognition(videoWidth) {
        this.refs.facialVideo.width = videoWidth
        this.refs.facialVideo.height = Math.round(this.refs.facialVideo.width / 1.333);
        this.refs.facialCanvas.width = this.refs.facialVideo.width;
        this.refs.facialCanvas.height = this.refs.facialVideo.height;
    }

    resize() {

        if (this.isMobile()) {
            console.log(`resizing...to width:${window.innerWidth - 10}`);
            this.setFacialRecognition(window.innerWidth - 10);
        }
        else {
            let element = $(this.refs.facialVideo).width();
            this.setFacialRecognition(600)
        }
    }

    componentDidMount() {
        this.resize();
        window.addEventListener('resize', debounce(this.resize.bind(this), 150));
        this.playVideo(this.refs.facialVideo);
        this.clm.init(pModel);
        this.clm.start(this.refs.facialVideo);
        this.drawCanvas();
    }


    hasEyeMoved(faces){
        let leftEyeX = faces[27][0];
        let leftEyeY = faces[27][1];
        let rightEyeX =faces[32][0];
        let rightEyeY = faces[32][1];
        let diffLeftX =  Math.abs(this.eyeTrackingInfo.leftEyeCenter.x -leftEyeX);
        let diffLeftY = Math.abs(this.eyeTrackingInfo.leftEyeCenter.y -leftEyeY);
        let diffRightX = Math.abs(this.eyeTrackingInfo.rightEyeCenter.x-rightEyeX);
        let diffRightY = Math.abs(this.eyeTrackingInfo.rightEyeCenter.y-rightEyeY)
        if((diffLeftX>2||diffRightX>2||diffLeftY>5 ||diffRightY>5)){
            return true;
        }
        return false;
    }
    trackEyeMovements(faces) {

        if (!this.eyeTrackingInfo.trackingEyeMovement) {
            this.eyeTrackingInfo =this.setEyeMovement(faces)
        }else if(this.hasEyeMoved(faces)){
            this.eyeTrackingInfo = this.initialiseEyeMovement();
           this.handleEyeMovement()
        }

    }

    
    drawCanvas() {
        var canvasInput = $(this.refs.facialCanvas)[0];
        var cc = canvasInput.getContext('2d');
        MediaHelper.requestAnimationFrame(this.drawCanvas.bind(this));
        let faces = this.clm.getCurrentPosition();
        cc.globalAlpha = 0.5;
        if (faces && faces.length === 71 && this.clm.score()>0.50) {
            cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
            this.clm.draw(canvasInput)
        }
        if(this.clm.score()>0.70 && this.props.trackEyeMovement){
            this.trackEyeMovements(faces);
        }
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
        return (<div>
                <video ref="facialVideo">
                </video>
                <canvas className="facialCanvas" ref="facialCanvas"></canvas>

            </div>
        );
    }
}

