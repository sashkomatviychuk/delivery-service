import { SET_USER, DESTROY_USER } from './actions'

let initialState = {
    isLoggedIn: false,
    data: {},
    token: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                isLoggedIn: true,
                data: action.data,
                token: action.token,
            };

        case DESTROY_USER:
            return {
                ...state,
                isLoggedIn: false,
                data: {},
                token: null,
            };

        default:
            return state;
    }
};