import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import requireAuth from './hoc/RequireAuth';
import requireNotAuth from './hoc/NotRequireAuth';

import Dashboard from './user/Dashboard';
import Login from './auth/Login';
import Register from './auth/Register';

export const routes = (
    <Switch>
        <Route exact path="/" component={requireAuth(Dashboard)} />
        <Route path="/login" component={requireNotAuth(Login)} />
        <Route path="/register" component={requireNotAuth(Register)} />
    </Switch>
);

export default () => routes;