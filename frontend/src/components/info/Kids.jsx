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

  return (
    <div className={styles.container}>
      <div className={styles.inputForm}>
        <div>
          {data.kidsList.map((kid, index) => (
            <Form.Group key={index}>
              {/* { when there is more than 1 kid available ---> 
                should display the remove button } */}
              {data.kidsList.length > 1 && (
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
                autoFocus
                value={kid}
                onChange={(e) => handleChange(e, index)}
              />

              {/* when there is only one kid available  --->
               user should not be able to delete the field any more */}
              {/* when there are 5 kids  --->
               user should not be able to add the field any more */}
              {data.kidsList.length < 5 &&
                index === data.kidsList.length - 1 && (
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
                  <span>Add another kid</span>
                </Container>
              )}
            </Form.Group>
          ))}
        </div>
      </div>
      <Image src={kidInfo} />
    </div>
  );
};

export default Kids;

Kids.propTypes = {
  kidName: PropTypes.string,
  handleChange: PropTypes.func,
  handleAddChild: PropTypes.func,
  handleDeleteChild: PropTypes.func,
};
