import React, { PropTypes } from 'react';
import DateTime from 'react-datetime';
import moment from 'moment';

const FormDateTime = (props) => {
  const {
    input: { value, onChange },
    meta: { touched, error },
  } = props;

  return (
    <div>
      <DateTime
        value={value}
        onChange={onChange}
        isValidDate={currentDate => currentDate.isAfter(moment().add(-1, 'day'))}
      />
      {touched && (error && <span>{error}</span>)}
    </div>
  );
};

FormDateTime.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.shape(),
    onChange: PropTypes.func,
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

export default FormDateTime;
