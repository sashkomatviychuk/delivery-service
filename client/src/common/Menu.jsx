import React from 'react';

class Menu extends React.Component {

    render() {

        return (
            <div className="main__nav" id="menu">
                <div className="main__nav-item"><a href="#">Dashboard</a></div>
                <div className="main__nav-item"><a href="#">New shipment</a></div>
                <div className="main__nav-item"><a href="#">My shipments</a></div>
                <div className="main__nav-item"><a href="#">Logout</a></div>
            </div>
        );
    }
}

export default Menu;