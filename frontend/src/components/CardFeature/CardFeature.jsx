import PropTypes from 'prop-types';

import React from 'react';

import Card from 'react-bootstrap/Card';

import styles from './CardFeature.module.css';

const CardFeature = ({ image, title, content, bgcolor }) => {

  //eslint-disable-next-line

  return (
    <Card
      className={styles.card}
      style={{ backgroundColor: bgcolor }}>
      <Card.Img variant="top" src={image} style={{ width: '11.25rem' }} />
      <Card.Body className={styles.card__container}>
        <Card.Title className={styles.card__title}>
          {title}
        </Card.Title>
        <Card.Text className={styles.card__text}>
          {content}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

CardFeature.propTypes = {
  bgcolor: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string
};

export default CardFeature;
