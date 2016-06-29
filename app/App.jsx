import React from 'react'
import  ClmTrackerAdapter from './adapters/ClmTrackerAdapter.jsx';
import  NavigationBar from './components/NavigationBar.jsx'
import  FacialDetection from './components/FacialDetection.jsx'
export  default class App extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <div id="spinner" className="spinner inactive">
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                    <div>Loading...</div>
                </div>
                <main>
                    {this.props.children}
                </main>
            </div>

        )
    }
}

