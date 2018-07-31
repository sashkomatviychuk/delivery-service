import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import requireAuth from './hoc/RequireAuth';
import requireNotAuth from './hoc/NotRequireAuth';

import Dashboard from './user/Dashboard';
import Login from './auth/Login';
import Register from './auth/Register';
import AddShipmentForm from './shipment/AddForm';

export const routes = (
    <Switch>
        <Route exact path="/" component={requireAuth(Dashboard)} />
        <Route path="/login" component={requireNotAuth(Login)} />
        <Route path="/register" component={requireNotAuth(Register)} />
        <Route path="/add-shipment" component={requireAuth(AddShipmentForm)} />
    </Switch>
);

export default () => routes;