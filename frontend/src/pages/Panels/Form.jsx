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
    isLastPage,
    buttonLabel,
  } = useFormContext();
  // eslint-disable-next-line no-console

  const handlePrev = () => {

    setPage((prev) => prev - 1);
  };
  const handleNext = (e) => {
 
    console.log('click next');
    setPage((prev) => prev + 1);
  };

  const handleSubmit = (e) => {
    console.log('you are trying to submit');

    e.preventDefault();    
    e.stopPropagation();

    try {
      const { firstName, lastName, kidsList, inviteeEmail } = data;

      const storedUser = localStorage.getItem('storedUser');
      const parsedUser = JSON.parse(storedUser);
      //eslint-disable-next-line no-console
      console.log('>>>>>>parsed user',parsedUser);

      createMember({
        firstName,
        lastName,
        kidsList,
        inviteeEmail,
        family: parsedUser.familyId,
        principle: parsedUser.id,
      }).then((res) => {
        //eslint-disable-next-line no-console
        console.log('RESDATA FRONTEND', res.data);
        //window.location.href = '/dashboard';
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
  console.log('inviteeInviteLater:::::', data.inviteeInviteLater);

  // condition of submit: all fields are filled up 
  // const cannotSubmit = Object.values(data).filter((d) => { (d == "undefinied"  || d === true || d === false )? d.length : 0 ; d.length; console.log(d.length)})  ;
  // console.log('cannot submit ? ', cannotSubmit);

  return (
    <div>

    {isLastPage && canSubmit ? 
    
    (<form onSubmit={handleSubmit}>
      <FormInputs />
      <Button
        type='button'
        onClick={handlePrev}
        disabled={disablePrev}
        className={`${styles.backBtn} ${prevHide}`}>
        Back
      </Button>

        <Button type='submit' className={styles.nextBtn}  >
          Done
        </Button>
    </form>) : 
    
    ( <form >
      <FormInputs />
      <Button
        type='button'
        onClick={handlePrev}
        disabled={disablePrev}
        className={`${styles.backBtn} ${prevHide}`}>
        Back
      </Button>

        <Button
          type='button'
          onClick={handleNext}
          disabled={disableNext}
          className={`${styles.nextBtn} ${nextHide}`}>
          {buttonLabel}
        </Button>
    </form>)
    }

    </div>


   /* <form onSubmit={handleSubmit}>
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

    */ 


  );
};

export default Form;
