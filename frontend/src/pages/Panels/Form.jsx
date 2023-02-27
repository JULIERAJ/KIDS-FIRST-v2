import { Button, Row } from 'react-bootstrap';

import styles from './Form.module.css';
import FormInputs from './FormInputs';

import useFormContext from '../../hooks/useFormContext';

const Form = () => {
  const {
    setPage,
    data,
    canSubmit,
    disablePrev,
    disableNext,
    prevHide,
    nextHide,
    isLastPage,
    buttonLabel,
  } = useFormContext();

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //eslint-disable-next-line
    console.log(JSON.stringify(data));
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormInputs />
      <Row className={styles.parentBtns}>
        <Button
          type='button'
          onClick={handlePrev}
          disabled={disablePrev}
          className={`${styles.backBtn} ${prevHide}`}>
          Back
        </Button>

        {isLastPage ? (
          <Button className={styles.nextBtn} disabled={!canSubmit}>
            Done
          </Button>
        ) : (
          <Button
            type='button'
            onClick={handleNext}
            disabled={disableNext}
            className={`${styles.nextBtn} ${nextHide}`}>
            {buttonLabel}
          </Button>
        )}
      </Row>
    </form>
  );
};

export default Form;
