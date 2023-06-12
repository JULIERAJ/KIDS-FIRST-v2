const memberService = require('../service/member-service');

const memberRegistration = async (req, res) => {
  const { firstName, lastName, kidsList, inviteeEmail, family, principle } = req.body;

  console.log( req.body);
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
        inviteeEmail
      });
      console.log('firstname, lastname', firstName, lastName);
      return res.status(201).json(memberData);
    } else {
      return res.status(409).json({
        message: `the member ${firstName} ${lastName} already exists`,
      });
    }
  } catch (e) {
    console.log('member controller' ,e.message);
    return res.status(500).json({ message: 'something went wrong' });
  }
};

module.exports = { memberRegistration };
