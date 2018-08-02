import React from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/withRouter';

import { showPreview } from './../actions';

class Shipment extends React.Component {

    onEditClick = e => {
        const { shipment } = this.props;
        this.props.history.push(`/shipment/edit/${shipment._id}`);
    }

    onPreviewClick = e => {
        const { shipment } = this.props;
        this.props.showPreview(shipment._id);
    }

    render() {
        const { shipment } = this.props;

        return (
            <div className="shipment__item">
                <div className="shipment__item-top">
                    <div className="shipment__item-descr">
                        <div className="shipment__title">{shipment.title}</div>
                        <div className="shipment__item-destination">
                            {shipment.origin_address} &mdash; {shipment.destination_address}
                        </div>
                    </div>
                    <div className="shipment__menu">
                        <button onClick={this.onEditClick} >Edit</button>
                        <button onClick={this.onPreviewClick} >Details</button>
                    </div>
                </div>
                <div className="shipment__item-detial">
                    <b>Status</b>: {shipment.status} <b>Created</b>: {shipment.created_at}
                </div>
            </div>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {
        showPreview(id) {
            console.log('show preview');
            return dispatch(showPreview(id));
        }
    };
};

export default withRouter(
    connect(undefined, mapDispatchToProps)(Shipment)
);
