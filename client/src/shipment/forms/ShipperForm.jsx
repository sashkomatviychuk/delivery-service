import React from 'react';
import { Link } from 'react-router-dom';
import withRouter from 'react-router/withRouter';
import _get from 'lodash.get';

import BaseForm from './BaseForm';
import connect from './connect';

const initialData = {
    title: '',
    origin_address: '',
    destination_address: '',
    cost: 0,
};

class ShipperForm extends BaseForm {

    /**
     * initial state
     */
    state = {
        data: {
            ...initialData,
        },
    }

    /**
     * Set initials shipment values to form
     */
    setFieldsValues = shipment => {
        this.setState(() => {
            return {
                data: {
                    ...this.state.data,
                    title: _get(shipment, 'title', initialData.title),
                    origin_address: _get(shipment, 'origin_address', initialData.origin_address),
                    destination_address: _get(shipment, 'destination_address', initialData.destination_address),
                    cost: _get(shipment, 'cost', initialData.cost),
                },
            };
        })
    }

    render() {
        const shipment = _get(this.props, 'shipment');
        const status = shipment.status;
        const notWaiting = status !== 'waiting';
        const data = _get(this.state, 'data', initialData);

        return (
            <form action="#" method="post" onSubmit={this.onSubmit} >
                <div className="form__input">
                    <input type="text" name="title" id="title" placeholder="Shipment name" autoComplete="off" required onChange={this.onChange} value={data.title} />
                </div>
                <div className="form__input">
                    <input type="text" name="origin_address" id="origin_address" placeholder="Origin address" autoComplete="off" required onChange={this.onChange} disabled={notWaiting} value={data.origin_address} />
                </div>
                <div className="form__input">
                    <input type="text" name="destination_address" id="destination_address" placeholder="Destination address" autoComplete="off" required onChange={this.onChange} disabled={notWaiting} value={data.destination_address} />
                </div>
                <div className="form__input">
                    <input type="number" min="0" name="cost" id="cost" placeholder="Cost" autoComplete="off" required onChange={this.onChange} disabled={notWaiting} value={data.cost} />
                </div>
                <div className="form__actions">
                    <button type="submit" className="button button-primary">Edit</button>
                    <Link to="/shipments" className="button button-link">Back</Link>
                </div>
            </form>
        );
    }
}

export default withRouter(connect(ShipperForm));
