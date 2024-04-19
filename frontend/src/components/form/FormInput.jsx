import PropTypes from 'prop-types';

import { Button, Form, InputGroup, Image } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import styles from './FormInput.module.css';

import IconError from '../../media/icons/error.png';

const FromInput = ({ label, showPassword, setShowPassword,errorMessage, ...props }) => (
  <Form.Group className='py-2'>{/* Container for form input and button */}
    <Form.Label>{label}</Form.Label>{/* Label for the form input */}
    <InputGroup>
      <Form.Control {...props} className={errorMessage ? styles.errorInput : ''}/>{/* Form input element */}
      {/* Show password button for the 'Password' field */}
      {(label === 'Password' ) && (
        <Button
          variant='light'
          className={styles.formInputButton}
          onClick={(event) =>
          {
            event.preventDefault();
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <FaEyeSlash />: <FaEye />}
        </Button>
      )}
      {errorMessage && <Form.Control.Feedback type="invalid"
        className={styles.errorFeedback}>
        <Image src={IconError} />
        {errorMessage}
      </Form.Control.Feedback>}

    </InputGroup>
  </Form.Group>
);

FromInput.propTypes = {
  label: PropTypes.string,
  showPassword: PropTypes.bool,
  setShowPassword: PropTypes.func,
  type: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default FromInput;
