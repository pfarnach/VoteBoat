import { TYPES } from '../reducers/user/user.reducer';
import { userAPI } from '../api';

export const getUserInfo = () => {  // eslint-disable-line import/prefer-default-export
  return async (dispatch) => {
    dispatch({ type: TYPES.isFetchingUser, payload: true });

    try {
      const user = await userAPI.userInfo();
      dispatch({ type: TYPES.setUser, payload: user });
      dispatch({ type: TYPES.isFetchingUser, payload: false });
    } catch (err) {
      console.error(err);
      dispatch({ type: TYPES.isFetchingUser, payload: false });
    }
  };
};
