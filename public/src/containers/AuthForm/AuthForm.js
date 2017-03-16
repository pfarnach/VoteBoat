import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { flow } from 'lodash';
import { Button } from 'semantic-ui-react';

import validate from './validateAuthForm';
import * as actions from '../../actions/auth.actions';
import { FormInput } from '../../components';

export class AuthFormPure extends Component {
  handleSubmit(form) {
    const { email, password } = form;
    const { authType } = this.props;

    if (authType === 'signup') {
      this.props.signUp(email, password);
    } else {
      this.props.signIn(email, password);
    }
  }

  render() {
    const { handleSubmit, authType, isSigningIn, authError } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit.bind(this))} noValidate>
        <div>
          <label htmlFor="email">Email</label>
          <Field
            name="email"
            type="email"
            placeholder="Email"
            component={FormInput}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            type="password"
            placeholder="Password"
            component={FormInput}
          />
        </div>

        { authError &&
          <div>{authError}</div>
        }

        <Button type="submit" disabled={isSigningIn}>
          { authType === 'signup' ? 'Sign up' : 'Sign in'}
        </Button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  isSigningIn: state.auth.isSigningIn,
  authError: state.auth.authError,
});

AuthFormPure.propTypes = {
  authType: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  isSigningIn: PropTypes.bool.isRequired,
  authError: PropTypes.string,
};

export default flow(
  reduxForm({
    form: 'authForm',
    initialValues: {
      email: '',
      password: '',
    },
    validate,
  }),
  connect(mapStateToProps, actions),
)(AuthFormPure);
