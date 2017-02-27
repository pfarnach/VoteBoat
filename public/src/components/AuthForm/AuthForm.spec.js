import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import AuthForm from './AuthForm';

describe('Component: <AuthForm />', () => {
  const props = {};

  beforeEach(() => {
    props.email = '';
    props.password = '';
    props.authType = 'signin';
    props.handleSubmit = sinon.spy();
    props.updateForm = sinon.spy();
  });

  it('should render', () => {
    const wrapper = shallow(<AuthForm {...props} />);
    expect(wrapper).to.have.length(1);
  });

  it('should have two Input components', () => {
    const wrapper = shallow(<AuthForm {...props} />);
    expect(wrapper.find('Input')).to.have.length(2);
  });

  it('should render correct button based on authType', () => {
    const wrapper = shallow(<AuthForm {...props} />);
    const btn = wrapper.find('Button');
    expect(btn.children().node).to.equal('Sign in');
  });

  it('should call updateForm when inputs receive text', () => {
    const wrapper = shallow(<AuthForm {...props} />);
    const input = wrapper.find('Input').first();

    input.simulate('change', null, {});
    expect(props.updateForm).to.have.property('callCount', 1);
  });

  it('should call handleSubmit function when form is submitted', () => {
    const wrapper = shallow(<AuthForm {...props} />);
    const form = wrapper.find('form');

    form.simulate('submit');
    expect(props.handleSubmit).to.have.property('callCount', 1);
  });
});
