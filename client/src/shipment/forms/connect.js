import React from 'react';
import connect from 'react-redux/lib/connect/connect';

import { updateShipment } from './../actions';

const mapStateToProps = state => {
    return {
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updateShipment(data, id) {
            return dispatch(updateShipment(data, id));
        },
    };
}

export default function ConnectedForm(Form) {
    return connect(mapStateToProps, mapDispatchToProps)(Form);
}