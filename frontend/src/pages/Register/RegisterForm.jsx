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

import style from '../../pages/Register/RegisterForm.module.css';

export const RegisterForm = (props) => {
  const [errorMessage, setErrorMessage] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(false);

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [lowerValidated, setLowerValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);

  const [passwordMatch, setPasswordMatch] = useState(false);
  const [allValidated, setAllValidated] = useState(false);

  console.log('allValidated' , allValidated); 
  console.log('error message', errorMessage);
  console.log('isPasswordValid',isPasswordValid);

  const [values, setValues] = useState({
    email: '',
    password: '',
    confirm_password: '',
  });

  const handleEmailChange = (event) => {
    event.preventDefault();

    const emailRegExp = /^\S+@\S+\.\S+$/;
    const { value } = event.target;
    setValues({ ...values, email: value }); 

    if (!emailRegExp.test(value)) {
      setIsValidEmail(false);
      setErrorMessage('The format of your email address is not correct. Please enter the correct email address.');
    } else {
      setIsValidEmail(true);
      setErrorMessage('');
    }
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();

    const upper = new RegExp('(?=.*[A-Z])');
    const lower = new RegExp('(?=.*[a-z])');
    const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!@#$%^&*])');

    const { value } = event.target;
    setValues({ ...values, password: value });

    if (upper.test(value)) {
      setUpperValidated(true);
    } else {
      setUpperValidated(false);
    }

    if (lower.test(value)) {
      setLowerValidated(true);
    } else {
      setLowerValidated(false);
    }

    if (number.test(value)) {
      setNumberValidated(true);
    } else {
      setNumberValidated(false);
    }

    if (special.test(value)) {
      setSpecialValidated(true);
    } else {
      setSpecialValidated(false);
    }
  };

  useEffect(() => {
    if(upperValidated && lowerValidated && (numberValidated || specialValidated) && values.password.length > 7) {
      setIsPasswordValid(true); 
    } else {
      setIsPasswordValid(false);
    }
  }, [upperValidated,lowerValidated,numberValidated, specialValidated]);

  const handleConfirmPasswordChange = (event) => {
    event.preventDefault();
    setValues({ ...values, confirm_password: event.target.value });
    if(event.target.value != values.password ) {
      setErrorMessage('The passwords do not match');
      setPasswordMatch(false); 
    } else {
      setPasswordMatch(true); 
      setErrorMessage('');
    }
  };

  useEffect(() => {
    if (
      isValidEmail &&
      isPasswordValid && 
      passwordMatch
    ) { 
      setAllValidated(true);
    } else {
      setAllValidated(false);
    } 
  }, [isValidEmail,isPasswordValid, passwordMatch]);

  // email valid, password valid, and the passwords matches 
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (allValidated) {
      try {
        const result = await props.onSubmitData(values.email, values.password);
        setErrorMessage(result);
      } catch(e) {
        console.log('something went wrong');
      }
    } else {
      console.log('not all validated');
    }

  };

  return (
    <>
      <Form
        className='py-4'
        onSubmit={handleSubmit}
        noValidate
      >
        <FormEmailInput
          autoComplete='off'
          required
          onChange={handleEmailChange}
          name='email'
          value={values.email}
          className={values.email.length == 0 || isValidEmail ? '' : style.error }
        />
        <FormPasswordInput
          required
          onChange={handlePasswordChange}
          name='password'
          value={values.password}
          className={values.password.length == 0 || isPasswordValid ? '' : style.error }
        />

        <FormPasswordInput
          required
          label='Password Confirmation'
          onChange={handleConfirmPasswordChange}
          name='confirm_password'
          value={values.confirm_password}
          className={values.password.length == 0 || passwordMatch ? '' : style.error } 
        />

        <Button
          className='primary-btn w-100 my-5'
          //className={`primary-btn w-100 my-3 ${style.margin}`}
          type='submit'
          size='lg'
          variant='light'
        >
          Sign up
        </Button>

        {values.email.length > 0 && !isValidEmail && (
          <MessageBar variant='error' className={style.error}>
            <span>{errorMessage}</span>
          </MessageBar>
        )}

        {values.email.length > 0 && isValidEmail && values.password.length > 0 && values.confirm_password.length == 0 && (
          <>
            { isPasswordValid ? (
              <MessageBar variant={ 'success' }> 
                <IconText status='success' title='English uppercase letters'/>
                <IconText status='success' title='English lowercase letters'/>
                <IconText status='success' title='Atleast one numbers (0-9) or symbols'/>
                <IconText status='success' title='Minimum 8 characters'/>
              </MessageBar>
            ) : (
              <MessageBar variant={ 'error' }> 
                {upperValidated ? (
                  <IconText status='success' title='English uppercase letters'/>
                ) : (
                  <IconText status='error' title='English uppercase letters'/>
                )}

                {lowerValidated ? (
                  <IconText status='success' title='English lowercase letters'/>
                ) : (
                  <IconText status='error' title='English lowercase letters'/>
                )}

                {numberValidated || specialValidated ? (
                  <IconText status='success' title='At least one numbers (0-9) or symbols'/>
                ) : (
                  <IconText status='error' title='At least one numbers (0-9) or symbols'/>
                )}

                {values.password.length > 7 ? (
                  <IconText status='success' title='Minimum 8 characters'/>
                ) : (
                  <IconText status='error' title='Minimum 8 characters'/>
                )}
              </MessageBar>
            ) 
            }
          </>
        )}

        {isValidEmail && values.confirm_password.length > 0 && !passwordMatch && (
          <MessageBar variant='error' className={style.error}>
            <span>{errorMessage}</span>
          </MessageBar>
        )}

        {isValidEmail && passwordMatch && errorMessage.length > 0 && (
          <MessageBar variant='error' className={style.error}>
            <span>{errorMessage}</span>
          </MessageBar>
        )}

        {!isPasswordValid ? (
          <div className={styles.signUpText}>Or sign up with</div>
        ) : (
          ''
        )}

        <SocialButtonsGroup />
      </Form>
    </>
  );
};

export default RegisterForm;
RegisterForm.propTypes = {
  onSubmitData: PropTypes.func,
  email: PropTypes.string,
  paramEmail: PropTypes.string
};
