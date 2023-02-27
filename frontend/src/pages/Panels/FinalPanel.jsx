import Form from './Form';

import { FormProvider } from '../../context/FormContext';

function FinalPanel() {
  return (
    <FormProvider>
      <Form />
    </FormProvider>
  );
}

export default FinalPanel;
