import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';

import './Signin.css';

import { login, loginFacebook, loginSocial } from '../../api';
import FatherSonBlock from '../../components/FatherSonBlock';
import FormEmailInput from '../../components/form/FormEmailInput';
import FormPasswordInput from '../../components/form/FormPasswordInput';
import Header from '../../components/Header/Header';
import MessageBar from '../../components/MessageBar';
import TextLink from '../../components/TextLink';
import facebookIcon from '../../media/icons/facebook.png';
import googleIcon from '../../media/icons/google.png';
import { EMAIL_REG_EXP } from '../../utils/index';

const HeaderLink = (
  <TextLink title="Not a member?" to="/register" linkTitle="Sign up" />
);

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMesasage, setErrorMesasage] = useState('');
  const [isEmailCorrect, setIsEmailCorrect] = useState();

  function handleLogin(e) {
    e.preventDefault();

    if(isEmailCorrect) {
      login(email, password)
        .then((res) => {
          const user = JSON.stringify(res.data);

          localStorage.setItem('storedUser', user);
          window.location.href = '/member';
        })
        .catch(({ response }) => {
          if(response.status === 404) {
            setErrorMesasage('This account doesn\'t exist. Please enter a different email address or try "Sign Up".');
          } if(response.status === 401) {
            setErrorMesasage('Incorrect email or password! Please try again or use "Change Password".');
          }
        });
    }
  }

  const handleEmailInputBlure = () => {
    if(email !== '') {
      const isCorrectEmail = EMAIL_REG_EXP.test(email);

      setIsEmailCorrect(isCorrectEmail);
      
      if(!isCorrectEmail) {
        setErrorMesasage('Email address format is not correct. Please enter the valid email address format.');
      }
    }
  };

  const handleFacebookLoginSuccess = (response) => {
    loginFacebook(response.data.accessToken, response.data.userID)
      .then((res) => {
        const user = JSON.stringify(res.data);
        localStorage.setItem('storedUser', user);
        window.location.href = '/member';
      })
      .catch(() => {
        setErrorMesasage(
          'Your email address or password is incorrect. Please try again, or click "Forgot your password"'
        );
      });
  };

  const loginfromGoogle = (response) => {
    loginSocial(response.data.access_token, response.data.email)
      .then((res) => {
        const user = JSON.stringify(res.data);
        
        localStorage.setItem('storedUser', user);
        window.location.href = '/member';
        console.groupCollapsed(response.data);
      })
      .catch(() => {
        setErrorMesasage('Log-in unsuccessful. Please try again later, or sign-up.');
      });
  };

  return (
    <>
      <Header widget={HeaderLink} />
      <Container className="content-layout py-4">
        <FatherSonBlock>
          <Form className="py-4" onSubmit={handleLogin}>
            <h1 className="login-title">Log in Kids First</h1>

            <FormEmailInput
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailInputBlure}
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
              className='primary-btn w-100 my-3'
              type='submit'
              size='lg'
              variant='light'>
              Log In
            </Button>

            {errorMesasage && <MessageBar variant="error mt-3 mb-5">{errorMesasage}</MessageBar>}

            <div className="or-login-with">Or Log in with</div>

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
