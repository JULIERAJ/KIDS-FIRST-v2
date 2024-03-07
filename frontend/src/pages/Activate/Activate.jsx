import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useParams, useNavigate } from 'react-router-dom';

import styles from './Activate.module.css';

import { activate } from '../../api';
import FatherSonBlock from '../../components/FatherSonBlock';
import FeedbackBlock from '../../components/Feedback/FeedbackBlock';
import Header from '../../components/Header';
import TextLink from '../../components/TextLink';
import SuccessImg from '../../media/icons/pswd-changed.png';

const Activate = () => {
  const params = useParams();
  const navigate = useNavigate();
  let { email, emailVerificationToken } = params;

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);

  const handleClick = () => {
    navigate('/signin');
  };

  const fetchData = async () => {
    try {
      const { data } = await activate(email, emailVerificationToken);
      setUserData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.message === 'jwt expired') {
        setExpired(true);
      }
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []); // Empty dependency array to run the effect only once
  
  return (
    <>
      <Header
        widget={
          <TextLink
            title='Already a member?'
            to='/signin'
            linkTitle='Log in'
          />
        }
      />
      <Container className='content-layout py-4'>
        <FatherSonBlock>
          <h1 className={styles.registerTitle}>Sign up Kids First</h1>

          {loading && <p>Loading...</p>}

          { (!loading && userData.emailIsActivated) && (
            <>
              <FeedbackBlock message={userData.message} image={SuccessImg}/>
              <div className={styles.text}>
                <p> Your email address has been verified</p>
                <p>To proceed, click next</p>
              </div>
              <div>
                <Button
                  className='primary-btn w-100 my-5'
                  type='submit'
                  size='lg'
                  variant='light'
                  onClick={handleClick}
                >
                  Log In
                </Button>
              </div>
            </>
          )}
          { (!loading && !userData.emailIsActivated && expired) && (
            <div>
              <p>The link was expired</p>
            </div>
          )}
          { (!loading && !userData.emailIsActivated && !expired) && (
            <div>
              <p>Something went wrong</p>
            </div>
          )}
        </FatherSonBlock>
      </Container>
    </>
  );
};

export default Activate;
