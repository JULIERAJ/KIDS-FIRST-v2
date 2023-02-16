import React from 'react';
import { Form, Container, Image, Button } from 'react-bootstrap';

import styles from './CoParentNewVs.module.css';

import coParents from '../../media/co-parents.png';

const CoParentNewVs = () => {
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
        <Form.Label htmlFor='email'>Email Address:</Form.Label>
        <Form.Control
          className='mb-3'
          type='text'
          id='email'
          name='email'
          placeholder='name@email.com'
          autoComplete='email'
          aria-label='email'
          aria-required='true'
        />
        <Form.Check
          className={styles.coParentCheckbox}
          type='checkbox'
          label='Skip this step and invite co-parent later'
        />

        <Container as='div' className={styles.coParentBtns}>
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
      <Image src={coParents} alt='parent' />
    </Container>
  );
};

export default CoParentNewVs;
