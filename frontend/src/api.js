import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/';

/*
if signed in successfully, go to the 'families' page to select family 
then go to dashboard need to store user information in the session 
*/
export const login = (email, password) =>
  axios.post(`${BASE_URL}login`, { email, password });

export const register = (opts) => axios.post(`${BASE_URL}register`, opts);

export const createFamily = (opts) => axios.post(`${BASE_URL}family`, opts);

export const createMember = ({
  firstName,
  lastName,
  kidsList,
  inviteeEmail,
  inviteeInviteLater,
  family,
  principle,
}) =>
  axios.post(`${BASE_URL}member`, {
    firstName,
    lastName,
    kidsList,
    inviteeEmail,
    inviteeInviteLater,
    family,
    principle,
  });

export const activate = (email, emailVerificationToken) =>
  axios.get(`${BASE_URL}activate/${email}/${emailVerificationToken}`);

export const activateCoParent = (email, family, emailVerificationToken) =>
  axios.get(`${BASE_URL}register/${email}/${family}/${emailVerificationToken}`);

export const forgetPassword = (email) =>
  axios.post(`${BASE_URL}forgetPassword`, { email });

export const resetPasswordLink = (email, resetPasswordToken) =>
  axios.get(`${BASE_URL}resetPassword/${email}/${resetPasswordToken}`);

export const resetPassword = (email, password, resetPasswordToken) =>
  axios.post(`${BASE_URL}resetPassword/${email}/${resetPasswordToken}`, {
    email,
    password,
    resetPasswordToken,
  });

export const newConversation = (userId) => {
  // console.log(userId);
  return axios.post(`${BASE_URL}conversations`, { userId });
};
export const getAllConversationForParticularUser = (userId) => {
  return axios.get(`${BASE_URL}conversations/${userId}`);
};
export const getMember = (principle) =>
  axios.get(`${BASE_URL}member/${principle}`);
