/* eslint-disable no-console */
import propTypes from 'prop-types';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

import styles from './Register.module.css';
import style from './RegisterForm.module.css';

import FormEmailInput from '../../components/form/FormEmailInput';
import FormPasswordInput from '../../components/form/FormPasswordInput';

import IconText from '../../components/IconText';
import MessageBar from '../../components/MessageBar';
import SocialButtonsGroup from '../../components/SocialButtonsGroup';

const DEFAULT_ERROR_MESSAGE = 'Please use the correct email address format. ';

// const DEFAULT_PASS_MESSAGE = `English uppercase Letters
//  English lowercase Letters
//  Atleast one number(0-9) or symbols
//  Minimum 8 characters`;

// const DEFAULT_PASS_SUCCESS = `English uppercase Letters
//  English lowercase Letters
//  Atleast one number(0-9) or symbols
//  Minimum 8 characters
//  `;

export const RegisterForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  //   const [passwordConfirm, setPasswordConfirm] = useState('');
  //   const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  //eslint-disable-next-line no-unused-vars

  //   const [isValidPassword, setIsPasswordValid] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [validated, setIsValidated] = useState(false);

  // const handleEmailChange = ({ target: { value } }) => setEmail(value);
  // const handlePasswordChange = ({ target: { value } }) => setPassword(value);

  const handleEmailChange = ({ target: { value } }) => {
    setEmail(value);
    setIsTouched(true);
  };

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
    setIsTouched(true);
    console.log(password);
  };

  //   const handlePasswordConfirm = ({ target: { value } }) => {
  //     setPasswordConfirm(value);
  //     setIsTouched(true);
  //     console.log(passwordConfirm);
  //   };

  //   const handlePasswordConfirmChange = ({ target: { value } }) => {
  //     setPasswordConfirm(value);
  //     setIsTouched(true);
  //   };

  const validateEmail = () => {
    const emailRegExp = /^\S+@\S+\.\S+$/;
    setEmailError(!emailRegExp.test(email) ? DEFAULT_ERROR_MESSAGE : '');
  };

  const emailRegExp = /^\S+@\S+\.\S+$/;
  const isValidEmail = emailRegExp.test(email);

  const passwordRegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  const isValidPassword = passwordRegExp.test(password);

  const validatePassword = () => {
    const passwordRegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const isValidPassword = passwordRegExp.test(password);

    setPasswordError(!isValidPassword ? 'password error' : '');
  };

  //   const validatePasswordConfirm = (event) => {
  //     setPasswordConfirm(event.target.value);
  //     setPasswordConfirmError(false);
  //   };
  //   setPasswordConfirmError(
  //     password !== passwordConfirm ? '' : 'Password do not match '
  //   );

  const validateForm = () => {
    validateEmail();
    validatePassword();
    // validatePasswordConfirm();
    setIsValidated(true);

    if (emailError || passwordError) {
      setEmailError('');
      setIsValidated(false);
    } else {
      setErrorMessage('');
      setIsValidated(true);
      isTouched;
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    validateForm();

    if (validated && !emailError && !passwordError) {
      props.onSubmitData(email, password).catch((e) => {
        setErrorMessage(e.response.data.message);
      });
    }
  };

  return (
    <>
      <Form
        className='py-4'
        // onChange={handleFormChange}
        onSubmit={handleFormSubmit}
        noValidate
        validated={validated}
      >
        <FormEmailInput
          autoComplete='off'
          required
          value={email}
          onChange={handleEmailChange}
          // onChange={handleInput}
          onBlur={validateEmail}
          name='email'
          className={email !== '' && !isValidEmail ? style.error : ''}
        />
        <FormPasswordInput
          onChange={handlePasswordChange}
          name='password'
          value={password}
          required
          className={password !== '' && !isValidPassword ? style.error : ''}
        />
        <FormPasswordInput
          id='confirmPassword'
          label='Password Confirmation'
          name='Confirm_Password'
          //   value={passwordConfirm}
          //   onBlur={validatePasswordConfirm}
          //   onChange={handlePasswordConfirmChange}
          //   onChange={handlePasswordConfirm}
          //   onChange={validatePasswordConfirm}
          // onChange={handleInput}
          required
        />
        {/* <IconText
          rules={['capital', 'title', 'minLength', 'number']}
          minLength={8}
          value={password}
          valueAgain={passwordConfirm}
          checkList={isValidPassword}
          // checkList={checkList}
          Message={{
            capital: 'English uppercase Letters',
            smaller: 'English lowercase Letters',
            number: ' Atleast one number(0-9) or symbols',
            minLength: 'Minimum 8 characters',
          }}
        /> */}

        <Button
          className='primary-btn w-100 my-4'
          type='submit'
          size='lg'
          variant='light'
        >
          Sign up
        </Button>
        {email !== '' && !isValidEmail && (
          <MessageBar variant='error'>
            {emailError ? <span></span> : <span>{DEFAULT_ERROR_MESSAGE}</span>}
          </MessageBar>
        )}

        {isValidEmail && (
          <>
            {!isValidPassword && (
              <MessageBar variant='error'>
                <IconText title='English uppercase Letters' />
                <IconText title='English lowercase Letters' />
                <IconText title=' Atleast one number(0-9) or symbols' />
                <IconText title=' Minimum 8 characters' />
              </MessageBar>
            )}
            {/* {isValidPassword && (
              <>
                {!validatePasswordConfirm || password !== passwordConfirm ? (
                  <MessageBar variant='error'>
                    {passwordConfirmError ? (
                      <span></span>
                    ) : (
                      { DEFAULT_ERROR_MESSAGE }
                    )}
                  </MessageBar>
                ) : null}
              </>
            )} */}
          </>
        )}

        {/* {!validatePasswordConfirm || password !== passwordConfirm ? (
          <MessageBar variant='error'>
            {passwordConfirmError ? <span></span> : { DEFAULT_ERROR_MESSAGE }}
          </MessageBar>
        ) : null} */}

        {/* {isValidPassword && (
          <>
            {password !== passwordConfirm &&
              passwordConfirm !== '' &&
              !validatePasswordConfirm && (
              <MessageBar variant='error'>
                {passwordConfirmError ? (
                  <span></span>
                ) : (
                  <span>{DEFAULT_ERROR_MESSAGE}</span>
                )}
              </MessageBar>
            )}
          </>
        )} */}

        {errorMessage && (
          <MessageBar variant='error'>{errorMessage}</MessageBar>
        )}

        <div className={styles.signUpText}>Or sign up with</div>

        <SocialButtonsGroup />
      </Form>
    </>
  );
};

export default RegisterForm;
RegisterForm.propTypes = {
  onSubmitData: propTypes.func,
};
