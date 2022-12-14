import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { createMember } from '../api';

export default function Family() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  function handleCreateMember(e) {
    e.preventDefault();
    // check backend if there is any duplicate family names + principle name - 
    // combined primary key ???
    // create family name in the backend

    const storedUser = localStorage.getItem('storedUser');
    const parsedUser = JSON.parse(storedUser);
    // console.log("======storeduser: ", parsedUser);

    createMember(
      {
        firstname,
        lastname,
        principleId: parsedUser.principleId,
        familyId: parsedUser.familyId
      }
    )
      .then((res) => {
        const user = JSON.stringify(res.data);
        localStorage.setItem('storedUser', user);
        window.location.href = '/dashboard';
      });
    // .catch((e) => console.log(e));
  }

  return (
    <div>
      <div>
        <Form onSubmit={handleCreateMember}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> your first name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>your last name </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              onChange={(e) => setLastname(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            create family member
          </Button>
        </Form>
      </div>
    </div>
  );
}
