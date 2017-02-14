import React, { Component, PropTypes } from 'react';
import TagsInput from 'react-tagsinput';

import './FormTagsInput.sass';

class FormTagsInput extends Component {
  constructor(props) {
    super(props);

    // Can add our own classes here
    this.tagStyles = {
      className: 'react-tagsinput-tag',
      classNameRemove: 'react-tagsinput-remove',
    };

    this.inputProps = {
      className: 'react-tagsinput-input',
      placeholder: 'Add a poll choice',
    };
  }

  render() {
    const { input: { onChange } } = this.props;

    return (
      <TagsInput
        value={this.props.input.value}
        onlyUnique
        onChange={onChange}
        tagProps={this.tagStyles}
        inputProps={this.inputProps}
      />
    );
  }
}

FormTagsInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.array,
    onChange: PropTypes.func,
  }),
};

export default FormTagsInput;
