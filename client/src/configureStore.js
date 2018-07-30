import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import user from './user/reducer';

export default function (initialState = {}) {
    const combined = combineReducers({
        user,
    });

    return createStore(combined, initialState, applyMiddleware(thunk));
}