const Member = require('../models/Member');
const mongoose = require('mongoose');

// Using for testing purpose: replace with familyId and
// creating helper function for creating kids members
const createMembers = async (kidsList, family) => {
  // console.log('HELP', family);
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
      // after removing empty spaces and empty entries we save kids in db  
      const kidMembers = kidNames.map(
        (kid) =>
          new Member({
            firstName: kid,
            family,
          }),
      );
      await Member.insertMany(kidMembers);
    }
  } catch (err) {
    console.log(err);
  }
};

const memberRegistration = async ({
  firstName,
  lastName,
  kidsList,
  inviteeEmail,
  principle,
  family,
  role
}) => {
  // use helper function on array kidNames to create kid members
  await createMembers(kidsList, family);

  const principleMemberInfo = new Member({
    firstName,
    lastName,
    principle,
    inviteeEmail,
    family,
    role // role is a parent
  });
  console.log('m1', principleMemberInfo);
  await principleMemberInfo.save();
};

// check!!
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
