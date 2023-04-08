import PropTypes from 'prop-types';

import { createContext, useState } from 'react';

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const formTitle = {
    0: 'My Information',
    1: 'Invite Co-parent',
    2: 'Kid Information',
  };
  const [page, setPage] = useState(0);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    inviteeFirstName: '',
    inviteeLastName: '',
    inviteeEmail: '',
    inviteeInviteLater: false,
    kidsList: [
      {
        kidName: '',
      },
    ],
  });

  const requiredInputs = {
    firstName: data.firstName,
    lastName: data.lastName,
    kidName: data.kidsList[0].kidName,
  };

  const canSubmit =
    [...Object.values(requiredInputs)].every(Boolean) &&
    page === Object.keys(formTitle).length - 1;

  // eslint-disable-next-line
  console.log('canSubmit', canSubmit);
  const handleChange = (event, index) => {
    const type = event.target.type;
    const name = event.target.name;
    const value =
      type === 'checkbox' ? event.target.checked : event.target.value;

    if (name === 'kidName') {
      const kidsList = [...data.kidsList];
      kidsList[index][name] = value;
      setData((prevData) => {
        return { ...prevData, kidsList };
      });
    } else {
      setData((prevData) => {
        return { ...prevData, [name]: value };
      });
    }
  };

  const handleAddChild = () => {
    setData((prevData) => {
      return {
        ...prevData,
        kidsList: [...prevData.kidsList, { kidName: '' }],
      };
    });
  };

  const handleDeleteChild = (index) => {
    const kidsList = [...data.kidsList];
    kidsList.splice(index, 1);
    setData((prevData) => {
      return { ...prevData, kidsList };
    });
  };

  const canNextPage1 = Object.keys(data)
    .filter((key) => key.startsWith('first' && 'last') && key !== 'invitee')
    .map((key) => data[key])
    .every(Boolean);

  const canNextPage2 =
    data.coParentInviteLater ||
    Object.keys(data)
      .filter(
        (key) => key.startsWith('invitee') && key !== 'inviteeInviteLater',
      )
      .map((key) => data[key])
      .every(Boolean);

  const disablePrev = page === 0;
  const disableNext =
    page === Object.keys(formTitle).length - 1 ||
    (page === 0 && !canNextPage1) ||
    (page === 1 && !canNextPage2);

  const prevHide = page === 0;

  const nextHide = page === Object.keys(formTitle).length - 1;

  const isLastPage = page === Object.keys(formTitle).length - 1;
  const buttonLabel = isLastPage ? 'Done' : 'Next';

  return (
    <FormContext.Provider
      value={{
        formTitle,
        page,
        setPage,
        data,
        setData,
        canSubmit,
        handleChange,
        handleAddChild,
        handleDeleteChild,
        disablePrev,
        disableNext,
        prevHide,
        nextHide,
        isLastPage,
        buttonLabel,
      }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;

FormProvider.propTypes = {
  children: PropTypes.node,
};
