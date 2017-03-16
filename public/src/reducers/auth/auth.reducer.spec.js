import reducer, { INITIAL_STATE, TYPES } from './auth.reducer';

describe('Reducer: auth', () => {
  it('should return initial state', () => {
    const state = reducer(undefined, {});

    expect(state).to.deep.equal(INITIAL_STATE);
  });

  it('should set signed in state', () => {
    const action = {
      type: TYPES.signInOrOut,
      payload: true,
    };
    expect(INITIAL_STATE.isSignedIn).to.equal(false);

    const state = reducer(undefined, action);
    expect(state.isSignedIn).to.equal(true);
  });

  it('should set isChecking', () => {
    const action = {
      type: TYPES.isChecking,
      payload: false,
    };
    expect(INITIAL_STATE.isChecking).to.equal(true);

    const state = reducer(undefined, action);
    expect(state.isChecking).to.equal(false);
  });

  it('should set isSigningIn', () => {
    const action = {
      type: TYPES.isSigningIn,
      payload: true,
    };
    expect(INITIAL_STATE.isSigningIn).to.equal(false);

    const state = reducer(undefined, action);
    expect(state.isSigningIn).to.equal(true);
  });

  it('should set authError', () => {
    const action = {
      type: TYPES.authError,
      payload: 'auth error text',
    };
    expect(INITIAL_STATE.authError).to.equal(null);

    const state = reducer(undefined, action);
    expect(state.authError).to.equal('auth error text');
  });
});
