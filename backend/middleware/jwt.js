var { expressjwt: jwtEX } = require("express-jwt");
require('dotenv').config({path: './.env.local'});
const jwt = require('jsonwebtoken');

function jwtMiddleware() {
  const jwtEXFunction = jwtEX({
    secret: process.env.JWT_PRIVATE_KEY,
    getToken: (req)=> {  
      return req.cookies.jwt;
    },
    algorithms: ['HS256'],
  }).unless({
    path: [
      '/api/login',
      '/api/register',
    ],
  });

  
  //havin this part will let us reach decoded token in req.user
  return (req, res, next) => {
    jwtEXFunction(req, res, (err) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.cookies.title = 'jwt';
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