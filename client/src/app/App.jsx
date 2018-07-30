import React from 'react';

import Routes from './../routes';
import Header from './../common/Header';
import Footer from './../common/Footer';

class App extends React.Component {

    render() {
        
        return (
            <div className="root-container">
                <Header />
                <Routes />
                <Footer />
            </div>
        );
    }
}

export default App;