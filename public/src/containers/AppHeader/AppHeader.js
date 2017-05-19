import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';

import * as actions from '../../actions/auth.actions';
import styles from './AppHeader.sass';

export class AppHeaderPure extends Component {
  constructor() {
    super();

    this.state = { triggerRedirect: false };
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    this.props.signOut();

    this.setState({ triggerRedirect: true }, () => {
      this.setState({ triggerRedirect: false });
    });
  }

  render() {
    const { isSignedIn } = this.props;
    const { triggerRedirect } = this.state;

    if (triggerRedirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <Link to="/">Poll Together</Link>
        </div>

        { isSignedIn ?
          <div>
            <Link to="/dashboard">My Dashboard</Link>
            <Button id="sign-out" onClick={this.signOut}>Sign Out</Button>
          </div> :
          <div>
            <Link id="sign-in" to="/signin">Sign In</Link>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn,
});

AppHeaderPure.propTypes = {
  signOut: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, actions)(AppHeaderPure);
