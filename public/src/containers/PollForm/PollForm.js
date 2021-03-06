import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import moment from 'moment';

import {
  FormDropdown,
  FormInput,
  FormTextArea,
  FormTagsInput,
  FormDateTime,
} from '../../components';
import { pollAPI } from '../../api';
import validate from './formValidate';


// TODO: Form validation with redux-form
const pollTypes = [
  { text: 'FPTP', value: 'fptp' },
  { text: 'Scored', value: 'scored' },
  { text: 'Approval', value: 'approval' },
];

export class PollFormPure extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreating: false,
      createdPoll: null,
    };
  }

  createPoll(form) {
    const {
      title,
      description,
      choices: pollChoices,
      pollType: { value: pollType },
      endTime,
    } = form;

    // puts payload into shape that endpoint expects
    const poll = { title, description, pollChoices, pollType, endTime };

    this.setState({ isCreating: true });

    pollAPI.createPoll(poll)
      .then(res => {
        // TODO: Reset form in case they hit back button
        this.setState({ createdPoll: res });
      })
      .catch(err => {
        console.error('DID NOT CREATE POLL:', err);
        // TODO: Display error msg to user
        this.setState({ isCreating: false });
      });
  }

  render() {
    // TODO: Put contents in step component: http://react.semantic-ui.com/elements/step
    const { handleSubmit } = this.props;
    const { createdPoll, isCreating } = this.state;

    // When poll has been successfully created
    if (createdPoll) {
      return <Redirect push to={`/poll/${createdPoll.id}`} />;
    }

    // Create form
    return (
      <form onSubmit={handleSubmit(this.createPoll.bind(this))}>
        <div>
          <label htmlFor="title">Title</label>
          <Field name="title" component={FormInput} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <Field name="description" component={FormTextArea} />
        </div>
        <div>
          <label htmlFor="choices">Poll Choices</label>
          <Field name="choices" component={FormTagsInput} />
        </div>
        <div>
          <label htmlFor="endTime">Poll Choices</label>
          <Field name="endTime" component={FormDateTime} />
        </div>
        <div>
          <label htmlFor="pollType">Poll Type</label>
          <Field
            name="pollType"
            component={FormDropdown}
            choices={pollTypes}
            placeholder="Select a Poll Type"
          />
        </div>
        <Button type="submit" disabled={isCreating}>Create</Button>
      </form>
    );
  }
}

PollFormPure.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'createPollForm',
  initialValues: {
    title: '',
    pollType: {},
    choices: [],
    endTime: moment().startOf('hour').add(1, 'week').add(1, 'hour'),
  },
  validate,
})(PollFormPure);
