
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './Dashboard.module.css';

import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Sidebar';

const Dashboard = () => {
  const [title, setTitle] = useState('Dashboard');

  return (
    <div className={styles.dashboard}>
      <Sidebar setTitle={setTitle} />
      <div className={styles.content}>
        <DashboardHeader title={title} />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
