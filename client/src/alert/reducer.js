import { SHOW_ALERT, HIDE_ALERT } from './actions';

let initialState = {
    message: '',
    type: null,
    visible: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                message: action.message,
                type: action.style,
                visible: true,
            };

        case HIDE_ALERT:
            return {
                ...state,
                message: '',
                type: null,
                visible: false,
            };

        default:
            return state;
    }
}