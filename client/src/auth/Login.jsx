import React from 'react';
import { Link } from 'react-router-dom';

import { doLogin } from './../user/actions';
import FormLayout from './../layouts/FormLayout';

class Login extends React.Component {

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
                [name]: value,
            },
        }));
    }

    onSubmit = e => {
        e.preventDefault();

        this.props.doLogin(this.state.data)
            .then(response => {
                if (response.error) {
                    this.setState(() => ({ error: response.error }));
                } else if (!response.result) {
                    this.setState(() => ({ error: 'Unknown error. Try again' }));
                }
            });
    }

    render() {

        return (
            <form action="#" method="post" onSubmit={this.onSubmit} >
                {this.state.error && <div>{this.state.error}</div>}
                <div className="form__input">
                    <input type="email" name="email" id="email" placeholder="Email" autoComplete="off" required onChange={this.onChange} />
                </div>
                <div className="form__input">
                    <input type="password" name="password" id="password" placeholder="Password" required onChange={this.onChange} />
                </div>
                <div className="form__actions">
                    <button type="submit" className="button button-primary">Login</button>
                    <Link to="/register" className="button button-link">Register</Link>
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        doLogin(data) {
            dispatch(doLogin(data))
        },
    };
}

export default FormLayout(
    'Login',
    connect(undefined, mapDispatchToProps)(Login)
);
