import PropTypes from 'prop-types';

import { Button, Form, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FromInput = ({ label, showPassword, setShowPassword, ...props }) => (
  <Form.Group className='py-2'>{/* Container for form input and button */}
    <Form.Label>{label}</Form.Label>{/* Label for the form input */}
    <InputGroup>
      <Form.Control {...props} />{/* Form input element */}
      {/* Show password button for the 'Password' field */}
      {(label === 'Password' ) && (
        <Button
          variant='light'
          className='primary-btn'
          onClick={(event) =>
          {
            event.preventDefault();
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <FaEyeSlash />: <FaEye />}
        </Button>
      )}
      {/* {buttonRight} */}
      {/* Show password button for the 'Password Confirmation' field */}
      {label === 'Password Confirmation' && (
        <Button
          className='primary-btn'
          variant='light'
          onClick={(event) =>
          {
            event.preventDefault(); // Prevent the default button action
            setShowPassword(!showPassword); // Toggle password visibility
          }}
        >
          {showPassword ? <FaEyeSlash />: <FaEye />}{/* Toggle icon based on password visibility */}
        </Button>
      )}
    </InputGroup>
  </Form.Group>
);

FromInput.propTypes = {
  label: PropTypes.string,
  showPassword: PropTypes.bool,
  setShowPassword: PropTypes.func,
  type: PropTypes.string,
  buttonRight: PropTypes.node,
};

export default FromInput;
