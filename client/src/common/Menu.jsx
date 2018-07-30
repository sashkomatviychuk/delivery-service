import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { doLogout } from './../user/actions';

class Menu extends React.Component {

    onLogout = e => {
        e.preventDefault();
        this.props.doLogout();
    }

    render() {
        // display only items allowed for user

        return (
            <div className="main__nav" id="menu">
                <div className="main__nav-item"><a href="#">Dashboard</a></div>
                <div className="main__nav-item"><a href="#">New shipment</a></div>
                <div className="main__nav-item"><a href="#">My shipments</a></div>
                <div className="main__nav-item">
                    <a href="#" onClick={this.onLogout}>Logout</a>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {

    return {
        doLogout(data) {
            dispatch(doLogout(data))
        },
    };
}

export default connect(undefined, mapDispatchToProps)(Menu);
