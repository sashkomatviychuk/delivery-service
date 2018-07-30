import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import user from './../user/reducer';

export default function (initialState = {}) {
    const combined = combineReducers({
        user,
    });

    return createStore(
        combined,
        initialState,
        compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f,
            persistState(undefined, { key: 'delivery-app-v1' })
        )
    );
}