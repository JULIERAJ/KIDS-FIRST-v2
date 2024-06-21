/* eslint-disable no-dupe-keys */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');

const Principle = require('../models/Principle');

require('dotenv').config({ path: './.env.local' });

const registration = async (firstname, lastname, email, password) => {
  const principle = new Principle({ firstname, lastname, email, password });
  await principle.save();

  return { id: principle._id, email: principle.email, firstname: principle.firstname, lastname: principle.lastname };
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
    { new: true }
  );
  return updatedUser;
};

// Schedule the task to run every hour to bulk delete. --- to change it to 2min for testing: */2 * * * *
cron.schedule('0 * * * *', () => {
  deleteInactiveUsers();
});

// Define the function to delete inactive users
const deleteInactiveUsers = async () => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago in milliseconds
  try {
    // Find users who haven't activated their account and were created more than 1 hour ago
    const inactiveUsers = await Principle.find({
      emailIsActivated: false, // Filter: email is not activated
      createdAt: { $lt: oneHourAgo }, // Filter: created more than 1 hour ago
    });

    // Delete inactive users
    await Promise.all(
      // Map over the array of inactive users and delete each user
      inactiveUsers.map(async (user) => {
        await Principle.findByIdAndDelete(user._id); // Delete user by ID
      })
    );

    // Log the number of inactive users deleted
    // eslint-disable-next-line no-console
    console.log('Inactive users deleted:', inactiveUsers.length);
  } catch (error) {
    console.error('Error deleting inactive users:', error);
  }
};

// Schedule the task to run every hour to bulk delete. --- to change it to 2min for testing: */2 * * * *
cron.schedule('0 * * * *', () => {
  deleteInactiveUsers();
});

module.exports = {
  registration,
  findUser,
  isPasswordCorrect,
  emailTokenVerification,
  activateAccount,
  validateUserAndToken,
  updateUserPassword,
  deleteInactiveUsers,
  deleteInactiveUsers,
};
