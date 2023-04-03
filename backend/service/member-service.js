const Member = require('../models/Member');
const { uid } = require('uid');

const memberRegistration = async (
  firstname,
  lastname,
  principleId,
  familyId
) => {
  const m1 = new Member({
    family: familyId,
    principle: principleId,
    firstname: firstname,
    lastname: lastname,
  });
  await m1.save();
  return { m1 };
};
const isDuplicate = async (firstname, lastname, principleId, familyId) => {
  const checkDuplicate = await Member.findOne({
    firstname,
    lastname,
    principle: principleId,
    family: familyId,
  });

  return checkDuplicate ? true : false;
};

const uploadMemeberImage = async (memberId, image) => {
  try {
    const specifiedMember = await Member.findById(memberId);
    if (!specifiedMember) {
      return { success: false, message: 'Member not found' };
    }

    if (!image) {
      return { success: false, message: 'No image uploaded' };
    } else if (!image.mimetype.includes('image/png') && !image.mimetype.includes('image/jpeg') && !image.mimetype.includes('image/jpg')) {
      return { success: false, message: 'Invalid image type. Please use .png, .jpeg, .jpg' };
    } else if (image.size > 1000000) {
      return { success: false, message: 'Invalid image size' };
    }
    // generate a unique filename for the image
    const { mimetype, buffer } = image;
    const fileName = `${uid()}.${mimetype.split('/')[1]}`;

    specifiedMember.avatar = {
      name: fileName,
      contentType: mimetype,
      data: buffer
    }

    await specifiedMember.save();
    return { success: true, message: 'Image uploaded successfully', specifiedMember };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Something went wrong', error };
  }
}

const updateMemeberImage = async (memberId, image) => {
  try {
    const specifiedMember = await Member.findById(memberId);
    if (!specifiedMember) {
      return { success: false, message: 'Member not found' };
    }

    if (!image) {
      return { success: false, message: 'No image uploaded' };
    } else if (!image.mimetype.includes('image/png') && !image.mimetype.includes('image/jpeg') && !image.mimetype.includes('image/jpg')) {
      return { success: false, message: 'Invalid image type. Please use .png, .jpeg, .jpg' };
    } else if (image.size > 1000000) {
      return { success: false, message: 'Invalid image size' };
    }

    const { mimetype, buffer } = image;
    const fileName = `${uid()}.${mimetype.split('/')[1]}`;
    console.log(fileName)

    const updatedMember = await Member.findOneAndUpdate(
      { _id: memberId },
      {

        avatar: {
          name: fileName,
          contentType: mimetype,
          data: buffer,
        }
      },
      { new: true }
    );

    return { success: true, message: 'Image updated successfully', updatedMember };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Something went wrong', error };
  }
}

module.exports = { memberRegistration, isDuplicate, uploadMemeberImage, updateMemeberImage };
