import React from 'react';
import { connect } from 'react-redux';

import MenuLayout from './../layouts/MenuLayout';

class Dashboard extends React.Component {

    render() {
        const { data, stats } = this.props.user;

        const statsHtml = stats.map(item => (
            <div className="stats__item" key={item.status}>
                <div className="stats__item-count">{item.count}</div>
                <div className="stats__item-title">{item.status}</div>
            </div>
        ));

        return (
            <div className="main__content">
                <div className="main__content-info">
                    <h1 className="main__content-user">{data.first_name} {data.last_name}</h1>
                    <div className="main__content-user-status">{data.role}</div>
                </div>
                <div className="main__content-stats">
                    {statsHtml}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    };
}

export default (MenuLayout(connect(mapStateToProps)(Dashboard)));
