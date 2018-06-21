/* 
Import Notes: 
- React is imported 
- React DOM IS imported to allow the application to be rendered
- App is imported as its the starting point for the application
- BrowserRouter is needed to enable routing
*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";

/* 
App Notes: 
- The App is wrapped in BrowserRouter
- This is then used in the REACTDOM rendering
*/

const app = (
    <BrowserRouter>
    <App/>
    </BrowserRouter>
)

/* 
REACTDOM Notes: 
- App is included in the method
- THe getElementById is so the HTML can pickup the React JS
*/

ReactDOM.render(app, document.getElementById( 'root' ) );
