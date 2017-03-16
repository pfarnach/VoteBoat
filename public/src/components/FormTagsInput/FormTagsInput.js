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
    const {
      input: { onChange, value },
      meta: { touched, error },
    } = this.props;

    return (
      <div>
        <TagsInput
          value={value}
          onChange={onChange}
          tagProps={this.tagStyles}
          inputProps={this.inputProps}
          onlyUnique
        />
        {touched && (error && <span>{error}</span>)}
      </div>
    );
  }
}

FormTagsInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.array,
    onChange: PropTypes.func,
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

export default FormTagsInput;
