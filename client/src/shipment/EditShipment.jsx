import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import withRouter from 'react-router/withRouter';
import _get from 'lodash.get';

import MenuLayout from './../layouts/MenuLayout';
import * as forms from './forms';

class EditShipment extends React.Component {

    getForm = role => {
        const Form = _get(form, role);

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

        return (
            <div className="main__content">
                <div className="main__content-info">
                    <h1 className="main__content-user">Edit shipment</h1>
                </div>
                <Form id={id} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        role: state.user.data.role,
    };
};

export default MenuLayout(
    withRouter(connect(mapStateToProps)(EditShipment))
);