import PropTypes from 'prop-types';
import React from 'react';

import styles from './FeedbackBlock.module.css';

const FeedbackBlock = ({ message, image }) => {
  return (
    <>
      <div className={styles.imgContainer}>
        <img src={image} alt='icon'/>
      </div>
      <div className={styles.messageContainer}>
        <p>{message}</p>
      </div>
    </>
  );
};

FeedbackBlock.propTypes = {
  message: PropTypes.string,
  image: PropTypes.node,
};

export default FeedbackBlock;
