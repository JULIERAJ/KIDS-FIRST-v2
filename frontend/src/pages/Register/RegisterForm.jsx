/* eslint-disable indent */
/*
  This component represents a registration form. It allows users to sign up by providing their email,
   password, and confirming the password.
  It includes form fields for email, password, and password confirmation, along with validation checks for each field.
*/
//import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

import {
  GoogleLoginButton,
  FacebookLoginButton,
} from 'react-social-login-buttons';
import { LoginSocialGoogle, LoginSocialFacebook } from 'reactjs-social-login';

import styles from './Register.module.css';

import { loginSocial, loginFacebook } from '../../api';

import FormEmailInput from '../../components/form/FormEmailInput';
import {
  FormFirstNameInput,
  FormLastNameInput,
} from '../../components/form/FormNameInput';
import FormPasswordInput from '../../components/form/FormPasswordInput';

import MessageBar from '../../components/MessageBar';
import facebookIcon from '../../media/icons/facebook.png';
import googleIcon from '../../media/icons/google.png';

const regexUpperCase = /[A-Z]/;
const regexLowerCase = /[a-z]/;
const regexNumber = /\d/;
const regexSpecialChar = /[!@#$%^&*()_+=[\]{};':"\\|,.<>?-]/;
const regexLength = /^.{8,40}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const RegisterForm = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [errMsgSocial, setErrMsgSocial] = useState(''); //state for login from google and FB
  const [successSo, setSuccessSo] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [errMsg, setErrMsg] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // eslint-disable-next-line no-unused-vars
  const [isFocused, setIsFocused] = useState(false);
  const [initialFocus, setInitialFocus] = useState(false);
  const [showTextPassword, setShowTextPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    length: false,
  });
  const navigate = useNavigate();

  // Effect hook to handle errors received from the backend
  useEffect(() => {
    if (props.errorMessage) {
      setEmailError(props.errorMessage);
    }
  }, [props.errorMessage]);

  const [firstNameErrors, setFirstNameErrors] = useState('');
  const [lastNameErrors, setLastNameErrors] = useState('');
  // Event handler for First name change
  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    let newErrors = '';
    if (!validateName(value)) {
      newErrors = 'Please use only letters';
    } else if (!value) {
      newErrors = 'Please enter your first name';
    }
    setFirstNameErrors(newErrors);
    if (!newErrors) {
      setFirstName(value);
    }
  };
  const validateName = (name) => {
    const re = /^[a-zA-Z]*$/;
    return re.test(name);
  };

  // Event handler for Last name change
  const handleLastNameChange = (e) => {
    const value = e.target.value;
    let newErrors = '';
    if (!validateName(value)) {
      newErrors = 'Please use only letters';
    }
    setLastNameErrors(newErrors);
    if (!newErrors) {
      setLastName(value);
    }
  };
  // Event handler for email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };
  // Event handler for password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setShowTextPassword('');
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (!initialFocus && !allPasswordErrorsChecked) {
      setShowTextPassword(
        'Include at least:' +
          ' • 8 characters  • upper and lower case characters  • a number  • a special character'
      );
      setInitialFocus(true);
    }
  };
  const handleBlur = (e) => {
    setIsFocused(false);
    setShowTextPassword('');
    validatePassword(e.target.value);
  };

  // Function to validate email format
  const validateEmail = (emailValue) => {
    return regexEmail.test(emailValue);
  };

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
    // Check if all errors are resolved
    const allErrorsResolved = Object.values(errors).every((error) => !error);
    setAllPasswordErrorsChecked(allErrorsResolved);
    // Set success message if all errors are resolved, otherwise clear it
    setSuccessMessage(allErrorsResolved ? 'Password accepted' : '');
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any of the required fields are empty or have placeholder values
    const fields = [
      {
        value: firstName.trim(),
        errorSetter: setFirstNameErrors,
        placeholder: 'First Name',
      },
      {
        value: email.trim(),
        errorSetter: setEmailError,
        placeholder: 'user@mail.com',
      },
    ];
    let hasEmptyField = false;

    fields.forEach(({ value, errorSetter, placeholder }) => {
      if (value === '' || value === placeholder) {
        if (placeholder === 'First Name') {
          errorSetter(`Please enter your ${placeholder.toLowerCase()}`);
        } else {
          errorSetter('Please enter a valid email address');
        }
        hasEmptyField = true;
      }
    });

    if (!password.trim()) {
      // Construct the complete error message for the password field
      const errorMessagePassword =
        'Include at least:' +
        '• 8 characters • upper and lower case characters • a number • a special character';

      // Set the error message for the empty password field
      setPasswordErrors({
        uppercase: true,
        lowercase: true,
        number: true,
        special: true,
        length: errorMessagePassword,
      });
      hasEmptyField = true;
      return;
    }
    if (hasEmptyField) return;
    // Perform form submission if all validations pass
    if (
      firstNameErrors === '' &&
      lastNameErrors === '' &&
      emailError === '' &&
      allPasswordErrorsChecked
    ) {
      props.onSubmitData(firstName, lastName, email, password);
    }
  };

  const loginfromGoogle = (response) => {
    setErrMsgSocial('Log-in unsuccessful. Please try again later, or sign-up.');
    loginSocial(response.data.access_token, response.data.email)
      .then((res) => {
        setSuccessSo(true);
        const user = JSON.stringify(res.data);
        localStorage.setItem('storedUser', user);
        navigate('/dashboard');
      })
      .catch(() => {
        setSuccessSo(false);
        setErrMsgSocial(
          'Log-in unsuccessful. Please try again later, or sign-up.'
        );
      });
  };

  const handleFacebookLoginSuccess = (response) => {
    loginFacebook(response.data.accessToken, response.data.userID)
      .then((res) => {
        setSuccessSo(true);
        const user = JSON.stringify(res.data);
        localStorage.setItem('storedUser', user);
        navigate('/dashboard');
      })
      .catch(() => {
        setSuccessSo(false);
        setErrMsgSocial(
          'Log-in unsuccessful. Please try again later, or sign-up.'
        );
      });
  };

  const errorMessagePassword = Object.entries(passwordErrors)
    .filter((entry) => entry[1])
    .map(([key]) => {
      switch (key) {
        case 'uppercase':
        case 'lowercase':
          return 'upper and lower case characters';
        case 'number':
          return 'a number';
        case 'special':
          return 'a special character';
        case 'length':
          return '8 characters';
        default:
          return '';
      }
    })
    .reduce((acc, message) => {
      if (message === 'upper and lower case characters') {
        if (!acc.includes(message)) {
          acc.push(message);
        }
      } else {
        acc.push(message);
      }
      return acc;
    }, [])
    .join(', ');

  const errorMessageWithInclude = errorMessagePassword
    ? `Include at least: ${errorMessagePassword}`
    : '';

  const [allPasswordErrorsChecked, setAllPasswordErrorsChecked] =
    useState(false);

  return (
    <>
      <Form
        className='py-4'
        onSubmit={handleSubmit}
        noValidate
      >
        <Row className={styles.TextInputField}>
          <Col>
            <FormFirstNameInput
              className={styles.firstNameInput}
              autoComplete='off'
              required
              onChange={handleFirstNameChange}
              defaultValue={firstName}
              isInvalid={firstNameErrors}
              errors={firstNameErrors}
              labelClassName={styles.firstNameLabel}
            />
          </Col>
          <Col>
            <FormLastNameInput
              autoComplete='off'
              required
              onChange={handleLastNameChange}
              defaultValue={lastName}
              isInvalid={lastNameErrors}
              errors={lastNameErrors}
              labelClassName={styles.LastNameLabel}
            />
          </Col>
        </Row>
        <FormEmailInput
          autoComplete='off'
          required
          onChange={handleEmailChange}
          defaultValue={email}
          isInvalid={emailError}
          errors={emailError}
          labelClassName={styles.emailLabel}
        />
        <FormPasswordInput
          required
          type={showPassword ? 'text' : 'password'} // Toggle password visibility
          value={password}
          onChange={handlePasswordChange}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          isInvalid={!!errorMessageWithInclude}
          errors={errorMessageWithInclude}
          labelClassName={styles.PasswordLabel}
          successMessage={successMessage}
          onFocus={handleFocus}
          onBlur={handleBlur}
          showTextPassword={showTextPassword}
        />

        {!successSo && <MessageBar variant='error'>{errMsgSocial}</MessageBar>}

        <Button
          className={`primary-btn ${styles.customButton}`}
          type='submit'
          size='lg'
          variant='light'
        >
          Sign up
        </Button>
        <div className={styles.orDivider}>
          <span className={styles.dashLine}></span>
          <span className={styles.orText}>Or</span>
          <span className={styles.dashLine}></span>
        </div>
        {/* <div className={styles.signUpText}>Or</div> */}

        <Row className={styles.socialButton}>
          <Col xs={12} md={6}>
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
              <GoogleLoginButton
                title='Google'
                align={'center'}
                icon={''}
                size='45px'
                className='tertiary-btn w-100'
              >
                <img src={googleIcon} width='25' height='25' alt='' /> Google
              </GoogleLoginButton>
            </LoginSocialGoogle>
          </Col>
          <Col xs={12} md={6}>
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
              <FacebookLoginButton
                title='Facebook'
                align={'center'}
                icon={''}
                size='45px'
                className='tertiary-btn w-100'
              >
                <img src={facebookIcon} width='25' height='25' alt='' />{' '}
                Facebook
              </FacebookLoginButton>
            </LoginSocialFacebook>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <div className={styles.alreadyMember}>
            Already a member?
            <NavLink className={styles.loginLink} to="/signin">Log in</NavLink>
          </div>
        </Row>
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
