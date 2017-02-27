import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import { App } from './App';

describe('Component: <App />', () => {
  const props = {};

  beforeEach(() => {
    props.children = <div className="children" />;
    props.isLoading = true;
    props.checkStatus = sinon.spy();
  });

  it('should render', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper).to.have.length(1);
  });

  it('should initially render empty div', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.text()).to.equal('');
  });

  it('should call checkStatus on mount', () => {
    mount(<App {...props} />);
    expect(props.checkStatus).to.have.property('callCount', 1);
  });

  it('should render children when no longer loading', () => {
    props.isLoading = false;
    const wrapper = shallow(<App {...props} />);

    expect(wrapper.find('.children')).to.have.length(1);
  });
});
