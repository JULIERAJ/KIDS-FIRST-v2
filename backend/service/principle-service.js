const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: './.env.local' });

const Principle = require('../models/Principle');

const registration = async (email, password) => {
  const principle = new Principle({ email, password });
  await principle.save();

  return { id: principle._id, email: principle.email };
};

const findUser = async (email) => {
  const user = await Principle.findOne({ email }).exec();
  return user ? user : null;
};

// need to add logic when compare stored password with the password provided. 
// Depends on what crypting module is used. For ex bcrypt
const isPasswordCorrect = async (email, password) => {
  const principle = await Principle.findOne({ email });
  const isMatch = await bcrypt.compare(password, principle.password);
    
  return isMatch;
};

const emailTokenVerification = async (activationToken) => {
  const tokenVerified = jwt.verify(
    activationToken,
    process.env.JWT_EMAIL_VERIFICATION_SECRET
  );

  return tokenVerified ? true : false;
};

const activateAccount = async (email) => {
  const user = await Principle.findOneAndUpdate(
    { email: email },
    { emailIsActivated: true },
    { new: true }
  );
  return user;
};

module.exports = {
  registration,
  findUser,
  isPasswordCorrect,
  emailTokenVerification,
  activateAccount,
};
