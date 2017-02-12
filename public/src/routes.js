import React from 'react';
import { Route, IndexRoute } from 'react-router';

import LandingPage from './components/LandingPage/LandingPage';

const routes = (
  <Route path="/" component={({ children }) => <div>Header <div>{children}</div></div>}>
    <IndexRoute component={LandingPage} />
    <Route path="about" component={() => <div>About page!</div>} />
    <Route path="*" component={() => <div>Not found</div>} />
  </Route>
);

export default routes;
