import React from 'react';

import FromInput from './FormInput';

import style from '../../pages/Register/RegisterForm.module.css';

const email = '';
const isValidEmail = '';

const FormEmailInput = (props) => (
  <FromInput
    id='email'
    // label='Email Address'
    label={
      <span className={email !== '' && !isValidEmail ? style.errorLabel : ''}>
        Email Address
      </span>
    }
    className={
      email !== '' && !isValidEmail ? `${style.error} ${style.errorLabel}` : ''
    }
    name='email'
    placeholder='name@mail.com'
    type='email'
    value='email'
    {...props}
  />
);

FormEmailInput.propTypes = {};

export default FormEmailInput;
