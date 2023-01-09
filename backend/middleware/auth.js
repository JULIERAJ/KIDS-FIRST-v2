// //auth middleware

// const jwt = require("jsonwebtoken");

// module.exports = async (req, res, next) => {
//     try {
//             const authHeader = req.cookies.jwt;

//         if (!authHeader) return res.status(403).send("Access denied. No token provided.");

//         // Parse the token from the header and verify its authenticity
//         const token = authHeader.replace(/^Bearer\s+/, '');

            
//         const verified = jwt.verify(token, process.env.JWT_PRIVATE_KEY, {
//             algorithms: ['HS256'],
//             expiresIn: '60s',
//           });


//         if (!verified) {
//             return res.status(401).json({error: 'Unauthorized - token not verified'});
//         }

//         const user = await principleService.findUser(verified.id);
//         if (!user) {
//             return res.status(401).json({error: 'Unauthorized - user not found'});
//         }

//         req.user = user;

//         next();

//     } catch (error) {

//         res.status(400).send("Invalid token or token expired.");

//     }
// };

