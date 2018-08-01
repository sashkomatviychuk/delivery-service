import axios from 'axios';

import { showError, showInfo } from './../alert/actions';

export const SET_USER = 'SET_USER';
export const DESTROY_USER = 'DESTROY_USER';
export const SET_USER_STATS = 'SET_USER_STATS';

const apiBaseUrl = process.env.REACT_APP_API_ENDPOINT;

function setUser(data, token) {
    return {
        data,
        token,
        type: SET_USER,
    };
}

function destroyUser() {
    return {
        type: DESTROY_USER,
    };
}

function setUserStats(stats) {
    return {
        stats,
        type: SET_USER_STATS,
    };
}

export function doLogin(credentials) {
    return (dispatch, getState) => {
        return axios.post(`${apiBaseUrl}/login`, credentials)
            .then(response => {
                const { data, token, result } = response.data;

                if (!result) {
                    return dispatch(showError('Bad login or password'));
                }

                if (data && token) {
                    dispatch(setUser(data, token));
                    dispatch(doFetchStats(token));
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    return dispatch(showError('Bad login or password'));
                }

                dispatch(showError('Unknown error. Try again'));
            });
    };
}

export const doLogout = function doLogout() {
    return (dispatch, getState) => {
        dispatch(destroyUser());
    }
}

export const doRegister = function doRegister(data, history) {
    return (dispatch, getState) => {

        return axios.post(`${apiBaseUrl}/register`, data)
            .then(response => {
                const data = response.data;

                if (data.error) {
                    return dispatch(showError(data.error));
                }

                if (!data.result) {
                    return dispatch(showError('Unknown error. Try again'));
                }

                dispatch(showInfo('You register successfuly. Now you can log in'));
                history.push('/login');
            })
            .catch(err => {
                dispatch(showError('Unknown error. Try again'));
            });
    };
}

export const doFetchStats = function doFetchStats(token) {
    return (dispatch, getState) => axios.get(`${apiBaseUrl}/stats`, { headers: { Authorization: token } })
        .then(response => {
            const data = response.data || {};
            const stats = data.stats || [];

            dispatch(setUserStats(stats));
        })
}