import PropTypes from 'prop-types';

import React from 'react';
import { Image, Form, Container } from 'react-bootstrap';

import styles from './Kids.module.css';

import useFormContext from '../../hooks/useFormContext';
import addChild from '../../media/icons/addChild.png';
import removeChild from '../../media/icons/removeChild.png';

import kidInfo from '../../media/kid_info.png';

const Kids = () => {
  const { data, handleChange, handleAddChild, handleDeleteChild } =
    useFormContext();
  //eslint-disable-next-line
  console.log(data);

  return (
    <div className={styles.container}>
      <div className={styles.inputForm}>
        {data.kidsList.map((kid, index) => (
          <Form.Group key={index}>
            {data.kidsList.length !== 1 && (
              <div
                className={styles.removeChild}
                onClick={() => {
                  handleDeleteChild(index);
                }}>
                <Image
                  type='button'
                  src={removeChild}
                  alt='add child'
                  style={{
                    width: '24px',
                    height: '24px',
                    position: 'fixed',
                  }}
                />
              </div>
            )}
            <Form.Label htmlFor='kidName'>Kid&apos;s Name:</Form.Label>

            <Form.Control
              className='mb-3'
              type='text'
              id='kidName'
              name='kidName'
              placeholder='name'
              aria-required='true'
              value={kid.kidName}
              onChange={(e) => handleChange(e, index)}
            />
            {data.kidsList.length - 1 === index && data.kidsList.length < 5 && (
              <Container
                className={styles.addMoreChild}
                onClick={handleAddChild}>
                <Image
                  type='button'
                  src={addChild}
                  alt='add child'
                  style={{
                    width: '24px',
                    height: '24px',
                  }}
                />
                <span>Add another child</span>
              </Container>
            )}
          </Form.Group>
        ))}
      </div>
      <Image src={kidInfo} />
    </div>
  );
};

export default Kids;

Kids.propTypes = {
  kidName: PropTypes.string,
  onChange: PropTypes.func,
};

{
  /* <Container as='section' className={styles.kidsContainer}>
           <Container as='div' className={styles.addChildInput}>
             <Form className={styles.formInput}> */
}
