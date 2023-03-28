const memberService = require('../service/member-service');

const memberRegistration = async (req, res) => {
  const { firstName, lastName, kidsList, inviteeEmail, family, principle } = req.body;

  console.log('REQBODY', req.body);

  try {
    const isMemberDuplicate = await memberService.isDuplicate(
      firstName,
      lastName,
      kidsList,
      inviteeEmail,
      principle,
      family,
    );
    console.log({ isMemberDuplicate });

    if (!isMemberDuplicate) {
      const memberData = await memberService.memberRegistration({
        firstName,
        lastName,
        kidsList,
        inviteeEmail,
        principle,
        family,
      });

      return res.status(201).json(memberData);
    } else {
      return res.status(409).json({
        message: `the member ${firstName} ${lastName} already exists`,
      });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'something went wrong' });
  }
};

module.exports = { memberRegistration };
