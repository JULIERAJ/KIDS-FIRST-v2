import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

import styles from './Footer.module.css';

import { footerLink } from '../../data/features.data';

const Footer = () => {
  return (
    <footer>
      <ListGroup className={styles.footer__list}>
        {footerLink.map((link, idx) => {
          return (
            <ListGroup.Item key={idx} className={styles.footer__link}>
              <Link to={link.url}>{link.title}</Link>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </footer>
  );
};

export default Footer;
