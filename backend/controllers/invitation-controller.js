const invitationService = require('../service/invitation-service');

const invitation = async (req, res) => {
  try {
    const { inviter, family, inviteeEmail, invitationUrl } = req.body;
    console.log('REQBODYINVITE', req.body);

    const i1 = await invitationService.invitation(
      inviter,
      family,
      inviteeEmail,
      invitationUrl,
    );
    console.log('I1', i1);
    return res.status(201).send({ i1 });
  } catch (e) {
    return res.status(500).json('something went wrong');
  }
};

module.exports = { invitation };
