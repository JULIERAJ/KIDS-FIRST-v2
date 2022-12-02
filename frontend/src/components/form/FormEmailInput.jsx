import FromInput from "./FormInput";

const FormEmailInput = (props) => 
  <FromInput 
    id="email"
    label="Email"
    name="email"
    type="email"
    {...props}
  />;

export default FormEmailInput;
