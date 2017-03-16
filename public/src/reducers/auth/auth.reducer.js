export const TYPES = {
  signInOrOut: 'AUTH/SIGN_IN_OR_OUT',
  authError: 'AUTH/AUTH_ERROR',
  isSigningIn: 'AUTH/IS_SIGNING_IN',
  isChecking: 'AUTH/IS_CHECKING',
};

export const INITIAL_STATE = {
  isSignedIn: false,
  isSigningIn: false,
  isChecking: true,
  authError: null,
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.signInOrOut:
      return {
        ...state,
        isSignedIn: action.payload,
        authError: null,
      };

    case TYPES.isSigningIn:
      return {
        ...state,
        isSigningIn: action.payload,
      };

    case TYPES.authError:
      return {
        ...state,
        authError: action.payload,
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
