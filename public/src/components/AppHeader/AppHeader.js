import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';

import { AuthForm } from '../../components';
import * as actions from '../../actions/auth.actions';
import styles from './AppHeader.sass';

class AppHeader extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      modalOpen: false,
      authType: 'signup',
      redirectOnSignOut: false,
    };
  }

  handleUpdate(email, password) {
    this.setState({ email, password });
  }

  async handleSubmit(e) {
    const { email, password, authType } = this.state;
    e.preventDefault();

    if (authType === 'signup') {
      this.props.signUp(email, password);
    } else {
      this.props.signIn(email, password);
    }

    this.setState({
      email: '',
      password: '',
    });
  }

  signOut() {
    this.props.signOut();

    // May be a better way of doing this but have to redirect by rendering <redirect />
    this.setState({ redirectOnSignOut: true, modalOpen: false }, () => {
      this.setState({ redirectOnSignOut: false });
    });
  }

  openModal(isSignUp) {
    this.setState({
      modalOpen: true,
      authType: isSignUp ? 'signup' : 'signin',
    });
  }

  render() {
    const { email, password, modalOpen, authType, redirectOnSignOut } = this.state;
    const { isSignedIn } = this.props;

    if (redirectOnSignOut) {
      return <Redirect to="/" />;
    }

    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <Link to="/">VoteBoat</Link>
        </div>
        { isSignedIn ?
          <div>
            <Link to="/dashboard">Profile</Link>
            <Button onClick={this.signOut.bind(this)}>Sign Out</Button>
          </div> :
          <div>
            <Button primary onClick={() => this.openModal(true)}>Sign Up</Button>
            <Button secondary onClick={() => this.openModal(false)}>Sign In</Button>
          </div>
        }

        { !isSignedIn &&
          <Modal
            open={modalOpen}
            onClose={() => this.setState({ modalOpen: false })}
          >
            <Modal.Header>{ authType === 'signup' ? 'Sign up' : 'Sign in'}</Modal.Header>
            <Modal.Content>
              <AuthForm
                email={email}
                password={password}
                authType={authType}
                handleSubmit={this.handleSubmit.bind(this)}
                updateForm={this.handleUpdate.bind(this)}
              />
            </Modal.Content>
          </Modal>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isSignedIn: state.auth.isSignedIn,
});

AppHeader.propTypes = {
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,  // eslint-disable-line react/no-unused-prop-types
  isSignedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, actions)(AppHeader);
