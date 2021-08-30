import {createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import app from './reducers/app'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 
export default function configureStore() {
    return createStore(
        app,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );
}