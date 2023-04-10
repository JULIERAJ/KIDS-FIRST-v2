const Invitation = require('../models/Invitation');

const createInvitation = async (
  invitor,
  family,
  inviteeEmail,
  invitationUrl
) => {
  const invitation = await new Invitation({
    invitor,
    family,
    inviteeEmail,
    invitationUrl,
  });

  await invitation.save();
  return {
    inviteeEmail: invitation.inviteeEmail,
    invitor: invitation.invitor,
    family: invitation.family,
  };
};

const findInviteeEmail = async (email) => {
  const InviteeEmail = await Invitation.findOne({ email }).exec();
  return InviteeEmail ? InviteeEmail : null;
};

const findInviteeDuplcate = async (email, family) => {
  const inviteeDuplicate = await Invitation.find({
    email: email,
    family: family,
  }).exec();

  return inviteeDuplicate.length > 0 ? inviteeDuplicate : null;
};

const acceptedInvitation = async (email) => {
  const invitation = await Invitation.findOneAndUpdate(
    { email: email },
    { invitationAccepted: true },
    { new: true }
  );
  return invitation;
};

module.exports = { createInvitation, findInviteeEmail, acceptedInvitation, findInviteeDuplcate };
