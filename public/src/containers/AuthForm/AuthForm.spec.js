import React from 'react';
import { shallow } from 'enzyme';

import { AuthFormPure } from './AuthForm';

describe('Component: <AuthFormPure />', () => {
  const props = {};

  beforeEach(() => {
    props.isSignedIn = false;
    props.location = { search: '' };
  });

  it('should render', () => {
    const wrapper = shallow(<AuthFormPure {...props} />);
    expect(wrapper).to.have.length(1);
  });

  it('should have two Field components', () => {
    const wrapper = shallow(<AuthFormPure {...props} />);
    expect(wrapper.find('Button')).to.have.length(1);
  });

  it('should render <Redirect /> if signed in', () => {
    props.isSignedIn = true;
    const wrapper = shallow(<AuthFormPure {...props} />);
    expect(wrapper.find('Redirect')).to.have.length(1);
  });

  it('should only render error message if there\'s an error in the URL query string', () => {
    const wrapper = shallow(<AuthFormPure {...props} />);
    const errorMsg = wrapper.find('#error-msg').first();
    expect(errorMsg.text()).to.equal('');

    props.location.search = '?error=true';
    const wrapper2 = shallow(<AuthFormPure {...props} />);
    const errorMsg2 = wrapper2.find('#error-msg').first();
    expect(errorMsg2.text()).to.equal('Email permission is required');
  });
});
