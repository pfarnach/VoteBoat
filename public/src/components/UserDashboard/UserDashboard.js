import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

class UserDashboard extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
        user: { name: 'Joe', polls: [{}, {}] },
      });
    }, 1000);
  }

  render() {
    const { isLoading, user } = this.state;

    if (isLoading) {
      return <Dimmer active inverted><Loader inverted /></Dimmer>;
    }

    return (
      <div>
        User {user.name} has {user.polls.length} poll(s)
      </div>
    );
  }
}

UserDashboard.propTypes = {};

export default UserDashboard;
