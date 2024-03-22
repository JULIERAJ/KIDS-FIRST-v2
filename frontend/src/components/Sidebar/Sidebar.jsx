import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Image, Container, Col, Nav, Row, Tab } from 'react-bootstrap';

import styles from './Sidebar.module.css';
import { SIDEBAR_DATA } from './sidebarData';

import kidsFirstLogo from '../../media/logo/kids_first_logo_beta.png';

//SidebarItemsCard component displays a sidebar menu item.

const SidebarItemsCard = ({ title, icon, activeIcon, hoverIcon, path, alt, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = () => {
    onClick(path);
  };
  return (
    <Tab.Container>
      <Row className={styles.rowContainer}>
        <Col className={`${styles.sidebarMenu} ${isActive ? styles.active : ''}`}>
          <Nav>
            <Nav.Item
              className={`${styles.sidebarMenuItem} ${isActive ? styles.active : ''}`}
              id={window.location.pathname === path ? 'active' : ''}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              <Image
                src={isActive ? activeIcon : (isHovered ? hoverIcon : icon)}
                alt={alt}
                className={`${styles.sidebarIcon} ${isActive ? styles.activeIcon : ''}`}
                onClick={handleClick}
                style={{
                  width: '20.63px',
                  height: '19.25px',
                }}
              />
              <Nav.Link
                eventKey='link-1'
                to={path}
                className={styles.sidebarLink}
                onClick={handleClick}>
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
  const [activeLink, setActiveLink] = useState(null);

  const handleClick = (path) => {
    setActiveLink(path);
  };

  return (
    <Container as='aside' className={`${styles.sidebar} no-gutter`}>
      <Container as='div' className={styles.sidebarHeader}>
        <Image src={kidsFirstLogo} alt='mainLogo' />
      </Container>
      {SIDEBAR_DATA.map((item, key) => (
        <SidebarItemsCard key={key} {...item}
          isActive={item.path === activeLink}
          onClick={() => handleClick(item.path)}
        />
      ))}
    </Container>
  );
};

SidebarItemsCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  activeIcon: PropTypes.string,
  hoverIcon: PropTypes.string,
  path: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool
};

export default Sidebar;
