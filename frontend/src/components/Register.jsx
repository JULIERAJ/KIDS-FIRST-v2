import { useState } from "react";
import { useSearchParams } from 'react-router-dom';
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Register() {

  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState(searchParams.get('inviteeEmail'));
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const paramFamily = searchParams.get('family');


  console.log("email is ", email);
  console.log("password is ", password);
  console.log("family is ", paramFamily);

  function handleRegister(e) {
    e.preventDefault();

    console.log("email is ", email);
    console.log("password is ", password);

    axios
      .post("http://localhost:8000/api/register", { email, password })
      // next page should - give a family name
      .then((res) => {
        console.log("success");
        // need to store the user informatin in the session
       
        const user = JSON.stringify(res.data);
        localStorage.setItem("storedUser", user);
        localStorage.setItem("paramFamily", paramFamily);
        window.location.href = "/family";
      })
      .catch((e) => {
        console.log(e.response.data.message);
        setError(e.response.data.message);
      });
    // then firstname, last name ... fill out the information .
  }

  return (
    <div>
      registration page
      {error.length > 1 ? error : ""}

      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          {email ?  <Form.Control
            plaintext 
            readOnly 
            value ={email}/> :  


          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        }
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
          Register
        </Button>
      </Form>
    </div>
  );
}
