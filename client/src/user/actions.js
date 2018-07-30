import axios from 'axios';
// add show error
export const SET_USER = 'SET_USER';
export const DESTROY_USER = 'DESTROY_USER';

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

export function doLogin(credentials) {
    return (dispatch, getState) => {
        return axios.post('/api/login', credentials)
            .then(response => {
                const { data, token, error } = response.data;

                if (error) {
                    return { error, result: 0 };
                }

                if (data && token) {
                    dispatch(setUser(data, token));
                }

                return { result: 1 };
            })
            .catch(err => {
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
    return (dispatch, getState) => axios.post('/api/register', data)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return {
                result: 0,
            };
        });
}