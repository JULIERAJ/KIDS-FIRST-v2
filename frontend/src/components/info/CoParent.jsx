import PropTypes from 'prop-types';
import React from 'react';
import { Form, Image } from 'react-bootstrap';

import styles from './CoParent.module.css';

import useFormContext from '../../hooks/useFormContext';
import coParents from '../../media/co-parents.png';

const CoParent = () => {
  const { data, handleChange } = useFormContext();

  return (
    <div className={styles.container}>
      <div className={styles.inputForm}>
        <Form.Label htmlFor='inviteeFirstName'>First name:</Form.Label>
        <Form.Control
          className='mb-3'
          type='text'
          id='inviteeFirstName'
          name='inviteeFirstName'
          placeholder='First name'
          autoComplete='First Name'
          aria-label='first name'
          aria-required='true'
          autoFocus
          value={data.inviteeFirstName}
          onChange={handleChange}
        />
        <Form.Label htmlFor='inviteeLastName'>Last name:</Form.Label>
        <Form.Control
          className='mb-3'
          type='text'
          id='inviteeLastName'
          name='inviteeLastName'
          placeholder='Last name'
          autoComplete='Last Name'
          aria-label='last name'
          aria-required='true'
          value={data.inviteeLastName}
          onChange={handleChange}
        />
        <Form.Label htmlFor='inviteeEmail'>Email Address:</Form.Label>
        <Form.Control
          className='mb-3'
          type='text'
          id='inviteeEmail'
          name='inviteeEmail'
          placeholder='name@email.com'
          autoComplete='email'
          aria-label='email'
          value={data.inviteeEmail}
          onChange={handleChange}
        />
        <Form.Check
          className={styles.coParentCheckbox}
          type='checkbox'
          checked={data.inviteeInviteLater}
          id='inviteeInviteLater'
          name='inviteeInviteLater'
          label='Skip this step and invite co-parent later'
          onChange={handleChange}
        />
      </div>
      <Image src={coParents} alt='parent' />
    </div>
  );
};

CoParent.propTypes = {
  data: PropTypes.shape({
    inviteeFirstName: PropTypes.string.isRequired,
    inviteeLastName: PropTypes.string.isRequired,
  }),
  handleChange: PropTypes.func,
};

export default CoParent;
