import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { AuthFormPure } from './AuthForm';

describe('Component: <AuthFormPure />', () => {
  const props = {};

  beforeEach(() => {
    props.authType = 'signin';
    props.signIn = sinon.spy();
    props.signUp = sinon.spy();
    props.handleSubmit = sinon.spy();
    props.isSigningIn = false;
    props.authError = null;
  });

  it('should render', () => {
    const wrapper = shallow(<AuthFormPure {...props} />);
    expect(wrapper).to.have.length(1);
  });

  it('should have two Field components', () => {
    const wrapper = shallow(<AuthFormPure {...props} />);
    expect(wrapper.find('Field')).to.have.length(2);
  });

  it('should render correct button based on authType', () => {
    const wrapper = shallow(<AuthFormPure {...props} />);
    const btn = wrapper.find('Button');
    expect(btn.children().node).to.equal('Sign in');
  });

  it('should call onSubmit when form is submitted', () => {
    const wrapper = shallow(<AuthFormPure {...props} />);
    wrapper.find('form').simulate('submit');
    expect(props.handleSubmit).to.have.property('callCount', 1);
  });
});
