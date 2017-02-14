import React, { PropTypes, Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

import { getPoll } from '../../api/pollAPI';

class PollDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      poll: null,
      isLoading: true,
    };

    this.pollId = this.props.match.params.pollId;
  }

  componentDidMount() {
    getPoll(this.pollId)
      .then(poll => {
        this.setState({ poll, isLoading: false });
      })
      .catch(err => {
        console.error('Error loading poll: ', err);
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { isLoading, poll } = this.state;

    if (isLoading) {
      return (
        <Dimmer active inverted>
          <Loader inverted />
        </Dimmer>
      );
    }

    // TODO: Handle case where poll doesn't exist (bad request or not authorized)
    // TODO: Decide how to display poll/voting form here
    return (
      <div>
        <div>Title: {poll.title}</div>
        <div>Description: {poll.description}</div>
        <div>Poll Type: {poll.pollType}</div>
        <div>Choices:
          {poll.pollOptions.map(choice => (
            <div key={choice.id}>{choice.title}</div>
          ))}
        </div>
      </div>
    );
  }
}

PollDashboard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default PollDashboard;
