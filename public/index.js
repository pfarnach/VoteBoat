import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router'

import './src/style/global.sass';
import store from './src/store';
import routes from './src/routes';

ReactDOM.render(
  <Provider store={ store }>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('react-root')
);
