/* eslint-disable no-console */
import './Signin.css';
import { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';

import { login, loginFacebook, loginSocial } from '../../api';
import FatherSonBlock from '../../components/FatherSonBlock';
import FormEmailInput from '../../components/form/FormEmailInput';
import FormPasswordInput from '../../components/form/FormPasswordInput';
import Header from '../../components/Header/Header';
import MessageBar from '../../components/MessageBar';
import TextLink from '../../components/TextLink';
import facebookIcon from '../../media/icons/facebook.png';
import googleIcon from '../../media/icons/google.png';

const HeaderLink = (
  <TextLink title="Not a member?" to="/register" linkTitle="Sign up" />
);

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState();
  const [errMsgSocial, setErrMsgSocial] = useState('');
  const [successSo, setSuccessSo] = useState(true);

  useEffect(() => {
    setSuccess(true);
  }, [email, password]);

  function handleLogin(e) {
    e.preventDefault();

    login(email, password)
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
  }

  const handleFacebookLoginSuccess = (response) => {
    loginFacebook(response.data.accessToken, response.data.userID)
      .then((res) => {
        setSuccess(true);
        const user = JSON.stringify(res.data);
        localStorage.setItem('storedUser', user);
        window.location.href = '/member';
      })
      .catch(() => {
        setSuccessSo(false);
        setErrMsgSocial('Log-in unsuccessful. Please try again later, or sign-up.');
      });
  };

  const loginfromGoogle = (response) => {
    loginSocial(response.data.access_token, response.data.email)
      .then((res) => {
        setSuccessSo(true);
        const user = JSON.stringify(res.data);
        localStorage.setItem('storedUser', user);
        window.location.href = '/member';
        console.groupCollapsed(response.data);
      })
      .catch(() => {
        setSuccessSo(false);
        setErrMsgSocial('Log-in unsuccessful. Please try again later, or sign-up.');
      });
  };

  return (
    <>
      <Header widget={HeaderLink} />
      <Container className="content-layout py-4">
        <FatherSonBlock>
          <Form className="py-4" onSubmit={handleLogin}>
            <h1 className="login-title">Log in Kids First</h1>

            {!success && <MessageBar variant="error">{errMsg}</MessageBar>}

            <FormEmailInput
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <FormPasswordInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />

            <div className="checkbox mb-3">
              <a className="btn forget-password" href="/forgot-password">
                Forgot your password?
              </a>
            </div>

            <Button
              className="primary-btn w-100 my-5"
              type="submit"
              size="lg"
              variant="light"
            >
              Log In
            </Button>

            <div className="or-login-with">Or Log in with</div>
            {!successSo && <MessageBar variant="error">{errMsgSocial}</MessageBar>}

            <Row className="py-5">
              <Col xs={12} md={6}>
                <LoginSocialGoogle
                  client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
                  onResolve={loginfromGoogle}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <GoogleLoginButton title="Google" align={'center'} icon={''} size='45px'
                    className="tertiary-btn w-100">
                    <img src={googleIcon} width="25" height="25" alt="" />{' '}Google
                  </GoogleLoginButton>
                </LoginSocialGoogle>
              </Col>
              <Col xs={12} md={6}>
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
                  <FacebookLoginButton title="Facebook" align={'center'} icon={''} size='45px'
                    className="tertiary-btn w-100">
                    <img src={facebookIcon} width="25" height="25" alt="" /> {' '}Facebook
                  </FacebookLoginButton>
                </LoginSocialFacebook>
              </Col>
            </Row>
          </Form>
        </FatherSonBlock>
      </Container>
    </>
  );
}
