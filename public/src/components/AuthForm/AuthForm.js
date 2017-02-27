import React, { PropTypes } from 'react';
import { Button, Input } from 'semantic-ui-react';

const AuthForm = ({ handleSubmit, updateForm, authType, email, password }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e, input) => updateForm(input.value, password)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e, input) => updateForm(email, input.value)}
        />
      </div>
      <Button type="submit">{ authType === 'signup' ? 'Sign up' : 'Sign in'}</Button>
    </form>
  );
};

AuthForm.propTypes = {
  authType: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default AuthForm;
