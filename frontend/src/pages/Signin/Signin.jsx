import "./Signin.css";
import { useState, useEffect } from "react";
import { Navbar, Container, Row, Col, Form, Button } from "react-bootstrap";
import signup from "../../img/signup.png";
import axios from "axios";



import { login } from "../../api";
import FatherSonBlock from "../../components/FatherSonBlock";
import FormEmailInput from "../../components/form/FormEmailInput";
import FormPasswordInput from "../../components/form/FormPasswordInput";
import Header from "../../components/Header/Header";
import MessageBar from "../Register/MessageBar";
import SocialButtonsGroup from "../../components/SocialButtonsGroup";
import TextLink from "../../components/TextLink";


const HeaderLink = <TextLink title="Not a member?" to="/register" linkTitle="Sign up" />;

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    setSuccess(true)
  },[email, password])

  console.log("email is ", email);
  console.log("password is ", password);


  async function handleLogin(e) {
    e.preventDefault();

    console.log("email is ", email);
    console.log("password is ", password);
    login(email, password).then((res)=> {
      console.log(res.data)
    if (res.data.message){
      setSuccess(false)
      setErrMsg('Your email address or password is incorrect. Please try again, or click "Forgot your password"')
    } else {
      setSuccess(true)
      window.location.href = "/dashboard"
    }
    })
  
  }
  
  return (
    <>
      <Header 
        widget={HeaderLink}
      />
      <Container className="content-layout py-4" >
        <FatherSonBlock>
        
          <Form className="py-4" onSubmit={handleLogin}>
            <h1 className="login-title">Log in Kids First</h1>
            

            {!success &&
            <MessageBar variant="error">
            {errMsg}
            </MessageBar>
            }
            <FormEmailInput 
            type="email"
                placeholder="example@email.com"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                />

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="password-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              /> 
               <div className="checkbox mb-3">
                <a className=" btn forget-password" href="/Forget">
                  Forgot your password?
                </a>
              </div>
            </Form.Group>
            <Button className="primary-btn w-100 my-5" type="submit" size="lg" variant="light">
                Log In
              </Button>
            

            <div className="or-login-with">Or Log in with</div>
            <SocialButtonsGroup />
          </Form>
        </FatherSonBlock>
        </Container>
    </>
  );

}
