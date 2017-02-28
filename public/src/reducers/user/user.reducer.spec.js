import reducer, { INITIAL_STATE, TYPES } from './user.reducer';

describe('Reducer: user', () => {
  it('should return initial state', () => {
    const state = reducer(undefined, {});
    expect(state).to.deep.equal(INITIAL_STATE);
  });

  it('should set the user data', () => {
    const user = { email: 'test@test.com' };
    const action = {
      type: TYPES.setUser,
      payload: user,
    };

    expect(INITIAL_STATE.data).to.equal(null);

    const state = reducer(undefined, action);
    expect(state.data).to.equal(user);
  });

  it('should set isFetching', () => {
    const action = {
      type: TYPES.isFetchingUser,
      payload: false,
    };

    expect(INITIAL_STATE.isFetching).to.equal(true);

    const state = reducer(undefined, action);
    expect(state.isFetching).to.equal(false);
  });
});
