import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './EmailVerify.module.css';
import { resendEmailVerification } from '../../api';
import FeedbackBlock from '../../components/Feedback/FeedbackBlock';
import envelopeImg from '../../media/icons/email_sent.png';
const EmailVerify = ({ userData }) => {
  const email = userData.email;
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Verify your email');
  const handleResendEmail = async (event) => {
    event.preventDefault();
    if (isLoading) return; // Prevent multiple clicks
    setIsLoading(true);
    try {
      const response = await resendEmailVerification(email);
      if (response.status === 200) {
      setMessage('Email resent successfully');
    } else {
      setMessage('Error resending email. Please try again later.');
        // console.error('Error resending email. Response:', response);
      }
    } catch (error) {
      setMessage('Error resending email. Please try again later.');
      // console.error('Error resending email:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <FeedbackBlock message={message} image={envelopeImg}/>
      <div className={styles.verifyText}>
        <p>A verification email has been sent to {email}.</p>
        <p>Please verify your email address to log in to KIDS FIRST.</p>
      </div>
      <div className={styles.resendEmailLink}>
        {/* Disable the link and show loading indicator if isLoading is true */}
        <a href='' onClick={handleResendEmail} disabled={isLoading}>
          {isLoading ? 'Resending...' : 'Resend Email'}
        </a>
      </div>
    </>
  );
};
EmailVerify.propTypes = {
  userData: PropTypes.object
};
export default EmailVerify; 