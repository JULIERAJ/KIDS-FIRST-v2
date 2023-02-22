var { expressjwt: jwtEX } = require("express-jwt");
require('dotenv').config({path: './.env.local'});

function jwtMiddleware() {
  const jwtEXFunction = jwtEX({
    secret: process.env.JWT_PRIVATE_KEY,
    getToken: (req)=> {  
      
      return req.cookies.jwt;
    },
    algorithms: ['HS256'],
    isRevoked: async (req, payload, done) => {
      // check if token is revoked
    },
  }).unless({
    path: [
      '/api/login',
      '/api/register',
    ],
  });

  return jwtEXFunction;
}

module.exports = jwtMiddleware;
