import React from 'react';

export default (h1Text, ComposedComponent) => () => (
    <main className="row__container">
        <h1>{h1Text}</h1>
        <ComposedComponent />
    </main>
);