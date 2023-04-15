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
    kidsList:[]
  });

  console.log('form context', data.kidsList);
  console.log('page', page);
  console.log('inviteeInviteLater:::::', data.inviteeInviteLater);

  const requiredInputs = {
    firstName: data.firstName,
    lastName: data.lastName,
    // kidName: data.kidsList[0].kidName,
    kidName: data.kidsList[0]
  };

  // const canSubmit = 
  //   [...Object.values(requiredInputs)].every(Boolean) &&
  //   page === Object.keys(formTitle).length - 1;

  

  // eslint-disable-next-line
  // console.log('canSubmit?????? ', canSubmit);


  const handleChange = (event, index) => {
    console.log(index, event.target);
    const type = event.target.type;
    const name = event.target.name;
    const value =
      type === 'checkbox' ? event.target.checked : event.target.value;

    if (name === 'kidName') {
      const kidsListArray = [...data.kidsList];
      console.log('value', value);
      kidsListArray[index] = value;
      console.log('kidsListArray', kidsListArray);
      setData((prevData) => {
        return { ...prevData, 'kidsList': kidsListArray };
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
        kidsList: [...prevData.kidsList, '' ],
      };
    });
  };

  const handleDeleteChild = (index) => {
    const kidsListArray = [...data.kidsList];
    kidsListArray.splice(index, 1);
    setData((prevData) => {
      return { ...prevData.kidsList, 'kidsList': kidsListArray };
    });
  };

  const canNextPage1 = Object.keys(data)
    .filter((key) => key.startsWith('first' && 'last') && key !== 'invitee')
    .map((key) => data[key])
    .every(Boolean);

    console.log('>>>>>>>>>>canNextPage1', canNextPage1 ); 

  const canNextPage2 =
    data.coParentInviteLater ||
    Object.keys(data)
      .filter(
        (key) => key.startsWith('invitee') && key !== 'inviteeInviteLater',
      )
      .map((key) => data[key])
      .every(Boolean);

      console.log('>>>>>>>>>>canNextPage2', canNextPage2 ); 


  const disablePrev = page === 0;
  console.log('disablePre', disablePrev);
  const disableNext =
    page === Object.keys(formTitle).length - 1 ||
    (page === 0 && !canNextPage1) ||
    (page === 1 && !canNextPage2);

  const prevHide = page === 0;

  const nextHide = page === Object.keys(formTitle).length - 1;

  const isLastPage = page === Object.keys(formTitle).length - 1;
  const buttonLabel = isLastPage ? 'Done' : 'Next';

  console.log('what is kid list: ', data.kidsList);
  const checkKidList = (data.kidsList.length == 0  || data.kidsList[0].length ==0 ) ? false : true; 
  console.log('checkKidList ', checkKidList);
  const canSubmit = data.firstName.length > 0 && 
                      data.lastName.length > 0 && 
                      data.inviteeFirstName.length > 0 && 
                      data.inviteeLastName.length > 0 && 
                      data.inviteeEmail.length > 0 && 
                      checkKidList 


  console.log('can submit ? ', canSubmit);


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
