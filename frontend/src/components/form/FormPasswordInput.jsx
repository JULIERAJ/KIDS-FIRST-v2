import FromInput from "./FormInput";

//TODO 
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;

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
      // pattern={passwordRegExp}
      type="password" 
      {...rest}
      onCopy={preventCopyPaste}
      onPaste={preventCopyPaste}
    />
  );
}

export default FormPasswordInput;
