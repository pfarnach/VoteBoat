import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import authReducer from './reducers/auth/auth.reducer';
import userReducer from './reducers/user/user.reducer';

const rootReducer = combineReducers({
  form: reduxFormReducer,
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
