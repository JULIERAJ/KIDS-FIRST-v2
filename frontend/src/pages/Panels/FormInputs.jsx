/* eslint-disable indent */
import React from 'react';

import styles from './FormInputs.module.css';

import CoParent from '../../components/info/CoParent';
import Kids from '../../components/info/Kids';
import Parent from '../../components/info/Parent';
import useFormContext from '../../hooks/useFormContext';

const FormInputs = () => {
    const { page, formTitle } = useFormContext();

    const display = {
        0: <Parent />,
        1: <CoParent />,
        2: <Kids />,
    };

    return (
        <>
            <div className={styles.blockTabs}>
                {Object.keys(formTitle).map((key) => (
                    <div
                        key={key}
                        className={`${styles.tabs} ${
                            page === Number(key) && styles.activeTabs
                        }`}
                        data-title={formTitle[key]}
                    >
                        {formTitle[key]}
                    </div>
                ))}
            </div>
            {/* make a condition statement  */}
            <hr />
            <div className={styles.container}>{display[page]}</div>
        </>
    );
};

export default FormInputs;
