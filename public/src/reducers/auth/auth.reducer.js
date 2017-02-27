export const TYPES = {
  signInOrOut: 'AUTH/SIGN_IN_OR_OUT',
  isChecking: 'AUTH/IS_CHECKING',
};

export const INITIAL_STATE = {
  isSignedIn: false,
  isChecking: true,
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.signInOrOut:
      return {
        ...state,
        isSignedIn: action.payload,
      };

    case TYPES.isChecking:
      return {
        ...state,
        isChecking: action.payload,
      };

    default:
      return state;
  }
}
