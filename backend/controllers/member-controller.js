const memberService = require('../service/member-service');

const memberRegistration = async (req, res) => {
  const { firstName, lastName, kidsList, inviteeEmail, inviteeInviteLater, family, principle } = req.body;

  try {
    const isMemberDuplicate = await memberService.isDuplicate(
      firstName,
      lastName,
      family
    );
    
    if (!isMemberDuplicate ) {
      const memberData = await memberService.memberRegistration({
        family, 
        firstName,
        lastName,
        principle,
        kidsList,
        inviteeEmail,
        inviteeInviteLater
      });
      return res.status(201).json(memberData);
    } else {
      return res.status(409).json({
        message: `the member ${firstName} ${lastName} already exists`,
      });
    }
  } catch (e) {
    return res.status(500).json({ message: 'something went wrong' });
  }
};

module.exports = { memberRegistration };
