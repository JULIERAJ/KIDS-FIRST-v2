const memberService = require('../service/member-service');
const Member = require('../models/Member');
const { uid } = require('uid');

const memberRegistration = async (req, res) => {
  const { firstName, lastName, kidsList, inviteeEmail, family, principle, role } = req.body;

  console.log('REQBODY', req.body);

  try {
    const isMemberDuplicate = await memberService.isDuplicate(
      firstName,
      lastName,
      kidsList,
      inviteeEmail,
      principle,
      family,
      role
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
        role
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

const getMemberById = async (req, res) => {
  const memberId = req.params.mid;

  const specifiedMember = await Member.findById(memberId);
  if (!specifiedMember) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(201).json(specifiedMember);
}

// create member's image of specified member's Id
const memberUploadImage = async (req, res) => {
  try {
    const memberId = req.params.mid;
    const image = req.file;

    const memberData = await memberService.uploadMemeberImage(memberId, image);
    res.status(201).json(memberData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong', error: error });
  }
}

const memberUpdateImage = async (req, res) => {
  try {
    const memberId = req.params.mid;
    const image = req.file;

    const memberUpdatedData = await memberService.updateMemeberImage(memberId, image);
    res.status(201).json(memberUpdatedData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}


module.exports = { memberRegistration, getMemberById, memberUploadImage, memberUpdateImage };
