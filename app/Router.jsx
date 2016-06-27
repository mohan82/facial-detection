import React from 'react'
import { render } from 'react-dom'
import { Router, Route,hashHistory } from 'react-router'
import App from './App.jsx';
import {Provider} from 'react-redux';


render(<App/>, document.getElementById('root'))