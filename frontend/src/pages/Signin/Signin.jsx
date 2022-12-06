import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import { login } from '../../api';

export default function Signin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  //add this error
  const [error, setError] = useState('');


  function handleLogin(e) {
    e.preventDefault();

    console.log('email is ', email);
    console.log('password is ', password);

    login(email, password)
      .then((res) => {
        console.log('posted');
        console.log(res);
        const user = JSON.stringify(res.data);
        console.log(user)
        console.log('go to dashboard')
        // localStorage.setItem('sighInUser', user);
        // window.location.href = '/dashboard';
      })
      .catch((e) => {
        console.log("error - - ",e)
        console.log(e.response.data.error);
        setError(e.response.data.error);
      });
  }


  return (
    <div>
      sign in page
      {error.length > 1 ? error : ''}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign in
        </Button>
      </Form>
    </div>
  );
}
