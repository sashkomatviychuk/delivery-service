import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

export default function (ComposedComponent) {

    class NotAuthentication extends React.Component {

        render() {
            if (this.props.isLoggedIn) {
                return <Redirect to="/" />
            }

            return <ComposedComponent {...this.props} />
        }
    }

    NotAuthentication.propTypes = {
        isLoggedIn: PropTypes.bool
    };

    function mapStateToProps(state) {
        return { isLoggedIn: state.user.isLoggedIn };
    }

    return connect(mapStateToProps)(NotAuthentication);
}