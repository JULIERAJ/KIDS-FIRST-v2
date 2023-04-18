import './Signin.css';
import { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import { login } from '../../api';
import FatherSonBlock from '../../components/FatherSonBlock';
import FormEmailInput from '../../components/form/FormEmailInput';
import FormPasswordInput from '../../components/form/FormPasswordInput';
import Header from '../../components/Header/Header';
import MessageBar from '../../components/MessageBar';
import SocialButtonsGroup from '../../components/SocialButtonsGroup';
import TextLink from '../../components/TextLink';

const HeaderLink = (
  <TextLink title='Not a member?' to='/register' linkTitle='Sign up' />
);

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState();
  const [EmailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  const emailRegExp = /^\S+@\S+\.\S+$/;
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    setSuccess(true);
  }, [email, password]);

  function validateEmailAndPassword() {
    let emailError = false;
    let passwordError = false;
	
    if (!emailRegExp.test(email)) {
      setErrMsg(`This account doesn't exist.
	  Please enter a different email address or try "Sign-Up".`);
      emailError = true;
    }

    if (!passwordRegExp.test(password)) {
      setErrMsg(`The password you entered is incorrect.
	  Please check the password terms:
      English uppercase or lowercase letters
      At leaset one number (0-9) or symboles
      Maximum 8 charecters
      and try again or use "Forget Password.`,);
      passwordError = true;
    }

    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      return false;
    }

    setEmailError(false);
    setPasswordError(false);
    return true;
  }

  function handleLogin(e) {
    e.preventDefault();

    const isEmailAndPasswordValid = validateEmailAndPassword();

    if (!isEmailAndPasswordValid) {
      return;
    }

    login(email, password)
      .then((res) => {
        setSuccess(true);
        const user = JSON.stringify(res.data);
        localStorage.setItem('storedUser', user);
        window.location.href = '/member';
      })
      .catch(() => {
        setSuccess(false);
      });
  }

  return (
    <>
      <Header widget={HeaderLink} />
      <Container className='content-layout py-4'>
        <FatherSonBlock>
          <Form className='py-4' onSubmit={handleLogin}>
            <h1 className='login-title'>Log in Kids First</h1>

            <FormEmailInput
              onChange={ handleEmailChange}
              value={email}
              required
            />

            <div className='checkbox mb-3'>
              <a className='btn forget-account' href='/forgetAccount'>
                Forgot your Account?
              </a>
            </div>
    
            <FormPasswordInput
              onChange={handlePasswordChange}
              value={password}
              required
            />
        
            <div className='checkbox mb-3'>
              <a className='btn forget-password' href='/forgetPassword'>
                Forgot your password?
              </a>
            </div>

            <Button
              className='primary-btn w-100 my-6'
              type='submit'
              size='lg'
              variant='light'>
              Log In
            </Button>

            {!success && EmailError? <MessageBar variant='error'>
              {errMsg}</MessageBar>: null}
            {/* {!success && <MessageBar variant='error'>{errMsg}</MessageBar>} */}
            {passwordError? <MessageBar variant='passerror'>{errMsg}</MessageBar> : null}

            <div className='or-login-with'>Or Log in with</div>
            <SocialButtonsGroup />
          </Form>
        </FatherSonBlock>
      </Container>
    </>
  );
}
