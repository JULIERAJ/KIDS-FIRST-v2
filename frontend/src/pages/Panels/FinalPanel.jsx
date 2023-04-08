import styles from './FinalPanel.module.css';
import Form from './Form';

import { FormProvider } from '../../context/FormContext';

function FinalPanel() {
  return (
    <FormProvider>
      <div className={styles.container}>
        <Form />
      </div>
    </FormProvider>
  );
}

export default FinalPanel;
