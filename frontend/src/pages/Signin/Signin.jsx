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
import style from '../../pages/Register/RegisterForm.module.css';

const HeaderLink = (
  <TextLink title='Not a member?' to='/register' linkTitle='Sign up' />
);

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState();
  const [attemptRemaining, setAttemptRemaining]= useState(3);

  //  Email Validation
  const handleEmailChange = (event) => {
    event.preventDefault();

    const emailRegExp = /^\S+@\S+\.com$/;
    const { value } = event.target;
    setEmail(value);

    if (!emailRegExp.test(value)) {
      setErrMsg(`Email address format is not correct.
		 Please enter the valid address format`);
      setIsValidEmail(false);
    } else {
      setErrMsg('');
      setIsValidEmail(true);
    }
  };

  //Password Validation
  const handlePasswordChange = (event) => {
    event.preventDefault();

    const passwordRegExp =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    const { value } = event.target;
    setPassword(value);

    if (!passwordRegExp.test(value)) {
      setErrMsg(`Incorrect Password! 
	  Please try again or use "Change Password".`);
      setIsValidPassword(false);
    } else {
      setErrMsg('');
      setIsValidPassword(true);
    }
  };

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
        // setErrMsg(
        //   `Your email address or password is incorrect. 
        //   Please try again, or click "Forgot your password"`,
        // );

        setAttemptRemaining((prevAttempts) => prevAttempts - 1);
        if (attemptRemaining === 1) {
          setErrMsg(
            <>
               Attempts remaining: 3 <br/> 
				Warning After 5 consecutive unsuccessful login <br/>
				attempts, your account will be locked.<br/>
            </>
          );
        }
      });
  }

  return (
    <>
      <Header widget={HeaderLink} />
      <Container className='content-layout py-4'>
        <FatherSonBlock>
          <Form className='py-4' onSubmit={handleLogin}>
            <h1 className='login-title'>Log in Kids First</h1>

            {/* {!success && <MessageBar variant='error'>{errMsg}</MessageBar>} */}

            <FormEmailInput
              //onChange={(e) => setEmail(e.target.value)}
              onChange={handleEmailChange}
              value={email}
              className={
                email.length == 0 || isValidEmail ? style.border : style.error
              }
              required
            />

            <FormPasswordInput
              //onChange={(e) => setPassword(e.target.value)}
              onChange={handlePasswordChange}
              value={password}
              className={
                password.length == 0 || isValidPassword
                  ? style.border
                  : style.error
              }
              required
            />

            <div className='checkbox mb-3'>
              <a className='btn forget-password' href='/forgetPassword'>
                Forgot your password?
              </a>
            </div>

            <Button
              className='primary-btn w-100 my-5'
              type='submit'
              size='lg'
              variant='light'>
              Log In
            </Button>

            {email.length > 0 && !isValidEmail && (
              <MessageBar variant='error' className={style.error}>
                {errMsg}
              </MessageBar>
            )}

            {isValidEmail &&
              email.length > 0 &&
              password.length > 0 &&
              (!isValidPassword || attemptRemaining >= 3) &&
            !success ? (
                <MessageBar variant='error' className={style.error}>
                  {errMsg}
                </MessageBar>
              ) : null}

            <div className='or-login-with'>Or Log in with</div>
            <SocialButtonsGroup />
          </Form>
        </FatherSonBlock>
      </Container>
    </>
  );
}
