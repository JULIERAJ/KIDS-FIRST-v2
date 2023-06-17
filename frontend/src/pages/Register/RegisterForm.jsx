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

const DEFAULT_ERROR_MESSAGE = `The format of your email address is not correct.
  Please enter the correct email address. `;

export const RegisterForm = (props) => {
  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  //const [passwordConfirm, setPasswordConfirm] = useState('');

  //const [isTouched, setIsTouched] = useState(false);
  const [validated, setIsValidated] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setIsSubmitted] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [values, setValues] = useState({
    email: '',
    password: '',
    confirm_password: '',
  });

  //   const handleEmailChange = (event) => {
  //     const { value } = event.target;
  //     setEmail(value);
  //   };
  //   const handleEmailChange = (event) => {
  //     setValues({ ...values, email: event.target.value });
  //   };

  const handleEmailChange = (event) => {
    const emailRegExp = /^\S+@\S+\.\S+$/;
    const { value } = event.target;

    if (!emailRegExp.test(value)) {
      setValues({ ...values, email: value });
      setIsValidEmail(false);
    } else {
      setValues({ ...values, email: value });
      setIsValidEmail(true);
    }
  };

  //   const handlePasswordChange = (event) => {
  //     const { value } = event.target;
  //     setIsPasswordValid(value);
  //     setPassword(value);
  //     checkPasswordValidity(value);
  //   };
  const [upperValidated, setUpperValidated] = useState(false);
  const [lowerValidated, setLowerValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);

  const handlePasswordChange = (event) => {
    const upper = new RegExp('(?=.*[A-Z])');
    const lower = new RegExp('(?=.*[a-z])');
    const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!@#$%^&*])');

    const { value } = event.target;

    if (upper.test(value)) {
      setUpperValidated(true);
      setIsPasswordValid(true);
      setValues({ ...values, password: value });
    } else {
      setUpperValidated(false);
      setIsPasswordValid(false);
    }

    if (lower.test(value)) {
      setLowerValidated(true);
      setIsPasswordValid(true);
      setValues({ ...values, password: value });
    } else {
      setLowerValidated(false);
      setIsPasswordValid(false);
    }

    if (number.test(value)) {
      setNumberValidated(true);
      setIsPasswordValid(true);
      setValues({ ...values, password: value });
    } else {
      setNumberValidated(false);
      setIsPasswordValid(false);
    }

    if (special.test(value)) {
      setSpecialValidated(true);
      setIsPasswordValid(true);
      setValues({ ...values, password: value });
    } else {
      setSpecialValidated(false);
      setIsPasswordValid(false);
    }
  };

  //   const [upperValidated, setUpperValidated] = useState(false);
  //   const [lowerValidated, setLowerValidated] = useState(false);
  //   const [numberValidated, setNumberValidated] = useState(false);
  //   const [specialValidated, setSpecialValidated] = useState(false);

  //   const handlePasswordChange = (event) => {
  //     setValues({ ...values, password: event.target.value });

  //     const upper = new RegExp('(?=.*[A-Z])');
  //     const lower = new RegExp('(?=.*[a-z])');
  //     const number = new RegExp('(?=.*[0-9])');
  //     const special = new RegExp('(?=.*[!@#$%^&*])');

  //     if (upper.test(values)) {
  //       setUpperValidated(true);
  //     } else {
  //       setUpperValidated(false);
  //     }

  //     if (lower.test(values)) {
  //       setLowerValidated(true);
  //     } else {
  //       setLowerValidated(false);
  //     }

  //     if (number.test(values)) {
  //       setNumberValidated(true);
  //     } else {
  //       setNumberValidated(false);
  //     }

  //     if (special.test(values)) {
  //       setSpecialValidated(true);
  //     } else {
  //       setSpecialValidated(false);
  //     }
  //   };

  //   const handleConfirmPasswordChange = (event) => {
  //     setPasswordConfirm(event.target.value);
  //   };

  const handleConfirmPasswordChange = (event) => {
    setValues({ ...values, confirm_password: event.target.value });
  };

  //   const emailRegExp = /^\S+@\S+\.\S+$/;
  //   const isValidEmail = emailRegExp.test(email);
  //   const passwordRegExp =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  //   const isPaswordValid = passwordRegExp.test(password);

  //validate password new method

  //   const checkPasswordValidity = (value) => {

  //   };

  //const handleFormChange = () => !isTouched && setIsTouched(true);

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     if (isValidEmail && isPaswordValid) {
  //       props.onSubmitData(email, password).catch((e) => {
  //         setErrorMessage(e.response.data.message);
  //       });
  //     } else {
  //       setIsValidated(false);
  //     }
  //     setIsValidated(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      values.email &&
      values.password &&
      values.password === values.confirm_password
    ) {
      setIsValidated(true);
      props.onSubmitData(values.email, values.password).catch((e) => {
        setErrorMessage(e.response.data.message);
      });
    } else {
      setIsValidated(false);
      setIsSubmitted(false);
    }
    setIsValidated(true);
    setIsSubmitted(true);

    // }
    //setIsValidated(true);
    //const form = event.currentTarget;

    // if (form.checkValidity()) {
    //   setIsValidated(true);
    //   props.onSubmitData(email, password).catch((e) => {
    //     setErrorMessage(e.response.data.message);
    //   });
    // } else {
    //   setIsValidated(false);
    // }
    //setIsValidated(true);
  };

  return (
    <>
      <Form
        className='py-4'
        //onChange={handleFormChange}
        onSubmit={handleSubmit}
        noValidate
        //validated={validated}
      >
        <FormEmailInput
          autoComplete='off'
          required
          onChange={handleEmailChange}
          name='email'
          value={values.email}
          //className={!isValidEmail ? style.error : ''}
          className={submitted && !isValidEmail ? style.error : ''}
        />
        <FormPasswordInput
          required
          onChange={handlePasswordChange}
          name='password'
          value={values.password}
          //className={!isPaswordValid ? style.error : ''}
          className={
            submitted && isValidEmail && !values.password ? style.error : ''
          }
        />

        <FormPasswordInput
          id='confirmPassword'
          label='Password Confirmation'
          name='confirm_password'
          value={values.confirm_password}
          onChange={handleConfirmPasswordChange}
          //className={!isPaswordValid ? style.error : ''}
          className={
            submitted && isValidEmail && !values.confirm_password
              ? style.error
              : ''
          }
          required
        />

        {/* <MessageBar variant='success'>
          <IconText title='English uppercase/lowercase characters' />
          <IconText title='Numbers (0-9)' />
          <IconText title='Minimum eight characters' />
        </MessageBar>  */}

        <Button
          className='primary-btn w-100 my-5'
          //className={`primary-btn w-100 my-3 ${style.margin}`}
          type='submit'
          size='lg'
          variant='light'
        >
          Sign up
        </Button>

        {/* {email !== '' && !isValidEmail && (
          <MessageBar variant='error' className={style.error}>
            {errorMessage ? (
              <span>{''}</span>
            ) : (
              <span>{DEFAULT_ERROR_MESSAGE}</span>
            )}
          </MessageBar>
        )} */}

        {submitted && validated && !isValidEmail && (
          <MessageBar variant='error' className={style.error}>
            {errorMessage ? (
              <span>{''}</span>
            ) : (
              <span>{DEFAULT_ERROR_MESSAGE}</span>
            )}
          </MessageBar>
        )}

        {submitted && isValidEmail && (
          <>
            {!isPasswordValid && (
              <MessageBar
                variant={
                  upperValidated &&
                  lowerValidated &&
                  numberValidated &&
                  specialValidated
                    ? 'success'
                    : 'error'
                }
              >
                {upperValidated ? (
                  <IconText
                    status='success'
                    title='English uppercase letters'
                  />
                ) : (
                  <IconText status='error' title='English uppercase letters' />
                )}

                {lowerValidated ? (
                  <IconText
                    status='success'
                    title='English lowercase letters'
                  />
                ) : (
                  <IconText status='error' title='English lowercase letters' />
                )}

                {numberValidated ? (
                  <IconText
                    status='success'
                    title='Atleast one numbers (0-9) or symbols'
                  />
                ) : (
                  <IconText
                    status='error'
                    title='Atleast one numbers (0-9) or symbols'
                  />
                )}

                {specialValidated ? (
                  <IconText status='success' title='Minimum 8 characters' />
                ) : (
                  <IconText status='error' title='Minimum 8 characters' />
                )}
              </MessageBar>
            )}
          </>
        )}

        {/* {errorMessage && (
          <MessageBar variant='error'>{errorMessage}</MessageBar>
        )} */}

        {!isValidEmail ? (
          <div className={styles.signUpText}>Or sign up with</div>
        ) : (
          ''
        )}

        {/* {!isValidEmail ? <div className={styles.signUpText}>
		Or sign up with</div> : ''} */}

        {/* <div className={styles.signUpText}>Or sign up with</div> */}

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
