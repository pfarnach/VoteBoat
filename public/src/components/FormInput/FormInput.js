import React, { PropTypes } from 'react';
import { Input } from 'semantic-ui-react';

const FormInput = (props) => {
  const {
    input,
    meta: { touched, error },
    type,
    placeholder,
  } = props;

  return (
    <div>
      <Input
        {...input}
        type={type}
        placeholder={placeholder}
      />
      {touched && (error && <span>{error}</span>)}
    </div>
  );
};

FormInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func,
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

FormInput.defaultProps = {
  type: 'text',
  placeholder: '',
};

export default FormInput;
