import React, {
    PropTypes,
} from 'react';
import FacialDetection from '../components/FacialDetection.jsx'
import delay from 'lodash/delay'
import {Carousel} from 'react-responsive-carousel'

class ArrowPointer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let arrowName = this.props.arrowDirection ? 'fa fa-arrow-up ' + this.props.arrowDirection : '';
        return (

            <div className="arrow-pointer">
                <i className={arrowName} aria-hidden="true"></i>
            </div>
        );
    }
}
let DIRECTIONS = ['up', 'left', 'down']

class FacialDetectionContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            arrow: 'up',
            images: [],
            trackEyeMovement: true
        }
    }

    takePhoto(canvasObject, video) {
        let cc = $(canvasObject)[0].getContext('2d');
        cc.drawImage(video, 0, 0, canvasObject.width,
            canvasObject.height);
        let url = canvasObject.toDataURL();
        //cc.clearRect(0,0,canvasObject.width,canvasObject.height);
        return url;
    }


    componentDidMount() {
    }

    triggerEyeMovement() {
        this.setState({
            trackEyeMovement: true
        });
    }

    _handleEyeMovement(video, canvas, url) {

        var self = this;

        switch (this.state.arrow) {
            case 'up':
                console.log('up')
                self.setState({
                    arrow: 'left',
                    images: this.state.images.concat(url),
                    trackEyeMovement: false
                });
                delay(self.triggerEyeMovement.bind(this), 4000)
                break;
            case 'left':
                console.log('left');
                self.setState({
                    arrow: 'right',
                    images: this.state.images.concat(url),
                    trackEyeMovement: false

                });
                delay(this.triggerEyeMovement.bind(this), 4000)
                break;
            case 'right':
                console.log('right');
                self.setState({
                    arrow: '',
                    images: this.state.images.concat(url),
                    trackEyeMovement: false
                });
                break;
        }

    }

    handleEyeMovement(video, canvas) {

        console.log("debounce....")
        let url = this.takePhoto(canvas, video);
        this._handleEyeMovement(video, canvas, url);

    }

    render() {
        return (
            <div>
                {(()=> {
                    if (this.state.images.length !== 3) {
                        return (<h4>Keep your face still and look in the direction of the arrows
                            on the screen</h4>)
                    }
                })()
                }
                <div className="facial-wrapper">
                    {(()=> {
                        if (this.state.arrow != '') {
                            return (<ArrowPointer arrowDirection={this.state.arrow}/>)
                        }
                    })()
                    }
                    {(()=> {
                        if (this.state.images.length !== 3) {
                            return (<div className="facial-content">
                                <div className="face-container">
                                    <FacialDetection handleEyeMovement={this.handleEyeMovement.bind(this)}
                                                     trackEyeMovement={this.state.trackEyeMovement}/>
                                </div>
                            </div>)
                        }
                    })()
                    }
                    {(()=> {
                        if (this.state.images.length === 3) {
                            return (<div><Carousel showThumbs={false} showArrows={true}>

                                    {this.state.images.map((img, index)=> {
                                        return (<div>
                                                <img src={img} width="640" height="480"/>
                                                <p className="legend">{index+1}</p>
                                            </div>
                                        );
                                    })}
                                </Carousel>
                                    <button className="verifyLink">Verify</button>
                                </div>
                            )
                        }
                    })()
                    }
                </div>
            </div>
        );
    }
}

export default FacialDetectionContainer;
