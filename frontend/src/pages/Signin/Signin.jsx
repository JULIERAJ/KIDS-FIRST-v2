import './Signin.css';
import { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import { login } from '../../api';
import FatherSonBlock from '../../components/FatherSonBlock';
import FormEmailInput from '../../components/form/FormEmailInput';
import FormPasswordInput from '../../components/form/FormPasswordInput';
import Header from '../../components/Header/Header';
import SocialButtonsGroup from '../../components/SocialButtonsGroup';
import TextLink from '../../components/TextLink';
import MessageBar from '../Register/MessageBar';

const HeaderLink = (
  <TextLink title="Not a member?" to="/register" linkTitle="Sign up" />
);

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState();

  useEffect(() => {
    setSuccess(true);
  }, [email, password]);

  function handleLogin(e) {
    e.preventDefault();

    login(email, password)
      .then(() => {
        setSuccess(true);
        window.location.href = '/dashboard';
      })
      .catch(() => {
        setSuccess(false);
        setErrMsg(
          `Your email address or password is incorrect. 
          Please try again, or click "Forgot your password"`
        );
      });
  }

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
              <a className="btn forget-password" href="/Forget">
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
            <SocialButtonsGroup />
          </Form>
        </FatherSonBlock>
      </Container>
    </>
  );
}
