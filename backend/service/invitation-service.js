const Invitation = require('../models/Invitation');

const invitation = async (invitor, family, inviteeEmail, invitationUrl) => {
  const invitation = await new Invitation({
    invitor,
    family,
    inviteeEmail,
    invitationUrl,
  });
  await invitation.save();
};

module.exports = { invitation };
