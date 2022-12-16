const invitationService = require('../service/invitation-service');

const invitation = async (req, res) => {
  try {
    const { invitor, family, inviteeEmail, invitationUrl } = req.body;

    const i1 = await invitationService.invitation(
      invitor,
      family,
      inviteeEmail,
      invitationUrl
    );
    res.status(201).send({ i1 });
  } catch (e) {
    res.status(500).json('something went wrong');
  }
};

module.exports = { invitation };
