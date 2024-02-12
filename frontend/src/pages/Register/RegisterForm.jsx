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

const DEFAULT_ERROR_MESSAGE =
    'You are using symbols in your passwords or your passwords do not match.';

export const RegisterForm = (props) => {

  console.log(props);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [validated, setIsValidated] = useState(false);

  // check password requirements
  const [requirementsMet, setRequirementsMet] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    match: false
  });

  const passwordRequirements = {
    length: /^(.){8,25}$/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /[0-9]/,
    special: /[@$!%*?^&]/,
    match: /./ // checked separately without regex
  };

  useEffect(() => {
    if (props.paramEmail) {
      setEmail(props.paramEmail);
    }
  }, [props.paramEmail]);

  const handleEmailChange = ({ target: { value } }) => setEmail(value);

  // check password requirements
  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);

    const newRequirementsMet = { ...requirementsMet };
    for (const [requirement, regex] of Object.entries(passwordRequirements)) {
      newRequirementsMet[requirement] = regex.test(value);
    }
    newRequirementsMet.match = value === passwordConfirm;
    setRequirementsMet(newRequirementsMet);
  };
  const allRequirementsMet = Object.values(requirementsMet).every(Boolean);

  const handlePasswordConfirmChange = ({ target: { value } }) => {
    setPasswordConfirm(value);

    const newRequirementsMet = { ...requirementsMet };
    newRequirementsMet.match = password === value;
    setRequirementsMet(newRequirementsMet);
  };

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
          defaultValue={email}
          
        />
        <FormPasswordInput onChange={handlePasswordChange} required />
        <FormPasswordInput
          id='confirmPassword'
          label='Password Confirmation'
          name='confirmPassword'
          onChange={handlePasswordConfirmChange}
          required
        />

        <Form.Check 
          type="checkbox" 
          label="Show Password" 
          onClick={(event) => {
            const passwordField = document.getElementById('password');
            const confirmPasswordField = document.getElementById('confirmPassword');
            if (event.target.checked) {
              passwordField.type = 'text';
              confirmPasswordField.type = 'text';
            } else {
              passwordField.type = 'password';
              confirmPasswordField.type = 'password';
            }
          }}
        />

        <MessageBar variant={allRequirementsMet ? 'success' : 'error'}>
          <IconText title='At least 1 uppercase character' clear={requirementsMet.uppercase} />
          <IconText title='At least 1 lowercase character' clear={requirementsMet.lowercase} />
          <IconText title='At least 1 number' clear={requirementsMet.number} />
          <IconText title='At least 1 special character ()' clear={requirementsMet.special} />
          <IconText title='Between 8-25 characters' clear={requirementsMet.length} />
          <IconText title='Passwords must match' clear={requirementsMet.match} />
        </MessageBar>

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
  email: PropTypes.string,
  paramEmail: PropTypes.string
};
