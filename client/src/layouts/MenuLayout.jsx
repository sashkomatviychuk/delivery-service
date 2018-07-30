import React from 'react';

import Menu from './../common/Menu';

export default (ComposedComponent) => () => (
    <main className="container">
        <Menu />
        <ComposedComponent />
    </main>
);