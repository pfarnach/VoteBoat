import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { PollFormPure } from './PollForm';

describe('Component: <PollFormPure />', () => {
  const props = {};

  beforeEach(() => {
    props.handleSubmit = sinon.spy();
  });

  it('should render', () => {
    const wrapper = shallow(<PollFormPure {...props} />);
    expect(wrapper).to.have.length(1);
  });

  it('should disable submit button when creating form', () => {
    const wrapper = shallow(<PollFormPure {...props} />);
    wrapper.setState({ isCreating: true });
    const btn = wrapper.find('[type="submit"]');
    expect(btn.prop('disabled')).to.equal(true);
  });

  it('should render redirect if poll created', () => {
    const wrapper = shallow(<PollFormPure {...props} />);
    wrapper.setState({ createdPoll: { id: 1 } });

    expect(wrapper.find('Redirect')).to.have.length(1);
  });
});
