import React from 'react';
import { shallow } from 'enzyme';

import { UserDashboardPure } from './UserDashboard';

describe('Component: <UserDashboardPure />', () => {
  it('should render', () => {
    const wrapper = shallow(<UserDashboardPure />);
    expect(wrapper).to.have.length(1);
  });
});
