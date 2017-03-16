import { TYPES } from '../reducers/auth/auth.reducer';
import { authAPI } from '../api';

export const signIn = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: TYPES.isSigningIn, payload: true });
    dispatch({ type: TYPES.authError, payload: null });

    try {
      await authAPI.signIn(email, password);
      dispatch({ type: TYPES.signInOrOut, payload: true });
      dispatch({ type: TYPES.isSigningIn, payload: false });
    } catch (err) {
      dispatch({ type: TYPES.authError, payload: 'Incorrect email or password' });
      dispatch({ type: TYPES.isSigningIn, payload: false });
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    try {
      await authAPI.signOut();
      dispatch({ type: TYPES.signInOrOut, payload: false });
    } catch (err) {
      console.error(err);
    }
  };
};

export const signUp = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: TYPES.isSigningIn, payload: true });

    try {
      await authAPI.signUp(email, password);
      dispatch({ type: TYPES.signInOrOut, payload: true });
      dispatch({ type: TYPES.isSigningIn, payload: false });
    } catch (err) {
      console.error(err);
      dispatch({ type: TYPES.isSigningIn, payload: false });
    }
  };
};

export const checkStatus = () => {
  return async (dispatch) => {
    dispatch({ type: TYPES.isChecking, payload: true });

    try {
      const res = await authAPI.checkStatus();
      dispatch({ type: TYPES.isChecking, payload: false });

      if (res.loggedIn) {
        dispatch({ type: TYPES.signInOrOut, payload: true });
      }
    } catch (err) {
      console.error(err);
    }
  };
};
