import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Image, Container, Nav, Navbar } from 'react-bootstrap';

import styles from './Sidebar.module.css';
import { SIDEBAR_DATA } from './sidebarData';

import kidsFirstLogo from '../../media/logo/LOGO-BYME.png';

const SidebarItemsCard = ({ title, icon, activeIcon, hoverIcon, path, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = () => {
    onClick(path);
  };
  return (
    <>
      <Nav
        className={`${styles.nav} ${isActive ? styles.active : ''}`}>
        <Nav.Item
          className={`${styles.sidebarMenuItem} ${isActive ? styles.active : ''}`}
          id={window.location.pathname === path ? 'active' : ''}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          {isActive ? activeIcon : (isHovered ? hoverIcon : icon)}
          <Nav.Link
            eventKey='link-1'
            to={path}
            className={styles.sidebarLink}
            onClick={handleClick}>
            {title}
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleClick = (path) => {
    setActiveLink(path);
  };

  // Separate sidebar items into two arrays: one for "Settings" and "Help", and the other for all others
  const settingsHelpItems = SIDEBAR_DATA.filter(item => item.title === 'Help' || item.title === 'Settings');
  const otherItems = SIDEBAR_DATA.filter(item => item.title !== 'Help' && item.title !== 'Settings');

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <div className={`${styles.sidebar} no-gutter`}>
        <Container as='div' className={styles.sidebarHeader}>
          <Image src={kidsFirstLogo} alt='mainLogo' />
        </Container>
        <div className={`${styles.sidebarMenu}`}>
          {/* Render div for all other items */}
          <div className={styles.otherItemsContainer}>
            {otherItems.map((item, key) => (
              <SidebarItemsCard key={key} {...item}
                isActive={item.path === activeLink}
                onClick={() => handleClick(item.path)}
              />
            ))}
          </div>

          {/* Render div for "Settings" and "Help" items */}
          <div className={styles.settingsHelpContainer}>
            {settingsHelpItems.map((item, key) => (
              <SidebarItemsCard key={key} {...item}
                isActive={item.path === activeLink}
                onClick={() => handleClick(item.path)}
              />
            ))}
          </div>
        </div>
      </div>
    </Navbar>
  );
};

SidebarItemsCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  activeIcon: PropTypes.string,
  hoverIcon: PropTypes.string,
  path: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool
};

export default Sidebar;
