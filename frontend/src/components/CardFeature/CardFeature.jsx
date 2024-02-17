import PropTypes from 'prop-types';
import React from 'react';
import Card from 'react-bootstrap/Card';

import styles from './CardFeature.module.css';

const CardFeature = ({ image, title, content, bgcolor, main }) => {

  return (
    <Card
      className={main ? styles.card : styles.card__more}
      style={main && { backgroundColor: bgcolor }}
    >
      <Card.Img variant="top" src={image} style={{ width: '11.25rem' }} />
      <Card.Title
        className={main ? styles.card__title : styles.card__title_more}
      >
        {title}
      </Card.Title>
      <Card.Text className={main ? styles.card__text : styles.card__text_more}>
        {content}
      </Card.Text>
    </Card>
  );
};

CardFeature.propTypes = {
  bgcolor: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  main: PropTypes.bool,
};

export default CardFeature;
