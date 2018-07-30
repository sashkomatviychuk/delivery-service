import React from 'react';

import Menu from './../common/Menu';

export default (ComposedComponent) => () => (
    <main class="container">
        <Menu />
        <ComposedComponent />
    </main>
);