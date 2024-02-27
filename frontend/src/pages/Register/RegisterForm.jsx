/* eslint-disable no-console */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {
  GoogleLoginButton,
  FacebookLoginButton,
} from 'react-social-login-buttons';
import { LoginSocialGoogle, LoginSocialFacebook } from 'reactjs-social-login';

import styles from './Register.module.css';

import { loginSocial, loginFacebook } from '../../api';

import FormEmailInput from '../../components/form/FormEmailInput';
import FormPasswordInput from '../../components/form/FormPasswordInput';

// import IconText from '../../components/IconText';
import MessageBar from '../../components/MessageBar';
//import SocialButtonsGroup from '../../components/SocialButtonsGroup';

const DEFAULT_ERROR_MESSAGE =
  'You are using symbols in your passwords or your passwords do not match.';

export const RegisterForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [validated, setIsValidated] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [errMsg, setErrMsg] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (props.paramEmail) {
      setEmail(props.paramEmail);
    }
  }, [props.paramEmail]);

  const handleEmailChange = ({ target: { value } }) => setEmail(value);
  const handlePasswordChange = ({ target: { value } }) => setPassword(value);
  const handlePasswordConfirmChange = ({ target: { value } }) =>
    setPasswordConfirm(value);

  const handleFormChange = () => !isTouched && setIsTouched(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity()) {
      props.onSubmitData(email, password).catch((e) => {
        setErrorMessage(e.response.data.message);
      });
    } else {
      setErrorMessage(DEFAULT_ERROR_MESSAGE);
    }

    setIsValidated(true);
  };
  const loginfromGoogle = (response) => {
    loginSocial(response.data.access_token, response.data.email)
      .then((res) => {
        setSuccess(true);
        const user = JSON.stringify(res.data);
        localStorage.setItem('storedUser', user);
        window.location.href = '/member';
      })
      .catch(() => {
        setSuccess(false);
      });
  };

  const handleFacebookLoginSuccess = (response) => {
    loginFacebook(response.data.accessToken, response.data.userID)
      .then((res) => {
        setSuccess(true);
        const user = JSON.stringify(res.data);
        localStorage.setItem('storedUser', user);
        window.location.href = '/member';
      })
      .catch(() => {
        setSuccess(false);
        setErrMsg(
          `Your email address or password is incorrect. 
        Please try again, or click "Forgot your password"`
        );
      });
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
        {errorMessage && (
          <MessageBar variant="error">{errorMessage}</MessageBar>
        )}

        <FormEmailInput
          autoComplete="off"
          required
          onChange={handleEmailChange}
          defaultValue={email}
        />
        <FormPasswordInput onChange={handlePasswordChange} required />
        <FormPasswordInput
          id="confirmPassword"
          label="Password Confirmation"
          name="confirmPassword"
          onChange={handlePasswordConfirmChange}
          required
        />

        {/* <MessageBar variant='success'>
          <IconText title='English uppercase/lowercase characters' />
          <IconText title='Numbers (0-9)' />
          <IconText title='Minimum eight characters' />
        </MessageBar> */}

        <Button
          className="primary-btn w-100 my-5"
          type="submit"
          size="lg"
          variant="light"
        >
          Sign up
        </Button>

        <div className={styles.signUpText}>Or sign up with</div>
        <LoginSocialFacebook
          appId={process.env.APP_ID}
          onResolve={(response) => {
            handleFacebookLoginSuccess(response);
            console.log(response);
          }}
          onReject={(error) => {
            // handleFacebookLoginFailure(error);
            console.log(error);
          }}
        >
          <FacebookLoginButton />
          {/* <FacebookLoginButton onClick={() => alert('Hello')} /> */}
        </LoginSocialFacebook>
        <div> &nbsp; </div>
        <LoginSocialGoogle
          client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
          onResolve={loginfromGoogle}
          onReject={(err) => {
            setErrMsg(
              `You are not able to login with Google.
                   Please try again later`
            );
            console.log(err);
          }}
        >
          <GoogleLoginButton />
        </LoginSocialGoogle>
        {/*<SocialButtonsGroup />*/}
      </Form>
    </>
  );
};

export default RegisterForm;
RegisterForm.propTypes = {
  onSubmitData: PropTypes.func,
  email: PropTypes.string,
  paramEmail: PropTypes.string,
};
