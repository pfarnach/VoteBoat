import React, { PropTypes } from 'react';
import { TextArea } from 'semantic-ui-react';

const FormTextArea = (props) => {
  const { input, meta: { touched, error } } = props;

  return (
    <div>
      <TextArea {...input} autoHeight />
      {touched && (error && <span>{error}</span>)}
    </div>
  );
};

FormTextArea.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func,
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

export default FormTextArea;
