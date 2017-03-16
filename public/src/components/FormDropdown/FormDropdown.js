import React, { PropTypes } from 'react';
import { Dropdown } from 'semantic-ui-react';


const FormDropdown = (props) => {
  const {
    input: { value: choice, onChange },
    meta: { touched, error },
    choices,
    placeholder,
   } = props;

  return (
    <div>
      <Dropdown
        selection
        text={choice.text}
        value={choice.value}
        onChange={(e, selected) => onChange(selected)}
        options={choices}
        placeholder={placeholder}
      />
      {touched && (error && <span>{error}</span>)}
    </div>
  );
};

FormDropdown.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.object,
    onChange: PropTypes.func,
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  choices: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
};

FormDropdown.defaultProps = {
  placeholder: '',
};

export default FormDropdown;
