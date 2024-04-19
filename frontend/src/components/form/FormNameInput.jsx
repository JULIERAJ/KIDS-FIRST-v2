import PropTypes from 'prop-types';

import FormInput from './FormInput';

export const FormFirstNameInput = (props) => (
  <FormInput
    id='firstname'
    label='Firstname'
    name='FirstName'
    placeholder='First Name'
    type='text'
    defaultValue={props.defaultValue}
    isInvalid={!!props.errors}
    errorMessage={props.errors}
    {...props}
  />
);

FormFirstNameInput.propTypes = {
  defaultValue: PropTypes.string,
  errors: PropTypes.string,
};

export const FormLastNameInput = (props) => (
  <FormInput
    id='lastname'
    label='Lastname'
    name='LastName'
    placeholder='Last Name'
    type='text'
    defaultValue={props.defaultValue}
    isInvalid={!!props.errors}
    errorMessage={props.errors}
    {...props}
  />
);

FormLastNameInput.propTypes = {
  defaultValue: PropTypes.string,
  errors: PropTypes.string,
};
