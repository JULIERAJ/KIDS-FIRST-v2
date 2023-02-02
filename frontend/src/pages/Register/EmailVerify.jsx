import PropTypes from 'prop-types';

import React from 'react';

import styles from './EmailVerify.module.css';

import FeedbackBlock from '../../components/Feedback/FeedbackBlock';
import envelopeImg from '../../media/icons/vector.png';

const EmailVerify = ({ userData }) => {
  const email = userData.email;
  const message = userData.message;

  return (
    <>
      <FeedbackBlock message={message} image={envelopeImg}/>
      <div className={styles.verifyText}>
        <p>A verification email has been sent to {email}.</p>
        <p>Please verify your email address to log in into KIDS FIRST.</p>
      </div>
      <div className={styles.resendEmailLink}>
        <a href=''>Resend Email</a>
      </div>
    </>
  );
};

export default EmailVerify;

EmailVerify.propTypes = {
  userData: PropTypes.object 
};
