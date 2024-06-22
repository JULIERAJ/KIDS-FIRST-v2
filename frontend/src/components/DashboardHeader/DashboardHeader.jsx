import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'react-bootstrap';

import styles from './DashboardHeader.module.css';

const DashboardHeader = ({ title }) => {
  return (
    <Container fluid as='aside' className={`${styles.Dashboard}`}>
      <div className={`${styles.heading}`}>
        <h2 className={`${styles.rightAlign}`}>{title}</h2>
      </div>
      <div className={styles.title}>
        <h2 className={`${styles.leftAlign}`}>Hello Emma!</h2>
        <div className={styles.circleContainer}>
          <span className={styles.circleText}>EC</span>
        </div>
      </div>
    </Container>
  );
};

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default DashboardHeader;
