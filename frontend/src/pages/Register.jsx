import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//firebase
import { authentication } from '../config/firebase-config';
import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth';



import { register } from '../api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  console.log('email is ', email);
  console.log('password is ', password);

//for facebook sign in
const signInWithFacebook = () => {
  const provider = new FacebookAuthProvider();

  signInWithPopup(authentication,provider)
  .then((result)=>{
    console.log('I am registered using Facebook')
    console.log(result.user)
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    console.log(accessToken)
    console.log(result.user.displayName)
    console.log(result.user.email)
    //we need to save this user in our database and redirect to family

  })
  .catch((error)=>{
    console.log(error)
    // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // The email of the user's account used.
  const email = error.customData.email;
  // The AuthCredential type that was used.
  const credential = FacebookAuthProvider.credentialFromError(error);
  })
};

  function handleRegister(e) {
    e.preventDefault();
    console.log('email is ', email);
    console.log('password is ', password);
    // next page should - give a family name
    register({ email, password })
      .then((res) => {
        console.log('success');
        console.log(res)
        // need to store the user information in the session
        const user = JSON.stringify(res.data);
        localStorage.setItem('storedUser', user);
        window.location.href = '/family';
      })
      .catch((e) => {
        console.log(e.response.data.message);
        setError(e.response.data.message);
        window.location.href = '/Signin';
      });
    // then firstname, last name ... fill out the information .

  }


  return (
    <div>
      registration page
      {error.length > 1 ? error : ''}
      <Form onSubmit={handleRegister}>
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
          Register
        </Button>
      </Form>
      <button onClick={signInWithFacebook}> Sign up with FB </button>
    </div>
  );
}
