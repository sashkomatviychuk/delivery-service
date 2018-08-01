import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import user from './../user/reducer';
import shipments from './../shipment/reducer';
import alert from './../alert/reducer';

export default function (initialState = {}) {
    const combined = combineReducers({
        user,
        shipments,
        alert,
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