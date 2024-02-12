/* eslint-disable no-console */
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";

import styles from "./Register.module.css";

import FormEmailInput from "../../components/form/FormEmailInput";
import FormPasswordInput from "../../components/form/FormPasswordInput";

import IconText from "../../components/IconText";
import MessageBar from "../../components/MessageBar";
import SocialButtonsGroup from "../../components/SocialButtonsGroup";

// const DEFAULT_ERROR_MESSAGE =
//     'You are using symbols in your passwords or your passwords do not match.';

export const RegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [validated, setIsValidated] = useState(false);
  const [emailValidation, setEmailValidation] = useState(null);
  useEffect(() => {
    if (props.paramEmail) {
      setEmail(props.paramEmail);
    }

    if (props.errorMessage) {
      setErrorMessage(props.errorMessage);
    }
  }, [props.paramEmail, props.errorMessage]);

  const handleEmailChange = ({ target: { value } }) => setEmail(value);
  const handlePasswordChange = ({ target: { value } }) => setPassword(value);
  const handlePasswordConfirmChange = ({ target: { value } }) =>
    setPasswordConfirm(value);

  const handleFormChange = () => !isTouched && setIsTouched(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    // email check
    if (emailValidation !== "valid") {
      setErrorMessage(
        <div>
          Email address format is not correct. <br />
          Please enter the valid email address format
        </div>
      );
      return;
    }

    //added for checking passwords match
    //tested
    if (password !== passwordConfirm) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // const form = event.currentTarget;
    props.onSubmitData(email, password);
    // if (form.checkValidity()) {
    //   props.onSubmitData(email, password)
    //     // .then(() => {
    //     //   console.log('success');
    //     //   setErrorMessage('');
    //     // })
    //     .catch((e) => {
    //       setErrorMessage(e.response.data.message);
    //       console.log(errorMessage);
    //     });
    // } else {
    //   setErrorMessage(DEFAULT_ERROR_MESSAGE);
    // }

    setIsValidated(true);
  };
  const handleEmailValidation = (emailValue) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    setEmailValidation(isValidEmail ? "valid" : "invalid");
  };

  const handleInputChange = (event) => {
    const emailValue = event.target.value;
    // onChange(event);
    handleEmailChange(event);
    handleEmailValidation(emailValue);
  };
  return (
    <>
      <Form
        className="py-4"
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        noValidate
        validated={validated}
      >
        <FormEmailInput
          autoComplete="off"
          required
          // onChange={handleEmailChange}
          onChange={handleInputChange}
          defaultValue={email}
          isInvalid={emailValidation === "invalid"}
          isValid={emailValidation === "valid"}
        />
        <FormPasswordInput onChange={handlePasswordChange} required />
        <FormPasswordInput
          id="confirmPassword"
          label="Password Confirmation"
          name="confirmPassword"
          onChange={handlePasswordConfirmChange}
          required
        />
        {errorMessage && (
          <MessageBar variant="error">{errorMessage}</MessageBar>
        )}
        {!errorMessage && (
          <MessageBar variant="success">
            <IconText title="English uppercase letters" />
            <IconText title="English lowercase letters" />
            <IconText title="At least one number (0-9) or symbols" />
            <IconText title="Minimum 8 characters" />
          </MessageBar>
        )}
        <Button
          className="primary-btn w-100 my-5"
          type="submit"
          size="lg"
          variant="light"
        >
          Sign up
        </Button>

        <div className={styles.signUpText}>Or sign up with</div>

        <SocialButtonsGroup />
      </Form>
    </>
  );
};

export default RegisterForm;
RegisterForm.propTypes = {
  onSubmitData: PropTypes.func,
  email: PropTypes.string,
  paramEmail: PropTypes.string,
  errorMessage: PropTypes.string,
};
