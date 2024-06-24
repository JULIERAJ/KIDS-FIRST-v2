const { StatusCodes } = require('http-status-codes');

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
      return res.status(StatusCodes.CREATED).json(memberData);
    } else {
      return res.status(StatusCodes.CONFLICT).json({
        message: `The member ${firstName} ${lastName} already exists in the family ${family}.`,
      });
    }
  } catch (e) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Something went wrong' });
  }
};

module.exports = { memberRegistration };
