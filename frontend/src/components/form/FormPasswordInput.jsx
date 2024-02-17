import PropTypes from 'prop-types';

import FromInput from './FormInput';

/*
  RegExp: at least one symbol, uppercase letter, lowercase letter, number,
  min length 8 characters, max length 20 characters
*/
const passwordRegExp = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$';
// const Button = () => (
//   <Button
//     className="tertiary-btn w-100"
//     type="button"
//     // variant={variant}
//     // onClick={onClick}
//   >
//     test
//   </Button>
// );
const FormPasswordInput = ({
  id = 'password',
  name = 'password',
  label = 'Password',
  showPassword,// State to manage password visibility
  setShowPassword,// Function to toggle password visibility
  ...rest
}) => {
  // Function to prevent copy and paste actions on the input field
  const preventCopyPaste = (e) => e.preventDefault();
  return (
    <FromInput
      id={id}
      label={label}
      name={name}
      minLength="8"
      maxLength="20"
      pattern={passwordRegExp}
      placeholder="********"
      type={showPassword ? 'text' : 'password'} // Password visibility toggle
      onCopy={preventCopyPaste}
      onPaste={preventCopyPaste}
      // buttonRight={
      //   <Button
      //     variant="light"
      //     onClick={() => setShowPassword(!showPassword)}
      //   >
      //     {showPassword ? 'Hide' : 'Show'}
      //   </Button>
      // }
      showPassword={showPassword}// State to manage password visibility
      setShowPassword={setShowPassword}// Function to toggle password visibility
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

};

export default FormPasswordInput;
