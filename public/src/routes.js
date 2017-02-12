import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './components/App/App';
import LandingPage from './components/LandingPage/LandingPage';
import PollDashboard from './components/PollDashboard/PollDashboard';

// React router v4 - https://reacttraining.com/react-router/
const rootRoutes = (
  <Switch>
    <Route path="/" exact component={LandingPage} />
    <Route path="/about" exact component={() => <div>Example About Page route</div>} />
    <Route path="/poll/:pollId" component={PollDashboard} />
    <Route component={() => <div>Placeholder 404 page</div>} />
  </Switch>
);

const baseRoute = <Route path="/" render={(props) => <App {...props}>{rootRoutes}</App>} />;

export default baseRoute;
