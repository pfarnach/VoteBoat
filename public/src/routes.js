import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { LandingPage, PollDashboard, AuthResponse } from './components';
import { App, UserDashboard, AuthForm } from './containers';


// React router v4 - https://reacttraining.com/react-router/
const appRoutes = (
  <Switch>
    <Route path="/" exact component={LandingPage} />
    <Route path="/about" exact component={() => <div>Example About Page route</div>} />
    <Route path="/signin" component={AuthForm} />
    <Route path="/poll/:pollId" component={PollDashboard} />
    <Route path="/dashboard" component={UserDashboard} />
    <Route component={() => <div>Placeholder 404 page</div>} />
  </Switch>
);

const baseRoute = (
  <Switch>
    <Route path="/auth-response" exact component={AuthResponse} />
    <Route path="/" render={(props) => <App {...props}>{appRoutes}</App>} />
  </Switch>
);

export default baseRoute;
