import PropTypes from 'prop-types';
import React from 'react';

// import { Container } from 'react-bootstrap';

import styles from './Message.module.css';

function Message({ own }) {
  return (
    <>
      <div className={`${styles.message} ${own ? styles.own : ''}`}>
        <div className={styles.messageTop}>
          <span
            className={`${styles.letterOfFirstName} ${
              own ? styles.orange : ''
            }`}>
            {own ? 'E' : 'M'}
          </span>
          <p className={styles.messageText}>
            Sorry I could not pick up James today from school. I have an
            emergency meeting at work. Please pick him up. Sorry I could not
            pick up James today from school. I have an emergency meeting at
            work. Please pick him up. Sorry I could not pick up James today from
            school. I have an emergency meeting at work. Please pick him up.
            <span className={styles.messageBottom}>10:45 PM</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Message;

Message.propTypes = {
  own: PropTypes.bool,
};
