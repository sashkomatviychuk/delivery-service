import {
    BEFORE_SHIPMENTS_LOADED,
    LOADED_SHIPMENTS,
    SHIPMENTS_LOADED_FAILED,
    UPDATE_SHIPMENT,
    SHOW_PREVIEW,
    HIDE_PREVIEW
} from './actions'

let initialState = {
    preview: {
        shipment: {},
        opened: false,
    },
    list: [],
    page: 1,
    prevLength: 0,
    isLoading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case BEFORE_SHIPMENTS_LOADED: {
            return {
                ...state,
                isLoading: true,
            }
        }

        case SHIPMENTS_LOADED_FAILED: {
            return {
                ...state,
                isLoading: false,
            }
        }

        case LOADED_SHIPMENTS: {
            return {
                ...state,
                isLoading: false,
                list: [
                    //...state.list,
                    ...action.shipments,
                ],
                prevLength: action.shipments.length,
            };
        }

        case UPDATE_SHIPMENT: {
            const list = JSON.parse(JSON.stringify(state.list));
            const { shipment } = action;
            const _id = shipment._id;
            const index = list.findIndex(shipment => shipment._id === _id);

            if (index === -1) {
                return state;
            }

            list[index] = shipment;

            return {
                ...state,
                list,
            };
        }

        case SHOW_PREVIEW: {
            const shipment = action.shipment;

            if (!shipment) {
                return state;
            }

            return {
                ...state,
                preview: {
                    shipment,
                    opened: true,
                },
            };
        }

        case HIDE_PREVIEW: {
            return {
                ...state,
                preview: {
                    shipment: {},
                    opened: false,
                },
            };
        }

        default:
            return state;
    }
};