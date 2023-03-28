import React from 'react';

import styles from './ProfileMember.module.css';

import MemberImage from '../../components/MemberImage';

const ProfileMemeber = () => {
  const memberId = '6409008c3251a6b88d96cf14';
  return (
    <div className={styles.avatar}>
      <MemberImage memberId={memberId} />
    </div>
  );
};

export default ProfileMemeber;
