import PropTypes from 'prop-types';

import { useState } from 'react';

import FormInput from './FormInput';

/**
  RegExp: at least one symbol, uppercase letter, lowercase letter, number,
  min length 8 characters, max length 20 characters
*/
// eslint-disable-next-line max-len
const passwordRegExp = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$';

const FormPasswordInput = ({ 
  id = 'password',
  name = 'password', 
  label = 'Password', 
  ...rest
}) => {
  const preventCopyPaste = (e) => e.preventDefault();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(showPassword => !showPassword);
  };

  return (
    <div style={{ position: 'relative' }}>
      <FormInput 
        id={id}
        label={label}
        name={name}
        minLength="8"
        maxLength="20"
        pattern={passwordRegExp}
        placeholder="********"
        type={showPassword ? 'text' : 'password'}
        onCopy={preventCopyPaste}
        onPaste={preventCopyPaste}
        {...rest}
      />
      
      <i 
        onClick={toggleShowPassword} 
        className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
      ></i>
    </div>
  );
};

FormPasswordInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
};

export default FormPasswordInput;
