import React, { Component, PropTypes } from 'react';
import { Checkbox, Button } from 'semantic-ui-react';
import { map } from 'lodash';
import cookie from 'js-cookie';

import { pollAPI } from '../../api';

// TODO: FPTP - http://react.semantic-ui.com/modules/checkbox
// TODO: Scored - https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/
//              - http://danielstern.ca/range.css/#/

class VotingForm extends Component {
  constructor(props) {
    super(props);

    this.formMap = new Map([
      ['approval', this.renderApprovalForm.bind(this)],
      ['fptp', this.renderFptpForm.bind(this)],
      ['scored', this.renderScoredForm.bind(this)],
    ]);

    const defaultScore = props.poll.pollChoices.reduce((acc, choice) => {
      acc[choice.id] = 0;  // eslint-disable-line no-param-reassign
      return acc;
    }, {});

    this.state = {
      selected: [],
      score: defaultScore,
      submitting: false,
      hasVoted: false,
    };
  }

  onCheckboxSelect(choiceId, val) {
    const { selected } = this.state;

    if (val.checked && !selected.includes(choiceId)) {
      this.setState({ selected: [...selected, choiceId] });
    } else {
      this.setState({ selected: [...selected.filter(id => id !== choiceId)] });
    }
  }

  onRadioSelect(choiceId) {
    this.setState({ selected: [choiceId] });
  }

  onScoreSelect(choiceId, e) {
    const val = parseInt(e.target.value, 10);
    this.setState({
      score: { ...this.state.score, [choiceId]: val },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { selected, score } = this.state;
    const { poll: { id, pollType } } = this.props;

    let votes;

    if (pollType === 'scored') {
      votes = map(score, (choiceScore, choiceId) => (
        { pollChoiceId: parseInt(choiceId, 10), score: choiceScore }
      ));
    } else {
      // For FPTP and Approval votes
      votes = selected.map(selectedId => ({ pollChoiceId: selectedId }));
    }

    // prevent another submit
    this.setState({ submitting: true });

    // api call
    pollAPI.castVote(id, { votes })
      .then(() => {
        cookie.set(id, 'submitted');
        this.setState({ submitting: false, hasVoted: true });
      })
      .catch(err => {
        // TODO: Display error msg to user
        console.error('Error casting vote:', err);
        this.setState({ submitting: false });
      });
  }

  renderApprovalForm(pollChoices) {
    const { selected } = this.state;

    return pollChoices.map(choice =>
      <div key={choice.id}>
        <Checkbox
          label={choice.title}
          name="approvalCheckboxGroup"
          checked={selected.includes(choice.id)}
          onChange={(e, val) => this.onCheckboxSelect(choice.id, val)}
        />
      </div>,
    );
  }

  renderFptpForm(pollChoices) {
    const { selected } = this.state;

    return pollChoices.map(choice =>
      <div key={choice.id}>
        <Checkbox
          label={choice.title}
          name="fptpRadioGroup"
          checked={selected[0] === choice.id}
          value={choice.title}
          radio
          onChange={() => this.onRadioSelect(choice.id)}
        />
      </div>,
    );
  }

  renderScoredForm(pollChoices) {
    const { score } = this.state;

    return pollChoices.map(choice =>
      <div key={choice.id}>
        <input
          type="range"
          min={0}
          max={4}
          value={score[choice.id]}
          onChange={e => this.onScoreSelect(choice.id, e)}
        />
        <span>{score[choice.id]}</span>
      </div>,
    );
  }

  render() {
    const { poll } = this.props;
    const { submitting, hasVoted } = this.state;

    if (hasVoted) {
      return <h2>Vote successfully cast!</h2>;
    }

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        { this.formMap.get(poll.pollType)(poll.pollChoices) }
        <Button type="submit" disabled={submitting}>Vote</Button>
      </form>
    );
  }
}

VotingForm.propTypes = {
  poll: PropTypes.shape({
    pollChoices: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
  }),
};

export default VotingForm;
