import React from 'react';
import Modal from 'react-responsive-modal';
import connect from 'react-redux/lib/connect/connect';

import { hidePreview } from './actions';

const classNames = {
    modal: 'modal__wrap',
};

class ShipmentPreview extends React.Component {

    onClose = e => {
        this.props.hidePreview();
    }

    render() {
        const { opened, shipment } = this.props;

        if (!opened) {
            return null;
        }

        const shipper = shipment.shipper_id;
        const shipperName = `${shipper.first_name} ${shipper.last_name}`;

        let bikerName = 'Not assigned';
        const biker = shipment.biker_id;

        if (biker) {
            bikerName = `${biker.first_name} ${biker.last_name}`;
        }

        return (
            <Modal open={opened} classNames={classNames} onClose={this.onClose} showCloseIcon={true} center>
                <div className="modal__content">
                    <h2>Shipment details</h2>
                    <div className="shipment__details">
                        <div>
                            <b>Title</b>: {shipment.title} 
                        </div>
                        <div>
                            <b>Addres</b>: {shipment.origin_address} - {shipment.destination_address} 
                        </div>
                        <div>
                            <b>Status</b>: {shipment.status}
                        </div>
                        <div>
                            <b>Created</b>: {shipment.created_at}
                        </div>
                        <div>
                            <b>Shipper</b>: {shipperName}
                        </div>
                        <div>
                            <b>Biker</b>: {bikerName}
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return state.shipments.preview;
};

const mapDispatchToProps = dispatch => {
    return {
        hidePreview() {
            return dispatch(hidePreview());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShipmentPreview);