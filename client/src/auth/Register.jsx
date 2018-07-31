import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { doRegister } from './../user/actions';
import FormLayout from './../layouts/FormLayout';
import ErrorBox from './../common/ErrorBox';

class Register extends React.Component {
    // initial state
    state = {
        data: {},
        erorr: '',
        showForm: true,
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

        this.props.doRegister(this.state.data)
            .then(response => {
                if (response.error) {
                    this.setState(() => ({ error: response.error }));
                } else if (!response.result) {
                    this.setState(() => ({ error: 'Unknown error. Try again' }));
                } else {
                    this.setState(() => ({ showForm: false }));
                }
            });
    }

    render() {
        if (!this.state.showForm) {
            return (
                <div>
                    <div>You register successfuly. Now you can log in.</div>
                    <Link to="/login" className="button button-link">Login</Link>
                </div>
            );
        }

        return (
            <form action="#" method="post" onSubmit={this.onSubmit}>
                <ErrorBox error={this.state.error} />
                <div className="form__input">
                    <input type="text" name="first_name" id="first_name" placeholder="First name" autoComplete="off" required onChange={this.onChange} />
                </div>
                <div className="form__input">
                    <input type="text" name="last_name" id="last_name" placeholder="Last name" autoComplete="off" required onChange={this.onChange} />
                </div>
                <div className="form__input">
                    <input type="email" name="email" id="login" placeholder="Email" autoComplete="off" required onChange={this.onChange} />
                </div>
                <div className="form__input">
                    <input type="password" name="password" id="password" placeholder="Password" required onChange={this.onChange} />
                </div>
                <div className="form__input">
                    <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm password" required onChange={this.onChange} />
                </div>
                <div className="form__input-radiogroup">
                    <div className="form__input-radioitem">
                        <input type="radio" className="form__input-radio" name="role" value="shipper" id="button1" onChange={this.onChange} />
                        <label htmlFor="button1">Shipper</label>
                    </div>
                    <div className="form__input-radioitem">
                        <input type="radio" className="form__input-radio" name="role" value="manager" id="button2" onChange={this.onChange} />
                        <label htmlFor="button2">Manager</label>
                    </div>
                    <div className="form__input-radioitem">
                        <input type="radio" className="form__input-radio" name="role" value="biker" id="button3" onChange={this.onChange} />
                        <label htmlFor="button3">Biker</label>
                    </div>
                </div>
                <div className="form__actions">
                    <button type="submit" className="button button-primary">Register</button>
                    <Link to="/login" className="button button-link">Login</Link>
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        doRegister(data) {
            return dispatch(doRegister(data))
        },
    };
}

export default FormLayout(
    'Register',
    connect(undefined, mapDispatchToProps)(Register)
);
