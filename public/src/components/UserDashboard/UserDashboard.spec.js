import React from 'react';
import { shallow } from 'enzyme';

import UserDashboard from './UserDashboard';

describe('Component: <UserDashboard />', () => {
  it('should render', () => {
    const wrapper = shallow(<UserDashboard />);
    expect(wrapper).to.have.length(1);
  });
});
