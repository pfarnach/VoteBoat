import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import FormInput from './FormInput';

describe('Component: <FormInput />', () => {
  const props = {};

  beforeEach(() => {
    props.input = {
      value: '',
      onChange: sinon.spy(),
    };
  });

  it('should render', () => {
    const wrapper = shallow(<FormInput {...props} />);
    expect(wrapper).to.have.length(1);
  });

  it('should call onChange prop when change triggered', () => {
    const wrapper = shallow(<FormInput {...props} />);
    wrapper.simulate('change');
    expect(props.input.onChange).to.have.property('callCount', 1);
  });
});
