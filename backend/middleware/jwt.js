require('dotenv').config({path: './.env.local'});

const { expressjwt } = require('express-jwt');

function jwt() {

    console.log('it passed jwt function');

    return expressjwt({ secret: process.env.JWT_PRIVATE_KEY , algorithms: ['HS256'],getToken: (req) => req.cookies.token,
     onExpired: async (req, err) => {
       return res.status(401).json({error: 'Unauthorized - token expired'});
      } }).unless({
        path: [
            // public routes that don't require authentication
            //you should use the full route path rather than just the endpoint.
            '/api/register',
            '/api/login',
            '/api/logout'        ]
    });
}

module.exports = jwt;



//in react side we must have a token in the header of the request
//When you make a request with Axios, the cookie will be automatically included in the request headers.
//you can use the withCredentials option in your Axios configuration.

// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:3000',
//   headers: { Authorization: `Bearer ${token}` } // OR     withCredentials: true

// });

//or
//you can use the withCredentials option in your Axios configuration.
//Then, when you make an API request, Axios will include the cookie in the request headers