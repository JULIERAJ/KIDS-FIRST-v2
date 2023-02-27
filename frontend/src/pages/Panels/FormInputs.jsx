/* eslint-disable indent */
import React from 'react';

// import { Button, Row } from 'react-bootstrap';

import styles from './FormInputs.module.css';

import CoParent from '../../components/info/CoParent';
import Kids from '../../components/info/Kids';
import Parent from '../../components/info/Parent';
import useFormContext from '../../hooks/useFormContext';

// import fatherSon from '../../media/father-and-son-sholders.png';

const FormInputs = () => {
  const { page, formTitle } = useFormContext();

  const display = {
    0: <Parent />,
    1: <CoParent />,
    2: <Kids />,
  };

  return (
    <div className={styles.container}>
      <div className={styles.blocTabs}>
        {Object.keys(formTitle).map((key) => (
          <div
            key={key}
            className={`${styles.tabs} ${
              page === Number(key) && styles.activeTabs
            }`}
            data-title={formTitle[key]}>
            {formTitle[key]}
          </div>
        ))}
      </div>
      <div className={styles.contentTabs}>{display[page]}</div>
    </div>
  );
};

export default FormInputs;
