import React, { PropTypes } from 'react';
import { Dropdown } from 'semantic-ui-react';


const FormDropdown = (props) => {
  const { input: { value: option, onChange }, options, placeholder } = props;

  return (
    <Dropdown
      selection
      text={option.text}
      value={option.value}
      onChange={(e, selected) => onChange(selected)}
      options={options}
      placeholder={placeholder}
    />
  );
};

FormDropdown.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.object,
    onChange: PropTypes.func,
  }),
  options: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
};

FormDropdown.defaultProps = {
  placeholder: '',
};

export default FormDropdown;
