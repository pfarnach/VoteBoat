import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

const rootReducer = combineReducers({
  form: reduxFormReducer,
});

export default rootReducer;
