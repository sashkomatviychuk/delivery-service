import React from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/withRouter';

import MenuLayout from './../../layouts/MenuLayout';
import Shipment from './Shipment';
import { ELEMENTS_PER_PAGE, fetchShipments } from './../actions';

class ShipmentsList extends React.Component {

    componentDidMount() {
        this.props.fetchShipments();
    }

    onLoadMoreClick = e => {
        this.props.fetchShipments();
    }

    render() {
        const { list } = this.props;
        const showLoadMore = this.props.prevLength === ELEMENTS_PER_PAGE;

        const listHtml = list.map(shipment =>
            <Shipment shipment={shipment} key={shipment._id} />
        );

        return (
            <div className="main__content">
                <div className="main__content-info">
                    <h1 className="main__content-user">Shipments</h1>
                </div>
                <div className="shipments">
                    {listHtml.length ? listHtml : 'List of shipments is empty'}
                </div>
                <div className="shipments__more">
                    {showLoadMore && <button className="button button-link" onClick={this.onLoadMoreClick}>
                        Load more
                    </button>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.shipments;
};

const mapDispatchToProps = dispatch => {

    return {
        fetchShipments() {
            return dispatch(fetchShipments());
        }
    };
};

export default MenuLayout(
    withRouter(connect(mapStateToProps, mapDispatchToProps)(ShipmentsList))
);