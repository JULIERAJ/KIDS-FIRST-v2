import PropTypes from 'prop-types';

import FormInput from './FormInput';

const FormEmailInput = (props) => (
  <FormInput
    id='email'
    label='Email'
    name='email'
    placeholder='user@mail.com'
    type='email'
    autoComplete='email'
    defaultValue={props.defaultValue}
    isInvalid={!!props.errors}
    errorMessage={props.errors}
    {...props}
  />
);

FormEmailInput.propTypes = {
  defaultValue: PropTypes.string,
  errors: PropTypes.string,
};

export default FormEmailInput;
