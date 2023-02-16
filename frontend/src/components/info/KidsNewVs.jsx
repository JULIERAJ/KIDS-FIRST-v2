import React from 'react';
import { Container, Button, Image, Form } from 'react-bootstrap';

import styles from './KidsNewVs.module.css';

import addChild from '../../media/icons/addChild.png';

import kidInfo from '../../media/kid_info.png';

const KidsNewVs = () => {
  return (
    <Container as='section' className={styles.kidsContainer}>
      <Container as='div' className={styles.addChildInput}>
        <Form className={styles.formInput}>
          <Form.Label htmlFor='kids Name'>Kid&apos;s Name:</Form.Label>
          <Form.Control
            className='mb-3'
            type='text'
            id='kidName'
            name='kidName'
            placeholder='name'
            aria-required='true'
          />

          <Container as='div' className={styles.addMoreChild}>
            <Image
              src={addChild}
              alt='add child'
              style={{
                width: '24px',
                height: '24px',
              }}
            />
            <span>Add another child</span>
          </Container>
          <Container as='div' className={styles.kidsBtns}>
            <Button type='submit' value={'Back'} className={styles.backBtn}>
              Back
            </Button>
            <Button
              type='submit'
              className={styles.nextBtn}
              value={'Done'}
              disabled>
              Done
            </Button>
          </Container>
        </Form>
      </Container>
      <Image src={kidInfo} />
    </Container>
  );
};

export default KidsNewVs;
