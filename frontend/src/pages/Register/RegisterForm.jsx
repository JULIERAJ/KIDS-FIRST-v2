/* eslint-disable no-console */
import propTypes from 'prop-types';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

import styles from './Register.module.css';

import FormEmailInput from '../../components/form/FormEmailInput';
import FormPasswordInput from '../../components/form/FormPasswordInput';

import IconText from '../../components/IconText';
import MessageBar from '../../components/MessageBar';
import SocialButtonsGroup from '../../components/SocialButtonsGroup';

const DEFAULT_ERROR_MESSAGE =
    'Please use the correct email address format. ';

const DEFAULT_PASS_MESSAGE =
`English uppercase Letters
 English lowercase Letters
 Atleast one number(0-9) or symbols
 Minimum 8 characters`;

export const RegisterForm = (props) => {

  const [email, setEmail] = useState( '');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [passwordConfirm, setPasswordConfirm] = useState('');
 
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
  };

  const validateEmail = () => {
    const emailRegExp = /^\S+@\S+\.\S+$/;
    setEmailError(!emailRegExp.test(email) ? DEFAULT_ERROR_MESSAGE : '');
  };

  const validatePassword = () => {
    const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    setPasswordError(
      !passwordRegExp.test(password) ? 
        DEFAULT_PASS_MESSAGE : '');
  };

  const validatePasswordConfirm = () => {
    setPasswordConfirmError(password !== passwordConfirm ? 'Password do not match' : '');
  };

  const validateForm = () => {
    validateEmail();
    validatePassword();
    validatePasswordConfirm(); 

    if (emailError || passwordError || passwordConfirmError) {
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
    if (validated) {
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
          onBlue={validateEmail}  
        />
        <FormPasswordInput onChange={handlePasswordChange} required />
        <FormPasswordInput
          id='confirmPassword'
          label='Password Confirmation'
          name='confirmPassword'
          value={password}
          onBlue={validatePassword}
          //onChange={handlePasswordConfirmChange}
          required
        />
       
        {/* <MessageBar variant='success'>
          <IconText title='English uppercase/lowercase characters' />
          <IconText title='Numbers (0-9)' />
          <IconText title='Minimum eight characters' />
        </MessageBar> */}

        <Button
          className='primary-btn w-100 my-5'
          type='submit'
          size='lg'
          variant='light'
        >
                    Sign up
        </Button>
        {emailError && (
          <MessageBar variant='error'>Please use the correct 
          email address format.</MessageBar>
        )}
        {passwordError && (
          <MessageBar variant='error'>
            <IconText title='English uppercase Letters'/>
            <IconText title='English lowercase Letters' />
            <IconText title=' Atleast one number(0-9) or symbols' />
            <IconText title=' Atleast one number(0-9) or symbols'/>
          </MessageBar>
        )} 
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
