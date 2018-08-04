import React from 'react';
import { Link } from 'react-router-dom';
import withRouter from 'react-router/withRouter';
import _get from 'lodash.get';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import BaseForm from './BaseForm';
import connect from './connect';

import 'react-datepicker/dist/react-datepicker.css';
import './form.css';

const initialData = {
    picked_at: null,
    delivered_at: null,
};

class BikerForm extends BaseForm {

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
            const picked_at = _get(shipment, 'picked_at', initialData.picked_at);
            const delivered_at = _get(shipment, 'delivered_at', initialData.delivered_at)

            return {
                data: {
                    ...this.state.data,
                    picked_at: picked_at ? moment(picked_at) : null,
                    delivered_at: delivered_at ? moment(delivered_at) : null,
                },
            };
        })
    }

    /**
     * Update picked_at date
     */
    onChangePickedAt = (time) => {
        this.setState(() => {
            return {
                data: {
                    ...this.state.data,
                    picked_at: time,
                },
            };
        });
    }

    /**
     * update delivered_at date
     */
    onChangeDeliveredAt = (time) => {
        this.setState(() => {
            return {
                data: {
                    ...this.state.data,
                    delivered_at: time,
                },
            };
        });
    }

    /**
     * Submit form handler
     */
    onSubmit = e => {
        e.preventDefault();

        const data = this.state.data;
        // update current shipment
        this.props.updateShipment(
            {
                picked_at: data.picked_at,
                delivered_at: data.delivered_at,
            },
            this.props.id
        ).then(result => {
            if (result) {
                this.props.history.push('/shipments');
            }
        });
    }

    render() {
        const shipment = _get(this.props, 'shipment');
        const status = shipment.status;
        const data = _get(this.state, 'data', initialData);
        const disablePickedAt = (status !== 'assigned');
        const disableDelivered = (status !== 'picked_up');

        return (
            <form action="#" method="post" onSubmit={this.onSubmit} >
                <div className="form__input">
                    <div className="datepicker-label">Picked at:</div>
                    <DatePicker
                        name="picked_at"
                        selected={data.picked_at}
                        dateFormat="LL, HH:mm"
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        onChange={this.onChangePickedAt}
                        disabled={disablePickedAt}
                        showTimeSelect
                    />
                </div>
                <div className="form__input">
                    <div className="datepicker-label">Delivered at:</div>
                    <DatePicker
                        name="delivered_at"
                        selected={data.delivered_at}
                        dateFormat="LL, HH:mm"
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        onChange={this.onChangeDeliveredAt}
                        disabled={disableDelivered}
                        showTimeSelect
                    />
                </div>
                <div className="form__actions">
                    <button type="submit" className="button button-primary">Edit</button>
                    <Link to="/shipments" className="button button-link">Back</Link>
                </div>
            </form>
        );
    }
}

export default withRouter(connect(BikerForm));