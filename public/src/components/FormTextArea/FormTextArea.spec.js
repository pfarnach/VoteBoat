import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import FormTextArea from './FormTextArea';

describe('Component: <FormTextArea />', () => {
  const props = {};

  beforeEach(() => {
    props.input = {
      value: '',
      onChange: sinon.spy(),
    };
    props.meta = {
      touched: false,
      error: '',
    };
  });

  it('should render', () => {
    const wrapper = shallow(<FormTextArea {...props} />);
    expect(wrapper).to.have.length(1);
  });

  it('should call onChange prop when change triggered', () => {
    const wrapper = shallow(<FormTextArea {...props} />);
    wrapper.find('TextArea').simulate('change');
    expect(props.input.onChange).to.have.property('callCount', 1);
  });
});
