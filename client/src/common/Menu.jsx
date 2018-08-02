import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { doLogout } from './../user/actions';

const menuItems = [
    {
        link: '/',
        title: 'Dashboard',
        allowed: ['shipper', 'manager', 'biker'],
    },
    {
        link: '/add-shipment',
        title: 'New shipment',
        allowed: ['shipper'],
    },
    {
        link: '/shipments',
        title: 'Shipments',
        allowed: ['shipper', 'manager', 'biker'],
    },
];

class Menu extends React.Component {

    onLogout = e => {
        e.preventDefault();
        this.props.doLogout();
    }

    render() {
        const { userRole } = this.props;

        const menuHtml = menuItems
            .filter(item => item.allowed.indexOf(userRole) !== -1)
            .map(item => (
                <div className="main__nav-item" key={`menu_${item.title}`}>
                    <Link to={item.link}>{item.title}</Link>
                </div>
            ));

        return (
            <div className="main__nav" id="menu">
                {menuHtml}
                <div className="main__nav-item">
                    <a href="javascript:void(0);" onClick={this.onLogout}>Logout</a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userRole: state.user.data.role,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        doLogout(data) {
            dispatch(doLogout(data))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
