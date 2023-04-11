// const invitationService = require('../service/invitation-service');

// const invitation = async (req, res) => {
//   try {
//     const { inviter, family, inviteeEmail, invitationUrl } = req.body;
//     console.log('REQBODYINVITE', req.body);

//     const invite = await invitationService.invitation(
//       inviter,
//       family,
//       inviteeEmail,
//       invitationUrl,
//     );
//     console.log('invite', invite);
//     return res.status(201).send({ invite });
//   } catch (e) {
//     return res.status(500).json('something went wrong');
//   }
// };

// module.exports = { invitation };
