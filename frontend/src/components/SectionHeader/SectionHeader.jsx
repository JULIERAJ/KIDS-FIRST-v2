import PropTypes from 'prop-types';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import styles from './SectionHeader.module.css';

const SectionHeader = ({ title, firstName, lastName }) => {
  return (
    <Container fluid className={styles.header}>
      <Row className={styles.header__content}>
        <Col xs={2} className={styles.header__nav_content}>
          <h1 className={styles.header__nav_title}>{title}</h1>
        </Col>
        <Col xs={10} className={styles.header__nav_user_content}>
          <h2
            className={styles.header__nav_user_greeting}
          >{`Hello, ${firstName}!`}</h2>
          <Container fluid className={styles.header__nav_user_avatar}>
            <Col
              as="p"
              className={styles.header__nav_user_initials}
            >{`${firstName.charAt(0)}${lastName.charAt(0)}`}</Col>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

export default SectionHeader;
