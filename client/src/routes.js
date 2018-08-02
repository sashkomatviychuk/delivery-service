import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import requireAuth from './hoc/RequireAuth';
import requireNotAuth from './hoc/NotRequireAuth';

import Dashboard from './user/Dashboard';
import Login from './auth/Login';
import Register from './auth/Register';
import AddShipment from './shipment/AddShipment';
import ShipmentsList from './shipment/list/List';
import EditShipment from './shipment/EditShipment';

export const routes = (
    <Switch>
        <Route exact path="/" component={requireAuth(Dashboard)} />
        <Route path="/login" component={requireNotAuth(Login)} />
        <Route path="/register" component={requireNotAuth(Register)} />
        <Route path="/add-shipment" component={requireAuth(AddShipment)} />
        <Route path="/shipments" component={requireAuth(ShipmentsList)} />
        <Route path="/shipment/edit/:id" component={requireAuth(EditShipment)} />
    </Switch>
);

export default () => routes;