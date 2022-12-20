import FromInput from "./FormInput";

/**
  RegExp: at least one symbol, uppercase letter, lowercase letter, number,
  min length 8 characters, max length 20 characters
*/
const passwordRegExp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$";

const FormPasswordInput = ({ 
  id = "password",
  name = "password", 
  label = "Password", 
  ...rest
}) => {
  const preventCopyPaste = (e) => e.preventDefault();

  return (
    <FromInput 
      id={id}
      label={label}
      name={name}
      minLength="8"
      maxLength="20"
      pattern={passwordRegExp}
      placeholder="********"
      type="password" 
      onCopy={preventCopyPaste}
      onPaste={preventCopyPaste}
      {...rest}
    />
  );
}

export default FormPasswordInput;
