import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import configureStore from './config/configureStore';
import registerServiceWorker from './registerServiceWorker';
import App from './app/App';
import './config/toggleMenu';

const initialState = window.REDUX_INITIAL_STATE || {};
const store = configureStore(initialState);

const render = Component => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <Component />
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

render(App);

registerServiceWorker();
