/* eslint-disable indent */
import React, { useState } from 'react';

import { Button, Row } from 'react-bootstrap';

import styles from './PanelsNewVs.module.css';

// import Header from '../../components/Header';
// import ParentElena from '../../components/info/ParentElena';
// import { useSelector } from 'react-redux';

// import KidsElena from '../../components/info/KidsElena';
import CoParentNewVs from '../../components/info/CoParent';
import KidsNewVs from '../../components/info/Kids';
import ParentNewVs from '../../components/info/Parent';
// import fatherSon from '../../media/father-and-son-sholders.png';
// import ParentElena from '../../components/info/ParentElena';

const PanelsNewVs = () => {
  const [page, setPage] = useState(0);
  const [firstName, setFirstName] = useState('');
  const FormTitles = ['My Information', 'Invite Co-parent', 'Kid Information'];

  function nextPage() {
    setPage((i) => {
      if (i >= FormTitles.length - 1) return i;
      return i + 1;
    });
  }

  function prevPage() {
    setPage((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }
  const PageDisplay = () => {
    switch (page) {
      case 0:
        return (
          <ParentNewVs
            firstName={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        );
      case 1:
        return <CoParentNewVs />;
      case 2:
        return <KidsNewVs />;
      default:
        return <ParentNewVs />;
    }
  };

  function onSubmit(e) {
    e.preventDefault();
    nextPage();
  }

  return (
    <div className={styles.container}>
      <div className={styles.blocTabs}>
        {FormTitles.map((title, i) => (
          <div
            key={i}
            className={`${styles.tabs} ${
              FormTitles[page] === i && styles.activeTabs
            }`}
            data-title={title}>
            {title}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className={styles.contentTabs}>
        {PageDisplay()}
        <Row className={styles.parentBtns}>
          {page !== 0 && (
            <Button onClick={prevPage} type='button' className={styles.backBtn}>
              Back
            </Button>
          )}
          <Button
            disabled={!firstName}
            onClick={nextPage}
            type='button'
            className={styles.nextBtn}>
            {page === FormTitles.length - 1 ? 'Done' : 'Next'}
          </Button>
        </Row>
      </form>
    </div>
  );
};

export default PanelsNewVs;
