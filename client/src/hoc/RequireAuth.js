import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Redirect from 'react-router/Redirect';

export default function (ComposedComponent) {

    class Authentication extends React.Component {

        render() {
            if (!this.props.isLoggedIn) {
                return <Redirect to="/login" />
            } else {
                return <ComposedComponent {...this.props} />
            }
        }
    }

    Authentication.propTypes = {
        isLoggedIn: PropTypes.bool
    };

    function mapStateToProps(state) {
        return { isLoggedIn: state.user.isLoggedIn };
    }

    return connect(mapStateToProps)(Authentication);
}