import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './src/style/global.sass';
import store from './src/store';

import LandingPage from './src/components/LandingPage/LandingPage';

ReactDOM.render(
  <Provider store={ store }>
    <LandingPage />
  </Provider>,
  document.getElementById('react-root')
);
