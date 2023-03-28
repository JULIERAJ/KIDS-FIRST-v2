import { Button } from 'react-bootstrap';

import styles from './Form.module.css';

import FormInputs from './FormInputs';

import { createMember, sendInvitation } from '../../api';
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
  // eslint-disable-next-line no-console

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const principleId = '64174b9d7625a0568b349e5f';

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const { firstName, lastName, kidsList, inviteeEmail } = data;

      const storedUser = localStorage.getItem('storedUser');
      const parsedUser = JSON.parse(storedUser);
      //eslint-disable-next-line no-console
      console.log(parsedUser);

      createMember({
        firstName,
        lastName,
        kidsList,
        inviteeEmail,
        family: parsedUser.familyId,
        principle: principleId,
      }).then((res) => {
        const user = JSON.stringify(res.data);
        localStorage.setItem('storedUser', user);
        sendInvitation({
          inviter: principleId,
          inviteeEmail,
          family: parsedUser.familyId,
        })
          .then((res) => {
            //eslint-disable-next-line no-console
            console.log('RESDATA FRONTEND', res.data);
          })
          .catch((e) => {
            //eslint-disable-next-line no-console
            console.log(e);
          });
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInputs />
      <Button
        type='button'
        onClick={handlePrev}
        disabled={disablePrev}
        className={`${styles.backBtn} ${prevHide}`}>
        Back
      </Button>

      {isLastPage ? (
        <Button type='submit' className={styles.nextBtn} disabled={!canSubmit}>
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
    </form>
  );
};

export default Form;
