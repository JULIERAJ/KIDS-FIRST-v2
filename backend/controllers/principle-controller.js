const jwt = require('jsonwebtoken');

const emailService = require('../service/email-service');
const familyService = require('../service/family-service');
const principleService = require('../service/principle-service');
require('dotenv').config({ path: './.env.local' });

// 1 upper/lower case letter, 1 number, 1 special symbol
// eslint-disable-next-line max-len
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
const emailRegExp = /^\S+@\S+\.\S+$/;

const registration = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await principleService.findUser(email);

    if (user) {
      return res
        .status(409)
        .json({ message: `The user with ${email} email already exists` });
    }

    if (!passwordRegExp.test(password)) {
      // eslint-disable-next-line max-len
      return res.status(400).json({
        message:
          'Password must be at least 10 characters long and contain\
           at least one uppercase letter, one lowercase letter, and one number',
      });
    } else if (!emailRegExp.test(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    } else if (!user) {
      user = await principleService.registration(email, password);

      const emailVerificationToken = await jwt.sign(
        { email },
        process.env.JWT_EMAIL_VERIFICATION_SECRET,
        { expiresIn: '1h' },
      );

      await emailService.sendActivationEmail(email, emailVerificationToken);

      return res.status(201).json({
        message: 'Verify your email.',
        email: user.email,
        emailIsActivated: user.emailIsActivated,
      });
    }
  } catch (e) {
    return res.status(500).json({ message: 'something went wrong' });
  }
};

const accountActivation = async (req, res) => {
  const activationToken = req.params.emailVerificationToken;

  const email = req.params.email;

  try {
    const user = await principleService.findUser(email);
    
    if (user.emailIsActivated === true) {
      return res.status(200).json({
        message: 'Email has been verified',
        email: user.email,
        emailIsActivated: user.emailIsActivated,
      });
    }
    const activationTokenVerified =
      await principleService.emailTokenVerification(activationToken);

    if (!activationTokenVerified) {
      return res
        .status(400)
        .json({ message: 'activation link is not correct' });
    } else {
      const principleData = await principleService.activateAccount(email);
      
      // autogenerate family name and save it in db
      const familyName = familyService.generateFamilyName();

      const familyNameRegistartion = 
      await familyService.familyRegistration(familyName, principleData._id);

      return res.status(200).json({
        message: 'the account is successfully activated',
        email: principleData.email,
        emailIsActivated: principleData.emailIsActivated,
        familyName: familyNameRegistartion.familyName
      });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await principleService.findUser(email);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const correctPassword = await principleService.isPasswordCorrect(
      email,
      password,
    );
    if (!correctPassword) {
      return res
        .status(401)
        .json({ error: 'Password or username is not correct' });
    }
    	       //jwt
  	         const token = jwt.sign({ _id: user._id,
  	            email: user.email,
    	            emailIsActivated: user.emailIsActivated, },
    	            process.env.JWT_PRIVATE_KEY, { expiresIn: '30m' ,algorithm: 'HS256' 
    	            } );
  	              
    	        res.cookie('jwt', token, {
    	            httpOnly: true,
    	            //secure: true,     // set to true if your using https
    	            sameSite: 'strict',
    	            maxAge: 1800 * 1000 // set cookie expiration time in milliseconds
                });
    return res.status(200).json({ email: user.email, id: user._id });
  } catch (e) {
    return res.status(500).json({ message: 'Failed to login' });
  }
};

const requestResetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  try {
    const user = await principleService.findUser(email);
    if (!user) {
      return res.status(404).json({ error: 'Email not found' });
    }
    // Generate a reset password token
    const passwordResetVerificationToken = await jwt.sign(
      { email },
      process.env.JWT_EMAIL_VERIFICATION_SECRET,
      { expiresIn: '1h' },
    );
    // Send an email with the reset password link
    await emailService.sendResetPasswordEmail(
      email,
      passwordResetVerificationToken,
    );
    return res.status(200).json({
      message: `Reset password link sent to ${email}`,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const resetPasswordActivation = async (req, res) => {
  const { email, resetPasswordToken } = req.params;
  try {
    if (principleService.validateUserAndToken(email, resetPasswordToken)) {
      return res.status(201).json({ status: 201 });
    } else {
      return res
        .status(401)
        .json({ status: 401, message: 'User does not exist' });
    }
  } catch (err) {
    return res.status(401).json({ status: 401, error: err.message });
  }
};

const resetPasswordUpdates = async (req, res) => {
  const { email, resetPasswordToken } = req.params;
  const { password } = req.body;

  if (!passwordRegExp.test(password)) {
    return res.status(400).json({
      message:
        'Password must be at least 10 characters long\
         and contain at least one uppercase letter, one lowercase letter, and one number',
    });
  }

  try {
    const decoded = await principleService.emailTokenVerification(resetPasswordToken);

    if (!decoded) {
      return res.status(401).json({ msg: 'Invalid token' });
    }
    // update user
    let user = await principleService.updateUserPassword(email, password);
    // hash password using isPasswordCorrect
    await user.save();
    return res.status(200).json({ msg: 'Password updated successfully' });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
};

const logout = async (req, res) => {
  // Remove the JWT cookie
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logout successful' });
};

module.exports = {
  registration,
  accountActivation,
  login,
  requestResetPassword,
  resetPasswordActivation,
  resetPasswordUpdates,
  logout,
};