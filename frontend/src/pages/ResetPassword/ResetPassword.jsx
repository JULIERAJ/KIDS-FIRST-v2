import { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import { useParams, Link } from 'react-router-dom';

import styles from './ResetPassword.module.css';

import { resetPasswordLink, resetPassword } from '../../api';
// import { resetPasswordLink } from '../../api';

import FatherSonBlock from '../../components/FatherSonBlock';
import FormPasswordInput from '../../components/form/FormPasswordInput';
import Header from '../../components/Header/Header';
import MessageBar from '../../components/MessageBar';
import TextLink from '../../components/TextLink';
import logoPswdChanged from '../../media/icons/pswd-changed.png';

// eslint-disable-next-line max-len
// const DEFAULT_ERROR_MESSAGE =
//   'You are using symbols in your passwords or your passwords do not match.';

export default function ResetPassword() {
  const { email, resetPasswordToken } = useParams();
  const [userValid, setUserValid] = useState({});
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [sentEmail, setSentEmail] = useState(false);
  const [success, setSuccess] = useState(false);

  const checkValid = async (email, resetPasswordToken) => {
    try {
      await resetPasswordLink(email, resetPasswordToken).then(({ data }) => {
        setUserValid(data);
      });
    } catch (err) {
      //eslint-disable-next-line no-console
      console.error(err);
    }
  };
  useEffect(() => {
    checkValid(email, resetPasswordToken);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    //eslint-disable-next-line no-console
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    try {
      resetPassword(email, password).then(({ data }) => {
        //eslint-disable-next-line no-console
        console.log(data);
        setUserValid(data);
      });
      setSuccess(true);
      setSentEmail(true);
    } catch (err) {
      //eslint-disable-next-line no-console
      console.error(err);
      setErrorMessage('Passwords do not match');
    }
  };

  useEffect(() => {
    handleChangePassword();
  }, [email, resetPasswordToken]);

  return (
    <>
      <Header
        widget={
          <TextLink title='Already a member?' to='/signin' linkTitle='Log in' />
        }
      />
      <Container className='content-layout py-4'>
        <FatherSonBlock>
          <h1 className={styles.title}>Change Password</h1>

          {userValid ? (
            <Form className='py-4' onSubmit={handleChangePassword} noValidate>
              <FormPasswordInput
                required
                value={password}
                label='New Password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormPasswordInput
                id='confirmPassword'
                label='Password Confirmation'
                name='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button
                className='primary-btn w-100 my-5'
                type='submit'
                size='lg'
                variant='light'>
                Change Password
              </Button>
            </Form>
          ) : (
            <MessageBar variant='error'>{errorMessage}</MessageBar>
          )}
          {success && sentEmail ? (
            <div className={styles['success-password']}>
              <img
                className={styles.loadingLogo}
                src={logoPswdChanged}
                alt='password-changed-successfully'
              />
              <span>Password has been changed!</span> <br />
              <span>
                Your password has been changed successfully.
                <br /> Please login with the new password.
              </span>
              <br />
              <Link to='/signin' className={`btn ${styles['back-login']}`}>
                Back to Log In
              </Link>
            </div>
          ) : null}
        </FatherSonBlock>
      </Container>
    </>
  );
}
