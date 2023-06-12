const Member = require('../models/Member');
const mongoose = require('mongoose');
const Invitation = require('../models/Invitation');
const invitationController = require('../controllers/invitation-controller');

// check duplication: firstname, lastname, familyid are all the same
const isDuplicate = async (firstName, lastName, family) => {
  const checkDuplicate = await Member.findOne({
    firstName,
    lastName,
    family
  });
  console.log('isDuplicate', checkDuplicate);
  return checkDuplicate ? true : false;
};

const memberRegistration = async ({
  family, 
  firstName,
  lastName,
  principle,
  kidsList,
  inviteeEmail
}) => {
  // use helper function on array kidNames to create kid members
  await saveKids(kidsList, family);
  await savePrinciple(firstName, lastName, principle, family);
  // await saveInvitation(principle, family, inviteeEmail);
  await invitationController.invitation(principle, family, inviteeEmail, firstName ); 
};

const saveKids = async (kidsList, family) => {
  try {
    if (kidsList) {
      await Member.insertMany(
        kidsList
        .map((kid) => kid.trim())
        .filter((kid) => kid.length > 0)
        .map((kid) => new Member({ firstName: kid, family, role: 'kid' })
      ));
    }
  } catch (err) {
    console.log(err);
  }
};

const savePrinciple = async (firstName, lastName, principle, family) => {
  const principleMemberInfo = new Member({
    firstName,
    lastName,
    principle,
    family,
    role: 'parent' 
  });
  await principleMemberInfo.save();
};

// const saveInvitation = async (principle, family, inviteeEmail) => {
//   try {
//     const invitationInfo = new Invitation({
//     inviter : principle, 
//     family, 
//     inviteeEmail
//   });
//   await invitationInfo.save();
//  } catch (err ){
//   console.log('invitationInfo error ', err); 
// }
// };

module.exports = { memberRegistration, isDuplicate };
