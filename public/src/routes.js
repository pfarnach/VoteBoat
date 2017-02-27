import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { LandingPage, PollDashboard, UserDashboard } from './components';
import { App } from './containers';

// React router v4 - https://reacttraining.com/react-router/
const rootRoutes = (
  <Switch>
    <Route path="/" exact component={LandingPage} />
    <Route path="/about" exact component={() => <div>Example About Page route</div>} />
    <Route path="/poll/:pollId" component={PollDashboard} />
    <Route path="/user" component={UserDashboard} />
    <Route component={() => <div>Placeholder 404 page</div>} />
  </Switch>
);

const baseRoute = <Route path="/" render={(props) => <App {...props}>{rootRoutes}</App>} />;

export default baseRoute;
