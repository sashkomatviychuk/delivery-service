import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import MenuLayout from './../layouts/MenuLayout';
import ErrorBox from './../common/ErrorBox';

class AddShipmentForm extends React.Component {

    // initial state
    state = {
        data: {},
        erorr: '',
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
    }

    render() {

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
                        <input type="text" name="departue_location" id="departue_location" placeholder="Origin address" autoComplete="off" required onChange={this.onChange} />
                    </div>
                    <div className="form__input">
                        <input type="text" name="arrival_location" id="arrival_location" placeholder="Destination address" autoComplete="off" required onChange={this.onChange} />
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
    };
}

export default MenuLayout(
    AddShipmentForm
);