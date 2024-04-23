import PropTypes from 'prop-types';

import FromInput from './FormInput';

const FormEmailInput = (props) => (
  < FromInput
    id="email"
    label="Email"
    name="email"
    placeholder="example@email.com"
    type="email"
    autoComplete="email"
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
