import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import './styles.css';

import IconText from './IconText';

import MessageBar from './MessageBar';

import { register } from '../../api';
import FatherSonBlock from '../../components/FatherSonBlock';
import FormEmailInput from '../../components/form/FormEmailInput';
import FormPasswordInput from '../../components/form/FormPasswordInput';
import Header from '../../components/Header/Header';
import SocialButtonsGroup from '../../components/SocialButtonsGroup';
import TextLink from '../../components/TextLink';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isError, setIsError] = useState(false);
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(false);

  const handleEmailChange = ({ target: { value } }) => setEmail(value);
  const handlePasswordChange = ({ target: { value } }) => setPassword(value);
  const handlePasswordConfirmChange = ({ target: { value } }) => 
    setConfirmPassword(value);

  const handleSubmit = event => {
    event.preventDefault();
    if(!isError && password !== confirmPassword) {
      setIsError(true);
    } else if(isPasswordsMatch) {
      // next page should - give a family name
      register({ email, password }).then((res) => {

        // need to store the user informatin in the session
        const user = JSON.stringify(res.data);
        localStorage.setItem('storedUser', user);

        // TODO: remove redirect. First we need to verify the account ?
        // window.location.href = "/family";
      })
        .catch((e) => {
          setIsError(e.response.data.message);
        });
      // then firstname, last name ... fill out the information .
    }
  };

  // TODO
  useEffect( () => {
    if(isError && password === confirmPassword) {
      setIsError(false);
    }
  }, [isError, password, confirmPassword]);

  useEffect( () => {
    if(isPasswordsMatch && password !== confirmPassword) {
      setIsPasswordsMatch(false);
    }
  }, [isPasswordsMatch, password, confirmPassword]);

  return (
    <>
      <Header widget={
        <TextLink title="Already a member?" to="/signin" linkTitle="Log in" />
      }/>

      <Container className="content-layout py-4" >
        <FatherSonBlock>
          <h1 className="register-title">Sign up Kids First</h1>

          <Form
            className="py-4"
            onSubmit={handleSubmit}
          >
            {isError &&
              <MessageBar variant="error">
                {/* TODO: check text */}
                {/* TODO: show error MSG */}
                You are using symbols in your passwords or your passwords do not match.
              </MessageBar>
            }

            <FormEmailInput onChange={handleEmailChange} required/>
            <FormPasswordInput onChange={handlePasswordChange} required/>
            <FormPasswordInput
              id="confirmPassword"
              label="Password Confirmation"
              name="confirmPassword"
              onChange={handlePasswordConfirmChange}
              required
            />

            {isPasswordsMatch &&
              <MessageBar variant="success">
                {/* TODO: missing msg for symbols?*/}
                <IconText title="English uppercase/lowercase characters"/>
                <IconText title="Numbers (0-9)"/>
                {/* TODO: min 8 ?*/}
                <IconText title="Minimum ten characters"/>
              </MessageBar>
            }

            <Button 
              className="primary-btn w-100 my-5"
              type="submit"
              size="lg"
              variant="light">
              Sign up
            </Button>

            <div className="sign-up-text">Or sign up with</div>

            {/* // TODO: check when isPasswordsMatch */}
            <SocialButtonsGroup />
          </Form>
        </FatherSonBlock>
      </Container>
    </>
  );
};

export default Register;
