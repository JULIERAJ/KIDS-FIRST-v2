import React, { useState } from 'react';

import styles from './PanelsNewVs.module.css';

// import Header from '../../components/Header';
// import ParentElena from '../../components/info/ParentElena';
// import { useSelector } from 'react-redux';

// import KidsElena from '../../components/info/KidsElena';
import CoParentNewVs from '../../components/info/CoParentNewVs';
import KidsNewVs from '../../components/info/KidsNewVs';
import ParentNewVs from '../../components/info/ParentNewVs';
// import fatherSon from '../../media/father-and-son-sholders.png';
// import ParentElena from '../../components/info/ParentElena';

const PanelsNewVs = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.blocTabs}>
        <div
          className={`${styles.tabs} ${
            toggleState === 1 ? styles.activeTabs : ''
          }`}
          data-title='Parent'
          onClick={() => toggleTab(1)}>
          My Information
        </div>
        <div
          className={`${styles.tabs} ${
            toggleState === 2 ? styles.activeTabs : ''
          }`}
          data-title='Co_Parent'
          onClick={() => toggleTab(2)}>
          Invite Co-parent
        </div>
        <div
          className={`${styles.tabs} ${
            toggleState === 3 ? styles.activeTabs : ''
          }`}
          onClick={() => toggleTab(3)}>
          Kid Information
        </div>
      </div>

      <div className={styles.contentTabs}>
        <div
          className={`${styles.content}
            ${toggleState === 1 ? styles.activeContent : ''}`}>
          <ParentNewVs />
        </div>

        <div
          className={`${styles.content}
            ${toggleState === 2 ? styles.activeContent : ''}`}>
          <CoParentNewVs />
        </div>

        <div
          className={`${styles.content}
            ${toggleState === 3 ? styles.activeContent : ''}`}>
          <KidsNewVs />
        </div>
      </div>
    </div>
  );
};

export default PanelsNewVs;
