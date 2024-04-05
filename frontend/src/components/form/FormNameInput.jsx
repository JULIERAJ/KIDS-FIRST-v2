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
    {...props}
  />
);

FormFirstNameInput.propTypes = {
  defaultValue: PropTypes.string,
};

export const FormLastNameInput = (props) => (
  <FormInput
    id='lastname'
    label='Lastname'
    name='LastName'
    placeholder='Last Name'
    type='text'
    defaultValue={props.defaultValue}
    {...props}
  />
);

FormLastNameInput.propTypes = {
  defaultValue: PropTypes.string,
};
