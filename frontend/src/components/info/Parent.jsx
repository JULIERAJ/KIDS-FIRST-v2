import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
// import { Container, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { parentPanel, panelStage } from '../../pages/Panels/rootSlice';

const Parent = ({ pageTitle, submitButtonText, previousButton }) => {
  // redux
  const dispatch = useDispatch();

  // get Redux store values for Parent
  const currentStage = useSelector((state) => state.panelStage); // for previous button
  const parentPanelFirstName = useSelector(
    (state) => state.parentPanel.firstName,
  );
  const parentPanelLastName = useSelector(
    (state) => state.parentPanel.lastName,
  );

  // form values initial state
  const [parentData, setParentData] = useState({
    firstName: parentPanelFirstName || '',
    lastName: parentPanelLastName || '',
  });

  // form values onchange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParentData({
      ...parentData,
      [name]: value,
    });
  };

  // form validation checks
  const [errors, setErrors] = useState({});
  const validate = (parentData) => {
    let formErrors = {}; // set form errors to none at start

    // first name
    if (!parentData.firstName) {
      formErrors.firstName = 'First Name required';
    }

    // last name
    if (!parentData.lastName) {
      formErrors.lastName = 'Last Name required';
    }

    return formErrors;
  };

  const [isSubmitted, setIsSubmitted] = useState(false); // state for sent status
  // onsubmit
  const handleSubmit = (e) => {
    e.preventDefault(); // stop form submission
    setErrors(validate(parentData)); // check errors
    setIsSubmitted(true); // update submit status
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitted) {
      // check if any form errors

      // update Redux Slice
      dispatch(
        panelStage(2), // update formStage
      );
      dispatch(
        parentPanel({
          // update parentPanel
          firstName: parentData.firstName,
          lastName: parentData.lastName,
        }),
      );
    }
  }, [parentData, isSubmitted, dispatch, errors]);
  // console.log(errors, parentData)

  return (
    <>
      <h2>{pageTitle || 'Signup'}</h2>

      <form
        name='parent-panel'
        id='parent-panel'
        onSubmit={(e) => handleSubmit(e)}>
        <p>
          <label htmlFor='first-name'>
            First Name<span className='required-asterix'>*</span>
          </label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            autoComplete='First Name'
            aria-label='first name'
            aria-required='true'
            placeholder='First name'
            value={parentData.firstName}
            onChange={handleChange}
          />
        </p>
        {errors.name && <span className='error-message'>{errors.name}</span>}

        <p>
          <label htmlFor='last-name'>Last Name</label>
          <input
            type='text'
            id='lastName'
            name='lastLame'
            autoComplete='Last Name'
            aria-label='last anme'
            aria-required='false'
            placeholder='Last name'
            value={parentData.lastName}
            onChange={handleChange}
          />
        </p>

        <p className='disclaimer-text'>
          <span className='required-asterix'>*</span> required fields
        </p>

        <div className='btn-array'>
          {previousButton && (
            <p>
              <input
                type='submit'
                value={'Back'}
                onClick={() => dispatch(panelStage(currentStage - 1))}
              />
            </p>
          )}
          <p>
            <input type='submit' value={submitButtonText || 'Submit'} />
          </p>
        </div>
      </form>
    </>
  );
};

export default Parent;

//props validation for Parent
Parent.propTypes = {
  pageTitle: PropTypes.string,
  submitButtonText: PropTypes.string,
  previousButton: PropTypes.bool,
};
