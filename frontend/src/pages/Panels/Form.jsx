/* eslint-disable no-console */
// here is where 3 panels submit
import { Button } from 'react-bootstrap';

import styles from './Form.module.css';

import FormInputs from './FormInputs';

import Header from '../.././components/Header';
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

  const widget = <h3>Welcome!</h3>;

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
      const { firstName, lastName, kidsList, inviteeEmail, inviteeInviteLater } = data;

      const storedUser = localStorage.getItem('storedUser');
      const parsedUser = JSON.parse(storedUser);

      createMember({
        firstName,
        lastName,
        kidsList,
        inviteeEmail,
        inviteeInviteLater,
        family: parsedUser.familyId,
        principle: parsedUser.id,
      })
        .then(() => {
          window.location.href = '/dashboard';
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <Header
        widget={widget}
        bg={'white'}
        containerFlexOptions={'justify-content-start'}
      />

      <form onSubmit={handleSubmit}>
        <FormInputs />
        <Button
          type='button'
          onClick={handlePrev}
          disabled={disablePrev}
          className={`secondary-btn ${prevHide} ${styles.prevBtn}`}
        >
                    Back
        </Button>

        {!isLastPage && (
          <Button
            type='button'
            onClick={handleNext}
            disabled={disableNext}
            className={`primary-btn ${nextHide} ${styles.nextBtn}`}
          >
                        Next
          </Button>
        )}

        {isLastPage && (
          <Button
            type='submit'
            className={`primary-btn ${doneHide} ${styles.doneBtn}`}
            disabled={!canSubmit}
          >
                        Done
          </Button>
        )}
      </form>
    </>
  );
};

export default Form;
