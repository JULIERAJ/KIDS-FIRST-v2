const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const fetch = require('node-fetch');

const emailService = require('../service/email-service');
const familyService = require('../service/family-service');
const principleService = require('../service/principle-service');

require('dotenv').config({ path: './.env.local' });
// 1 upper/lower case letter, 1 number, 1 special symbol
// eslint-disable-next-line max-len
const {
  generatePassword,
  passwordRegExp,
  emailRegExp,
} = require('../utils/passwordUtils');

require('dotenv').config({ path: './.env.local' });

const jwtOptions = {
  expiresIn: process.env.JWT_LIFETIME,
};
const registration = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    // check that first name is entered
    if (!firstName) {
      return res.status(400).json({ message: 'First name is required' });
    }
    let user = await principleService.findUser(email);

    if (user) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message:  'This email address is already in use' });

    }
    if (!passwordRegExp.test(password)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `Password must be at least 8 characters 
          long and contain at least one uppercase letter, one lowercase letter, 
          one number, and one symbol.`,
      });
    } else if (!emailRegExp.test(email)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid email' });
    } else if (!user) {
      user = await principleService.registration(firstName, lastName, email, password);
      const emailVerificationToken = await jwt.sign(
        { email },
        process.env.JWT_EMAIL_VERIFICATION_SECRET,
        jwtOptions
      );
      await emailService.sendActivationEmail(email, emailVerificationToken);

      return res.status(StatusCodes.CREATED).json({
        message: 'Verify your email.',
        email: user.email,
        emailIsActivated: user.emailIsActivated,
      });
    }
  } catch (e) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Something went wrong' });
  }
};
const accountActivation = async (req, res) => {
  const activationToken = req.params.emailVerificationToken;
  const email = req.params.email;
  try {
    const user = await principleService.findUser(email);
    if (user.emailIsActivated === true) {
      return res.status(StatusCodes.OK).json({
        message: 'Email has been verified',
        email: user.email,
        emailIsActivated: user.emailIsActivated,
      });
    }

    const activationTokenVerified =
      await principleService.emailTokenVerification(activationToken);

    if (!activationTokenVerified) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Activation link is not correct' });
    } else {
      const principleData = await principleService.activateAccount(email);
      // autogenerate family name and save it in db
      const familyName = familyService.generateFamilyName();

      const familyNameRegistration = await familyService.familyRegistration(
        familyName,
        principleData._id
      );

      return res.status(StatusCodes.OK).json({
        message: 'The account is successfully activated',
        email: principleData.email,
        emailIsActivated: principleData.emailIsActivated,
        familyName: familyNameRegistration.familyName,
      });
    }
  } catch (e) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: e.message });
  }
};
const resendActivationEmail = async (req, res) => {
  // Extract the email from the request body
  const { email } = req.body;
  try {
    // Find the user associated with the provided email
    const user = await principleService.findUser(email);
    if (!user) {
      // If user is not found, return a 404 status with a corresponding message
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found' });
    }
    // Generate an email verification token using JWT
    const emailVerificationToken = await jwt.sign(
      { email },
      process.env.JWT_EMAIL_VERIFICATION_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );
    // Send the activation email with the generated token
    await emailService.sendActivationEmail(email, emailVerificationToken);

    return res
      .status(StatusCodes.OK)
      .json({ message: 'Activation email resent successfully' });

  } catch (e) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal server error. Please try again later.' });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isEmailCorrect = email && emailRegExp.test(email);
    if (!isEmailCorrect) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Invalid email address' });
    }

    const user = await principleService.findUser(email);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'User not found' });
    }

    const isPasswordCorrect =
      password && (await principleService.isPasswordCorrect(email, password));
    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Password is not correct' });
    }


    // when the user login, then find that user's family(s), then push the info  to the front
    const principleFamily = await familyService.findPrincipleFamilyName(
      user._id
    );

    return res.status(StatusCodes.OK).json({

      email: user.email,
      id: user._id,
      familyId: principleFamily[0].id,
      familyName: principleFamily[0].familyName,
    });
  } catch (e) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to login' });
  }
};
const loginFacebook = async (req, res) => {
  const { accessToken, userID } = req.body;
  const urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
  try {
    const fetchResponse = await fetch(urlGraphFacebook, { method: 'GET' });
    const data = await fetchResponse.json();
    const { email } = data;
    const user = await principleService.findUser(email);
    if (!user) {
      const password = data.email + process.env.JWT_EMAIL_VERIFICATION_SECRET;
      const emailIsActivated = true;
      await principleService.registration(
        data.email,
        password,
        emailIsActivated
      );
      const token = jwt.sign(
        { email: data.email },
        process.env.JWT_EMAIL_VERIFICATION_SECRET,
        jwtOptions
      );
      res.json({
        token,
        email: data.email,
      });
    }
    if (user) {
      const token = jwt.sign(
        { email: data.email },
        process.env.JWT_EMAIL_VERIFICATION_SECRET,
        jwtOptions
      );
      res.json({
        token,
        email: data.email,
      });
    }
  } catch (error) {
    console.error('Fetch error:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error fetching data from Facebook' });
  }
};

const loginSocial = async (req, res) => {
  const { userID } = req.body;
  if (userID === undefined) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Error fetching data from Google' });
  }

  let user = await principleService.findUser(userID);
  if (!user) {

    let password = generatePassword();
    user = await principleService.registration(userID, password);
    principleService.activateAccount(user.email);
  }
  const principleFamily = await familyService.findPrincipleFamilyName(user._id);
  return res.status(StatusCodes.OK).json({
    email: user.email,
    id: user._id,
    familyId: principleFamily.id,
    familyName: principleFamily.familyName,
  });
};

const requestResetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Email is required' });
  }
  try {
    const user = await principleService.findUser(email);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'No user found with this email address' });
    }

    // Generate a reset password token
    const passwordResetVerificationToken = await jwt.sign(
      { email },
      process.env.JWT_EMAIL_VERIFICATION_SECRET,
      jwtOptions
    );

    // Send an email with the reset password link
    await emailService.sendResetPasswordEmail(
      email,
      passwordResetVerificationToken
    );
    return res.status(StatusCodes.OK).json({
      message: `Reset password link sent to ${email}`,
    });
  } catch (e) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: e.message });
  }
};
const resetPasswordActivation = async (req, res) => {
  const { email, resetPasswordToken } = req.params;
  try {
    if (principleService.validateUserAndToken(email, resetPasswordToken)) {
      return res
        .status(StatusCodes.CREATED)
        .json({ status: StatusCodes.CREATED });
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: StatusCodes.UNAUTHORIZED,
        message: 'User does not exist',
      });
    }
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ status: StatusCodes.UNAUTHORIZED, error: err.message });
  }
};
const resetPasswordUpdates = async (req, res) => {
  const { email, resetPasswordToken } = req.params;
  const { password } = req.body;
  if (!passwordRegExp.test(password)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: `Password must be at least 10 characters long and contain 
        at least one uppercase letter, one lowercase letter, one number, and one symbol`,
    });
  }
  try {
    const decoded = await principleService.emailTokenVerification(
      resetPasswordToken
    );
    if (!decoded) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: 'Invalid token' });
    }
    // update user
    let user = await principleService.updateUserPassword(email, password);
    // hash password using isPasswordCorrect
    await user.save();
    return res
      .status(StatusCodes.OK)
      .json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Server error' });
  }
};
module.exports = {
  registration,
  accountActivation,
  login,
  loginFacebook,
  loginSocial,
  requestResetPassword,
  resetPasswordActivation,
  resetPasswordUpdates,
  resendActivationEmail,
};