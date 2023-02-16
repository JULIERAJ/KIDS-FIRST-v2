import React from 'react';
import { Form, Button, Image, Container } from 'react-bootstrap';

import styles from './ParentNewVs.module.css';

import fatherSon from '../../media/father-and-son-sholders.png';

const ParentNewVs = () => {
  return (
    <Container className={styles.fatherSonContainer}>
      <Form className={styles.formInput}>
        <Form.Label htmlFor='first Name'>First name:</Form.Label>
        <Form.Control
          className='mb-3'
          type='text'
          id='firstName'
          name='firstName'
          placeholder='First name'
          autoComplete='First Name'
          aria-label='first name'
          aria-required='true'
        />
        <Form.Label htmlFor='last Name'>Last name:</Form.Label>
        <Form.Control
          className='mb-3'
          type='text'
          id='lastName'
          name='lastName'
          placeholder='Last name'
          autoComplete='Last Name'
          aria-label='last name'
          aria-required='true'
        />
        <Container as='div' className={styles.parentBtns}>
          <Button type='submit' value={'Back'} className={styles.backBtn}>
            Back
          </Button>
          <Button
            type='submit'
            className={styles.nextBtn}
            value={'Next'}
            disabled>
            Next
          </Button>
        </Container>
      </Form>

      <Image src={fatherSon} alt='parent' />
    </Container>
  );
};

export default ParentNewVs;
