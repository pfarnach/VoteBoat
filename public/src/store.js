import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './rootReducer';

const middlewares = [reduxThunk];

export default createStore(
  reducers,
  applyMiddleware(...middlewares),
);
