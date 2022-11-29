import "./Signin.css";
import { useState } from "react";
import { Navbar, Container, Row, Col, Form, Button } from "react-bootstrap";
import logo from "../../img/kids_first_logo_beta.png";
import signup from "../../img/signup.png";


import { login } from "../../api";

export default function Signin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  console.log("email is ", email);
  console.log("password is ", password);

  function handleLogin(e) {
    e.preventDefault();

    console.log("email is ", email);
    console.log("password is ", password);

    login(email, password).then(console.log("posted"));
    // window.location.href = "/dashboard";
  }

  // return (
  //   <div>
  //     sign in page
  //     <Form onSubmit={handleLogin}>
  //       <Form.Group className="mb-3" controlId="formBasicEmail">
  //         <Form.Label>Email address</Form.Label>
  //         <Form.Control
  //           type="email"
  //           placeholder="Enter email"
  //           onChange={(e) => setEmail(e.target.value)}
  //         />
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="formBasicPassword">
  //         <Form.Label>Password</Form.Label>
  //         <Form.Control
  //           type="password"
  //           placeholder="Password"
  //           onChange={(e) => setPassword(e.target.value)}
  //         />
  //       </Form.Group>

  //       <Button variant="primary" type="submit">
  //         Sign in
  //       </Button>
  //     </Form>
  //   </div>
  // );
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} className="logo" alt="" />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="navbar-text">
              Not a member? <a href="/Register">Sign up now</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="form-container">
        <div className="form-content-left">
          <img className="form-img" src={signup} alt="spaceship" />
        </div>
        <div className="form-content-right">
          <Form className="form" onSubmit={handleLogin}>
            <h1 className="form-title">Log in Kids First</h1>
            {/* <span>{errorMessage}</span> */}
            <p className="incorrect-p correct-p">Your email address or password is incorrect. Please try again, or click "Forgot your password".</p>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="email-label">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@email.com"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="password-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="checkbox mb-3">
                <a className=" btn forget-password" href="/Forget">
                  Forgot your password?
                </a>
              </div>
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="login" size="lg" type="submit">
                Log In
              </Button>
            </div>

            <p className="or-login-with">Or Log in with</p>
            <Row>
              <Col xs="12" sm="6">
                <Button className="btn-facebook " block>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="facebook-icon"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-facebook"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                  <span className="p-1">facebook</span>
                </Button>
              </Col>
              <Col xs="12" sm="6">
                <Button className="btn-Google mb-1" block>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="google-icon"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-google"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                  </svg>
                  <span className="p-1">google</span>
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );

}
