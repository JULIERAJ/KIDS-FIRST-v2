import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Sidebar.module.css';

import { SidebarData } from './SidebarData';

import kidsFirstLogo from '../../../src/img/kids_first_logo_beta.png';

const Sidebar = () => {
  const sideBarIcon = SidebarData.map((icon, key) => {

    return (
      <nav className={`${styles.sidebarMenuItem}`} key={key}>
        <Link to={icon.link} className={styles.sidebarLink}>
          <img src={icon.icon} alt={icon.alt} />
          <span>{icon.title}</span>
        </Link>
      </nav>
    );
  });
  return (
    <div className={styles.sidebar}>
      <header className={styles.sidebarHeader}>
        <img src={kidsFirstLogo} alt='mainLogo' />
      </header>
      <div className={styles.sidebarMenu}>{sideBarIcon}</div>
    </div>
  );
};

export default Sidebar;
