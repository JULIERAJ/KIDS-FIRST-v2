const memberService = require('../service/member-service');

const memberRegistration = async (req, res) => {
  const {
    firstName,
    lastName,
    kidsList,
    inviteeEmail,
    inviteeInviteLater,
    family,
    principle,
  } = req.body;

  try {
    const isMemberDuplicate = await memberService.isDuplicate(
      firstName,
      lastName,
      family
    );
    console.log({ isMemberDuplicate });

    if (!isMemberDuplicate) {
      const memberData = await memberService.memberRegistration({
        family,
        firstName,
        lastName,
        principle,
        kidsList,
        inviteeEmail,
        inviteeInviteLater,
      });
      console.log('firstname, lastname', firstName, lastName);
      return res.status(201).json(memberData);
    } else {
      return res.status(409).json({
        message: `the member ${firstName} ${lastName} already exists`,
      });
    }
  } catch (e) {
    console.log('member controller', e.message);
    return res.status(500).json({ message: 'something went wrong' });
  }
};

const getMember = async (req, res) => {
  const { id } = req.params;
  try {
    const member = await memberService.getMemberByPrincipleId(id);
    return res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { memberRegistration, getMember };
