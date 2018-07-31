import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class LoggedUserNav extends React.Component {

    render() {
        const { first_name } = this.props;

        return (
            <div className="header__nav">
                <div className="header__nav-item">
                    <Link to="/">{first_name || 'Unnamed'}</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        first_name: state.user.data.first_name,
    };
};

export default connect(mapStateToProps)(LoggedUserNav);