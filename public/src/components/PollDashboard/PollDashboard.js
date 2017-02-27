import React, { PropTypes, Component } from 'react';
import { Dimmer, Loader, Button } from 'semantic-ui-react';

import { getPoll, getPollResults } from '../../api/pollAPI';
import { VotingForm, PollResults } from '../../components';
import styles from './PollDashboard.sass';

class PollDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      poll: null,
      isLoading: true,
      pollResults: null,
    };

    this.pollId = this.props.match.params.pollId;
  }

  componentDidMount() {
    getPoll(this.pollId)
      .then(poll => this.setState({ poll, isLoading: false }))
      .catch(err => {
        // TODO: Display error msg to user
        console.error('Error loading poll: ', err);
        this.setState({ isLoading: false });
      });
  }

  fetchPollResults(pollId) {
    getPollResults(pollId)
      .then(res => this.setState({ pollResults: res }))
      .catch(err => console.error('Error fetching poll results:', err));
  }

  render() {
    const { isLoading, poll, pollResults } = this.state;

    if (isLoading) {
      return <Dimmer active inverted><Loader inverted /></Dimmer>;
    }

    if (!poll) {
      return <div>No data available for poll.</div>;
    }

    return (
      <div className={styles.container}>
        <div>Title: {poll.title}</div>
        <div>Description: {poll.description}</div>
        <div>Poll Type: {poll.pollType}</div>
        <hr />
        <VotingForm poll={poll} />
        <hr />
        { pollResults &&
          <PollResults results={pollResults} />
        }
        <Button onClick={() => this.fetchPollResults(poll.id)}>See Results</Button>
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
