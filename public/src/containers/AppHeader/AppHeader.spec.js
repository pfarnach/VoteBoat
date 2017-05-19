import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { AppHeaderPure } from './AppHeader';

describe('Component: <AppHeaderPure />', () => {
  const props = {};

  beforeEach(() => {
    props.isSignedIn = true;
    props.signOut = sinon.spy();
  });

  it('should render', () => {
    const wrapper = shallow(<AppHeaderPure {...props} />);
    expect(wrapper).to.have.length(1);
  });

  it('should render a <Redirect />', () => {
    const wrapper = shallow(<AppHeaderPure {...props} />);
    wrapper.setState({ triggerRedirect: true });
    expect(wrapper.find('Redirect')).to.have.length(1);
  });

  it('should render a sign out button if currently signed in', () => {
    const wrapper = shallow(<AppHeaderPure {...props} />);
    expect(wrapper.find('#sign-out')).to.have.length(1);
  });

  it('should call sign out prop if clicking on sign out button', () => {
    const wrapper = shallow(<AppHeaderPure {...props} />);
    wrapper.find('#sign-out').simulate('click');
    expect(props.signOut).to.have.property('callCount', 1);
  });

  it('should render sign in if currently signed out', () => {
    props.isSignedIn = false;
    const wrapper = shallow(<AppHeaderPure {...props} />);
    expect(wrapper.find('#sign-in')).to.have.length(1);
  });
});
