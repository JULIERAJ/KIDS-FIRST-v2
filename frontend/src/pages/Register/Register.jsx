/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';

import { useParams, useNavigate } from 'react-router-dom';

import EmailVerify from './EmailVerify';
import styles from './Register.module.css';

import RegisterForm from './RegisterForm';

import { register, activateCoParent } from '../../api';
import FatherSonBlock from '../../components/FatherSonBlock';
import Header from '../../components/Header';
import TextLink from '../../components/TextLink';
const Register = () => {

  const [userData, setUserData] = useState({});
  const [activeComponent, setActiveComponent] = useState(true);
  const [loading, setLoading] = useState(true);
  const [inviteeData, setInviteeData] = useState({});

  const params = useParams();
  const navigate = useNavigate();
  let { email, emailVerificationToken } = params;

  console.log('inviteeData, ', inviteeData);
  const registerUserHandler = async (email, password) => {

    try {
      const { data } = await register({ email, password });
      setUserData(data);
      localStorage.setItem('storedUser', data); 
      setActiveComponent(false);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (email && emailVerificationToken) {
      activateCoParent(email, emailVerificationToken).then(({ data }) => {
        setInviteeData(data);
        setLoading(false);
      }).catch((error) => error);
    }
  }, [email, emailVerificationToken]);
  
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
              <RegisterForm onSubmitData={registerUserHandler} email={email} /> :  
              <EmailVerify userData={userData}/> 
          } 
        </FatherSonBlock>
      </Container>
    </>
  );
};

export default Register;
