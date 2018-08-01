import React from 'react';
import { connect } from 'react-redux';

import { hideAlert } from './actions';

class AlertPanel extends React.Component {

    onClick = e => {
        this.props.hideAlert();
    }

    render() {
        const { visible, message, type } = this.props;

        if (!visible) {
            return null;
        }

        return (
            <div className={`alert__container alert-${type}`}>
                <div className={`alert__message`}>{message}</div>
                <button className="alert__close" onClick={this.onClick}>
                    <span aria-hidden="true">×</span>
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.alert;
}

const mapDispatchToProps = dispatch => {
    return {
        hideAlert() {
            dispatch(hideAlert());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertPanel);