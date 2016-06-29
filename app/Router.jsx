import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import App from './App.jsx';
import {Provider} from 'react-redux';
import VerifyFacePosition from './views/VerifyFacePosition.jsx'
import VerifyFacePositionSuccess from './views/VerifyFacePositionSuccess.jsx'
import FacePosition from './views/FacePosition.jsx';
import FacialDetectionContainer from './views/FacialDetectionContainer.jsx';


render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={VerifyFacePosition}/>
           <Route component={FacePosition}>
            <Route path="/facial-detection-step1" component={VerifyFacePosition}/>
            <Route path="/facial-detection-step2" component={VerifyFacePositionSuccess}/>
           </Route>
            <Route path="/facial-detection-step3" component={FacialDetectionContainer}/>
        </Route>
    </Router>), document.getElementById('root'));