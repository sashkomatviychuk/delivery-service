import React from 'react';
import { Link } from 'react-router-dom';

import FormLayout from './../layouts/FormLayout';

class Login extends React.Component {

    render() {
        return (
            <form action="#" method="post">
                <div className="form__input">
                    <input type="email" name="login" id="login" placeholder="Email" autocomplete="off" />
                </div>
                <div className="form__input">
                    <input type="password" name="password" id="password" placeholder="Password" />
                </div>
                <div className="form__actions">
                    <button type="submit" className="button button-primary">Login</button>
                    <Link to="/register" className="button button-link">Register</Link>
                </div>
            </form>
        );
    }
}

export default FormLayout('Login', Login);
