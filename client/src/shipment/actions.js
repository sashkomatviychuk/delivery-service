import axios from 'axios';

import { showError, showInfo } from './../alert/actions';

export const BEFORE_SHIPMENTS_LOADED = 'BEFORE_SHIPMENTS_LOADED';
export const LOADED_SHIPMENTS = 'LOADED_SHIPMENTS';
export const SHIPMENTS_LOADED_FAILED = 'SHIPMENTS_LOADED_FAILED';
export const UPDATE_SHIPMENT = 'UPDATE_SHIPMENT';
export const SHOW_PREVIEW = 'SHOW_PREVIEW';
export const HIDE_PREVIEW = 'HIDE_PREVIEW';

export const ELEMENTS_PER_PAGE = 20;
const apiBaseUrl = process.env.REACT_APP_API_ENDPOINT;

function beforeLoadedAction() {
    return {
        type: BEFORE_SHIPMENTS_LOADED,
    };
}

function failedLoadedAction() {
    return {
        type: SHIPMENTS_LOADED_FAILED,
    };
}

/**
 * @param {Object} issue
 * @returns {Object}
 */
function updateShipmentAction(shipment) {
    return {
        shipment,
        type: UPDATE_SHIPMENT,
    };
}

function shipmentsWasLoaded(shipments) {
    return {
        shipments,
        type: LOADED_SHIPMENTS,
    }
}

export const hidePreview = () => {
    return {
        type: HIDE_PREVIEW,
    };
};

export const showPreview = id => (dispatch, getState) =>  {
    const state = getState();
    const shipments = state.shipments.list || [];
    const shipment = shipments.find(item => item._id === id);

    dispatch({
        shipment,
        type: SHOW_PREVIEW,
    });
};

export const fetchShipments = () => (dispatch, getState) => {
    const state = getState();
    const token = state.user.token;
    const shipments = state.shipments.list || [];
    const page = parseInt(shipments.length / ELEMENTS_PER_PAGE) + 1;

    const payload = {
        params: {
            page,
        },
        headers: {
            Authorization: token,
        },
    };

    return axios.get(`${apiBaseUrl}/shipments`, payload)
        .then(response => {
            const data = response.data || {};
            const shipments = data.shipments || [];

            dispatch(shipmentsWasLoaded(shipments));
        })
        .catch(err => {});
};

export const createShipment = (data) => (dispatch, getState) => {
    const state = getState();
    const token = state.user.token;
    const headers = { Authorization: token };

    return axios.post(`${apiBaseUrl}/shipment`, data, { headers })
        .then(response => response.data)
        .catch(err => {
            return {
                result: 0,
            };
        });
};

export const updateShipment = (data, id) => (dispatch, getState) => {
    const state = getState();
    const token = state.user.token;
    const headers = { Authorization: token };

    console.log('data',data);

    return axios.put(`${apiBaseUrl}/shipment/${id}`, data, { headers })
        .then(response => {
            const data = response.data || {};

            if (data.result && data.shipment) {
                dispatch(updateShipmentAction(data.shipment));
                dispatch(showInfo('Shipment was updated'));

                return true;
            }

            const error = data.error || 'Error occured during updating';

            dispatch(showError(error));

            return false;
        })
        .catch(err => {
            dispatch(showError('Unknown error. Try again'));
            return false;
        });
};