import React, { useState } from 'react';
import { Container, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import styles from './Layout.module.css';

import SectionHeader from '../SectionHeader/SectionHeader';
import SideBar from '../SideBar/SideBar';

const Layout = () => {
  const [activeSection, setActiveSection] = useState('Dashboard');
  // const activeTitle = 'Dashboard';
  const firstName = 'Veranika';
  const lastName = 'Karpava';

  const handleSectionChange = (section) => {
    setActiveSection(section);

    // eslint-disable-next-line no-console
    console.log(activeSection);
  };

  return (
    <Container fluid className={styles.layout}>
      <Col xs={2} className={styles.layout__sidebar}>
        <SideBar onSectionChange={handleSectionChange} />
      </Col>
      <Col xs={10} className={styles.layout__section}>
        <SectionHeader
          title={activeSection}
          firstName={firstName}
          lastName={lastName}
        />
        <Outlet />
      </Col>
    </Container>
  );
};

export default Layout;
