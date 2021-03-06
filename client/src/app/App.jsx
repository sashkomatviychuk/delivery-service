import React from 'react';

import Routes from './../routes';
import Header from './../common/Header';
import Footer from './../common/Footer';
import AlertPanel from './../alert/AlertPanel';
import ShipmentPreview from './../shipment/Preview';

class App extends React.Component {

    render() {
        
        return (
            <div className="root-container">
                <AlertPanel />
                <Header />
                <Routes />
                <Footer />
                <ShipmentPreview />
            </div>
        );
    }
}

export default App;