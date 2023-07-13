import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { authentication } from '../config/firebase-config';
import facebookIcon from '../media/icons/facebook.png';
import googleIcon from '../media/icons/google.png';
//firebase

//for facebook sign in
const signInWithFacebook = () => {
  const provider = new FacebookAuthProvider();

  signInWithPopup(authentication, provider)
    .then((result) => {
      /* eslint-disable no-console */
      // TODO:
      // console.log('I am registered using Facebook');
      console.log(result.user);
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      console.log(accessToken);
      console.log(result.user.displayName);
      console.log(result.user.email);
      //we need to save this user in our database and redirect to family
    })
    .catch((error) => {
      /* eslint-disable no-unused-vars */
      // TODO:
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
    });
};

const SocialButton = ({ icon, title, onClick }) => (
  <Button
    className='tertiary-btn w-100'
    type='button'
    variant='outline-secondary'
    size='lg'
    onClick={onClick}>
    <img src={icon} width='25' height='25' alt='' /> {title}
  </Button>
);

const SocialButtonsGroup = () => (
  <Row className='py-5'>
    <Col xs={12} md={6}>
      <SocialButton icon={googleIcon} title='Google' />
    </Col>

    <Col xs={12} md={6}>
      <SocialButton
        icon={facebookIcon}
        title='Facebook'
        onClick={signInWithFacebook}
      />
    </Col>
  </Row>
);

export default SocialButtonsGroup;

SocialButton.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
};
