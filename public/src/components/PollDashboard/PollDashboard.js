import React, { PropTypes, Component } from 'react';
import { Dimmer, Loader, Button } from 'semantic-ui-react';
import cookie from 'js-cookie';

import { pollAPI } from '../../api';
import { VotingForm, PollResults } from '../../components';
import styles from './PollDashboard.sass';

class PollDashboard extends Component {
  constructor(props) {
    super(props);

    this.pollId = this.props.match.params.pollId;

    this.state = {
      poll: null,
      isLoading: true,
      pollResults: null,
      hasVoted: !!cookie.get(this.pollId),
    };
  }

  componentDidMount() {
    pollAPI.getPoll(this.pollId)
      .then(poll => this.setState({ poll, isLoading: false }))
      .catch(err => {
        // TODO: Display error msg to user
        console.error('Error loading poll: ', err);
        this.setState({ isLoading: false });
      });
  }

  fetchPollResults(pollId) {
    pollAPI.getPollResults(pollId)
      .then(res => this.setState({ pollResults: res }))
      .catch(err => console.error('Error fetching poll results:', err));
  }

  renderVotingForm() {
    const { poll, hasVoted } = this.state;
    return hasVoted ?
      <div>You&apos;ve already voted in this poll!</div> :
      <VotingForm poll={poll} />;
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
        <div>
          <div>Title: {poll.title}</div>
          <div>Description: {poll.description}</div>
          <div>Poll Type: {poll.pollType}</div>
        </div>
        <hr />
        { this.renderVotingForm() }
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
