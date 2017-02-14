import React, { PropTypes } from 'react';
import { Input } from 'semantic-ui-react';

const FormInput = (props) => {
  const { input: { value, onChange } } = props;

  return (
    <Input value={value} onChange={onChange} />
  );
};

FormInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func,
  }),
};

export default FormInput;
