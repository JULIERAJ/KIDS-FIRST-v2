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
    {...props}
  />
);

FormEmailInput.propTypes = {
  defaultValue: PropTypes.string,
};

export default FormEmailInput;
