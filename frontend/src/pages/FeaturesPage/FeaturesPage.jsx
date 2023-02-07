import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import styles from './FeaturesPage.module.css';

import CardFeature from '../../components/CardFeature/CardFeature';
import HeaderPage from '../../components/HeaderPage/HeaderPage';
import { cardContent } from '../../data/features.data';
import parentChild from '../../media/features/parent_child.png';

const FeaturesPage = () => {
  return (
    <>
      <HeaderPage />
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
      <Container as='section' fluid className={styles.main_features}>
        <Row as='h1' className={styles.main_features__title}>Kids First Features</Row>
        {cardContent.map((el, i) => {
          return <CardFeature
            key={i}
            image={el.image}
            title={el.title}
            content={el.content}
            bgcolor={el.color} />;
        })}
      </Container>
      <section className='more-features'>

      </section>
    </>
  );
};

export default FeaturesPage;
