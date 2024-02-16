/* eslint-disable no-console */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

import styles from './Register.module.css';

import FormEmailInput from '../../components/form/FormEmailInput';
import FormPasswordInput from '../../components/form/FormPasswordInput';

import IconText from '../../components/IconText';
import MessageBar from '../../components/MessageBar';
import SocialButtonsGroup from '../../components/SocialButtonsGroup';

export const RegisterForm = (props) => {

  const [errorMessage, setErrorMessage] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle password visibility

  const [passwordErrors, setPasswordErrors] = useState({
    uppercase: true,
    lowercase: true,
    number: true,
    special: true,
    length: true,
  });

  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [passwordListVisible, setPasswordListVisible] = useState(false);

  //error from backend
  useEffect(() => {
    if (props.errorMessage) {
      setErrorMessage(props.errorMessage);
    }
  },[props.errorMessage]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validateConfirmPassword(e.target.value);
  };

  const handlePasswordFocus = () => {
    setPasswordListVisible(true);
    setPasswordMatchError('');
  };

  const handleConfirmPasswordFocus = () => {
    setPasswordListVisible(false);
    setPasswordMatchError('');
  };

  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };
  const allPasswordErrorsChecked = Object.values(passwordErrors).every((error) => !error);

  const validatePassword = (passwordValue) => {
    const regexUpperCase = /[A-Z]/;
    const regexLowerCase = /[a-z]/;
    const regexNumber = /\d/;
    const regexSpecialChar = /[!@#$%^&*()_+=[\]{};':"\\|,.<>?-]/;
    const regexLength = /^.{8,25}$/;

    const errors = {
      uppercase: !regexUpperCase.test(passwordValue),
      lowercase: !regexLowerCase.test(passwordValue),
      number: !regexNumber.test(passwordValue),
      special: !regexSpecialChar.test(passwordValue),
      length: !regexLength.test(passwordValue),
    };
    setPasswordErrors(errors);

  };

  const validateConfirmPassword = (confirmPasswordValue) => {
    setPasswordMatchError(confirmPasswordValue !== password ? 'Passwords do not match.' : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission if all validations pass
    if (
      !emailError &&
      allPasswordErrorsChecked &&
      !passwordMatchError
    ) {
      // alert('Form submitted successfully!');
      props.onSubmitData(email, password);
    }
  };

  const validateEmail = (emailValue) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  };

  return (
    <>
      <Form
        className="py-4"
        onSubmit={handleSubmit}
        noValidate
        // validated={validated}
      >
        <FormEmailInput
          autoComplete="off"
          required
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          defaultValue={email}
        />
        <FormPasswordInput
          id="password"
          label="Password"
          name="password"
          required
          type={showPassword ? 'text' : 'password'} // Toggle password visibility
          value={password}
          onChange={handlePasswordChange}
          onFocus={handlePasswordFocus}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <FormPasswordInput
          id='confirmPassword'
          label='Password Confirmation'
          name='confirmPassword'
          required
          type={showConfirmPassword ? 'text' : 'password'} // Toggle password visibility
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          onFocus={handleConfirmPasswordFocus}
          showPassword={showConfirmPassword}
          setShowPassword={setShowConfirmPassword}
        />
        <Button
          className="primary-btn w-100 my-5"
          type="submit"
          size="lg"
          variant="light"
        >
          Sign up
        </Button>
        {passwordListVisible && (
          <MessageBar variant={allPasswordErrorsChecked ? 'success' : 'error'}>
            <IconText
              title="At least 1 uppercase character"
              clear={passwordErrors.uppercase}
            />
            <IconText
              title="At least 1 lowercase character"
              clear={passwordErrors.lowercase}
            />
            <IconText title="At least 1 number" clear={passwordErrors.number} />
            <IconText
              title="At least 1 special character ()"
              clear={passwordErrors.special}
            />
            <IconText
              title="Between 8-25 characters"
              clear={passwordErrors.length}
            />
          </MessageBar>
        )}
        {errorMessage && (
          <MessageBar variant="error">{errorMessage}</MessageBar>
        )}
        {emailError && (
          <MessageBar variant="error">{emailError}</MessageBar>
        )}
        {passwordMatchError && (
          <MessageBar variant="error">{passwordMatchError}</MessageBar>
        )}

        <div className={styles.signUpText}>Or sign up with</div>

        <SocialButtonsGroup />
      </Form>
    </>
  );
};

export default RegisterForm;
RegisterForm.propTypes = {
  onSubmitData: PropTypes.func,
  email: PropTypes.string,
  paramEmail: PropTypes.string,
  errorMessage: PropTypes.string,
};
