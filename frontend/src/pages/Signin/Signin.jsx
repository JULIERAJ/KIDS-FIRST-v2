import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import './Signin.css';

import { login } from '../../api';
import FatherSonBlock from '../../components/FatherSonBlock';
import FormEmailInput from '../../components/form/FormEmailInput';
import FormPasswordInput from '../../components/form/FormPasswordInput';
import Header from '../../components/Header/Header';
import MessageBar from '../../components/MessageBar';
import SocialButtonsGroup from '../../components/SocialButtonsGroup';
import TextLink from '../../components/TextLink';
import { EMAIL_REG_EXP } from '../../utils/index';

const HeaderLink = (
  <TextLink title='Not a member?' to='/register' linkTitle='Sign up' />
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
            setErrorMesasage(
              'This account doesn\'t exist. Please enter a different email address or try "Sign Up".'
            );
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

  return (
    <>
      <Header widget={HeaderLink} />
      <Container className='content-layout py-4'>
        <FatherSonBlock>
          <Form className='py-4' onSubmit={handleLogin}>
            <h1 className='login-title'>Log in Kids First</h1>

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

            <div className='checkbox'>
              <a className='btn forget-password' href='/forgot-password'>
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

            {errorMesasage &&
              <MessageBar variant='error'>{errorMesasage}</MessageBar>
            }
            <div className='or-login-with mt-4'>Or Log in with</div>
            <SocialButtonsGroup />
          </Form>
        </FatherSonBlock>
      </Container>
    </>
  );
}
