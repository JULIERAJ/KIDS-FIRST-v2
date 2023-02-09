import PropTypes from 'prop-types';
import React from 'react';
import { Image, Container, Col, Nav, Row, Tab } from 'react-bootstrap';

import styles from './Sidebar.module.css';

import { SidebarData } from './SidebarData';

import kidsFirstLogo from '../../../src/img/kids_first_logo_beta.png';

const SidebarItemsCard = ({ title, icon, path, alt }) => {
  return (
    <Tab.Container as='div'>
      <Row className={styles.rowContainer}>
        <Col className={styles.sidebarMenu}>
          <Nav as='ul'>
            <Nav.Item
              as='li'
              className={styles.sidebarMenuItem}
              id={window.location.pathname === path ? 'active' : ''}>
              <Image
                as='img'
                src={icon}
                alt={alt}
                style={{
                  width: '20.63px',
                  height: '19.25px',
                }}
              />
              <Nav.Link
                eventKey='link-1'
                to={path}
                className={styles.sidebarLink}>
                {title}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Tab.Container>
  );
};

const Sidebar = () => {
  return (
    <Container as='aside' className={`${styles.sidebar} no-gutter`}>
      <Container as='div' className={styles.sidebarHeader}>
        <Image src={kidsFirstLogo} alt='mainLogo' />
      </Container>
      {SidebarData.map((item, key) => (
        <SidebarItemsCard key={key} {...item} />
      ))}
    </Container>
  );
};

SidebarItemsCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  path: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};

export default Sidebar;
