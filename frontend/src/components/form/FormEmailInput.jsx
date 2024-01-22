import React from 'react';

import FromInput from './FormInput';

import '../MessageBar/styles.css';

const FormEmailInput = (props) => (

  <FromInput
    id='email'
    label='Email Address' 
    name='email'
    placeholder='name@mail.com'
    type='email'
    {...props}
  />
);

FormEmailInput.propTypes = {};

export default FormEmailInput;
