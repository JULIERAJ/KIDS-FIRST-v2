import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Image, Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import styles from './Sidebar.module.css';
import { SIDEBAR_DATA } from './sidebarData';

import kidsFirstLogo from '../../media/logo/LOGO-BYME.png';

const SidebarItemsCard = ({ title, icon, activeIcon, hoverIcon, path, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (isActive) {
      navigate(path);
    }
  }, [isActive, path, navigate]);

  const handleClick = (e) => {
    e.preventDefault();
    onClick(path);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };


  return (
    <>
      <Nav.Item
        className={`${styles.nav} ${isActive ? styles.active : ''}`}
        id={window.location.pathname === path ? 'active' : ''}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        >
          {isActive ? activeIcon : (isHovered ? hoverIcon : icon)}
          <span className={`${styles.sidebarMenuItem}`}>
            {title}
          </span>
      </Nav.Item>
    </>
  );
};

const Sidebar = ({ setTitle }) => {
  const [activeLink, setActiveLink] = useState(null);

  const handleClick = (path, title) => {
    setActiveLink(path);
    setTitle(title);
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
                onClick={() => handleClick(item.path, item.title)}
              />
            ))}
          </div>

          {/* Render div for "Settings" and "Help" items */}
          <div className={styles.settingsHelpContainer}>
            {settingsHelpItems.map((item, key) => (
              <SidebarItemsCard key={key} {...item}
                isActive={item.path === activeLink}
                onClick={() => handleClick(item.path, item.title)}
              />
            ))}
          </div>
        </div>
      </div>
    </Navbar>
  );
};

SidebarItemsCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  activeIcon: PropTypes.node.isRequired,
  hoverIcon:  PropTypes.node.isRequired,
  path: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool
};

Sidebar.propTypes = {
  setTitle: PropTypes.func
};

export default Sidebar;
