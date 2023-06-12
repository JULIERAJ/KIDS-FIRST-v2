const Invitation = require('../models/Invitation');

const createInvitation = async (
  inviter,
  family,
  inviteeEmail,
  invitationUrl
) => {
  const invitation = await new Invitation({
    inviter,
    family,
    inviteeEmail,
    invitationUrl,
  });

  await invitation.save();
  return {
    inviteeEmail: invitation.inviteeEmail,
    inviter: invitation.inviter,
    family: invitation.family,
  };
};

const findInviteeEmail = async (inviteeEmail) => {
  const InviteeEmail = await Invitation.findOne({ inviteeEmail }).exec();
  return InviteeEmail ? InviteeEmail : null;
};

const findInviteeDuplcate = async (inviteeEmail, family) => {
  console.log('=====try to find duplication', inviteeEmail, family);
  const inviteeDuplicate = await Invitation.find({
    inviteeEmail,
    family
  }).exec();
  console.log('???', inviteeDuplicate); 
  return inviteeDuplicate.length > 0 ? true : false;
};

const acceptedInvitation = async (inviteeEmail) => {
  const invitation = await Invitation.findOneAndUpdate(
    { inviteeEmail },
    { invitationAccepted: true },
    { new: true }
  );
  return invitation;
};

module.exports = { createInvitation, findInviteeEmail, acceptedInvitation, findInviteeDuplcate };

