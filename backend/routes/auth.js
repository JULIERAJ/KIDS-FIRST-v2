// //It requires the user to be authenticated in order to access the protected route.
// //The requireAuth middleware will verify the token and grant access only to authorized users.

// const express = require('express');
// const requireAuth = require('../middleware/auth');
// const router = express.Router();
// const expressUnless = require('express-unless');

// //if an endpoint requires authorization:
// //u must add const requireAuth = require('../middleware/auth'); at the top
// //u must add requireAuth as a second argument
// //By adding requireAuth as the second argument in the router.get function,
// //       you are ensuring that only authenticated and authorized users can access this protected route.

// router.get('/protected', requireAuth, (req, res) => {
//     res.json({ success: true }); //user is authenticated and authorized to access the protected route.
// });


// const unlessPaths = expressUnless({
//                 path: [
//                     // public routes that don't require authentication
//                     //you should use the full route path rather than just the endpoint.
//                     '/api/login',
//                     '/api/register'
//                 ]
//             });

// requireAuth.unless = expressUnless;


// // Apply the JWT middleware to all routes except the excluded ones

// router.use(requireAuth);

// module.exports = router;



// // const express = require('express');
// // const authMiddleware = require('./authMiddleware');

// // const authRouter = express.Router();

// // // apply the auth middleware to all routes on this router
// // authRouter.use(authMiddleware);

// // // define the routes for the auth router
// // authRouter.get('/', (req, res) => {
// //   res.send('This is a protected route.');
// // });

// // authRouter.get('/profile', (req, res) => {
// //   res.send(`Welcome ${req.user.name}!`);
// // });

// // module.exports = authRouter;
