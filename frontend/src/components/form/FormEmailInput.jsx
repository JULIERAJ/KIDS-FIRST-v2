import React from 'react';

import FromInput from './FormInput';

const FormEmailInput = (props) => (
  <FromInput 
    id="email"
    label="Email Address"
    name="email"
    placeholder="name@mail.com"
    type="email"
    value='email'
    {...props}
  />
);

FormEmailInput.propTypes = {};

export default FormEmailInput;
