import React from 'react';
import { Link } from 'react-router-dom';
import withRouter from 'react-router/withRouter';
import _get from 'lodash.get';

import BaseForm from './BaseForm';
import connect from './connect';

const initialData = {
    biker_id: '',
    discount_type: '',
    discount_value: '',
};

class ManagerForm extends BaseForm {

    /**
     * initial state
     */
    state = {
        data: {
            ...initialData,
        },
        bikers: [],
        costWithDiscount: 0,
    }

    componentDidMount() {
        // fetch list of bikers
        this.props.fetchBikersList()
            .then(bikers => {
                this.setState(() => ({ bikers }));
            });
    }

    /**
     * Set initials shipment values to form
     */
    setFieldsValues = shipment => {
        const type = _get(shipment, 'discount_type', initialData.discount_type);
        const value = _get(shipment, 'discount_value', initialData.discount_value);
        const costWithDiscount = this.getNewCostWithDiscount(type, value);

        this.setState(() => {
            return {
                data: {
                    ...this.state.data,
                    biker_id: _get(shipment, 'biker_id._id', initialData.biker_id),
                    discount_type: type,
                    discount_value: value,
                },
                costWithDiscount,
            };
        });
    }

    getNewCostWithDiscount(type, value) {
        let discount = 0;
        let cost = _get(this.props, 'shipment.cost', 0);

        if (type === 'amount') {
            discount = value;
        } else if (type === 'percentage') {
            discount = Math.round(cost * value / 100);
        }

        let discounted = cost - discount;

        if (discounted <= 0) {
            discounted = 0;
        }

        return discounted;
    }

    onDiscountTypeChange = e => {
        this.onChange(e);

        const value = _get(this.state, 'data.discount_value', 0);
        const type = e.target.value;
        const costWithDiscount = this.getNewCostWithDiscount(type, value);

        this.setState(() => ({ costWithDiscount }));
    }

    onDiscountValueChange = e => {
        this.onChange(e);

        const type = _get(this.state, 'data.discount_type');
        const value = e.target.value;
        const costWithDiscount = this.getNewCostWithDiscount(type, value);

        this.setState(() => ({ costWithDiscount }));
    }

    /**
     * Prepare list of options for biker select field
     */
    getBikersSelectOptions() {
        let list = _get(this.state, 'bikers', []);
        const currentId = _get(this.state, 'data.biker_id', null);

        list = [
            {
                id: '',
                name: 'Select biker',
            },
            ...list,
        ]

        return list.map(biker => (
            <option value={biker.id} key={biker.id} defaultValue={currentId} >{biker.name}</option>
        ));
    }

    render() {
        const data = _get(this.state, 'data', initialData);
        const costWithDiscount = _get(this.state, 'costWithDiscount');
        const bikersOptions = this.getBikersSelectOptions();

        return (
            <form action="#" method="post" onSubmit={this.onSubmit} >
                <div className="shipment__details">
                    Cost with discount: {costWithDiscount}
                </div>
                <div className="form__input">
                    <div className="datepicker-label">Biker:</div>
                    <select name="biker_id" value={data.biker_id} onChange={this.onChange}>
                        {bikersOptions}
                    </select>
                </div>

                <div className="form__input">
                    <div className="datepicker-label">Discount type:</div>
                    <div>
                        <input
                            type="radio"
                            name="discount_type"
                            value="amount"
                            onChange={this.onDiscountTypeChange}
                            checked={data.discount_type === 'amount'}
                        />
                        <label htmlFor="button1">Amount</label>

                        <input
                            type="radio"
                            name="discount_type"
                            value="percentage"
                            onChange={this.onDiscountTypeChange}
                            checked={data.discount_type === 'percentage'}
                        />
                        <label htmlFor="button2">Percentage</label>
                    </div>
                </div>

                <div className="form__input">
                    <input min={0} type="number" name="discount_value" id="title" placeholder="Discount value" autoComplete="off" onChange={this.onDiscountValueChange} value={data.discount_value || 0} />
                </div>
                
                <div className="form__actions">
                    <button type="submit" className="button button-primary">Edit</button>
                    <Link to="/shipments" className="button button-link">Back</Link>
                </div>
            </form>
        );
    }
}

export default withRouter(connect(ManagerForm));
