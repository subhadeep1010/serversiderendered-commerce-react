import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { renderRoutes } from 'react-router-config';

import Routes from './routes'

import { BrowserRouter as Router } from "react-router-dom";


const middleware = [thunk];

const state = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
console.log("window data", window.__ROUTE_DATA__);
const store = createStore(reducers,state,applyMiddleware(...middleware)
    // compose(
    //     applyMiddleware(...middleware),
    //     window.devToolsExtension && window.devToolsExtension()
    // )
    );


ReactDOM.hydrate(
    <Provider store={store}>
        <Router className="App">
            <App/>
            {/* <div>{renderRoutes(Routes)}</div> */}
        </Router>
    </Provider>,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
