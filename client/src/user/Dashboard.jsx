import React from 'react';

import MenuLayout from './../layouts/MenuLayout';

class Dashboard extends React.Component {

    render() {
        return (
            <div className="main__content">
                <div className="main__content-info">
                    <h1 className="main__content-user">Oleksandr Delivery</h1>
                    <div className="main__content-user-status">Shipper</div>
                </div>
                <div className="main__content-stats">
                    <div className="stats__item">
                        <div className="stats__item-count">4</div>
                        <div className="stats__item-title">Waiting</div>
                    </div>
                    <div className="stats__item">
                        <div className="stats__item-count">7</div>
                        <div className="stats__item-title">Assigned</div>
                    </div>
                    <div className="stats__item">
                        <div className="stats__item-count">2</div>
                        <div className="stats__item-title">Picked up</div>
                    </div>
                    <div className="stats__item">
                        <div className="stats__item-count">11</div>
                        <div className="stats__item-title">Delivered</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MenuLayout(Dashboard);
