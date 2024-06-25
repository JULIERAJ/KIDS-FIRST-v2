import { useState, useEffect, useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import styles from './ForgetPassword.module.css';

import { forgetPassword } from '../../api';
import FatherSonBlock from '../../components/FatherSonBlock';
import FormEmailInput from '../../components/form/FormEmailInput';
import Header from '../../components/Header/Header';
import MessageBar from '../../components/MessageBar';
import TextLink from '../../components/TextLink';
import logoEmailSent from '../../media/icons/email_sent.png';

const HeaderLink = <TextLink title='Not a member?' to='/register' linkTitle='Sign up' />;

export default function ForgetPassword() {
  const emailDisplay = useRef('');
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);

  useEffect(() => {
    emailDisplay.current = email;
  }, [email]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setErrMsg('');
    try {
      const res = await forgetPassword(email);
      if (res.status === 200) {
        setEmail('');
        setSentEmail(true);
        setSuccess(true);
      } else {
        setErrMsg(res.message);
      }
    } catch (err) {
      //eslint-disable-next-line
      console.error(err);
      setErrMsg('There was an error with the request, please try again later.');
    }
  };

  const handleResendEmail = async () => {
    setSuccess(false);
    setSentEmail(false);
    setErrMsg('');
    try {
      const res = await forgetPassword(email);
      if (res.status === 200) {
        setEmail('');
        setSentEmail(true);
        setSuccess(true);
      } else {
        setErrMsg(res.message);
      }
    } catch (err) {
      //eslint-disable-next-line
      console.error(err);
      setErrMsg(
        'An error occurred while resending the email. Please try again later.',
      );
    }
  };

  return (
    <>
      <Header widget={HeaderLink} />
      <Container className='content-layout--psw py-4'>
        <FatherSonBlock>
          <Form className='content-layout py-4' onSubmit={handleForgotPassword}>
            <h1 className={styles.title}>Forgot Password</h1>
            {success && sentEmail ? (
              <>
                <div className={styles.success}>
                  <img src={logoEmailSent} alt='email-sent-logo' />
                  <span>Check you email</span>
                  <br />
                  <span>
                    A link to reset your password has been sent to{' '}
                    <strong>{emailDisplay.current}</strong>
                  </span>
                </div>

                <Link
                  type='button'
                  className={`btn checkbox mb-3 ${styles['resend-email']}`}
                  onClick={() => handleResendEmail()}>
                  Resend Email
                </Link>
              </>
            ) : !success && errMsg ? (
              <MessageBar variant='error'>{errMsg}</MessageBar>
            ) : null}

            {success && sentEmail ? null : (
              <>
                <p className={styles.text}>
                  Enter your email address to receive a link to reset your
                  password
                </p>
                <FormEmailInput
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  label='Email Address'
                />
                <Button
                  className={`primary-btn w-100 my-3 ${styles.customButton}`}
                  type='submit'
                  size='lg'
                  variant='light'>
                  Continue
                </Button>
              </>
            )}
            <Link
              to='/signin'
              className={`btn checkbox mb-3 ${styles['forget-password']}`}>
              Back to Log In
            </Link>
          </Form>
        </FatherSonBlock>
      </Container>
    </>
  );
}
