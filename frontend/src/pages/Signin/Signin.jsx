import { useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';

import { NavLink } from 'react-router-dom';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';

import styles from './Sigin.module.css';

import { login, loginFacebook, loginSocial } from '../../api';
import FormEmailInput from '../../components/form/FormEmailInput';
import FormPasswordInput from '../../components/form/FormPasswordInput';
import Header from '../../components/Header';
// import TextLink from '../../components/TextLink';
import facebookIcon from '../../media/icons/facebook.png';
import googleIcon from '../../media/icons/google.png';
import { EMAIL_REG_EXP } from '../../utils/index';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMesasage, setErrorMesasage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [emailError, setEmailError] = useState('');
  const [showTextPassword, setShowTextPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMesasage('');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);

    if (validateEmail) {
      login(email, password)
        .then((res) => {
          const user = JSON.stringify(res.data);
          if (rememberMe) {
            localStorage.setItem('storedUser', user);
          } else {
            sessionStorage.setItem('storedUser', user);
          }
          window.location.href = '/dashboard';
        })
        .catch(({ response }) => {
          if (response.status === 404) {
            setErrorMesasage(
              'This account doesn\'t exist. Please enter a different email address or try "Sign Up".'
            );
          } else if (response.status === 401) {
            setErrorMesasage('Invalid password or email address');
          } else {
            setErrorMesasage(
              'An unknown error occurred. Please try again later.'
            );
          }
        });
    }
  };
  // Function to validate email format
  const validateEmail = (emailValue) => {
    return EMAIL_REG_EXP.test(emailValue);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // setShowTextPassword('');
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
        setErrorMesasage(
          'Log-in unsuccessful. Please try again later, or sign-up.'
        );
      });
  };

  return (
    <>
      <div className={styles.page}>
        <Header />
        <Container className={styles.page__window}>
          <div>
            <Row>
              <Col
                className={`d-flex justify-content-center align-items-center ${styles.page__wrapper}`}
              >
                <div>
                  <h2 className={styles.login__title}>
                    Welcome back to Kids First{' '}
                  </h2>
                  <Form className='py-4' onSubmit={handleLogin} noValidate>
                    <FormEmailInput
                      autoComplete='off'
                      required
                      onChange={handleEmailChange}
                      defaultValue={email}
                      isInvalid={emailError}
                      errors={emailError}
                      labelClassName={styles.emailLabel}
                    />

                    <FormPasswordInput
                      required
                      type={showPassword ? 'text' : 'password'} // Toggle password visibility
                      value={password}
                      onChange={handlePasswordChange}
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                      errors={errorMesasage}
                      labelClassName={styles.PasswordLabel}
                      showTextPassword={showTextPassword}
                    />
                    <div className={styles.checkboxContainer}>
                      <div>
                        <input
                          className={styles.checkboxInput}
                          type='checkbox'
                          value='remember-me'
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label className={styles.checkboxLabel}>
                          {' '}
                          Remember me
                        </label>
                      </div>
                      <div>
                        <a
                          className={`btn ${styles.forget__password}`}
                          href='/forgot-password'
                        >
                          Forgot your password?
                        </a>
                      </div>
                    </div>
                    <Button
                      className={`primary-btn w-100 my-3 ${styles.customButton}`}
                      type='submit'
                      size='lg'
                      variant='light'
                    >
                      Log In
                    </Button>
                    <div className={styles.orDivider}>
                      <span className={styles.dashLine}></span>
                      <span className={`${styles.orText}`}>Or</span>
                      <span className={styles.dashLine}></span>
                    </div>

                    <Row className={styles.socialButton}>
                      <Col xs={12} md={6}>
                        <LoginSocialGoogle
                          client_id={
                            process.env.REACT_APP_GOOGLE_CLIENT_ID || ''
                          }
                          onResolve={loginfromGoogle}
                          onReject={(err) => {
                            console.log(err);
                          }}
                        >
                          <GoogleLoginButton
                            title='Google'
                            align={'center'}
                            icon={''}
                            size='45px'
                            className='tertiary-btn w-100'
                          >
                            <img
                              src={googleIcon}
                              width='25'
                              height='25'
                              alt=''
                            />{' '}
                            Google
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
                          <FacebookLoginButton
                            title='Facebook'
                            align={'center'}
                            icon={''}
                            size='45px'
                            className='tertiary-btn w-100'
                          >
                            <img
                              src={facebookIcon}
                              width='25'
                              height='25'
                              alt=''
                            />{' '}
                            Facebook
                          </FacebookLoginButton>
                        </LoginSocialFacebook>
                      </Col>
                    </Row>
                    <Row className='justify-content-center'>
                      <div className={styles.alreadyMember}>
                        Not a member?
                        <NavLink className={styles.registerLink} to='/register'>
                          Sign up
                        </NavLink>
                      </div>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}
