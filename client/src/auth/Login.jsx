import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import withRouter from 'react-router/withRouter';

import { doLogin } from './../user/actions';
import FormLayout from './../layouts/FormLayout';

class Login extends React.Component {

    // initial state
    state = {
        data: {},
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

        this.props.doLogin(this.state.data);
    }

    render() {

        return (
            <form action="#" method="post" onSubmit={this.onSubmit} >
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
            return dispatch(doLogin(data))
        },
    };
}

export default FormLayout(
    'Login',
    withRouter(connect(undefined, mapDispatchToProps)(Login))
);
