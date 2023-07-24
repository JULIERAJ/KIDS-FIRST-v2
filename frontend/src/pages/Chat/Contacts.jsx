import PropTypes from 'prop-types';
import { useEffect } from 'react';

import styles from './Contacts.module.css';

import { getMember } from '../../api';

function Contacts({
  conversation,
  currentUser,
  firstSenderName,
  lastSenderName,
}) {
  // const [user, setUser] = useState(null);
  // eslint-disable-next-line no-console
  console.log(currentUser);

  // WORK IN HERE
  useEffect(() => {
    const personTalkToId = conversation?.userIds?.find(
      (userId) => userId !== currentUser?.id
    );
    // eslint-disable-next-line
    console.log(personTalkToId);
    const getUser = async () => {
      try {
        // should it be a family member after activation
        const res = await getMember(personTalkToId);
        // eslint-disable-next-line
        console.log('PersonTalkToId', res);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    };
    getUser();
  }, [conversation?.userIds, currentUser._id, currentUser?.id]);

  return (
    <div className={styles.contact}>
      <span className={styles.contactName}>
        {firstSenderName} {lastSenderName}
      </span>
    </div>
  );
}

export default Contacts;

Contacts.propTypes = {
  conversation: PropTypes.object,
  currentUser: PropTypes.string,
  firstSenderName: PropTypes.string,
  lastSenderName: PropTypes.string,
};
