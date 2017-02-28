export const TYPES = {
  setUser: 'USER/SET_USER',
  isFetchingUser: 'USER/SET_USER_IS_FETCHING',
};

export const INITIAL_STATE = {
  data: null,
  isFetching: true,
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.setUser:
      return {
        ...state,
        data: action.payload,
      };

    case TYPES.isFetchingUser:
      return {
        ...state,
        isFetching: action.payload,
      };

    default:
      return state;
  }
}
