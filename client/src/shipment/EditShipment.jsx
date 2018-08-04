import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import withRouter from 'react-router/withRouter';
import _get from 'lodash.get';

import MenuLayout from './../layouts/MenuLayout';
import * as forms from './forms';

class EditShipment extends React.Component {

    getForm = role => {
        const Form = _get(forms, role);

        if (Form) {
            return Form;
        }

        console.warn(`Not found form for role ${role}`);

        return null;
    }

    render() {
        const role = _get(this.props, 'role');
        const Form = this.getForm(role);
        const id = _get(this.props, 'match.params.id');

        const shipment = this.props.shipments.find(
            item => item._id === id
        );

        if (!shipment) {
            return null;
        }

        return (
            <div className="main__content">
                <div className="main__content-info">
                    <h1 className="main__content-user">{shipment.title}</h1>
                    <div className="shipment__details">
                        <div className="shipment__details-item">
                            <b>Current status</b>: {shipment.status}
                        </div>
                        <div className="shipment__details-item">
                            <b>Road</b>: {shipment.origin_address} &mdash; {shipment.destination_address}
                        </div>
                    </div>
                </div>
                <Form
                    id={id}
                    shipment={shipment}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        role: state.user.data.role,
        shipments: state.shipments.list,
    };
};

export default MenuLayout(
    withRouter(connect(mapStateToProps)(EditShipment))
);