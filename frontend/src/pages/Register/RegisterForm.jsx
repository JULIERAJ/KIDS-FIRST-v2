/* eslint-disable no-console */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

import styles from './Register.module.css';

import FormEmailInput from '../../components/form/FormEmailInput';
import FormPasswordInput from '../../components/form/FormPasswordInput';

// import IconText from '../../components/IconText';
import MessageBar from '../../components/MessageBar';
import SocialButtonsGroup from '../../components/SocialButtonsGroup';

const DEFAULT_ERROR_MESSAGE =
    'You are using symbols in your passwords or your passwords do not match.';

export const RegisterForm = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [validated, setIsValidated] = useState(false);

  const handleEmailChange = ({ target: { value } }) => setEmail(value);
  const handlePasswordChange = ({ target: { value } }) => setPassword(value);
  const handlePasswordConfirmChange = ({ target: { value } }) =>
    setPasswordConfirm(value);

  const handleFormChange = () => !isTouched && setIsTouched(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity()) {
      props.onSubmitData(email, password).catch((e) => {
        setErrorMessage(e.response.data.message);
      });
    } else {
      setErrorMessage(DEFAULT_ERROR_MESSAGE);
    }

    setIsValidated(true);
  };

  return (
    <>
      <Form
        className='py-4'
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        noValidate
        validated={validated}
      >
        {errorMessage && (
          <MessageBar variant='error'>{errorMessage}</MessageBar>
        )}

        <FormEmailInput
          autoComplete='off'
          required
          onChange={handleEmailChange}
        />
        <FormPasswordInput onChange={handlePasswordChange} required />
        <FormPasswordInput
          id='confirmPassword'
          label='Password Confirmation'
          name='confirmPassword'
          onChange={handlePasswordConfirmChange}
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

        <div className={styles.signUpText}>Or sign up with</div>

        <SocialButtonsGroup />
      </Form>
    </>
  );
};

export default RegisterForm;
RegisterForm.propTypes = {
  onSubmitData: PropTypes.func,
};
