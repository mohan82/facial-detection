import React, {
    PropTypes,
} from 'react';
import MediaHelper from '../components/MedialHelper'
import  debounce from 'lodash/debounce'
class FacePositionContainer extends React.Component {

    constructor(context,props){
        super(context,props);
        this.context= context;
    }
    getRadius(){
        if(this.isMobile()){
            return {x:40,y:70}
        }else {
            return{x:170,y:220}
        }
    }

    drawEgg(){
        var canvas =this.refs.facialCanvas;
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.setLineDash([5]);
        ctx.lineWidth = 5;
        ctx.lineDashOffset = 3;
        ctx.strokeStyle="white";
        ctx.globalAlpha = 0.5
        ctx.ellipse(this.refs.facialCanvas.width/2,this.refs.facialCanvas.height/2,
            this.getRadius().x,this.getRadius().y, 90 * Math.PI, 0, 2 * Math.PI);
        ctx.stroke();
    }

    isMobile() {
        return window.innerWidth < 500;
    }
    setFacialRecognition(videoWidth){
        this.refs.facialVideo.width=videoWidth
        this.refs.facialVideo.height = Math.round(this.refs.facialVideo.width/1.333);
        this.refs.facialCanvas.width =this.refs.facialVideo.width;
        this.refs.facialCanvas.height = this.refs.facialVideo.height;
    }
    resize(){
        if(this.isMobile()){
            console.log(`resizing...to width:${window.innerWidth-10}`);
            this.setFacialRecognition(window.innerWidth-10);
        }
        else {
            let element =$(this.refs.facialVideo).width();
            this.setFacialRecognition(600)
        }
    }


    componentDidMount() {
        this.resize();
        window.addEventListener('resize', debounce(this.resize.bind(this), 150));
        this.playVideo(this.refs.facialVideo)
        this.drawEgg();
        setTimeout(()=>{this.context.router.push("/facial-detection-step2")},
            3000);
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
            <div>
                <video ref="facialVideo" className="positon-face">
                </video>
                <canvas ref="facialCanvas"></canvas>
             </div>
        )
    }
}
FacePositionContainer.contextTypes={
    router: function () {
        return React.PropTypes.func.isRequired;
    }
}

const VerifyFacePosition = React.createClass({
    render() {
        return (
            <div>
                <h4>Please position your face within the circle </h4>
                <div className="facial-content">
                    <div className="face-container">
                        <FacePositionContainer/>
                    </div>
                </div>
            </div>
        );
    }
});


export default VerifyFacePosition;
