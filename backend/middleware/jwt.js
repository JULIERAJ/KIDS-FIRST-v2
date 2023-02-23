var { expressjwt: jwtEX } = require("express-jwt");
require('dotenv').config({path: './.env.local'});
const jwt = require('jsonwebtoken');

function jwtMiddleware() {
  const jwtEXFunction = jwtEX({
    secret: process.env.JWT_PRIVATE_KEY,
    getToken: (req)=> {  
      console.log("=============="+req.cookies);
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

  return (req, res, next) => {
    jwtEXFunction(req, res, (err) => {
      if (err) {
        console.log("===================="+req.cookies);
        return res.status(401).json({ error: 'Invalid token' });
      }
      //recieve token from cookies and verify it
      //req.cookies.title = 'jwt';
      const token = req.cookies.jwt;
      if(token){
          jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decodedToken) => {
              if(err){
                  console.log(err.message);
                  req.user = null;
              }else{
                  console.log(decodedToken);
                  req.user = decodedToken;
                  }
          });
      }
      next();
    });
  };

}

module.exports = jwtMiddleware;










// var { expressjwt: jwtEX } = require("express-jwt");
// require('dotenv').config({path: './.env.local'});

// function jwtMiddleware() {
//   const jwtEXFunction = jwtEX({
//     secret: process.env.JWT_PRIVATE_KEY,
//     getToken: (req)=> {  
      
//       return req.cookies.jwt;
//     },
//     algorithms: ['HS256'],
//     isRevoked: async (req, payload, done) => {
//       // check if token is revoked
//     },
//   }).unless({
//     path: [
//       '/api/login',
//       '/api/register',
//     ],
//   });

//   return jwtEXFunction;
// }

// module.exports = jwtMiddleware;