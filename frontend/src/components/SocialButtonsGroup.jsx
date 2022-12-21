import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import googleIcon from "../media/icons/google.png";
import facebookIcon from "../media/icons/facebook.png";
//firebase
import { authentication } from '../config/firebase-config';
import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth';

//for facebook sign in
const signInWithFacebook = () => {
  console.log('click fac')
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


const SocialButton = ({ icon, title, onclick}) => (
  <Button onClick={onclick} className="tertiary-btn w-100" type="button" variant="outline-secondary" size="lg">
    <img src={icon} width="25" height="25" alt=""/>
    {' '}
    {title}
  </Button>
);


const SocialButtonsGroup = () => (
  <Row className="py-5">
    <Col xs={12} md={6}>
      <SocialButton icon={googleIcon} title="Google"/>
    </Col>

    <Col xs={12} md={6}>
      <SocialButton   icon={facebookIcon} title="Facebook" onclick={signInWithFacebook}/>
    </Col>
  </Row>
)
export default SocialButtonsGroup;
