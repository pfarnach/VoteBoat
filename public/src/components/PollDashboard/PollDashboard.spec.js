import React from 'react';
import { shallow } from 'enzyme';

import PollDashboard from './PollDashboard';

describe('Component: <PollDashboard />', () => {
  const props = {};

  beforeEach(() => {
    props.match = {
      params: { pollId: 1 },
    };
  });

  it('should render', () => {
    const wrapper = shallow(<PollDashboard {...props} />);
    expect(wrapper).to.have.length(1);
  });

  it('should only render Loader when loading data', () => {
    const wrapper = shallow(<PollDashboard {...props} />);
    expect(wrapper.find('Loader')).to.have.length(1);

    const poll = {
      title: 'test',
      pollChoices: [],
    };

    wrapper.setState({ isLoading: false, poll });
    expect(wrapper.find('Loader')).to.have.length(0);
  });
});
