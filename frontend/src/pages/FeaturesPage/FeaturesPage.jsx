import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

import styles from './FeaturesPage.module.css';

import CardFeature from '../../components/CardFeature';

import { cardMainFeature, cardExtraFeature } from '../../data/features.data';
import parentChild from '../../media/features/parent_child.png';

const FeaturesPage = () => {
  return (
    <>
      <Container as='section' fluid className={styles.banner}>
        <Col as='div' className={styles.banner__content}>
          <Row as='h2' className={styles.banner__title}>An application
            with the key features</Row>
          <Row as='p' className={styles.banner__text}>Having all aspects of
            the proposed solution satisfied</Row>
        </Col>
        <Col xs={2} className={styles.banner__wrapper}>
          <Image fluid className={styles.banner__image} alt='Woman
           with child' src={parentChild} />
        </Col>
      </Container>
      <Container as='section' fluid className={styles.main__features}>
        <Row as='h1' className={styles.main_features__title}>Kids First Features</Row>
        {cardMainFeature.map((el, i) => {
          return <CardFeature
            main
            key={i}
            image={el.imageUrl}
            title={el.title}
            content={el.content}
            bgcolor={el.color} />;
        })}
      </Container>
      <Container as='section' fluid className={styles.more_features}>
        <Row as='h2' className={styles.more_features__title}>
          And many other features:
        </Row>
        <Row as='div' className={styles.more_features_wrapper}>
          {cardExtraFeature.map((el, i) => {
            return <CardFeature
              key={i}
              image={el.imageUrl}
              title={el.title}
              content={el.content}
            />;
          })}
        </Row>
        <Row as='p' className={styles.more_features__add}>
          More...
        </Row>
      </Container>
    </>
  );
};

export default FeaturesPage;
