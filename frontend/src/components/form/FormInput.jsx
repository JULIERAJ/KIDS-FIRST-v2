import PropTypes from 'prop-types';

import { useRef, useEffect, useState } from 'react';

import { Form, InputGroup } from 'react-bootstrap';

import { BsExclamationCircle, BsCheckLg } from 'react-icons/bs';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import styles from './FormInput.module.css';

const FormInput = ({
  label,
  showPassword,
  setShowPassword,
  errorMessage,
  successMessage,
  showTextPassword,
  labelClassName,
  type,
  ...props
}) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (inputRef.current) {
      setInputValue(inputRef.current.value);
    }
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const isPassword = label === 'Password';

  return (
    <Form.Group className="py-2">
      <Form.Label className={labelClassName}>{label}</Form.Label>
      <InputGroup className={styles.inputGroup}>
        <Form.Control
          ref={inputRef}
          {...props}
          type={isPassword && showPassword ? 'text' : type}
          className={`${styles.inputField} ${errorMessage ? styles.errorInput : ''}`}
          value={inputValue}
          onChange={handleInputChange}
        />
        {isPassword && inputValue && (
          <div
            className={`${styles.formInputIcon} ${errorMessage ? styles.formInputIconError : ''}`}
            onClick={() => setShowPassword(!showPassword)}
            role="button"
            tabIndex={0}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        )}
      </InputGroup>
      {successMessage && (
        <Form.Control.Feedback className={`${styles.feedback} ${styles.successFeedback}`} >
          <BsCheckLg className={`${styles.icon} ${styles.successIcon}`} />
          {successMessage}
        </Form.Control.Feedback>
      )}
      {errorMessage && (
        <Form.Control.Feedback type="invalid" className={`${styles.feedback} ${styles.errorFeedback}`} >
          <BsExclamationCircle className={`${styles.icon} ${styles.errorIcon}`} />
          {errorMessage}
        </Form.Control.Feedback>
      )}
      {showTextPassword && (
        <Form.Text className={styles.passwordText}>{showTextPassword}</Form.Text>
      )}
    </Form.Group>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  showPassword: PropTypes.bool,
  setShowPassword: PropTypes.func,
  type: PropTypes.string,
  errorMessage: PropTypes.string,
  labelClassName: PropTypes.string,
  successMessage: PropTypes.string,
  showTextPassword: PropTypes.string,
};

export default FormInput;
