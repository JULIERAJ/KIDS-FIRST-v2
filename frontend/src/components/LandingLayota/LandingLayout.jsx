import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './LandingLayout.module.css';

import Footer from '../Footer';
import Header from '../Header';
import Navigation from '../Navigation';

const LandingLayout = () => {
  return (
    <>
      <header className={styles.big__header}>
        <Header widget={
          <Navigation />
        } />
      </header>
      <Outlet />  
      <Footer />
    </>
  );
};

export default LandingLayout;
