import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./styles.css";

import { register } from "../../api";
import FatherSonBlock from "../../components/FatherSonBlock";
import FormEmailInput from "../../components/form/FormEmailInput";
import FormPasswordInput from "../../components/form/FormPasswordInput";
import Header from "../../components/Header";
import MessageBar from "../../components/MessageBar";
import SocialButtonsGroup from "../../components/SocialButtonsGroup";
import TextLink from "../../components/TextLink";
// import IconText from "../../components/IconText";

const DEFAULT_ERROR_MESSAGE = "You are using symbols in your passwords or your passwords do not match.";

const HeaderLink = <TextLink title="Already a member?" to="/signin" linkTitle="Log in" />;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [validated, setIsValidated] = useState(false);

  const handleEmailChange = ({ target: { value }}) => setEmail(value);
  const handlePasswordChange = ({ target: { value }}) => setPassword(value);
  const handlePasswordConfirmChange = ({ target: { value }}) => setPasswordConfirm(value);

  const hendleFromChange = () => !isTouched && setIsTouched(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity()) {
      register({ email, password }).then((res) => {
        // need to store the user informatin in the session 
        const user = JSON.stringify(res.data);
        localStorage.setItem("storedUser", user); 
  
        // TODO: remove redirect. First we need to verify the account
        window.location.href = "/family";
      })
      .catch((e) => {
        console.log(e.response.data.message);
        setErrorMessage(e.response.data.message);
      });
    } else {
      setErrorMessage(DEFAULT_ERROR_MESSAGE)
    }

    setIsValidated(true);
  }


  return (
    <>
      <Header widget={HeaderLink}/>

      <Container className="content-layout py-4" >
        <FatherSonBlock>
          <h1 className="register-title">Sign up Kids First</h1>

          <Form
            className="py-4"
            onChange={hendleFromChange}
            onSubmit={handleSubmit}
            noValidate
            validated={validated}
          >
            {errorMessage && 
              <MessageBar variant="error">
                {errorMessage}
              </MessageBar>
            }

            <FormEmailInput 
              autocomplete="off"
              required
              onChange={handleEmailChange}
            />
            <FormPasswordInput onChange={handlePasswordChange} required/>
            <FormPasswordInput 
              id="confirmPassword"
              label="Password Confirmation"
              name="confirmPassword"
              onChange={handlePasswordConfirmChange} 
              required
            />

            {/* <MessageBar variant="success">
              <IconText title="English uppercase/lowercase characters"/>
              <IconText title="Numbers (0-9)"/>
              <IconText title="Minimum eight characters"/>
            </MessageBar> */}

            <Button className="primary-btn w-100 my-5" type="submit" size="lg" variant="light">
              Sign up
            </Button>

            <div className="sign-up-text">Or sign up with</div>
          
            <SocialButtonsGroup />
          </Form>
        </FatherSonBlock>
      </Container>
    </>
  );
};

export default Register;
