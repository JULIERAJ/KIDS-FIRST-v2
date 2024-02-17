const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Principle = require('../models/Principle');

require('dotenv').config({ path: './.env.local' });

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
    process.env.JWT_EMAIL_VERIFICATION_SECRET,
  );
  return tokenVerified ? true : false;
};

const activateAccount = async (email) => {
  const user = await Principle.findOneAndUpdate(
    { email: email },
    { emailIsActivated: true },
    { new: true },
  );
  return user;
};

const validateUserAndToken = async (email, token) => {
  const user = await findUser(email);
  const resetPasswordTokenVerified = await emailTokenVerification(token);
  if (user && resetPasswordTokenVerified) {
    return true;
  }
  return false;
};

const updateUserPassword = async (email, password) => {
  const user = await findUser(email);
  if (!user) {
    throw new Error('User not found');
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  const updatedUser = await Principle.findOneAndUpdate(
    { email: email },
    { $set: { password: hashedPassword } },
    { new: true },
  );
  return updatedUser;
};

module.exports = {
  registration,
  findUser,
  isPasswordCorrect,
  emailTokenVerification,
  activateAccount,
  validateUserAndToken,
  updateUserPassword,
};
