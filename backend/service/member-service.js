const Member = require('../models/Member');
const mongoose = require('mongoose');

// Using for testing purpose: replace with familyId and principleId from family-registration
const familyId = new mongoose.Types.ObjectId();
const principleId = new mongoose.Types.ObjectId();
// creating helper function for creating kids members
const createMembers = async (kidsList, familyId) => {
  // give us an array of names
  // validation: filter out any empty strings or strings with less than 3 characters
  try {
    // in order not to save empty kids entries in db
    if (kidsList) {
      const kidNames = kidsList
        .map((kid) => kid.kidName.trim())
        .filter((kidName) => kidName.length > 0 && kidName.length >= 3);

      if (kidNames.length !== kidsList.length) {
        console.error('Invalid kid name(s) detected');
      }

      const kidMembers = kidNames.map(
        (kid) =>
          new Member({
            firstName: kid,
            family: familyId,
          }),
      );
      await Member.insertMany(kidMembers);
    }
  } catch (err) {
    console.log(err);
  }
};

const memberRegistration = async ({ firstName, lastName, kidsList }) => {
  // use helper function on array kidNames to create kid members
  await createMembers(kidsList, familyId);

  const m1 = new Member({
    firstName,
    lastName,
    family: familyId,
    principle: principleId,
  });
  await m1.save();
};

const isDuplicate = async (firstName, lastName, kidsList) => {
  const checkDuplicate = await Member.findOne({
    firstName,
    lastName,
    kidsList,
  });
  // console.log('isDuplicate', checkDuplicate);
  return checkDuplicate ? true : false;
};

// module.exports = { memberRegistration };
module.exports = { memberRegistration, isDuplicate };
