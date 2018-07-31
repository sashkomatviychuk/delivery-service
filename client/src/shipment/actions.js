import axios from 'axios';

import { API_BASE_URL } from './../config';

export const BEFORE_SHIPMENTS_LOADED = 'BEFORE_SHIPMENTS_LOADED';
export const LOADED_SHIPMENTS = 'LOADED_SHIPMENTS';
export const SHIPMENTS_LOADED_FAILED = 'SHIPMENTS_LOADED_FAILED';
export const UPDATE_SHIPMENT = 'UPDATE_SHIPMENT';

const ELEMENTS_PER_PAGE = 20;

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
function updateShipmentAction(index, shipment) {
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

    return axios.get(`${API_BASE_URL}/shipments`, payload)
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

    return axios.post(`${API_BASE_URL}/shipment`, data, { headers })
        .then(response => response.data)
        .catch(err => {
            return {
                result: 0,
            };
        });
};