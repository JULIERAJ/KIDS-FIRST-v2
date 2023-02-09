import PropTypes from 'prop-types';
import React from 'react';
import { Image, Container, ListGroup } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import styles from './Sidebar.module.css';

import { SidebarData } from './SidebarData';

import kidsFirstLogo from '../../../src/img/kids_first_logo_beta.png';

const SidebarItemsCard = ({ title, icon, path, alt }) => {
  return (
    <ListGroup as='ul' className={styles.sidebarMenu}>
      <ListGroup.Item
        onClick={() => {
          window.location.pathname = path;
        }}
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
        <Link as='a' to={path} className={styles.sidebarLink}>
          {title}
        </Link>
      </ListGroup.Item>
    </ListGroup>
  );
};

const Sidebar = () => {
  return (
    <Container as='div' className={`${styles.sidebar} no-gutter`}>
      <Container as='div' className={styles.sidebarHeader}>
        <Image src={kidsFirstLogo} alt='mainLogo' />
      </Container>
      {SidebarData.map((item, key) => {
        return <SidebarItemsCard key={key} {...item} />;
      })}
    </Container>
  );
};

SidebarItemsCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Sidebar;
