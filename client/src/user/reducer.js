import { SET_USER, DESTROY_USER, SET_USER_STATS } from './actions'

let initialState = {
    isLoggedIn: false,
    data: {},
    stats: [],
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
        
        case SET_USER_STATS: {
            return {
                ...state,
                stats: action.stats,
            };
        }

        default:
            return state;
    }
};