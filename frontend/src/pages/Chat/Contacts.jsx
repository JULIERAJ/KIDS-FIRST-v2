import axios from 'axios';
import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';

import styles from './Contacts.module.css';

function Contacts({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const personTalkToId = conversation.userIds.find(
      (userId) => userId !== currentUser._id
    );
    // eslint-disable-next-line
    console.log(personTalkToId);
    const getUser = async () => {
      try {
        // should it be a family member after activation
        const res = await axios(`/members/${personTalkToId}`);
        // eslint-disable-next-line
        console.log('PersonTalkToId', res);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    };
    getUser();
  }, [conversation.userIds, currentUser._id]);

  return (
    <div className={styles.contact}>
      <span className={styles.contactName}>Michael Daniel</span>
    </div>
  );
}

export default Contacts;

Contacts.propTypes = {
  conversation: PropTypes.object,
  currentUser: PropTypes.object,
};
