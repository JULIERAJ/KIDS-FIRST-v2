import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/';

/*
if signed in successfully, go to the 'families' page to select family 
then go to dashboard need to store user information in the session 
*/
export const login = (email, password) => 
  axios.post(`${BASE_URL}login`, { email, password });

export const register = (opts) => axios.post(`${BASE_URL}register`, opts);

export const sendInvitation = (opts) => 
  axios.post(`${BASE_URL}invitation`, opts);
  
export const createFamily = (opts) => axios.post(`${BASE_URL}family`, opts);

export const createMember = (opts) => axios.post(`${BASE_URL}member`, opts);

export const activate = (email, emailVerificationToken) =>
  axios.get(`${BASE_URL}activate/${email}/${emailVerificationToken}`);
