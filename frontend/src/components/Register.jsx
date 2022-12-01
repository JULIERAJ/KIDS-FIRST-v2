import React, { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  console.log("email is ", email);
  console.log("password is ", password);
  console.log("confirmPassword is ", confirmPassword);

  function validateForm() {
    let isValid = true;
    const errors = {};

    if (password.length < 5) {
      errors.passwordComplexityWrong =
        "Length is not correct bla bla bla, minimum 5";
      isValid = false;
    }

    if (password !== confirmPassword) {
      errors.passwordMismatch = "Passwords are mismatch";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  }

  function handleRegister(e) {
    e.preventDefault();
    e.stopPropagation();

    if (validateForm()) {
      console.log("email is ", email);
      console.log("password is ", password);
      console.log("confirmPassword is ", confirmPassword);

      axios
        .post("http://localhost:8000/api/register", {
          email,
          password,
        })
        // next page should - give a family name
        .then((res) => {
          console.log("success");
          // need to store the user informatin in the session

          const user = JSON.stringify(res.data);
          localStorage.setItem("storedUser", user);
          window.location.href = "/family";
        })
        .catch((e) => {
          console.log(e.response.data.message);
          setError(e.response.data.message);
        });
      // then firstname, last name ... fill out the information .
    }
  }

  return (
    <div className="d-flex flex-column mb-3">
      <div>
        <div>Image</div>{" "}
      </div>
      {/* <div>registration page</div> */}
      <div className="mb-3">
        <h2>Sign ups Kids First</h2>
        {error.length > 1 ? error : ""}
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="example@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="mb-3">Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {formErrors.passwordComplexityWrong && (
              <p className="text-warning">
                {formErrors.passwordComplexityWrong}
              </p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              required
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {formErrors.passwordMismatch && (
              <p className="text-warning">{formErrors.passwordMismatch}</p>
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}
