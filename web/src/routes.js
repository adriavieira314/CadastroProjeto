import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CreateAccount from './pages/CreateAccount/index';
import Login from './pages/Login/index';
import HomePage from './pages/Home/index';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={CreateAccount} />
                <Route path='/login' component={Login} />
                <Route path='/home' component={HomePage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;