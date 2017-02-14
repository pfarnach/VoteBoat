import React from 'react';
import { shallow } from 'enzyme';

import LandingPage from './LandingPage';

describe('Component: <LandingPage />', () => {
  it('should render', () => {
    const wrapper = shallow(<LandingPage />);
    expect(wrapper).to.have.length(1);
  });

  it('should render the landing hero and the poll form', () => {
    const wrapper = shallow(<LandingPage />);
    const hero = wrapper.find('LandingHero');
    const pollForm = wrapper.find('ReduxForm');

    expect(hero).to.have.length(1);
    expect(pollForm).to.have.length(1);
  });
});
