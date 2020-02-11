import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
const middleware = [thunk];
const initialState = {};
const store = createStore(rootReducer, initialState,applyMiddleware(...middleware)
    // compose(
    //     applyMiddleware(...middleware),
    //     window.devToolsExtension && window.devToolsExtension()
    // )
);

export default store;