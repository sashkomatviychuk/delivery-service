import React from 'react';

class BaseForm extends React.Component {

    state = {
        data: {},
        shipment: {},
    }

    /**
     * Set initial values to form
     * It must be override in child classes
     */
    setFieldsValues = () => {}

    /**
     * Submit form handler
     */
    onSubmit = e => {
        e.preventDefault();
        // update current shipment
        this.props.updateShipment(
            this.state.data,
            this.props.id
        ).then(result => {
            if (result) {
                this.props.history.push('/shipments');
            }
        });
    }

    /**
     * Change input handler
     */
    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState(() => ({
            data: {
                ...this.state.data,
                [name]: value,
            },
        }));
    }

    /**
     * Set initial data to component state
     */
    componentWillMount() {
        const shipment = this.props.shipments.find(
            item => item._id === this.props.id
        );

        if (shipment) {
            this.setState(() => ({ shipment }));
        }

        this.setFieldsValues(shipment);
    }
}

export default BaseForm;