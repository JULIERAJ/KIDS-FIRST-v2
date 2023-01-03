const jwt = require('jsonwebtoken');

const emailService = require('../service/email-service');
const principleService = require('../service/principle-service');

require('dotenv').config({ path: './.env.local' });

// 1 upper/lower case letter, 1 number, 1 special symbol
// eslint-disable-next-line max-len
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
const emailRegExp = /^\S+@\S+\.\S+$/;

const registration = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await principleService.findUser(email);

    if(user) {
      return res.status(409)
        .json({ message: `The user with ${email} email already exists` });
    }

    if(!passwordRegExp.test(password)) {
      // eslint-disable-next-line max-len
      return res.status(400).json({ message: 'Password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, and one number' });
    } else if(!emailRegExp.test(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    } else if(!user) {
      user = await principleService.registration(email, password);

      const emailVerificationToken = await jwt.sign(
        { email },
        process.env.JWT_EMAIL_VERIFICATION_SECRET,
        { expiresIn: '1h' }
      );

      await emailService.sendActivationEmail(email, emailVerificationToken);
            
      return res.status(201).json({
        message: `user ${user.email} registered, verification link sent`,
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
    const activationTokenVerified =
            await principleService.emailTokenVerification(activationToken);

    if (!activationTokenVerified) {
      return res
        .status(400)
        .json({ message: 'activation link is not correct' });
    } else {
      const principleData = await principleService.activateAccount(email);
      return res.status(200).json({
        message: 'the account is successfully activated',
        email: principleData.email,
        emailIsActivated: principleData.emailIsActivated,
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
      password
    );
    if (!correctPassword) {
      return res.status(401).json({ error: 'Password or username is not correct' });
    }
    return res.status(200).json({ email: user.email, id: user._id });
  } catch (e) {
    return res.status(500).json({ message: 'Failed to login' });
  }
};

module.exports = { registration, accountActivation, login };
