import PropTypes from 'prop-types';

import { Button, Form, InputGroup } from 'react-bootstrap';

import { BsExclamationCircle , BsCheckLg } from 'react-icons/bs';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import styles from './FormInput.module.css';

const FormInput = ({
  label,
  showPassword,
  setShowPassword,
  errorMessage,
  successMessage,
  showTextPassword,
  ...props
}) => (
  <Form.Group className='py-2'>{/* Container for form input and button */}
    <Form.Label>{label}</Form.Label>{/* Label for the form input */}
    <InputGroup>
      <Form.Control {...props} className={errorMessage ? styles.errorInput : ''}/>
      {(label === 'Password' ) && (
        <Button
          variant='light'
          className={errorMessage ? styles.errorInput : styles.formInputButton}
          onClick={(event) =>
          {
            event.preventDefault();
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <FaEyeSlash />: <FaEye />}
        </Button>
      )}
    </InputGroup>
    {successMessage && <Form.Control.Feedback
      className={styles.successFeedback}>
      <BsCheckLg/>
      {successMessage}
    </Form.Control.Feedback>}
    {errorMessage && <Form.Control.Feedback type="invalid"
      className={styles.errorFeedback}>
      <BsExclamationCircle/>
      {errorMessage}
    </Form.Control.Feedback>}
    {showTextPassword &&
      <Form.Text className={styles.passwordText}>
        {showTextPassword}
      </Form.Text>
    }
  </Form.Group>
);

FormInput.propTypes = {
  label: PropTypes.string,
  showPassword: PropTypes.bool,
  setShowPassword: PropTypes.func,
  type: PropTypes.string,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  showTextPassword: PropTypes.string,
};

export default FormInput;
