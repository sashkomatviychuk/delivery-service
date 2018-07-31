import axios from 'axios';

import { API_BASE_URL } from './../config';
// add show error
export const SET_USER = 'SET_USER';
export const DESTROY_USER = 'DESTROY_USER';
export const SET_USER_STATS = 'SET_USER_STATS';

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
        return axios.post(`${API_BASE_URL}/login`, credentials)
            .then(response => {
                const { data, token, error } = response.data;

                if (error) {
                    return { error, result: 0 };
                }

                if (data && token) {
                    dispatch(setUser(data, token));
                    dispatch(doFetchStats(token));
                }

                return { result: 1 };
            })
            .catch(err => {
                return {
                    result: 0,
                };
                // dispatch(showError('Bad login or password'));
            });
    };
}

export const doLogout = function doLogout() {
    return (dispatch, getState) => {
        dispatch(destroyUser());
    }
}

export const doRegister = function doRegister(data) {
    return (dispatch, getState) => {
        // todo: add validation
        if (data['password'] !== data['confirm_password']) {
            return Promise.resolve({
                error: 'Password confirm is not the same that password',
            });
        }

        delete data['confirm_password'];

        return axios.post(`${API_BASE_URL}/register`, data)
            .then(response => {
                return response.data;
            })
            .catch(err => {
                return {
                    result: 0,
                };
            });
    };
}

export const doFetchStats = function doFetchStats(token) {
    return (dispatch, getState) => axios.get(`${API_BASE_URL}/stats`, { headers: { Authorization: token } })
        .then(response => {
            const data = response.data || {};
            const stats = data.stats || [];

            dispatch(setUserStats(stats));
        })
}