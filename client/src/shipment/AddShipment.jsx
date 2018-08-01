import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Redirect from 'react-router/Redirect';

import MenuLayout from './../layouts/MenuLayout';
import ErrorBox from './../common/ErrorBox';
import { createShipment } from './../shipment/actions';

class AddShipmentForm extends React.Component {

    // initial state
    state = {
        data: {},
        erorr: '',
        redirect: false,
    };

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

    onSubmit = e => {
        e.preventDefault();

        this.props.createShipment(this.state.data)
            .then(response => {
                if (response.error) {
                    this.setState(() => ({ error: response.error }));
                } else if (!response.result) {
                    this.setState(() => ({ error: 'Unknown error. Try again' }));
                } else {
                    this.setState(() => ({ redirect: true }));
                    // return this.context.history.push('/');
                }
            });
    }

    render() {

        if (this.state.redirect) {
            return (<Redirect to="/" />);
        }

        return (
            <div className="main__content">
                <div className="main__content-info">
                    <h1 className="main__content-user">Add new shipment</h1>
                </div>
                <form action="#" method="post" onSubmit={this.onSubmit} >
                    <ErrorBox error={this.state.error} />
                    <div className="form__input">
                        <input type="text" name="title" id="title" placeholder="Shipment name" autoComplete="off" required onChange={this.onChange} />
                    </div>
                    <div className="form__input">
                        <input type="text" name="origin_address" id="origin_address" placeholder="Origin address" autoComplete="off" required onChange={this.onChange} />
                    </div>
                    <div className="form__input">
                        <input type="text" name="destination_address" id="destination_address" placeholder="Destination address" autoComplete="off" required onChange={this.onChange} />
                    </div>
                    <div className="form__input">
                        <input type="number" min="0" name="cost" id="cost" placeholder="Cost" autoComplete="off" required onChange={this.onChange} />
                    </div>
                    <div className="form__actions">
                        <button type="submit" className="button button-primary">Add</button>
                        <Link to="/" className="button button-link">Back</Link>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createShipment(data) {
            return dispatch(createShipment(data));
        },
    };
}

export default MenuLayout(
    connect(undefined, mapDispatchToProps)(AddShipmentForm)
);