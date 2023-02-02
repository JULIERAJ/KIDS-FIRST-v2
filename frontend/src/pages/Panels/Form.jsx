// here is where 3 panels submit
import { Button } from 'react-bootstrap';

import styles from './Form.module.css';

import FormInputs from './FormInputs';

import { createMember } from '../../api';
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
    doneHide,
    isLastPage,
  } = useFormContext();

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const { firstName, lastName, kidsList, inviteeEmail } = data;

      const storedUser = localStorage.getItem('storedUser');
      const parsedUser = JSON.parse(storedUser);

      createMember({
        firstName,
        lastName,
        kidsList,
        inviteeEmail,
        family: parsedUser.familyId,
        principle: parsedUser.id,
      })
        .then((res) => {
          window.location.href = '/dashboard';
          //eslint-disable-next-line no-console
          console.log(res);
        })
        .catch((e) => {
          //eslint-disable-next-line no-console
          console.log(e);
        });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormInputs />
        <Button
          type='button'
          onClick={handlePrev}
          disabled={disablePrev}
          className={`${styles.backBtn} ${prevHide}`}>
          Back
        </Button>

        {!isLastPage && (
          <Button
            type='button'
            onClick={handleNext}
            disabled={disableNext}
            className={`${styles.nextBtn} ${nextHide}`}>
            Next Step
          </Button>
        )}

        {isLastPage && (
          <Button
            type='submit'
            disabled={!canSubmit}
            className={`${styles.submitbtn} ${doneHide}`}>
            Done
          </Button>
        )}
      </form>
    </div>
  );
};

export default Form;
