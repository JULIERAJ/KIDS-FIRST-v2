import React from 'react';
import { Container } from 'react-bootstrap';

import styles from './DashboardHeader.module.css';

const DashboardHeader = () => {
  return (
    <Container as='aside' className={`${styles.Dashboard}`}>
      <div className={`${styles.heading}`}>
        <h2 className={`${styles.rightAlign}`}>Dashboard</h2>
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

export default DashboardHeader;
