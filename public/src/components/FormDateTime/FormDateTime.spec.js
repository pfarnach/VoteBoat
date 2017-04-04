import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import moment from 'moment';

import FormDateTime from './FormDateTime';

describe('Component: <FormDateTime />', () => {
  const props = {};

  beforeEach(() => {
    props.input = {
      value: moment(),
      onChange: sinon.spy(),
    };
    props.meta = {
      touched: false,
      error: '',
    };
  });

  it('should render', () => {
    const wrapper = shallow(<FormDateTime {...props} />);
    expect(wrapper).to.have.length(1);
  });
});
