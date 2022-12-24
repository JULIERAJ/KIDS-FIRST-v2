import FromInput from './FormInput';

const FormEmailInput = (props) => (
  <FromInput 
    id="email"
    label="Email"
    name="email"
    placeholder="example@email.com"
    type="email"
    {...props}
  />
);

FormEmailInput.propTypes = {};

export default FormEmailInput;
