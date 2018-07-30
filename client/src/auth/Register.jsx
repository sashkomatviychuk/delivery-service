import React from 'react';
import { Link } from 'react-router-dom';

import FormLayout from './../layouts/FormLayout';

class Register extends React.Component {

    render() {
        return (
            <form action="#" method="post">
                <div className="form__input">
                    <input type="text" name="first_name" id="first_name" placeholder="First name" autocomplete="off" />
                </div>
                <div className="form__input">
                    <input type="text" name="last_name" id="last_name" placeholder="Last name" autocomplete="off" />
                </div>
                <div className="form__input">
                    <input type="email" name="login" id="login" placeholder="Email" autocomplete="off" />
                </div>
                <div className="form__input">
                    <input type="password" name="password" id="password" placeholder="Password" />
                </div>
                <div className="form__input">
                    <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm password" />
                </div>
                <div className="form__input-radiogroup">
                    <div className="form__input-radioitem">
                        <input type="radio" className="form__input-radio" name="role" value="shipper" id="button1" />
                        <label for="button1">Shipper</label>
                    </div>
                    <div className="form__input-radioitem">
                        <input type="radio" className="form__input-radio" name="role" value="manager" id="button2" />
                        <label for="button2">Manager</label>
                    </div>
                    <div className="form__input-radioitem">
                        <input type="radio" className="form__input-radio" name="role" value="biker" id="button3" />
                        <label for="button3">Biker</label>
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

export default FormLayout('Register', Register);
