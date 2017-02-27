import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import authReducer from './reducers/auth/auth.reducer';

const rootReducer = combineReducers({
  form: reduxFormReducer,
  auth: authReducer,
});

export default rootReducer;
