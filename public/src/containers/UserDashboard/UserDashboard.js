import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

import * as actions from '../../actions/user.actions';

export class UserDashboardPure extends Component {
  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    const { isFetching, user } = this.props;

    if (isFetching) {
      return <Dimmer active inverted><Loader inverted /></Dimmer>;
    } else if (!user) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        User {user.email} has {user.polls.length} poll(s)
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.data,
  isFetching: state.user.isFetching,
});

UserDashboardPure.propTypes = {
  user: PropTypes.shape(),
  isFetching: PropTypes.bool,
  getUserInfo: PropTypes.func,
};

export default connect(mapStateToProps, actions)(UserDashboardPure);
