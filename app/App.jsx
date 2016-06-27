import React from 'react'
import  ClmTrackerAdapter from './adapters/ClmTrackerAdapter.jsx';
import  NavigationBar from './components/NavigationBar.jsx'
import  FacialDetection from './components/FacialDetection.jsx'
export  default class App extends React.Component
{

    constructor(props)
    {
        super(props);
        this.videoStream = {};
        // this.clmlTracker = new ClmTrackerAdapter();
        // this.clmlTracker.init(pModel);
    }

    componentDidMount()
    {
        // this.playVideo(this.refs.facialVideo, this.refs.facialCanvas)
        // this.clmlTracker.start(this.refs.facialVideo);
        // this.trackFeatures();
    }

    closeVideo()
    {
        this.refs.facialVideo.pause();
        this.refs.facialVideo.src = "";
        this.videoStream.getTracks()[0].stop();
    }

    trackFeatures(){
        requestAnimationFrame(this.trackFeatures.bind(this));
        let canvas = this.refs.facialCanvas.getContext('2d');
        canvas.clearRect(0, 0, this.refs.facialCanvas.width, this.refs.facialCanvas.height);
        if(this.clmlTracker.score()>0.50) {
            this.clmlTracker.draw(this.refs.facialCanvas)
        }
    }




    render()
    {
        return (
            <div>
                <NavigationBar/>
                <FacialDetection/>
            </div>

        )
    }
}

