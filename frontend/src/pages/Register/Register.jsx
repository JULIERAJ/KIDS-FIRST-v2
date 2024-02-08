/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';

import EmailVerify from './EmailVerify';
import styles from './Register.module.css';

import RegisterForm from './RegisterForm';

import { register } from '../../api';
import FatherSonBlock from '../../components/FatherSonBlock';
import Header from '../../components/Header';
import TextLink from '../../components/TextLink';

const Register = () => {

  const params = useParams();
  let paramEmail = params.email;
  let paramEmailVerificationToken = params.emailVerificationToken;
  let paramFamily = params.family;

  const [userData, setUserData] = useState({});
  const [activeComponent, setActiveComponent] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const registerUserHandler = async (email, password) => {
    try {
      const { data } = await register({ email, password });
      setUserData(data);
      localStorage.setItem('storedUser', data);
      setActiveComponent(false);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <Header widget={
        <TextLink title="Already a member?" to="/signin" linkTitle="Log in" />
      }/>

      <Container className="content-layout py-4" >
        <FatherSonBlock>
          <h1 className={styles.registerTitle}>Sign up Kids First</h1>
          {
            activeComponent ?
            //set error message in registerForm errorMessage={errorMessage}-
              <RegisterForm onSubmitData={registerUserHandler} paramEmail={paramEmail} errorMessage={errorMessage}/> :
              <EmailVerify userData={userData}/>
          }
        </FatherSonBlock>
      </Container>
    </>
  );
};

export default Register;
