import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/auth.actions';
import { AppHeader } from '../';

import styles from './App.sass';


export class App extends Component {
  componentDidMount() {
    this.props.checkStatus();
  }

  render() {
    const { children, isLoading } = this.props;

    return (
      <div>
        { isLoading ?
          null :
          <div className={styles.container}>
            <AppHeader />
            <div className={styles.mainBody}>{ children }</div>
            <div style={{ backgroundColor: 'lightgreen' }}>App footer</div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isChecking,
});

App.propTypes = {
  children: PropTypes.element.isRequired,
  isLoading: PropTypes.bool.isRequired,
  checkStatus: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actions)(App);
