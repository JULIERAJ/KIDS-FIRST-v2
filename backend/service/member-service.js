const invitationController = require('../controllers/invitation-controller');
const Member = require('../models/Member');

// check duplication: firstname, lastname, familyid are all the same
const isDuplicate = async (firstName, lastName, family) => {
  const checkDuplicate = await Member.findOne({
    firstName,
    lastName,
    family,
  });
  return checkDuplicate ? true : false;
};

const memberRegistration = async ({
  family,
  firstName,
  lastName,
  principle,
  kidsList,
  inviteeEmail,
  inviteeInviteLater,
}) => {
  // use helper function on array kidNames to create kid members
  await saveKids(kidsList, family);
  await savePrinciple(firstName, lastName, principle, family);
  // await saveInvitation(principle, family, inviteeEmail);
  await invitationController.invitation(
    principle,
    family,
    inviteeEmail,
    firstName,
    inviteeInviteLater
  );
};

const saveKids = async (kidsList, family) => {
  try {
    if (kidsList) {
      await Member.insertMany(
        kidsList
          .map((kid) => kid.trim())
          .filter((kid) => kid.length > 0)
          .map((kid) => new Member({ firstName: kid, family, role: 'kid' }))
      );
    }
  } catch (err) {
    return err;
  }
};

const savePrinciple = async (firstName, lastName, principle, family) => {
  const principleMemberInfo = new Member({
    firstName,
    lastName,
    principle,
    family,
    role: 'parent',
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
