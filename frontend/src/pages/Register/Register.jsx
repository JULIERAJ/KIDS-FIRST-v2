import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { useParams } from 'react-router-dom';

import EmailVerify from './EmailVerify';
import styles from './Register.module.css';

import RegisterForm from './RegisterForm';

import { register } from '../../api';
import Header from '../../components/Header';

const Register = () => {
  const params = useParams();
  let paramEmail = params.email;
  /* eslint-disable no-unused-vars */
  let paramEmailVerificationToken = params.emailVerificationToken;
  /* eslint-disable no-unused-vars */
  let paramFamily = params.family;

  const [userData, setUserData] = useState({});
  const [activeComponent, setActiveComponent] = useState(true);
  /* eslint-disable no-unused-vars */
  const [loading, setLoading] = useState(true);
  //added password error message
  const [errorMessage, setErrorMessage] = useState('');

  const registerUserHandler = async (firstName, lastName, email, password) => {
    try {
      const { data } = await register({ firstName, lastName, email, password });
      setUserData(data);
      localStorage.setItem('storedUser', data);
      setActiveComponent(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <div className={styles.page}>
        <div>
          <Header/>
        </div>
        <Container className={styles.page__window}>
          <div>
            <Row>
              <Col
                className={`d-flex justify-content-center align-items-center ${styles.page__wrapper}`}>
                <div>
                  <h1 className={styles.page__title}>Welcome to Kids First</h1>
                  {activeComponent ? (
                    <RegisterForm
                      onSubmitData={registerUserHandler}
                      paramEmail={paramEmail}
                      errorMessage={errorMessage}
                    />
                  ) : (
                    <EmailVerify userData={userData} />
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Register;
