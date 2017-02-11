import React from 'react';
import { shallow } from 'enzyme';

import LandingPage from './LandingPage';

describe('Component: <LandingPage />', () => {
  it('should render', () => {
    const wrapper = shallow(<LandingPage />);
    expect(wrapper).to.have.length(1);
  });
});
