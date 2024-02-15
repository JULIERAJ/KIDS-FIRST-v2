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
    kidsList: [''],
  });

  const handleChange = (event, index) => {
    const type = event.target.type;
    const name = event.target.name;
    const value =
            type === 'checkbox' ? event.target.checked : event.target.value;

    if (name === 'kidName') {
      const kidsListArray = [...data.kidsList];
      kidsListArray[index] = value;
      setData((prevData) => {
        return { ...prevData, kidsList: kidsListArray };
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
        kidsList: [...prevData.kidsList, ''],
      };
    });
  };

  const handleDeleteChild = (index) => {
    const kidsListArray = [...data.kidsList];
    kidsListArray.splice(index, 1);
    setData((prevData) => {
      return { ...prevData, kidsList: kidsListArray };
    });
  };

  const canNextPage1 = Object.keys(data)
    .filter((key) => key.startsWith('first' && 'last'))
    .map((key) => data[key])
    .every(Boolean);

  const canNextPage2 =
        data.inviteeInviteLater ||
        Object.keys(data)
          .filter(
            (key) =>
              key.startsWith('invitee') && key !== 'inviteeInviteLater'
          )
          .map((key) => data[key])
          .every(Boolean);

  const disablePrev = page === 0;

  const disableNext =
        page === Object.keys(formTitle).length - 1 ||
        (page === 0 && !canNextPage1) ||
        (page === 1 && !canNextPage2);

  const prevHide = page === 0;
  const nextHide =
        page === Object.keys(formTitle).length - 1 && 'remove-button';
  const doneHide =
        page === Object.keys(formTitle).length - 1 && 'remove-button';

  const isLastPage = page === Object.keys(formTitle).length - 1;

  const checkKidList = data.kidsList[0].trim().length === 0 ? false : true;
  // need to consider inviteeInviteLater
  const canSubmit =
        data.firstName.length > 0 &&
        data.lastName.length > 0 &&
        ((data.inviteeFirstName.length > 0 &&
            data.inviteeLastName.length > 0 &&
            data.inviteeEmail.length > 0) ||
            data.inviteeInviteLater) &&
        checkKidList &&
        isLastPage;

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
        doneHide,
        isLastPage,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;

FormProvider.propTypes = {
  children: PropTypes.node,
};
