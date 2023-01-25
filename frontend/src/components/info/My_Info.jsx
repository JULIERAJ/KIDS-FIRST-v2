import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { insertFirstname, insertLastName } from './infoSlice';
import { Container, Form, Button } from 'react-bootstrap';

export function My_Info() {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(insertFirstname(data.firstName));
    dispatch(insertLastName(data.lastName));
    history.push('./Co_parent');
  };
  return (
    <Form className="py-4" onSubmit={handleSubmit(onSubmit)}>
      <div class="form-group">
        <label for="formGroupExampleInput">First Name</label>
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput"
          placeholder="Example input"
        />
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput2">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput2"
          placeholder="Another input"
        />
      </div>
      <Button
        className="primary-btn w-100 my-5"
        type="submit"
        size="lg"
        variant="light"
      >
        Next Step
      </Button>
    </Form>
  );
}
