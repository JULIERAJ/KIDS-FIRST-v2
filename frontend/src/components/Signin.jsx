import { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Signin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  console.log("email is ", email);
  console.log("password is ", password);

  function handleLogin(e) {
    e.preventDefault();

    console.log("email is ", email);
    console.log("password is ", password);

    axios
      .post("http://localhost:8000/api/login", { email, password })
      .then(console.log("posted"));
    // if signed in successfully, go to the 'families' page to select family then go to dashboard
    // need to store user information in the session 
  }

  return (
    <div>
      sign in page
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
