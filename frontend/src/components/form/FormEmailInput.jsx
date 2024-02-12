import FromInput from './FormInput';

const FormEmailInput = (props) => (
  <FromInput
    id="email"
    label="Email"
    name="email"
    placeholder="example@email.com"
    type="email"
    // eslint-disable-next-line react/prop-types
    defaultValue={props.defaultValue}
    {...props}
  />
);

FormEmailInput.propTypes = {};

export default FormEmailInput;
