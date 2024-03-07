/*
  This component represents a registration form. It allows users to sign up by providing their email,
   password, and confirming the password.
  It includes form fields for email, password, and password confirmation, along with validation checks for each field.
*/
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {
  GoogleLoginButton,
  FacebookLoginButton,
} from 'react-social-login-buttons';
import { LoginSocialGoogle, LoginSocialFacebook } from 'reactjs-social-login';

import styles from './Register.module.css';

import { loginSocial, loginFacebook } from '../../api';

import FormEmailInput from '../../components/form/FormEmailInput';
import FormPasswordInput from '../../components/form/FormPasswordInput';

import IconText from '../../components/IconText';
import MessageBar from '../../components/MessageBar';
//import SocialButtonsGroup from '../../components/SocialButtonsGroup';

const regexUpperCase = /[A-Z]/;
const regexLowerCase = /[a-z]/;
const regexNumber = /\d/;
const regexSpecialChar = /[!@#$%^&*()_+=[\]{};':"\\|,.<>?-]/;
const regexLength = /^.{8,40}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const RegisterForm = (props) => {
  const [errorMessage, setErrorMessage] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle password visibility
  // eslint-disable-next-line no-unused-vars
  const [errMsg, setErrMsg] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [success, setSuccess] = useState('');

  const [passwordErrors, setPasswordErrors] = useState({
    uppercase: true,
    lowercase: true,
    number: true,
    special: true,
    length: true,
  });

  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [passwordListVisible, setPasswordListVisible] = useState(false);

  // State variable to manage the disabled state
  const [isDisabled, setIsDisabled] = useState(true);

  // Effect hook to handle errors received from the backend
  useEffect(() => {
    if (props.errorMessage) {
      setErrorMessage(props.errorMessage);
    }
  }, [props.errorMessage]);
  // Event handler for email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      setIsDisabled(true);
    } else {
      setEmailError('');
      setIsDisabled(false);
    }
  };
  // Event handler for password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };
  // Event handler for confirming password change
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validateConfirmPassword(e.target.value);
  };
  // Event handler for focusing on the password field
  const handlePasswordFocus = () => {
    setPasswordListVisible(true);
    setPasswordMatchError('');
  };
  // Event handler for focusing on the confirm password field
  const handleConfirmPasswordFocus = () => {
    setPasswordListVisible(false);
    setPasswordMatchError('');
  };

  // Function to validate email format
  const validateEmail = (emailValue) => {
    return regexEmail.test(emailValue);
  };
  // Function to validate all password errors
  const allPasswordErrorsChecked = Object.values(passwordErrors).every((error) => !error);
  // Function to validate password format
  const validatePassword = (passwordValue) => {
    const errors = {
      uppercase: !regexUpperCase.test(passwordValue),
      lowercase: !regexLowerCase.test(passwordValue),
      number: !regexNumber.test(passwordValue),
      special: !regexSpecialChar.test(passwordValue),
      length: !regexLength.test(passwordValue),
    };
    setPasswordErrors(errors);
  };
  // Function to validate password confirmation
  const validateConfirmPassword = (confirmPasswordValue) => {
    setPasswordMatchError(confirmPasswordValue !== password ? 'Passwords do not match.' : '');
  };
  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission if all validations pass
    if (
      !emailError &&
      allPasswordErrorsChecked &&
      !passwordMatchError
    ) {
      props.onSubmitData(email, password);
    }
  };

  const loginfromGoogle = (response) => {
    loginSocial(response.data.access_token, response.data.email)
      .then((res) => {
        setSuccess(true);
        const user = JSON.stringify(res.data);
        localStorage.setItem('storedUser', user);
        window.location.href = '/member';
      })
      .catch(() => {
        setSuccess(false);
      });
  };

  const handleFacebookLoginSuccess = (response) => {
    loginFacebook(response.data.accessToken, response.data.userID)
      .then((res) => {
        setSuccess(true);
        const user = JSON.stringify(res.data);
        localStorage.setItem('storedUser', user);
        window.location.href = '/member';
      })
      .catch(() => {
        setSuccess(false);
        setErrMsg(
          `Your email address or password is incorrect.
        Please try again, or click "Forgot your password"`
        );
      });
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
          defaultValue={email}
        />
        <FormPasswordInput
          required
          type={showPassword ? 'text' : 'password'} // Toggle password visibility
          value={password}
          onChange={handlePasswordChange}
          onFocus={handlePasswordFocus}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          disabled={isDisabled}
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
          disabled={isDisabled}
        />
        <Button
          className="primary-btn w-100 my-5"
          type="submit"
          size="lg"
          variant="light"
        >
          Sign up
        </Button>
        {/* Display error messages */}
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
              title="Between 8-40 characters"
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

        <LoginSocialFacebook
          appId={process.env.APP_ID}
          onResolve={(response) => {
            handleFacebookLoginSuccess(response);
            console.log(response);
          }}
          onReject={(error) => {
            // handleFacebookLoginFailure(error);
            console.log(error);
          }}
        >
          <FacebookLoginButton />
          {/* <FacebookLoginButton onClick={() => alert('Hello')} /> */}
        </LoginSocialFacebook>
        <div> &nbsp; </div>
        <LoginSocialGoogle
          client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
          onResolve={loginfromGoogle}
          onReject={(err) => {
            setErrMsg(
              `You are not able to login with Google.
                   Please try again later`
            );
            console.log(err);
          }}
        >
          <GoogleLoginButton />
        </LoginSocialGoogle>
        {/*<SocialButtonsGroup />*/}
      </Form>
    </>
  );
};

export default RegisterForm;
RegisterForm.propTypes = {
  onSubmitData: PropTypes.func,
  email: PropTypes.string,
  errorMessage: PropTypes.string,
};
