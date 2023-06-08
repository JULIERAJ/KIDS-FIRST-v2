import PropTypes from 'prop-types';

import FromInput from './FormInput';
// import checkIcon from '../IconText';

/**
  RegExp: at least one symbol, uppercase letter, lowercase letter, number,
  min length 8 characters, max length 20 characters
*/
// eslint-disable-next-line max-len
// const passwordRegExp = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$';

const FormPasswordInput = ({ 
  id = 'password',
  name = 'password', 
  label = 'Password', 
  ...rest
}) => {
  const preventCopyPaste = (e) => e.preventDefault();

  return (
    <FromInput 
      id={id}
      label={label}
      name={name}
      minLength="8"
      maxLength="20"
      //pattern={passwordRegExp}
      placeholder="password"
      type="password" 
      onCopy={preventCopyPaste}
      onPaste={preventCopyPaste}
      {...rest}
    />
  );
};

FormPasswordInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
};

export default FormPasswordInput;
