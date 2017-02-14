import React, { PropTypes } from 'react';
import { Dropdown } from 'semantic-ui-react';


const FormDropdown = (props) => {
  const { input: { value: choice, onChange }, choices, placeholder } = props;

  return (
    <Dropdown
      selection
      text={choice.text}
      value={choice.value}
      onChange={(e, selected) => onChange(selected)}
      options={choices}
      placeholder={placeholder}
    />
  );
};

FormDropdown.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.object,
    onChange: PropTypes.func,
  }),
  choices: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
};

FormDropdown.defaultProps = {
  placeholder: '',
};

export default FormDropdown;
