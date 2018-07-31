import React from 'react';
import { connect } from 'react-redux';

import LoggedUserNav from './../common/LoggedUserNav';
import NotLoggedUserNav from './../common/NotLoggedUserNav';

class Header extends React.Component {

    render() {
        const { isLoggedIn } = this.props;
        const Nav = isLoggedIn ? LoggedUserNav : NotLoggedUserNav;

        return (
            <header>
                <div className="header__info">
                    {isLoggedIn && <div id="toggle-menu" data-target="#menu">
                        <div className="humburger-inner"></div>
                        <div className="humburger-inner"></div>
                        <div className="humburger-inner"></div>
                    </div>}
                    <div className="header__logo">Delivery</div>
                </div>

                <Nav />
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
}

export default connect(mapStateToProps)(Header);