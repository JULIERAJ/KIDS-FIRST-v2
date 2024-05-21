import axios from 'axios';

const API_PORT = process.env.REACT_APP_API_PORT;
//const API_URL = 'http://localhost:8000/api/';

const API_URL = `http://localhost:${API_PORT}/api/`;

/*
if signed in successfully, go to the 'families' page to select family
then go to dashboard need to store user information in the session
*/
export const login = (email, password) => axios.post(`${API_URL}login`, { email, password });

export const loginFacebook = (accessToken, userID) =>
  axios.post(`${API_URL}loginFacebook`, { accessToken, userID });

export const loginSocial = (accessToken, userID) =>
  axios.post(`${API_URL}loginSocial`, { accessToken, userID });

export const register = (opts) => axios.post(`${API_URL}register`, opts);

export const createFamily = (opts) => axios.post(`${API_URL}family`, opts);

export const createMember = ({
  firstName,
  lastName,
  kidsList,
  inviteeEmail,
  inviteeInviteLater,
  family,
  principle,
}) =>
  axios.post(`${API_URL}member`, {
    firstName,
    lastName,
    kidsList,
    inviteeEmail,
    inviteeInviteLater,
    family,
    principle,
  });

export const activate = (email, emailVerificationToken) =>
  axios.get(`${API_URL}activate/${email}/${emailVerificationToken}`);

export const activateCoParent = (email, family, emailVerificationToken) =>
  axios.get(`${API_URL}register/${email}/${family}/${emailVerificationToken}`);

export const forgetPassword = (email) => axios.post(`${API_URL}forgot-password`, { email });

export const resetPasswordLink = (email, resetPasswordToken) =>
  axios.get(`${API_URL}reset-password/${email}/${resetPasswordToken}`);

export const resetPassword = (email, password, resetPasswordToken) =>
  axios.post(`${API_URL}reset-password/${email}/${resetPasswordToken}`, {
    email,
    password,
    resetPasswordToken,
  });
export const resendEmailVerification = (email) => axios.post(`${API_URL}resend-email`, { email });
