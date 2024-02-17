import PropTypes from 'prop-types';
import React from 'react';
import { Form, Image } from 'react-bootstrap';

import styles from './Parent.module.css';

import useFormContext from '../../hooks/useFormContext';
import fatherSon from '../../media/father-and-son-sholders.png';

const Parent = () => {
  const { data, handleChange } = useFormContext();

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.inputForm}>
          <Form.Label htmlFor='firstName'>First name:</Form.Label>
          <Form.Control
            className='mb-3'
            type='text'
            id='firstName'
            name='firstName'
            placeholder='First name'
            autoComplete='First Name'
            aria-label='first name'
            aria-required='true'
            autoFocus
            value={data.firstName}
            onChange={handleChange}
          // isInvalid={isInvalidFirstName}
          />
          <Form.Label htmlFor='lastName'>Last name:</Form.Label>
          <Form.Control
            className='mb-3'
            type='text'
            id='lastName'
            name='lastName'
            placeholder='Last name'
            autoComplete='Last Name'
            aria-label='last name'
            aria-required='true'
            value={data.lastName}
            onChange={handleChange}
          // isInvalid={isInvalidLastName}
          />

          {/* {(isInvalidFirstName || isInvalidLastName) && (<Alert type='invalid'>
          You entered an invalid name. Please try again
        </Alert>)} */}
        </div>
       
      </div>
      <Image src={fatherSon} alt='parent' />
    </div>
  );
};

Parent.propTypes = {
  data: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }),
  handleChange: PropTypes.func,
};

export default Parent;
