/* eslint-disable no-console */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

import styles from './Register.module.css';

import FormEmailInput from '../../components/form/FormEmailInput';
import FormPasswordInput from '../../components/form/FormPasswordInput';

import IconText from '../../components/IconText';
import MessageBar from '../../components/MessageBar';
import SocialButtonsGroup from '../../components/SocialButtonsGroup';

import style from '../../pages/Register/RegisterForm.module.css';

// const DEFAULT_ERROR_MESSAGE =
//     'You are using symbols in your passwords or your passwords do not match.';

export const RegisterForm = (props) => {
  //console.log(props);
  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  //const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  //const [isTouched, setIsTouched] = useState(false);
  //const [validated, setIsValidated] = useState(false);

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [lowerValidated, setLowerValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);

  const [passwordMatch, setPasswordMatch] = useState(false);

  const [allValidated, setAllValidated] = useState(false);
  const [emailExist, setEmailExist] = useState(false);

  //console.log('isValidPassword', setIsValidPassword);
  console.log('error message', errorMessage);
  console.log('allValidated', allValidated);
  //console.log('validated', validated);
  //console.log('setIsvalidated', setIsValidated);

  //   useEffect(() => {
  //     if (props.paramEmail) {
  //       setEmail(props.paramEmail);
  //     }
  //   }, [props.paramEmail]);

  const [values, setValues] = useState({
    email: '',
    password: '',
    confirm_password: '',
  });

  const handleEmailChange = (event) => {
    event.preventDefault();

    const emailRegExp = /^\S+@\S+\.com$/;
    const { value } = event.target;
    setValues({ ...values, email: value });

    if (!emailRegExp.test(value)) {
      setIsValidEmail(false);
      setErrorMessage(`Email address format is not correct.
	  Please enter the correct email address format`);
    } else {
      setIsValidEmail(true);
      setErrorMessage('');
    }
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();

    const { value } = event.target;
    setValues({ ...values, password: value });

    const upper = new RegExp('(?=.*[A-Z])');
    const lower = new RegExp('(?=.*[a-z])');
    const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!@#$%^&*])');
    const length = new RegExp('(?=.*[8,])');

    if (upper.test(value)) {
      setUpperValidated(true);
      setIsValidPassword(true);
    } else {
      setUpperValidated(false);
      setIsValidPassword(false);
    }

    if (lower.test(value)) {
      setLowerValidated(true);
      setIsValidPassword(true);
    } else {
      setLowerValidated(false);
      setIsValidPassword(false);
    }

    if (number.test(value)) {
      setNumberValidated(true);
      setIsValidPassword(true);
    } else {
      setNumberValidated(false);
      setIsValidPassword(false);

      if (special.test(value)) {
        setSpecialValidated(true);
        setIsValidPassword(true);
      } else {
        setSpecialValidated(false);
        setIsValidPassword(false);
      }

      if (length.test(value)) {
        setLengthValidated(true);
        setIsValidPassword(true);
      } else {
        setLengthValidated(false);
        setIsValidPassword(false);
      }
    }
  };

  //const handleEmailChange = ({ target: { value } }) => setEmail(value);
  //const handlePasswordChange = ({ target: { value } }) => setPassword(value);
  //   const handlePasswordConfirmChange = ({ target: { value } }) =>
  //     setPasswordConfirm(value);

  const handlePasswordConfirmChange = (event) => {
    event.preventDefault();
    setValues({ ...values, confirm_password: event.target.value });

    if (event.target.value !== values.password) {
      setErrorMessage('The password do not match');
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
      setErrorMessage('');
    }
  };

  useEffect(() => {
    if (isValidEmail && isValidPassword && passwordMatch) {
      setAllValidated(true);
    } else {
      setAllValidated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidEmail, isValidPassword, passwordMatch ]);

  //const handleFormChange = () => !isTouched && setIsTouched(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
	
    try { 
      const result = await props.onSubmitData(values.email, values.password);
      console.log('result is', result);

      if (result.length > 0) {
        setErrorMessage(result);
        setEmailExist(true);
        //setIsValidated(false);
      } else {
        setErrorMessage('');
        setEmailExist(false);
      }
    } catch (error) {
      console.log('Something went wrong');
      setErrorMessage('An unkown error occured');
    }
    setAllValidated(true);
  };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();

  //     const form = event.currentTarget;

  //     if (form.checkValidity()) {
  //       props.onSubmitData(values.email, values.password).catch((e) => {
  //         setErrorMessage(e.response.data.message);
  //       });
  //     } else {
  //       setErrorMessage();
  //     }

  //     setIsValidated(true);
  //   };

  return (
    <>
      <Form
        className='py-4'
        //onChange={handleFormChange}
        onSubmit={handleSubmit}
        noValidate
        //validated={validated}
      >
        {/* {errorMessage && (
          <MessageBar variant='error'>{errorMessage}</MessageBar>
        )} */}

        <FormEmailInput
          autoComplete='off'
          required
          onChange={handleEmailChange}
          //defaultValue={email}
          name='email'
          value={values.email}
          className={
            values.email.length == 0 || isValidEmail
              ? style.border
              : style.error
          }
        />
        <FormPasswordInput
          onChange={handlePasswordChange}
          required
          name='password'
          value={values.password}
          className={
            values.password.length == 0 || isValidPassword
              ? style.border
              : style.error
          }
        />
        <FormPasswordInput
          id='confirmPassword'
          label='Password Confirmation'
          name='confirm_password'
          value={values.confirm_password}
          onChange={handlePasswordConfirmChange}
          className={
            values.password.length == 0 || passwordMatch
              ? style.border
              : style.error
          }
          required
        />

        {/* <MessageBar variant='success'>
          <IconText title='English uppercase/lowercase characters' />
          <IconText title='Numbers (0-9)' />
          <IconText title='Minimum eight characters' />
        </MessageBar> */}

        <Button
          className='primary-btn w-100 my-3'
          type='submit'
          size='lg'
          variant='light'
        >
          Sign up
        </Button>

        {values.email.length > 0 && !isValidEmail && (
          <MessageBar variant='error' className={styles.error}>
            <span>{errorMessage}</span>
          </MessageBar>
        )}

        {values.email.length > 0 &&
          isValidEmail &&
          values.password.length > 0 && 
		values.confirm_password.length == 0 && (
          <>
            {values.password && (
              <MessageBar variant={isValidPassword ? 'success' : 'error'}>
                <IconText
                  status={upperValidated ? 'success' : 'error'}
                  title='English uppercase letters'
                />

                <IconText
                  status={lowerValidated ? 'success' : 'error'}
                  title='English lowercase letters'
                />

                <IconText
                  status={
                    specialValidated || numberValidated ? 'success' : 'error'
                  }
                  title='At least one number (0-9) or symbols'
                />

                <IconText
                  status={
                    (values.password.length > 8 && lengthValidated) ||
                      numberValidated
                      ? 'success'
                      : 'error'
                  }
                  title='Minimum 8 characters'
                />
              </MessageBar>
            )}
          </>
        )}

        {values.email.length > 0 &&
          isValidEmail &&
          values.password.length > 0 &&
          values.confirm_password.length !== 0 &&
          !passwordMatch && (
          <MessageBar variant='error' className={styles.error}>
            <span>{errorMessage}</span>
          </MessageBar>
        )} 

        {isValidEmail && 
		values.password.length > 0 &&
		values.confirm_password.length !== 0 && 
		emailExist && (
          <MessageBar variant='error' className={style.error}>
            {errorMessage}
          </MessageBar>
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
};
