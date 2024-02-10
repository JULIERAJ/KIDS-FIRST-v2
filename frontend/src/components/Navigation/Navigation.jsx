import React from 'react';
import { Button, Dropdown, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.css';

import { navigationLink } from '../../data/features.data';
import arrowDown from '../../media/features/arrow_down.svg';

const Navigation = () => {

  return (
    <>
      <Nav className={styles.navigation}>
        {navigationLink.map((link, i) => {
          return (
            <Nav.Link
              key={i}
              as={NavLink}
              to={link.url}
              className={styles.navigation__item}>
              {link.title}
            </Nav.Link>
          );
        })}
      </Nav>
      <Container className={styles.navigation__wrapper}>
        <Dropdown>
          <Dropdown.Toggle
            className={styles.navigation__lang_menu}
            id="langDropdown"
            size="sm"
          >
            EN
            <img
              src={arrowDown}
              alt='Arrow Down'
              className={styles.navigation__lang_arrow} />
          </Dropdown.Toggle>
          <Dropdown.Menu className={styles.navigation__lang_menu}>
            <Button type="button" className={styles.navigation__lang_option}>
              FR
            </Button>
          </Dropdown.Menu>
        </Dropdown>
        <Button className={styles.navigation__login_button}>
          <NavLink to="/signin">Log in</NavLink>
        </Button>
        <Button className={styles.navigation__signup_button}>
          <NavLink to="/register">Sign up</NavLink>
        </Button>
      </Container>
    </>
  );
};

export default Navigation;
