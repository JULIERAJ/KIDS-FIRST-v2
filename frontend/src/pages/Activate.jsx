import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { activate } from '../api';

const Activate = () => {
  const params = useParams();
  let { email, emailVerificationToken } = params;

  const [userData, setUserData] = useState({});

  useEffect(() => {
    activate(email, emailVerificationToken)
      .then(({ data }) => {
        setUserData(data);
      })
      .catch((error) => error);
  }, [email, emailVerificationToken]);

  // eslint-disable-next-line max-len
  // have to figure out how to design the component and what to put when data is not fetched yet (ex: status 'loading') and when the token is expired or corrupt how to resend verification email

  return (
    <div>
      <p>{userData.message}</p>
      {!userData.emailIsActivated && (
        <div>
          <p>something went wrong</p>
          <button>resend verification email</button>
        </div>
      )}
    </div>
  );
};

export default Activate;
