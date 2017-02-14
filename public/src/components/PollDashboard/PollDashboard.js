import React, { PropTypes, Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { getPoll } from '../../api/pollAPI';
import styles from './PollDashboard.sass';

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

    if (!poll) {
      return <div>No data available for poll.</div>;
    }

    // TODO: Decide how to display poll/voting form here
    return (
      <div className={styles.container}>
        <Link to="/">Back to Home</Link>
        <div>Title: {poll.title}</div>
        <div>Description: {poll.description}</div>
        <div>Poll Type: {poll.pollType}</div>
        <div>Choices:
          {poll.pollChoices.map(choice => (
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
