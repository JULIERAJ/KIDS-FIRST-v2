import React from 'react';

import { Container } from 'react-bootstrap';

import { FaCircle } from 'react-icons/fa';

import styles from './Dashboard.module.css';

import Sidebar from '../Sidebar/Sidebar';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Container as='aside' className={`${styles.Dashboard}`}>
        <div className={`${styles.heading}`}>
          <h2 className={styles.rightAlign}>Dashboard</h2>
          <h2 className={styles.leftAlign}>
            Hello Emma!
            <div className={styles.circleContainer}>
              <FaCircle className={styles.FaCircle} />
              <span className={styles.circleText}>EC</span>
            </div>
          </h2>
        </div>

        <p>
          <b>Calender</b>
          <br></br>
          Overview of this week&apos;s events
        </p>
      </Container>
    </div>
  );
};
export default Dashboard;
