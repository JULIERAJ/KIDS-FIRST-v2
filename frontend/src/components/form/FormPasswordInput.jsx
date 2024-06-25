import PropTypes from 'prop-types';

import FormInput from './FormInput';

/*
  RegExp: at least one symbol, uppercase letter, lowercase letter, number,
  min length 8 characters, max length 40 characters
*/
const passwordRegExp =
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,40}$';

const FormPasswordInput = ({
  id = 'password',
  name = 'password',
  label = 'Password',
  showPassword, // State to manage password visibility
  setShowPassword, // Function to toggle password visibility
  errors,
  successMessage,

  ...rest
}) => {
  // Function to prevent copy and paste actions on the input field
  const preventCopyPaste = (e) => e.preventDefault();

  return (
    <FormInput
      id={id}
      label={label}
      name={name}
      minLength='8'
      maxLength='40'
      pattern={passwordRegExp}
      placeholder='**************'
      autoComplete='password'
      type={showPassword ? 'text' : 'password'} // Password visibility toggle
      onCopy={preventCopyPaste}
      onPaste={preventCopyPaste}
      showPassword={showPassword} // State to manage password visibility
      setShowPassword={setShowPassword} // Function to toggle password visibility
      isInvalid={!!errors}
      errorMessage={errors}
      successMessage={successMessage}
      {...rest}
    />
  );
};

FormPasswordInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  showPassword: PropTypes.bool,
  setShowPassword: PropTypes.func,
  errors: PropTypes.string,
  successMessage: PropTypes.string,
  showTextPassword: PropTypes.string,
};

export default FormPasswordInput;
